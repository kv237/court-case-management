import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  X,
  Pencil,
} from "lucide-react";

const RenameModal = ({
  open,
  title = "Rename",
  initialValue = "",
  loading = false,
  onClose,
  onSubmit,
}) => {

  const inputRef =
    useRef(null);

  const [value, setValue] =
    useState(initialValue || "");

  // =====================================
  // UPDATE INPUT VALUE SAFELY
  // =====================================

  useEffect(() => {

    if (
      open &&
      inputRef.current
    ) {

      inputRef.current.value =
        initialValue || "";

      setValue(
        initialValue || ""
      );

    }

  }, [

    open,

    initialValue,

  ]);

  // =====================================
  // ESC CLOSE
  // =====================================

  useEffect(() => {

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

  }, [onClose]);

  // =====================================
  // CLOSE
  // =====================================

  if (!open) {
    return null;
  }

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = () => {

    const trimmed =
      value.trim();

    if (!trimmed) {
      return;
    }

    onSubmit?.(
      trimmed
    );

  };

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

            <div
              className="
                w-11
                h-11

                rounded-2xl

                bg-blue-100
                dark:bg-blue-500/10

                flex items-center
                justify-center
              "
            >

              <Pencil
                size={20}
                className="
                  text-blue-600
                "
              />

            </div>

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
                Update the name
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

          <label
            className="
              text-[11px]
              font-semibold

              text-gray-600
              dark:text-zinc-400
            "
          >
            Name
          </label>

          <input
            ref={inputRef}

            type="text"

            defaultValue={
              initialValue || ""
            }

            onChange={(e) =>
              setValue(
                e.target.value
              )
            }

            onKeyDown={(e) => {

              if (
                e.key === "Enter"
              ) {

                handleSubmit();

              }

            }}

            placeholder="Enter name"

            autoFocus

            className="
              mt-2

              w-full
              h-12

              rounded-2xl

              border
              border-gray-200
              dark:border-zinc-800

              bg-white
              dark:bg-[#050816]

              px-4

              text-sm

              text-black
              dark:text-white

              placeholder:text-gray-400

              outline-none

              focus:border-blue-500
              dark:focus:border-blue-500

              transition-all
              duration-300
            "
          />

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

          <button
            type="button"

            onClick={handleSubmit}

            disabled={loading}

            className="
              h-12

              rounded-2xl

              bg-blue-600

              text-white
              text-sm
              font-semibold

              hover:bg-blue-700

              disabled:opacity-60
              disabled:cursor-not-allowed

              transition-all
              duration-300
            "
          >

            {loading
              ? "Saving..."
              : "Save"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default RenameModal;