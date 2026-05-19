import { useEffect, useState } from "react";

import documentService from "../services/documentService";

const useDocuments = () => {
  const [folders, setFolders] = useState([]);

  const [documents, setDocuments] = useState([]);

  const [selectedFolder, setSelectedFolder] =
    useState(null);

  const [loadingFolders, setLoadingFolders] =
    useState(false);

  const [loadingDocuments, setLoadingDocuments] =
    useState(false);

  const [error, setError] = useState("");

  // LOAD FOLDERS
  const loadFolders = async () => {
    try {
      setLoadingFolders(true);

      setError("");

      const response =
        await documentService.getFolders();

      const foldersData = Array.isArray(response)
        ? response
        : response?.folders || [];

      setFolders(foldersData);

      // AUTO SELECT FIRST FOLDER
      if (
        foldersData.length > 0 &&
        !selectedFolder
      ) {
        setSelectedFolder(foldersData[0]);
      }
    } catch (error) {
      console.error(error);

      setError("Failed to load folders");
    } finally {
      setLoadingFolders(false);
    }
  };

  // LOAD DOCUMENTS
  const loadDocuments = async (folderId) => {
    if (!folderId) return;

    try {
      setLoadingDocuments(true);

      setError("");

      const response =
        await documentService.getDocuments(
          folderId
        );

      const documentsData =
        Array.isArray(response)
          ? response
          : response?.documents || [];

      setDocuments(documentsData);
    } catch (error) {
      console.error(error);

      setError("Failed to load documents");
    } finally {
      setLoadingDocuments(false);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!mounted) return;

      await loadFolders();
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // FOLDER CHANGE
  useEffect(() => {
    let mounted = true;

    const fetchDocs = async () => {
      if (
        mounted &&
        selectedFolder?._id
      ) {
        await loadDocuments(
          selectedFolder._id
        );
      }
    };

    fetchDocs();

    return () => {
      mounted = false;
    };
  }, [selectedFolder]);

  return {
    folders,
    documents,

    selectedFolder,
    setSelectedFolder,

    loadingFolders,
    loadingDocuments,

    error,

    refreshFolders: loadFolders,

    refreshDocuments: loadDocuments,
  };
};

export default useDocuments;