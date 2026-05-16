import { useDispatch } from "react-redux";
import { updateFilesLoadingActionReducer } from "../../redux/slice/fileSlice";

const NoFileFound = ({ message, onReset }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="
        col-span-full
        flex
        items-center
        justify-center
        px-4
        py-16
        sm:py-24
      "
    >
      {/* CARD */}
      <div
        className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
        "
      >
        {/* BACKGROUND GLOWS */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

        {/* CONTENT */}
        <div
          className="
            relative
            flex
            flex-col
            items-center
            text-center
            px-6
            sm:px-10
            py-14
          "
        >
          {/* ICON SECTION */}
          <div className="relative mb-8">
            {/* OUTER GLOW */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

            {/* MAIN ICON BOX */}
            <div
              className="
                relative
                flex
                h-28
                w-28
                sm:h-32
                sm:w-32
                items-center
                justify-center
                rounded-[32px]
                bg-gradient-to-br
                from-cyan-400
                via-blue-500
                to-indigo-600
                shadow-2xl
                shadow-cyan-500/30
              "
            >
              <span className="text-5xl sm:text-6xl animate-bounce">
                ☁️
              </span>
            </div>

            {/* FLOATING BADGE */}
            <div
              className="
                absolute
                -bottom-2
                -right-2
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/10
                backdrop-blur-xl
                text-2xl
                shadow-xl
              "
            >
              🔍
            </div>
          </div>

          {/* HEADING */}
          <h2
            className="
              text-2xl
              sm:text-4xl
              font-black
              tracking-tight
              text-white
            "
          >
            No Files Found
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4
              max-w-lg
              text-sm
              sm:text-base
              leading-relaxed
              text-slate-400
            "
          >
            {message ||
              "We couldn't find any files matching your search. Try different keywords or reset your search to explore all uploaded files in CloudDrop."}
          </p>

          {/* FLOATING DOTS */}
          <div className="mt-6 flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-bounce" />

            <div className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-bounce [animation-delay:150ms]" />

            <div className="h-2.5 w-2.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
          </div>

          {/* RESET BUTTON */}
          {onReset && (
            <button
              onClick={() => {
                dispatch(updateFilesLoadingActionReducer(true));
                onReset();
              }}
              className="
                group
                relative
                mt-8
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-7
                sm:px-8
                py-4
                text-sm
                sm:text-base
                font-semibold
                text-white
                shadow-2xl
                shadow-cyan-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-cyan-500/30
                active:scale-95
              "
            >
              {/* SHINE */}
              <div
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  skew-x-12
                  bg-white/20
                  transition-transform
                  duration-700
                  group-hover:translate-x-[200%]
                "
              />

              {/* BUTTON CONTENT */}
              <div className="relative flex items-center gap-3">
                <span className="text-lg transition-transform duration-300 group-hover:rotate-180">
                  ↻
                </span>

                <span>Reset Search</span>
              </div>
            </button>
          )}

          {/* FOOTER */}
          <p className="mt-8 text-xs tracking-[0.2em] text-slate-500 uppercase">
            CloudDrop • Secure File Storage
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoFileFound;