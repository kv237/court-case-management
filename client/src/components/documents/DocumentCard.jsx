import { useState } from "react";

import {
  FileText,
  MoreVertical,
} from "lucide-react";

import RenameModal from "./RenameModal";

import DeleteConfirmModal from "./DeleteConfirmModal";

import FileActionsModal from "./FileActionsModal";

import documentService from "../../services/documentService";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

const DocumentCard = ({
  doc,
  onPreview,
  onDelete,
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

  const [documentName, setDocumentName] =
    useState(
      doc?.document_name || "Untitled"
    );

  // =====================================
  // SAFE VALUES
  // =====================================

  const documentId =
    doc?._id || doc?.id;

  const fileUrl =
    doc?.file_url || "";

  // =====================================
  // OPEN FILE
  // =====================================

  const openFile = () => {
    if (!fileUrl) {
      showError(
        "File URL not found"
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

    link.href = fileUrl;

    link.download =
      documentName;

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

  // =====================================
  // SHARE FILE
  // =====================================

  const shareFile =
    async () => {
      try {
        if (!fileUrl) {
          showError(
            "Share unavailable"
          );
          return;
        }

        if (
          navigator.share
        ) {
          await navigator.share({
            title:
              documentName,
            url: fileUrl,
          });

          showSuccess(
            "File shared"
          );
        } else {
          await navigator.clipboard.writeText(
            fileUrl
          );

          showSuccess(
            "Link copied"
          );
        }
      } catch (error) {
        console.error(error);

        showError(
          "Share failed"
        );
      }
    };

  // =====================================
  // RENAME FILE
  // =====================================

  const handleRename =
    async (newName) => {
      if (!newName?.trim()) {
        showError(
          "Enter document name"
        );
        return;
      }

      try {
        setLoading(true);

        await documentService.renameDocument(
          documentId,
          newName
        );

        setDocumentName(
          newName
        );

        showSuccess(
          "Document renamed"
        );

        setRenameOpen(false);
      } catch (error) {
        console.error(error);

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
  // DELETE FILE
  // =====================================

  const handleDelete =
    async () => {
      try {
        setLoading(true);

        await onDelete(
          documentId
        );

        setDeleteOpen(false);
      } catch (error) {
        console.error(error);

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

      <FileActionsModal
        open={actionsOpen}
        file={doc}
        onClose={() =>
          setActionsOpen(false)
        }
        onPreview={() =>
          onPreview?.(doc)
        }
        onRename={() =>
          setRenameOpen(true)
        }
        onDownload={
          downloadFile
        }
        onShare={shareFile}
        onDelete={() =>
          setDeleteOpen(true)
        }
      />

      {/* RENAME */}

      <RenameModal
        open={renameOpen}
        title="Rename Document"
        initialValue={
          documentName
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
        title="Delete Document"
        message={`Are you sure you want to delete "${documentName}"?`}
        loading={loading}
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={handleDelete}
      />

      {/* CARD */}

      <div
        className="
          bg-white
          dark:bg-[#0B1120]

          rounded-2xl
          p-3

          border
          border-gray-200
          dark:border-zinc-800

          shadow-sm

          flex
          items-center
          justify-between

          relative

          transition-all
          duration-300

          active:scale-[0.99]
        "
      >
        {/* LEFT */}

        <div
          onClick={() =>
            onPreview?.(doc)
          }
          onDoubleClick={
            openFile
          }
          className="
            flex
            items-center
            gap-3

            cursor-pointer

            flex-1
            overflow-hidden
          "
        >
          {/* ICON */}

          <div
            className="
              w-11
              h-11

              rounded-xl

              bg-red-100
              dark:bg-red-500/10

              flex
              items-center
              justify-center

              shrink-0
            "
          >
            <FileText
              size={18}
              className="
                text-red-500
              "
            />
          </div>

          {/* DETAILS */}

          <div className="overflow-hidden">
            <h3
              className="
                text-[12px]
                font-semibold

                text-black
                dark:text-white

                truncate
                max-w-[160px]
              "
            >
              {documentName}
            </h3>

            <p
              className="
                text-[11px]

                text-gray-600
                dark:text-zinc-400

                mt-1

                truncate
              "
            >
              {doc?.case_number ||
                "No Case Number"}
            </p>
          </div>
        </div>

        {/* ACTION BUTTON */}

        <button
          type="button"
          onClick={() =>
            setActionsOpen(true)
          }
          className="
            w-10
            h-10

            rounded-xl

            hover:bg-gray-100
            dark:hover:bg-zinc-800

            flex
            items-center
            justify-center

            shrink-0

            transition-all
            duration-300
          "
        >
          <MoreVertical
            size={18}
            className="
              text-gray-700
              dark:text-zinc-300
            "
          />
        </button>
      </div>
    </>
  );
};

export default DocumentCard;