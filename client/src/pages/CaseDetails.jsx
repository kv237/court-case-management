import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  ArrowLeft,
  FileText,
  Image,
  Download,
  ExternalLink,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {

  showSuccess,

  showError,

} from "../utils/toast";

import {
  getCaseDocuments,
} from "../api/documentApi";

function CaseDetails() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  // =====================================
  // CASE NUMBER
  // =====================================

  const caseNumber =

    location.state
      ?.case_number ||

    "Cr.P.No.1245/2024";

  // =====================================
  // STATES
  // =====================================

  const [documents, setDocuments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // FETCH DOCUMENTS
  // =====================================

  const fetchDocuments =
    useCallback(

      async () => {

        try {

          const data =
            await getCaseDocuments(
              caseNumber
            );

          setDocuments(
            data.documents || []
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load documents"
          );

        } finally {

          setLoading(false);

        }

      },

      [caseNumber]

    );

  // =====================================
  // LOAD DOCUMENTS
  // =====================================

 useEffect(() => {

  const timer =
    setTimeout(() => {

      fetchDocuments();

    }, 0);

  return () =>
    clearTimeout(timer);

}, [fetchDocuments]);

  // =====================================
  // GROUP DOCUMENTS
  // =====================================

  const groupedDocuments =

    documents.reduce(
      (acc, doc) => {

        const type =
          doc.document_type ||
          "Others";

        if (!acc[type]) {

          acc[type] = [];

        }

        acc[type].push(doc);

        return acc;

      },

      {}
    );

  return (

    <div className="min-h-screen bg-[#f7f8fc] pb-20">

      {/* HEADER */}

      <div className="bg-white px-5 pt-6 pb-5 shadow-sm">

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              navigate(-1)
            }
          >

            <ArrowLeft
              size={24}
            />

          </button>

          <div>

            <h1 className="text-[22px] font-bold text-[#111827]">

              {caseNumber}

            </h1>

            <p className="text-gray-500 mt-1">

              Case Documents

            </p>

          </div>

        </div>

      </div>

      {/* BODY */}

      <div className="px-5 mt-6">

        {loading ? (

          <div className="text-center mt-20 text-gray-500">

            Loading Documents...

          </div>

        ) : documents.length === 0 ? (

          <div className="text-center mt-20 text-gray-500">

            No Documents Uploaded

          </div>

        ) : (

          Object.keys(
            groupedDocuments
          ).map((type, index) => (

            <div
              key={index}
              className="mb-8"
            >

              {/* CATEGORY */}

              <h2 className="text-[20px] font-bold text-[#111827] mb-4">

                {type}

              </h2>

              {/* FILES */}

              <div className="space-y-4">

                {groupedDocuments[
                  type
                ].map(
                  (doc, i) => (

                    <div
                      key={i}
                      className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
                    >

                      <div className="flex justify-between items-start">

                        {/* LEFT */}

                        <div className="flex gap-4">

                          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                            {doc.document_name
                              ?.includes(
                                ".jpg"
                              ) ||

                            doc.document_name
                              ?.includes(
                                ".png"
                              ) ? (

                              <Image
                                className="text-blue-700"
                              />

                            ) : (

                              <FileText
                                className="text-blue-700"
                              />

                            )}

                          </div>

                          <div>

                            <h3 className="font-semibold text-[16px] text-[#111827]">

                              {doc.document_name}

                            </h3>

                            <p className="text-gray-500 text-sm mt-1">

                              {doc.description ||
                                "No Description"}

                            </p>

                            <p className="text-gray-400 text-xs mt-2">

                              {doc.document_type}

                            </p>

                          </div>

                        </div>

                        {/* RIGHT */}

                        <div className="flex gap-3">

                          {/* OPEN */}

                          <a
                            href={
                              doc.file_url
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center"
                          >

                            <ExternalLink
                              size={18}
                            />

                          </a>

                          {/* DOWNLOAD */}

                          <a
                            href={
                              doc.file_url
                            }
                            download
                            className="w-11 h-11 rounded-xl bg-blue-700 text-white flex items-center justify-center"
                          >

                            <Download
                              size={18}
                            />

                          </a>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          ))
        )}

      </div>

    </div>

  );

}

export default CaseDetails;