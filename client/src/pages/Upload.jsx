import {
  ArrowLeft,
  UploadCloud,
  Camera,
  Plus,
  FileText,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useRef,
  useState,
  useEffect,
} from "react";

import {
  uploadDocument,
} from "../api/documentApi";

import {
  getFolders,
  createFolder,
} from "../api/folderApi";

import UploadProgressModal
  from "../components/documents/UploadProgressModal";

import BottomNavigation
  from "../components/documents/BottomNavigation";

import {
  showSuccess,
  showError,
} from "../utils/toast";

function Upload() {

  const navigate =
    useNavigate();

  const fileInputRef =
    useRef(null);

  const cameraInputRef =
    useRef(null);

  // =====================================
  // STATES
  // =====================================

  const [files, setFiles] =
    useState([]);

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    progress,
    setProgress,
  ] = useState(0);

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    caseNumber,
    setCaseNumber,
  ] = useState("");

  const [
    documentType,
    setDocumentType,
  ] = useState(null);

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    showNewFolder,
    setShowNewFolder,
  ] = useState(false);

  const [
    newFolder,
    setNewFolder,
  ] = useState("");

  const [
    documentTypes,
    setDocumentTypes,
  ] = useState([]);

  const [
    existingDocuments,
    setExistingDocuments,
  ] = useState([]);

  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    let mounted = true;

    const loadFolders =
      async () => {

        try {

          const data =
            await getFolders();

          if (
  mounted &&
  data?.success
) {

  const folders =
    data?.folders || [];

  setDocumentTypes(folders);

  if (folders.length === 0) {

    setDocumentType(null);

  }

}

        } catch (error) {

          console.log(error);

        }

      };

    const loadDocuments =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await fetch(

              `${import.meta.env.VITE_API_URL}/documents/all`,

              {

                headers: {

                  Authorization:
                    `Bearer ${token}`,

                },

              }

            );

          const data =
            await response.json();

          if (
            mounted &&
            data?.success
          ) {

            setExistingDocuments(
              data?.documents || []
            );

          }

        } catch (error) {

          console.log(error);

        }

      };

    loadFolders();

    loadDocuments();

    return () => {

      mounted = false;

    };

  }, []);

  // =====================================
  // FILE SELECT
  // =====================================

  const handleFileSelect =
    (selectedFiles) => {

      if (
        !selectedFiles ||
        selectedFiles.length === 0
      ) {

        setFiles([]);

        return;

      }

      const maxSize =
        10 * 1024 * 1024;

      const validFiles = [];

      for (
        const selectedFile
        of selectedFiles
      ) {

        if (
          selectedFile.size >
          maxSize
        ) {

          showError(
            `${selectedFile.name} exceeds 10MB`
          );

          continue;

        }

        const duplicate =
          existingDocuments.some(
            (doc) =>

              doc?.document_name
                ?.trim()
                ?.toLowerCase() ===

              selectedFile?.name
                ?.trim()
                ?.toLowerCase()
          );

        if (duplicate) {

          showError(
            `${selectedFile.name} already exists`
          );

          continue;

        }

        validFiles.push(
          selectedFile
        );

      }

      setFiles(validFiles);

    };

  const handleChooseFile =
    (e) => {

      const selectedFiles =
        Array.from(
          e.target.files || []
        );

      handleFileSelect(
        selectedFiles
      );

    };

  const handleCameraCapture =
    (e) => {

      const selectedFile =
        e.target.files?.[0];

      if (selectedFile) {

        setFiles([
          selectedFile,
        ]);

      }

    };

  // =====================================
  // CREATE FOLDER
  // =====================================

  const handleCreateFolder =
    async () => {

      if (!newFolder.trim()) {

        showError(
          "Enter folder name"
        );

        return;

      }

      try {

        const data =
          await createFolder(
            newFolder
          );

        if (data?.success) {

          showSuccess(
            "Folder Created"
          );

          setDocumentType(
            newFolder
          );

          setNewFolder("");

          setShowNewFolder(
            false
          );

          const refreshed =
            await getFolders();

          if (
            refreshed?.success
          ) {

            setDocumentTypes(
              refreshed?.folders || []
            );

          }

        } else {

          showError(
            data?.message ||
              "Folder creation failed"
          );

        }

      } catch (error) {

        showError(

          error?.response?.data
            ?.message ||

          "Folder Creation Failed"

        );

      }

    };

  // =====================================
  // UPLOAD
  // =====================================

  const handleUpload =
    async () => {

      if (
        files.length === 0
      ) {

        showError(
          "Please select files"
        );

        return;

      }

      if (
        !caseNumber.trim()
      ) {

        showError(
          "Enter case number"
        );

        return;

      }

      if (!documentType) {

        showError(
          "Select document type"
        );

        return;

      }

      try {

        setUploading(true);

        setProgress(0);

        setModalOpen(true);

        const totalFiles =
          files.length;

        let uploaded =
          0;

        for (
          const file
          of files
        ) {

          const formData =
            new FormData();

          formData.append(
            "file",
            file
          );

          formData.append(
            "case_number",
            caseNumber
          );

          formData.append(
            "document_type",
            documentType
          );

          formData.append(
            "description",
            description
          );

          await uploadDocument(
            formData
          );

          uploaded++;

          setProgress(

            Math.round(

              (
                uploaded /
                totalFiles
              ) * 100

            )

          );

        }

        showSuccess(
          `${files.length} files uploaded successfully`
        );

        // RESET

        setFiles([]);

        setCaseNumber("");

        setDocumentType(null);

        setDescription("");

        if (
          fileInputRef.current
        ) {

          fileInputRef.current.value =
            "";

        }

        if (
          cameraInputRef.current
        ) {

          cameraInputRef.current.value =
            "";

        }

        setTimeout(() => {

          setModalOpen(false);

        }, 1200);

      } catch (error) {

        console.log(error);

        showError(

          error?.response?.data
            ?.message ||

          "Upload Failed"

        );

      } finally {

        setUploading(false);

      }

    };

  return (

    <>

      {/* MODAL */}

      <UploadProgressModal
        open={modalOpen}
        progress={progress}
        fileName={`${files.length} Files`}
        uploading={uploading}
        onClose={() =>
          setModalOpen(false)
        }
      />

      {/* PAGE */}

      <div
        className="
          min-h-screen
          pb-28

          bg-[#F5F7FB]
          dark:bg-[#050816]

          flex justify-center

          px-4 py-6
        "
      >

        {/* CARD */}

        <div
          className="
            w-[360px]
            min-h-screen

            bg-white
            dark:bg-[#0B1120]

            rounded-[35px]

            border border-[#E5E7EB]
            dark:border-slate-800

            px-6 py-8

            shadow-sm
          "
        >

          {/* HEADER */}

          <div className="flex items-center justify-between">

            <button
              onClick={() =>
                navigate(-1)
              }
            >

              <ArrowLeft
                size={24}
                className="
                  text-[#111827]
                  dark:text-white
                "
              />

            </button>

            <h1
              className="
                text-[22px]
                font-semibold

                text-[#111827]
                dark:text-white
              "
            >
              Upload
            </h1>

            <div className="w-6" />

          </div>

          {/* UPLOAD BOX */}

          <div
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="
              mt-10

              border-2
              border-dashed
              border-cyan-400/40

              rounded-3xl

              min-h-[220px]

              flex flex-col
              items-center
              justify-center
              text-center

              px-6 py-6

              cursor-pointer

              bg-[#F9FBFF]
              dark:bg-[#050816]

              hover:border-cyan-400

              transition-all
            "
          >

            <UploadCloud
              size={58}
              className="
                text-cyan-500
              "
            />

            <h2
              className="
                mt-4
                text-[24px]
                font-semibold

                text-[#111827]
                dark:text-white
              "
            >

              {files.length > 0

                ? `${files.length} Files Selected`

                : "Tap to Upload"}

            </h2>

            <p
              className="
                mt-3

                text-gray-500
                dark:text-gray-400

                text-[15px]
                leading-7
              "
            >
              Upload Multiple Files
              (Max 10MB each)
            </p>

            {/* FILE LIST */}

            {files.length > 0 && (

              <div className="w-full mt-6 space-y-2">

                {files.map(
                  (
                    file,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        flex items-center
                        gap-2

                        bg-white
                        dark:bg-zinc-900

                        rounded-xl

                        px-3 py-2

                        text-left
                      "
                    >

                      <FileText
                        size={16}
                        className="
                          text-cyan-500
                          shrink-0
                        "
                      />

                      <p
                        className="
                          text-xs

                          truncate

                          text-black
                          dark:text-white
                        "
                      >
                        {file.name}
                      </p>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* FILE INPUT */}

          <input
            ref={fileInputRef}
            type="file"

            accept="*/*"

            multiple

            className="hidden"

            onChange={
              handleChooseFile
            }
          />

          {/* CAMERA */}

          <button
            onClick={() =>
              cameraInputRef.current?.click()
            }
            className="
              w-full
              h-[55px]

              rounded-2xl
              mt-5

              border border-[#D6D9E4]
              dark:border-slate-700

              bg-white
              dark:bg-[#050816]

              flex items-center
              justify-center
              gap-3

              text-[#111827]
              dark:text-white

              font-medium
            "
          >

            <Camera size={22} />

            Scan Using Camera

          </button>

          {/* CAMERA INPUT */}

          <input
            ref={cameraInputRef}
            type="file"

            accept="image/*"

            capture="environment"

            className="hidden"

            onChange={
              handleCameraCapture
            }
          />

          {/* CASE NUMBER */}

          <div className="mt-8">

            <label
              className="
                text-[15px]
                font-medium

                text-[#111827]
                dark:text-white
              "
            >
              Case Number
            </label>

            <input
              type="text"

              placeholder="Cr.P.No. 1245/2024"

              value={caseNumber}

              onChange={(e) =>
                setCaseNumber(
                  e.target.value
                )
              }

              className="
                w-full
                h-[55px]
                mt-2

                border border-[#D6D9E4]
                dark:border-slate-700

                rounded-2xl

                px-4

                outline-none

                bg-white
                dark:bg-[#050816]

                text-black
                dark:text-white
              "
            />

          </div>

          {/* DOCUMENT TYPE */}

          <div className="mt-6">

            <div className="flex items-center justify-between">

              <label
                className="
                  text-[15px]
                  font-medium

                  text-[#111827]
                  dark:text-white
                "
              >
                Document Type
              </label>

              <button
                onClick={() =>
                  setShowNewFolder(
                    !showNewFolder
                  )
                }
                className="
                  text-cyan-500

                  flex items-center
                  gap-1

                  text-[14px]
                "
              >

                <Plus size={16} />

                New Folder

              </button>

            </div>

            <select
  value={documentType || ""}
  onChange={(e) =>
    setDocumentType(
      e.target.value || null
    )
  }
  disabled={
    documentTypes.length === 0
  }
  className="
    w-full
    h-[55px]
    mt-2

    border border-[#D6D9E4]
    dark:border-slate-700

    rounded-2xl

    px-4

    outline-none

    bg-white
    dark:bg-[#050816]

    text-black
    dark:text-white

    disabled:bg-gray-100
    dark:disabled:bg-slate-900

    disabled:cursor-not-allowed
  "
>

  {documentTypes.length === 0 ? (

    <option value="">
      No Folder Available
    </option>

  ) : (

    <>
      <option value="">
        Select Type
      </option>

      {documentTypes.map(
        (folder) => (

          <option
            key={
              folder?._id ||
              folder?.id
            }
            value={
              folder?.folder_name ||
              folder?.name
            }
          >
            {
              folder?.folder_name ||
              folder?.name
            }
          </option>

        )
      )}

    </>

  )}

</select>

          </div>

          {/* NEW FOLDER */}

          {showNewFolder && (

            <div className="mt-4 flex gap-2">

              <input
                type="text"

                placeholder="Folder Name"

                value={newFolder}

                onChange={(e) =>
                  setNewFolder(
                    e.target.value
                  )
                }

                className="
                  flex-1
                  h-[50px]

                  border border-[#D6D9E4]
                  dark:border-slate-700

                  rounded-2xl

                  px-4

                  outline-none

                  bg-white
                  dark:bg-[#050816]

                  text-black
                  dark:text-white
                "
              />

              <button
                onClick={
                  handleCreateFolder
                }
                className="
                  px-5
                  rounded-2xl

                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600

                  text-white
                "
              >
                Add
              </button>

            </div>

          )}

          {/* DESCRIPTION */}

          <div className="mt-6">

            <label
              className="
                text-[15px]
                font-medium

                text-[#111827]
                dark:text-white
              "
            >
              Description
            </label>

            <textarea
              rows="5"

              placeholder="Enter description"

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              className="
                w-full
                mt-2

                border border-[#D6D9E4]
                dark:border-slate-700

                rounded-2xl

                p-4

                outline-none
                resize-none

                bg-white
                dark:bg-[#050816]

                text-black
                dark:text-white
              "
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={
              handleUpload
            }

            disabled={uploading}

            className="
              w-full
              h-[60px]

              rounded-2xl
              mt-10

              text-white
              text-[18px]
              font-semibold

              bg-gradient-to-r
              from-cyan-500
              to-blue-600

              disabled:opacity-70

              hover:scale-[1.02]

              transition-all
            "
          >

            {uploading

              ? "Uploading..."

              : `Upload ${files.length || ""} ${files.length > 1 ? "Files" : "File"}`}

          </button>

        </div>

        {/* BOTTOM NAVIGATION */}

        <BottomNavigation />

      </div>

    </>

  );

}

export default Upload;