import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,
});

// =====================================
// TOKEN
// =====================================

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

// =====================================
// SERVICE
// =====================================

const documentService = {
  // =====================================
  // GET DOCUMENTS
  // =====================================

  async getDocuments() {
    const response =
      await API.get(
        "/documents/all"
      );

    return (
      response.data
        ?.documents || []
    );
  },

  // =====================================
  // RENAME DOCUMENT
  // =====================================

  async renameDocument(
    id,
    document_name
  ) {
    const response =
      await API.put(
        `/documents/rename/${id}`,
        {
          document_name,
        }
      );

    return response.data;
  },

  // =====================================
  // DELETE DOCUMENT
  // =====================================

  async deleteDocument(id) {
    const response =
      await API.delete(
        `/documents/delete/${id}`
      );

    return response.data;
  },

  // =====================================
  // RENAME FOLDER
  // =====================================

  async renameFolder(
    folder_name,
    new_name
  ) {
    const response =
      await API.put(
        "/folders/rename",
        {
          folder_name,
          new_name,
        }
      );

    return response.data;
  },

  // =====================================
  // DELETE FOLDER
  // =====================================

  async deleteFolder(
    folder_name
  ) {
    const response =
      await API.delete(
        "/folders/delete",
        {
          data: {
            folder_name,
          },
        }
      );

    return response.data;
  },
};

export default documentService;