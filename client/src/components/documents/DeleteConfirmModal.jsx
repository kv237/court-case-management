import { useEffect } from "react";

import {
  AlertTriangle,
  X,
} from "lucide-react";

const DeleteConfirmModal = ({
  open,
  title = "Delete Item",
  message = "Are you sure?",
  loading = false,
  onClose,
  onConfirm,
}) => {

  // =====================================
  // ESC CLOSE
  // =====================================

  useEffect(() => {

    if (!open) {
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

    open,

    onClose,

  ]);

  // =====================================
  // CLOSE
  // =====================================

  if (!open) {
    return null;
  }

  return (

    <div
      onClick={onClose}
      className="
        fixed inset-0
        z-[120]

        bg-black/60

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
          max-w-sm

          bg-white
          dark:bg-[#0B1120]

          rounded-3xl

          shadow-2xl

          overflow-hidden

          border
          border-gray-200
          dark:border-zinc-800

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

            p-5

            border-b
            border-gray-200
            dark:border-zinc-800
          "
        >

          <div className="flex items-center gap-3">

            {/* ICON */}

            <div
              className="
                w-11
                h-11

                rounded-2xl

                bg-red-100
                dark:bg-red-500/10

                flex items-center
                justify-center
              "
            >

              <AlertTriangle
                size={20}
                className="
                  text-red-600
                "
              />

            </div>

            {/* TEXT */}

            <div>

              <h2
                className="
                  text-sm
                  font-bold

                  text-black
                  dark:text-white
                "
              >
                {title}
              </h2>

              <p
                className="
                  text-[11px]

                  text-gray-500
                  dark:text-zinc-400

                  mt-1
                "
              >
                This action cannot
                be undone
              </p>

            </div>

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

        {/* BODY */}

        <div className="p-5">

          <p
            className="
              text-sm
              leading-6

              text-gray-600
              dark:text-zinc-300
            "
          >
            {message}
          </p>

        </div>

        {/* ACTIONS */}

        <div
          className="
            grid grid-cols-2
            gap-3

            p-5

            border-t
            border-gray-200
            dark:border-zinc-800
          "
        >

          {/* CANCEL */}

          <button
            type="button"

            onClick={onClose}

            disabled={loading}

            className="
              h-12

              rounded-2xl

              bg-gray-100
              dark:bg-zinc-800

              text-sm
              font-semibold

              text-black
              dark:text-white

              hover:bg-gray-200
              dark:hover:bg-zinc-700

              transition-all
              duration-300
            "
          >
            Cancel
          </button>

          {/* DELETE */}

          <button
            type="button"

            onClick={onConfirm}

            disabled={loading}

            className="
              h-12

              rounded-2xl

              bg-red-600

              text-white
              text-sm
              font-semibold

              hover:bg-red-700

              disabled:opacity-60
              disabled:cursor-not-allowed

              transition-all
              duration-300
            "
          >

            {loading
              ? "Deleting..."
              : "Delete"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default DeleteConfirmModal;