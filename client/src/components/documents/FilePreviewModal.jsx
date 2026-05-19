import { useEffect } from "react";

import {
  X,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

import {
  showError,
  showSuccess,
} from "../../utils/toast";

const FilePreviewModal = ({
  file,
  onClose,
}) => {

  // =====================================
  // ESC CLOSE
  // =====================================

  useEffect(() => {

    if (!file) {
      return undefined;
    }

    const handleEsc = (
      e
    ) => {

      if (
        e.key === "Escape"
      ) {

        onClose?.();

      }

    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleEsc
      );

    };

  }, [

    file,

    onClose,

  ]);

  // =====================================
  // NO FILE
  // =====================================

  if (!file) {
    return null;
  }

  // =====================================
  // SAFE VALUES
  // =====================================

  const fileUrl =
    file?.file_url || "";

  const fileName =
    file?.document_name ||
    "Document";

  const fileType =
    file?.document_type ||
    "Unknown";

  // =====================================
  // HELPERS
  // =====================================

  const isPdf =
    fileUrl
      ?.toLowerCase()
      ?.includes(".pdf");

  const isImage =
    fileType
      ?.toLowerCase()
      ?.includes("image") ||

    fileUrl?.match(
      /\.(jpg|jpeg|png|gif|webp)$/i
    );

  // =====================================
  // OPEN FILE
  // =====================================

  const openFile = () => {

    if (!fileUrl) {

      showError(
        "File unavailable"
      );

      return;

    }

    window.open(
      fileUrl,
      "_blank",
      "noopener,noreferrer"
    );

  };

  // =====================================
  // DOWNLOAD FILE
  // =====================================

  const downloadFile = () => {

    if (!fileUrl) {

      showError(
        "Download unavailable"
      );

      return;

    }

    const link =
      document.createElement("a");

    link.href =
      fileUrl;

    link.download =
      fileName;

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    showSuccess(
      "Download started"
    );

  };

  return (

    <div
      onClick={onClose}
      className="
        fixed inset-0
        z-[100]

        bg-black/70

        backdrop-blur-md

        flex items-center
        justify-center

        p-4
      "
    >

      {/* MODAL */}

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full
          max-w-md

          h-[88vh]

          bg-white
          dark:bg-[#0B1120]

          rounded-3xl

          overflow-hidden

          shadow-2xl

          border
          border-gray-200
          dark:border-zinc-800

          flex flex-col

          animate-in
          fade-in
          zoom-in
          duration-200
        "
      >

        {/* HEADER */}

        <div
          className="
            flex items-center
            justify-between

            px-5
            py-4

            border-b
            border-gray-200
            dark:border-zinc-800
          "
        >

          {/* FILE INFO */}

          <div className="overflow-hidden">

            <h2
              className="
                text-sm
                font-bold

                text-black
                dark:text-white

                truncate
              "
            >
              {fileName}
            </h2>

            <p
              className="
                text-[11px]

                text-gray-500
                dark:text-zinc-400

                mt-1
              "
            >
              {fileType}
            </p>

          </div>

          {/* CLOSE */}

          <button
            type="button"

            onClick={onClose}

            className="
              w-9
              h-9

              rounded-xl

              bg-gray-100
              dark:bg-zinc-800

              hover:bg-gray-200
              dark:hover:bg-zinc-700

              flex items-center
              justify-center

              transition-all
              duration-300
            "
          >

            <X
              size={18}
              className="
                text-black
                dark:text-white
              "
            />

          </button>

        </div>

        {/* PREVIEW */}

        <div
          className="
            flex-1

            bg-gray-100
            dark:bg-black

            overflow-hidden

            relative
          "
        >

          {isPdf ? (

            <iframe
              src={fileUrl}
              title={fileName}
              className="
                w-full
                h-full

                border-0
              "
            />

          ) : isImage ? (

            <img
              src={fileUrl}
              alt={fileName}
              className="
                w-full
                h-full

                object-contain
              "
            />

          ) : (

            <div
              className="
                w-full
                h-full

                flex flex-col
                items-center
                justify-center

                text-center

                p-6
              "
            >

              {/* ICON */}

              <div
                className="
                  w-20
                  h-20

                  rounded-3xl

                  bg-blue-100
                  dark:bg-blue-500/10

                  flex items-center
                  justify-center
                "
              >

                <FileText
                  size={40}
                  className="
                    text-blue-600
                  "
                />

              </div>

              {/* TITLE */}

              <h3
                className="
                  mt-5

                  text-sm
                  font-bold

                  text-black
                  dark:text-white
                "
              >
                Preview Not Available
              </h3>

              {/* TEXT */}

              <p
                className="
                  text-[11px]

                  text-gray-500
                  dark:text-zinc-400

                  mt-2
                "
              >
                This file type cannot
                be previewed directly.
              </p>

            </div>

          )}

        </div>

        {/* ACTIONS */}

        <div
          className="
            p-4

            border-t
            border-gray-200
            dark:border-zinc-800

            grid grid-cols-2
            gap-3
          "
        >

          {/* DOWNLOAD */}

          <button
            type="button"

            onClick={downloadFile}

            className="
              h-12

              rounded-2xl

              bg-gray-100
              dark:bg-zinc-800

              hover:bg-gray-200
              dark:hover:bg-zinc-700

              flex items-center
              justify-center
              gap-2

              text-sm
              font-semibold

              text-black
              dark:text-white

              transition-all
              duration-300
            "
          >

            <Download size={18} />

            Download

          </button>

          {/* OPEN */}

          <button
            type="button"

            onClick={openFile}

            className="
              h-12

              rounded-2xl

              bg-blue-600

              hover:bg-blue-700

              text-white

              flex items-center
              justify-center
              gap-2

              text-sm
              font-semibold

              transition-all
              duration-300
            "
          >

            <ExternalLink
              size={18}
            />

            Open

          </button>

        </div>

      </div>

    </div>

  );

};

export default FilePreviewModal;