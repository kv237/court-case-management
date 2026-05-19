import {
  Eye,
  Pencil,
  Download,
  Share2,
  Trash2,
  X,
} from "lucide-react";

const FileActionsModal = ({
  open,
  file,
  onClose,
  onPreview,
  onRename,
  onDownload,
  onShare,
  onDelete,
}) => {

  if (!open || !file) {
    return null;
  }

  const actions = [
    {
      icon: Eye,
      label: "Preview",
      onClick: onPreview,
      danger: false,
    },

    {
      icon: Pencil,
      label: "Rename",
      onClick: onRename,
      danger: false,
    },

    {
      icon: Download,
      label: "Download",
      onClick: onDownload,
      danger: false,
    },

    {
      icon: Share2,
      label: "Share",
      onClick: onShare,
      danger: false,
    },

    {
      icon: Trash2,
      label: "Delete",
      onClick: onDelete,
      danger: true,
    },
  ];

  return (

    <div
      onClick={onClose}
      className="
        fixed inset-0
        z-[130]

        bg-black/60

        backdrop-blur-md

        flex items-end
        justify-center
      "
    >

      {/* SHEET */}

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full
          max-w-sm

          bg-white
          dark:bg-[#0B1120]

          rounded-t-[32px]

          overflow-hidden

          border-t
          border-gray-200
          dark:border-zinc-800

          animate-in
          slide-in-from-bottom
          duration-300
        "
      >

        {/* DRAG HANDLE */}

        <div
          className="
            flex justify-center
            pt-3
          "
        >

          <div
            className="
              w-12
              h-1.5

              rounded-full

              bg-gray-300
              dark:bg-zinc-700
            "
          />

        </div>

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

          <div className="overflow-hidden">

            <h2
              className="
                text-sm
                font-bold

                text-black
                dark:text-white
              "
            >
              File Actions
            </h2>

            <p
              className="
                text-[11px]

                text-gray-500
                dark:text-zinc-400

                mt-1

                truncate
                max-w-[220px]
              "
            >
              {file?.document_name ||
                "Document"}
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

        {/* ACTIONS */}

        <div className="p-3 pb-5">

          {actions.map(
            (
              action,
              index
            ) => (

              <button
                key={index}

                type="button"

                onClick={() => {

                  action?.onClick?.();

                  onClose?.();

                }}

                className={`
                  w-full
                  h-14

                  rounded-2xl

                  px-4

                  flex items-center
                  gap-3

                  transition-all
                  duration-300

                  active:scale-[0.98]

                  ${
                    action.danger

                      ? `
                        text-red-500

                        hover:bg-red-50
                        dark:hover:bg-red-500/10
                      `

                      : `
                        text-black
                        dark:text-white

                        hover:bg-gray-50
                        dark:hover:bg-zinc-800
                      `
                  }
                `}
              >

                <div
                  className={`
                    w-10
                    h-10

                    rounded-xl

                    flex items-center
                    justify-center

                    ${
                      action.danger

                        ? `
                          bg-red-100
                          dark:bg-red-500/10
                        `

                        : `
                          bg-gray-100
                          dark:bg-zinc-800
                        `
                    }
                  `}
                >

                  <action.icon
                    size={18}
                  />

                </div>

                <span
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  {action.label}
                </span>

              </button>

            )
          )}

        </div>

      </div>

    </div>

  );

};

export default FileActionsModal;