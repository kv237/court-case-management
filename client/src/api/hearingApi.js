import API from "./axios";

export const getHearings =
  async () => {
    const response =
      await API.get("/hearings");

    return response.data;
  };