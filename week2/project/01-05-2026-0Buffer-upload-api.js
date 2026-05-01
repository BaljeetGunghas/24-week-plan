const http = require("http");
const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    // Initialize Busboy with the request headers
    const busboy = Busboy({ headers: req.headers });

    // This event fires as soon as a file field is detected in the stream
    busboy.on("file", (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      console.log(`[Stream Start] Uploading: ${filename}`);

      // 1. Immediate Validation
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "text/plain",
        "video/mp4",
      ];

      if (!allowedTypes.ncludes(mimeType)) {
        console.error(
          `[Security Alert] Rejected invalid file type: ${mimeType}`,
        );

        // 2. IMPORTANT: Consume the stream without saving it or resume it
        // This effectively "throws away" the data as it arrives so the server doesn't hang
        file.resume();

        //         Why file.resume() is important:
        // In Node.js streams, if you don't "consume" the data (by piping it somewhere or calling .resume()), the stream stays "paused." The connection will stay open forever, and your server will eventually run out of available sockets. Calling file.resume() tells Node: "I don't want this data, just let it flow into the void."

        // 3. You can also emit a custom error or close the connection
        return res.end(`Error: ${mimeType} is not supported.`);
      }

      // Create a Writable Stream to the disk
      const saveTo = path.join(__dirname, "uploads", filename);
      const writeStream = fs.createWriteStream(saveTo);

      // PIPE: The "magic" happens here.
      // Data flows from the Request -> Busboy -> File System
      file.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log(`[Stream End] ${filename} saved to disk.`);
      });
    });

    busboy.on("finish", () => {
      res.writeHead(200, { Connection: "close" });
      res.end("Upload successful with zero memory bloat!");
    });

    // Pipe the raw request into busboy
    req.pipe(busboy);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});

// Why this is "40 LPA" Code:
// Event-Driven: We don't use await req.body. Instead, we listen for the 'file' event. This means we start writing the first byte to the disk while the last byte is still traveling across the internet.

// No fs.writeFile: By using file.pipe(writeStream), we ensure that if the internet is faster than the disk (or vice versa), Node.js automatically handles the Backpressure so your RAM doesn't overflow.

// Scalability: This single server could handle 50 people uploading files at the same time because the memory footprint per request is nearly zero.

// The "Code Review" (Senior Lead Perspective)
// Your implementation is solid, but when you run this in your local environment, there is one small Node.js specific behavior you need to watch out for to prevent your server from crashing during a rejected upload.

// 1. The "Response Already Sent" Trap
// In your validation block, you have:

// JavaScript
// return res.end(`Error: ${mimeType} is not supported.`);
// The Risk: If a user uploads two files in one request (multi-part), and the first one is invalid, you call res.end(). When Busboy starts processing the second file, it will try to interact with the response again, but the response is already closed. This will throw an ERR_HTTP_HEADERS_SENT error and crash your server.

// The Fix: Use a flag or counter to ensure you only send the response once, or simply collect all errors and send them at the busboy.on('finish') event.

// 2. Handling the uploads Directory
// Before running this, make sure you have an uploads folder in the same directory. fs.createWriteStream will throw an error if the parent folder doesn't exist.

// The Architecture Visualization
// To really lock in why this is superior for your 35–40 LPA target, look at how the data travels through your code:

// Readable (The Pipe): The req is the water source.

// Transform (The Filter): busboy is the filter that separates the "file" from the "text fields."

// Writable (The Bucket): writeStream is the bucket on your disk.

// By using .pipe(), Node.js manages the "water pressure" (Backpressure). If the bucket is full (disk is slow), it tells the source to stop pouring for a millisecond. This is why your memory stays at 4MB instead of 700MB.

// One Quick Exercise
// Try to run this locally with a very large file (like a movie or a large zip) and check your Task Manager or Activity Monitor. You should see the node process memory stay completely flat, even while the file is being written to the uploads folder.
