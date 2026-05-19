import API from "./axios";

export const uploadFile =
  async (formData) => {
    const response =
      await API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };