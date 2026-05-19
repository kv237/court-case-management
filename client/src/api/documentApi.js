import API from "./axios";

// =====================================
// UPLOAD DOCUMENT
// =====================================

export const uploadDocument =
  async (formData) => {

    try {

      const response =
        await API.post(

          "/documents/save",

          formData,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",

            },

          }

        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

// =====================================
// GET ALL DOCUMENTS
// =====================================

export const getAllDocuments =
  async () => {

    try {

      const response =
        await API.get(
          "/documents/all"
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

// =====================================
// GET CASE DOCUMENTS
// =====================================

export const getCaseDocuments =
  async (caseId) => {

    try {

      const response =
        await API.get(

          `/documents/case/${caseId}`

        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

// =====================================
// DELETE DOCUMENT
// =====================================

export const deleteDocument =
  async (id) => {

    try {

      const response =
        await API.delete(

          `/documents/delete/${id}`

        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };