import API from "./axios";

// =====================================
// GET ALL CASES
// =====================================

export const getCases =
  async () => {

    try {

      const response =
        await API.get(
          "/cases/all"
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

// =====================================
// CREATE CASE
// =====================================

export const createCase =
  async (data) => {

    try {

      const response =
        await API.post(
          "/cases/create",
          data
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

// =====================================
// GET SINGLE CASE
// =====================================

export const getSingleCase =
  async (id) => {

    try {

      const response =
        await API.get(
          `/cases/${id}`
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

// =====================================
// UPDATE CASE
// =====================================

export const updateCase =
  async (
    id,
    data
  ) => {

    try {

      const response =
        await API.put(
          `/cases/update/${id}`,
          data
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

// =====================================
// DELETE CASE
// =====================================

export const deleteCase =
  async (id) => {

    try {

      const response =
        await API.delete(
          `/cases/delete/${id}`
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

// =====================================
// UPLOAD CASE FILE
// =====================================

export const uploadCaseFile =
  async (formData) => {

    try {

      const response =
        await API.post(

          "/cases/upload",

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
// SEARCH CASES
// =====================================

export const searchCases =
  async (query) => {

    try {

      const response =
        await API.get(

          `/search/cases?query=${query}`

        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };