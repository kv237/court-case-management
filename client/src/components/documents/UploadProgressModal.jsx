import {
  UploadCloud,
  X,
} from "lucide-react";

const UploadProgressModal = ({
  open,
  progress = 0,
  fileName = "",
  uploading = false,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0
      z-[150]
      bg-black/60
      backdrop-blur-sm
      flex items-center justify-center
      p-4"
    >
      {/* MODAL */}

      <div
        className="
        w-full
        max-w-sm
        bg-white
        dark:bg-zinc-900
        rounded-3xl
        shadow-2xl
        overflow-hidden"
      >
        {/* HEADER */}

        <div
          className="
          flex items-center justify-between
          p-5
          border-b border-gray-200
          dark:border-zinc-800"
        >
          <div className="flex items-center gap-3">
            <div
              className="
              w-10 h-10
              rounded-2xl
              bg-blue-100
              flex items-center justify-center"
            >
              <UploadCloud
                size={18}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2
                className="
                text-sm
                font-bold
                text-black
                dark:text-white"
              >
                Uploading File
              </h2>

              <p
                className="
                text-[11px]
                text-gray-500
                mt-1
                truncate
                max-w-[180px]"
              >
                {fileName}
              </p>
            </div>
          </div>

          {!uploading && (
            <button
              onClick={onClose}
              className="
              w-9 h-9
              rounded-xl
              bg-gray-100
              dark:bg-zinc-800
              flex items-center justify-center"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* BODY */}

        <div className="p-5">
          {/* PROGRESS */}

          <div
            className="
            w-full
            h-3
            bg-gray-100
            dark:bg-zinc-800
            rounded-full
            overflow-hidden"
          >
            <div
              style={{
                width: `${progress}%`,
              }}
              className="
              h-full
              bg-blue-600
              rounded-full
              transition-all
              duration-300"
            />
          </div>

          {/* PERCENT */}

          <div
            className="
            flex items-center justify-between
            mt-3"
          >
            <p
              className="
              text-[11px]
              text-gray-500"
            >
              Upload Progress
            </p>

            <p
              className="
              text-[11px]
              font-bold
              text-blue-600"
            >
              {progress}%
            </p>
          </div>

          {/* STATUS */}

          <div className="mt-5">
            {uploading ? (
              <div
                className="
                flex items-center gap-2"
              >
                <div
                  className="
                  w-4 h-4
                  border-2 border-blue-600
                  border-t-transparent
                  rounded-full
                  animate-spin"
                />

                <p
                  className="
                  text-[12px]
                  text-gray-600
                  dark:text-zinc-300"
                >
                  Uploading...
                </p>
              </div>
            ) : (
              <p
                className="
                text-[12px]
                text-green-600
                font-semibold"
              >
                Upload Complete
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgressModal;