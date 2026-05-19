import API from "./axios";

export const getTracking =
  async (id) => {
    const response =
      await API.get(
        `/tracking/${id}`
      );

    return response.data;
  };