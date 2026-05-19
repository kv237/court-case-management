import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Menu,
  Bell,
  Upload,
  X,
  Home,
  FileText,
  Settings,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import documentService
  from "../services/documentService";

import DocumentCard
  from "../components/documents/DocumentCard";

import FolderCard
  from "../components/documents/FolderCard";

import FilePreviewModal
  from "../components/documents/FilePreviewModal";

import SearchBar
  from "../components/documents/SearchBar";

import BottomNavigation
  from "../components/documents/BottomNavigation";

import ThemeToggle
  from "../components/ThemeToggle";

import {
  showSuccess,
  showError,
} from "../utils/toast";

export default function Documents() {

  const navigate =
    useNavigate();

  // =====================================
  // STATES
  // =====================================

  const [documents, setDocuments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedFolder, setSelectedFolder] =
    useState(null);

  const [previewFile, setPreviewFile] =
    useState(null);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [filterType, setFilterType] =
    useState("all");

  // =====================================
  // FETCH DOCUMENTS
  // =====================================

  useEffect(() => {

    let mounted = true;

    const fetchDocuments =
      async () => {

        try {

          setLoading(true);

          const docs =
            await documentService.getDocuments();

          if (mounted) {

            setDocuments(
              docs || []
            );

          }

        } catch (error) {

          console.log(error);

          showError(
            "Failed to load documents"
          );

        } finally {

          if (mounted) {

            setLoading(false);

          }

        }

      };

    fetchDocuments();

    return () => {

      mounted = false;

    };

  }, []);

  // =====================================
  // FILTER DOCUMENTS
  // =====================================

  const filteredDocuments =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();

      let docs =
        [...documents];

      // =====================================
      // SEARCH
      // =====================================

      if (query) {

        docs =
          docs.filter(
            (doc) => {

              const documentName =
                (
                  doc?.document_name ||

                  ""
                ).toLowerCase();

              const caseNumber =
                (
                  doc?.case_number ||

                  ""
                ).toLowerCase();

              const folderName =
                (
                  doc?.folder_name ||

                  ""
                ).toLowerCase();

              return (

                documentName.includes(query) ||

                caseNumber.includes(query) ||

                folderName.includes(query)

              );

            }
          );

      }

      // =====================================
      // FILE TYPE FILTER
      // =====================================

      if (
        filterType !== "all"
      ) {

        docs =
          docs.filter(
            (doc) => {

              const fileName = (

                doc?.document_name ||

                ""

              ).toLowerCase();

              const mimeType = (

                doc?.mime_type ||

                doc?.file_type ||

                doc?.document_type ||

                ""

              ).toLowerCase();

              const url = (

                doc?.file_url ||

                ""

              ).toLowerCase();

              const combined = `

                ${fileName}

                ${mimeType}

                ${url}

              `;

              switch (
                filterType
              ) {

                case "pdf":

                  return (
                    combined.includes(".pdf") ||

                    combined.includes("pdf")
                  );

                case "image":

                  return (

                    combined.includes(".jpg") ||

                    combined.includes(".jpeg") ||

                    combined.includes(".png") ||

                    combined.includes(".webp") ||

                    combined.includes(".gif") ||

                    combined.includes("image")

                  );

                case "doc":

                  return (

                    combined.includes(".doc") ||

                    combined.includes(".docx") ||

                    combined.includes("word")

                  );

                case "excel":

                  return (

                    combined.includes(".xls") ||

                    combined.includes(".xlsx") ||

                    combined.includes("sheet")

                  );

                case "video":

                  return (

                    combined.includes(".mp4") ||

                    combined.includes(".mov") ||

                    combined.includes(".avi") ||

                    combined.includes("video")

                  );

                case "audio":

                  return (

                    combined.includes(".mp3") ||

                    combined.includes(".wav") ||

                    combined.includes("audio")

                  );

                default:

                  return true;

              }

            }
          );

      }

      // =====================================
      // FOLDER FILTER
      // =====================================

      if (selectedFolder) {

        docs =
          docs.filter(
            (doc) => {

              const folderName =

                doc?.folder_name ||

                doc?.document_type ||

                "General";

              return (
                folderName ===
                selectedFolder.name
              );

            }
          );

      }

      return docs;

    }, [

      documents,

      search,

      filterType,

      selectedFolder,

    ]);

  // =====================================
  // GROUP FOLDERS
  // =====================================

  const folders =
    useMemo(() => {

      const grouped = {};

      documents.forEach(
        (doc) => {

          const folderName =

            doc?.folder_name ||

            doc?.document_type ||

            "General";

          if (
            !grouped[folderName]
          ) {

            grouped[
              folderName
            ] = [];

          }

          grouped[
            folderName
          ].push(doc);

        }
      );

      return Object.entries(
        grouped
      )
        .map(
          ([name, files]) => ({
            name,
            files,
          })
        )
        .filter(
          (folder) =>
            folder.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );

    }, [documents, search]);

  // =====================================
  // PREVIEW
  // =====================================

  const openPreview =
    (doc) => {

      setPreviewFile(doc);

    };

  const closePreview =
    () => {

      setPreviewFile(null);

    };

  // =====================================
  // DELETE FILE
  // =====================================

  const deleteFile =
    async (id) => {

      try {

        await documentService.deleteDocument(
          id
        );

        setDocuments(
          (prev) =>
            prev.filter(
              (doc) =>

                (
                  doc?._id ||

                  doc?.id
                ) !== id
            )
        );

        showSuccess(
          "Document deleted successfully"
        );

      } catch (error) {

        console.log(error);

        showError(
          "Delete failed"
        );

      }

    };

  // =====================================
  // FILTER BUTTON
  // =====================================

  const filterSequence = [

    "all",

    "pdf",

    "image",

    "doc",

    "excel",

    "video",

    "audio",

  ];

  const handleFilter =
    () => {

      const currentIndex =
        filterSequence.indexOf(
          filterType
        );

      const nextIndex =

        (
          currentIndex + 1
        ) %

        filterSequence.length;

      const nextFilter =
        filterSequence[
          nextIndex
        ];

      setFilterType(
        nextFilter
      );

      showSuccess(

        `Showing ${nextFilter.toUpperCase()} Files`

      );

    };

  return (

    <div
      className="
        min-h-screen
        bg-[#f3f4f8]
        dark:bg-[#050816]
        pb-28
      "
    >

      {/* PREVIEW */}

      <FilePreviewModal
        file={previewFile}
        onClose={closePreview}
      />

      {/* SIDEBAR OVERLAY */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed inset-0
            bg-black/50
            z-40
          "
        />

      )}

      {/* SIDEBAR */}

      <div
        className={`
          fixed
          top-0
          left-0

          h-screen
          w-[260px]

          bg-[#08142E]

          z-50

          transition-all
          duration-300

          overflow-y-auto

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <div className="p-5">

          <div className="flex items-center justify-between mb-8">

            <h2
              className="
                text-white
                text-[20px]
                font-bold
              "
            >
              Navigation
            </h2>

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
            >

              <X
                size={20}
                className="text-white"
              />

            </button>

          </div>

          <div className="space-y-3">

            {[
              {
                icon: Home,
                label: "Dashboard",
                path: "/dashboard",
              },

              {
                icon: FileText,
                label: "Documents",
                path: "/documents",
              },

              {
                icon: Settings,
                label: "Settings",
                path: "/profile",
              },

            ].map(
              (item, index) => (

                <button
                  key={index}

                  onClick={() => {

                    navigate(
                      item.path
                    );

                    setSidebarOpen(
                      false
                    );

                  }}

                  className="
                    w-full
                    flex items-center
                    gap-3

                    px-4 py-3

                    rounded-2xl

                    text-white

                    hover:bg-white/10

                    transition-all
                  "
                >

                  <item.icon
                    size={18}
                  />

                  <span
                    className="
                      text-[14px]
                    "
                  >
                    {item.label}
                  </span>

                </button>

              )
            )}

          </div>

          <div className="mt-8">

            <ThemeToggle />

          </div>

        </div>

      </div>

      {/* MAIN */}

      <div
        className="
          max-w-sm
          mx-auto
          min-h-screen

          bg-[#eef2f7]
          dark:bg-[#050816]

          relative
          overflow-hidden
        "
      >

        {/* HEADER */}

        <div className="px-5 pt-5">

          <div
            className="
              flex items-center
              justify-between
            "
          >

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
            >

              <Menu
                size={22}
                className="
                  text-black
                  dark:text-white
                "
              />

            </button>

            <div className="text-center">

              <h1
                className="
                  text-[22px]
                  font-bold
                  text-black
                  dark:text-white
                "
              >
                Documents
              </h1>

              <p
                className="
                  text-[11px]
                  text-gray-700
                  dark:text-gray-400
                  mt-1
                "
              >
                Showing:
                {" "}
                {filterType.toUpperCase()}
              </p>

            </div>

            <button
              onClick={
                handleFilter
              }
            >

              <Bell
                size={22}
                className="
                  text-black
                  dark:text-white
                "
              />

            </button>

          </div>

        </div>

        {/* SEARCH */}

        <div className="px-5 mt-6">

          <SearchBar
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            onFilter={
              handleFilter
            }
          />

        </div>

        {/* FOLDERS */}

        <div className="px-5 mt-8">

          <div
            className="
              flex items-center
              justify-between
              mb-4
            "
          >

            <h2
              className="
                text-[14px]
                font-bold
                text-black
                dark:text-white
              "
            >
              Folders
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-3">

            {folders.map(
              (
                folder,
                index
              ) => (

                <FolderCard
                  key={index}

                  folder={folder}

                  active={
                    selectedFolder?.name ===
                    folder.name
                  }

                  onClick={() => {

                    if (
                      selectedFolder?.name ===
                      folder.name
                    ) {

                      setSelectedFolder(
                        null
                      );

                    } else {

                      setSelectedFolder(
                        folder
                      );

                    }

                  }}
                />

              )
            )}

          </div>

        </div>

        {/* DOCUMENTS */}

        <div className="px-5 mt-8 pb-36">

          <h2
            className="
              text-[14px]
              font-bold
              mb-4
              text-black
              dark:text-white
            "
          >

            {selectedFolder
              ? selectedFolder.name
              : "Recent Documents"}

          </h2>

          {loading ? (

            <div className="space-y-3">

              {[1, 2, 3].map(
                (item) => (

                  <div
                    key={item}
                    className="
                      h-20
                      rounded-3xl
                      bg-white
                      dark:bg-[#0B1120]
                      animate-pulse
                    "
                  />

                )
              )}

            </div>

          ) : (

            <div className="space-y-3">

              {filteredDocuments.length > 0 ? (

                filteredDocuments.map(
                  (
                    doc,
                    index
                  ) => (

                    <DocumentCard
                      key={
                        doc?._id ||
                        doc?.id ||
                        index
                      }

                      doc={doc}

                      onPreview={
                        openPreview
                      }

                      onDelete={
                        deleteFile
                      }
                    />

                  )
                )

              ) : (

                <div
                  className="
                    rounded-3xl
                    p-6

                    bg-white
                    dark:bg-[#0B1120]

                    text-center
                  "
                >

                  <p
                    className="
                      text-[13px]
                      text-gray-500
                    "
                  >
                    No documents found
                  </p>

                </div>

              )}

            </div>

          )}

        </div>

        {/* UPLOAD */}

        <div
          className="
            fixed bottom-24
            left-1/2
            -translate-x-1/2

            w-full
            max-w-sm

            px-5
            z-40
          "
        >

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="
              w-full

              bg-gradient-to-r
              from-cyan-500
              to-blue-600

              text-white

              py-3
              rounded-2xl

              text-[13px]
              font-semibold

              flex items-center
              justify-center
              gap-2
            "
          >

            <Upload size={18} />

            Upload Document

          </button>

        </div>

        <BottomNavigation />

      </div>

    </div>

  );

}