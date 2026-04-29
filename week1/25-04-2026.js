const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeaders = ("content-type", "application/json");
  console.log(req.url,req.method);

  if (req.url === "/profile" && req.method === "GET") {
    res.statusCode = 200;
    res.statusMessage = "ok";

    res.end(JSON.stringify({ target: "35 LPA", status: "Inprogress" }));
  } else if (req.url === "/profile-update" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
      console.log(body);
      
    });

    req.on("end", () => {
      const data = JSON.parse(body);
      console.log('-------------------');
      console.log(data);

      res.end(
        JSON.stringify({
          data,
          message: `Target updated to ${data.target}`,
        }),
      );
    });
  }else if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.statusMessage = "ok";

    res.end(null);
  }  else {
    res.statusCode = 404;
    res.statusMessage = "not found";

    res.end();
  }
});

server.listen(3000, () => {
  console.log(`server is runing on the port no 3000`);
});
