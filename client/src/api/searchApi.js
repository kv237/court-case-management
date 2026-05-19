import API from "./axios";

export const globalSearch =
  async (query) => {
    const response =
      await API.get(
        `/search?q=${query}`
      );

    return response.data;
  };