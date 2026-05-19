import API from "./axios";

// =====================================
// GET FOLDERS
// =====================================

export const getFolders =
  async () => {

    const response =
      await API.get(
        "/folders/all"
      );

    return response.data;

  };

// =====================================
// CREATE FOLDER
// =====================================

export const createFolder =
  async (folder_name) => {

    const response =
      await API.post(
        "/folders/create",
        {
          folder_name,
        }
      );

    return response.data;

  };