import HttpClient, { IResponseModel } from "../HttpClient";

import IUser from "../models/IUser";

const UsersService = {
  getAll: async (): Promise<IResponseModel<IUser[]>> => {
    const client = new HttpClient();
    return await client.request<IUser[]>({
      method: "GET",
      url: "users",
    });
  },
};

export default UsersService;
