import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search as SearchIcon,
  FileText,
  Folder,
} from "lucide-react";

import documentService
  from "../services/documentService";

import BottomNavigation
  from "../components/documents/BottomNavigation";

function Search() {
  const [search, setSearch] =
    useState("");

  const [documents, setDocuments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // FETCH DOCUMENTS
  // =====================================

  useEffect(() => {
    let mounted = true;

    const fetchDocuments =
      async () => {
        try {
          const docs =
            await documentService.getDocuments();

          if (mounted) {
            setDocuments(docs);
          }
        } catch (error) {
          console.log(error);
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
  // FILTER RESULTS
  // =====================================

  const filtered =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query)
        return [];

      return documents.filter(
        (doc) => {
          const documentName =
            doc.document_name?.toLowerCase() ||
            "";

          const caseNumber =
            doc.case_number?.toLowerCase() ||
            "";

          const folderName =
            (
              doc.folder_name ||
              doc.document_type ||
              ""
            ).toLowerCase();

          return (
            documentName.includes(
              query
            ) ||
            caseNumber.includes(
              query
            ) ||
            folderName.includes(
              query
            )
          );
        }
      );
    }, [documents, search]);

  return (
    <div
      className="
        min-h-screen

        bg-[#f5f7fb]
        dark:bg-[#050816]

        pb-28
        p-5

        transition-all
        duration-300
      "
    >
      {/* HEADER */}

      <h1
        className="
          text-[28px]
          font-bold

          text-black
          dark:text-white

          mb-5
        "
      >
        Search
      </h1>

      {/* SEARCH BAR */}

      <div
        className="
          bg-white
          dark:bg-[#0B1120]

          rounded-2xl

          h-[55px]

          border
          border-gray-200
          dark:border-slate-800

          px-4

          flex items-center
          gap-3

          transition-all
          duration-300
        "
      >
        <SearchIcon
          size={20}
          className="
            text-gray-400
          "
        />

        <input
          type="text"
          placeholder="
            Search files,
            folders,
            Cr.P.No...
          "
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            flex-1

            bg-transparent

            outline-none

            text-[14px]

            text-black
            dark:text-white

            placeholder:text-gray-400
          "
        />
      </div>

     {/* EMPTY SEARCH STATE */}

{!search && (
  <div
    className="
      mt-10

      bg-white
      dark:bg-[#0B1120]

      rounded-3xl

      p-8

      border
      border-gray-200
      dark:border-slate-800

      text-center
    "
  >
    <SearchIcon
      size={34}
      className="
        mx-auto

        text-gray-300
        dark:text-zinc-700
      "
    />

    <h2
      className="
        mt-4

        text-[15px]
        font-semibold

        text-black
        dark:text-white
      "
    >
      Search Documents
    </h2>

    <p
      className="
        mt-2

        text-[12px]

        text-gray-500
        dark:text-gray-400

        leading-6
      "
    >
      Search by document name,
      folder name,
      Cr.P.No,
      or case number.
    </p>
  </div>
)}
      {/* RESULTS */}

      {search && (
        <div className="mt-8">
          <h2
            className="
              text-[14px]
              font-bold

              text-black
              dark:text-white

              mb-4
            "
          >
            Search Results
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
          ) : filtered.length >
            0 ? (
            <div className="space-y-3">
              {filtered.map(
                (
                  doc,
                  index
                ) => (
                  <div
                    key={
                      doc.id ||
                      index
                    }
                    className="
                      bg-white
                      dark:bg-[#0B1120]

                      rounded-3xl

                      p-4

                      border
                      border-gray-200
                      dark:border-slate-800

                      flex items-center
                      gap-4

                      transition-all
                      duration-300
                    "
                  >
                    {/* ICON */}

                    <div
                      className="
                        w-12 h-12

                        rounded-2xl

                        bg-cyan-100
                        dark:bg-cyan-500/10

                        flex items-center
                        justify-center
                      "
                    >
                      <FileText
                        size={20}
                        className="
                          text-cyan-500
                        "
                      />
                    </div>

                    {/* INFO */}

                    <div className="flex-1">
                      <h3
                        className="
                          text-[13px]
                          font-semibold

                          text-black
                          dark:text-white
                        "
                      >
                        {
                          doc.document_name
                        }
                      </h3>

                      <div
                        className="
                          flex items-center
                          gap-2

                          mt-1
                        "
                      >
                        <Folder
                          size={12}
                          className="
                            text-gray-400
                          "
                        />

                        <p
                          className="
                            text-[11px]

                            text-gray-500
                            dark:text-gray-400
                          "
                        >
                          {doc.folder_name ||
                            doc.document_type}
                        </p>
                      </div>

                      <p
                        className="
                          text-[11px]

                          text-cyan-500

                          mt-1
                        "
                      >
                        {
                          doc.case_number
                        }
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div
              className="
                bg-white
                dark:bg-[#0B1120]

                rounded-3xl

                p-8

                text-center

                border
                border-gray-200
                dark:border-slate-800
              "
            >
              <p
                className="
                  text-[13px]

                  text-gray-500
                  dark:text-gray-400
                "
              >
                No results found
              </p>
            </div>
          )}
        </div>
      )}

      {/* BOTTOM NAV */}

      <BottomNavigation />
    </div>
  );
}

export default Search;