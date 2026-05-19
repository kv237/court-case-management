import API from "./axios";

export const getAdvocates =
  async () => {
    const response =
      await API.get(
        "/advocates"
      );

    return response.data;
  };