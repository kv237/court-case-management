import { useState } from "react";

import {
  Folder,
  MoreVertical,
} from "lucide-react";

import RenameModal from "./RenameModal";

import DeleteConfirmModal from "./DeleteConfirmModal";

import FolderActionsModal from "./FolderActionsModal";

import documentService from "../../services/documentService";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

const FolderCard = ({
  folder,
  active,
  onClick,
}) => {

  // =====================================
  // STATES
  // =====================================

  const [actionsOpen, setActionsOpen] =
    useState(false);

  const [renameOpen, setRenameOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [folderName, setFolderName] =
    useState(
      folder?.name || "Folder"
    );

  // =====================================
  // RENAME
  // =====================================

  const handleRename =
    async (newName) => {

      if (!newName?.trim()) {

        showError(
          "Folder name required"
        );

        return;

      }

      try {

        setLoading(true);

        await documentService.renameFolder(

          folder?.name,

          newName

        );

        setFolderName(
          newName
        );

        setRenameOpen(false);

        showSuccess(
          "Folder renamed"
        );

      } catch (error) {

        console.log(error);

        showError(
          error?.response?.data
            ?.message ||

          "Rename failed"
        );

      } finally {

        setLoading(false);

      }

    };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete =
    async () => {

      try {

        setLoading(true);

        await documentService.deleteFolder(
          folder?.name
        );

        setDeleteOpen(false);

        showSuccess(
          "Folder deleted"
        );

      } catch (error) {

        console.log(error);

        showError(
          error?.response?.data
            ?.message ||

          "Delete failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <>

      {/* ACTIONS */}

      <FolderActionsModal
        open={actionsOpen}
        folder={{
          ...folder,
          name: folderName,
        }}
        onClose={() =>
          setActionsOpen(false)
        }
        onOpen={onClick}
        onRename={() =>
          setRenameOpen(true)
        }
        onDelete={() =>
          setDeleteOpen(true)
        }
      />

      {/* RENAME */}

      <RenameModal
        open={renameOpen}
        title="Rename Folder"
        initialValue={
          folderName
        }
        loading={loading}
        onClose={() =>
          setRenameOpen(false)
        }
        onSubmit={handleRename}
      />

      {/* DELETE */}

      <DeleteConfirmModal
        open={deleteOpen}
        title="Delete Folder"
        message={`Are you sure you want to delete "${folderName}"?`}
        loading={loading}
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={handleDelete}
      />

      {/* CARD */}

      <div
        onClick={onClick}
        className={`
          rounded-2xl
          border
          p-3
          shadow-sm
          text-left
          relative
          transition-all
          duration-300
          active:scale-[0.98]
          cursor-pointer

          ${
            active

              ? "bg-blue-600 border-blue-600 text-white"

              : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"

          }
        `}
      >

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <Folder
            size={26}
            className={
              active
                ? "text-white"
                : "text-blue-500"
            }
          />

          <button
            type="button"

            onClick={(e) => {

              e.stopPropagation();

              setActionsOpen(true);

            }}

            className={`
              w-9
              h-9

              rounded-xl

              flex
              items-center
              justify-center

              transition-all
              duration-300

              ${
                active

                  ? "hover:bg-blue-500"

                  : "hover:bg-gray-100 dark:hover:bg-zinc-800"

              }
            `}
          >

            <MoreVertical
              size={16}
              className={
                active

                  ? "text-white"

                  : "text-gray-600 dark:text-zinc-400"
              }
            />

          </button>

        </div>

        {/* CONTENT */}

        <h3
          className="
            mt-4
            text-[12px]
            font-bold
            truncate
          "
        >

          {folderName}

        </h3>

        <p
          className={`
            text-[11px]
            mt-1

            ${
              active

                ? "text-blue-100"

                : "text-gray-600 dark:text-zinc-400"

            }
          `}
        >

          {folder?.files?.length || 0}
          {" "}
          Docs

        </p>

      </div>

    </>

  );

};

export default FolderCard;