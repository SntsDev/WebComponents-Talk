import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpClient {
  private baseUrl: string;
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.baseUrl = "https://jsonplaceholder.typicode.com";
    this.axiosInstance = axios.create();
  }

  public async request<TResponse>({
    method,
    url,
    data,
  }: IRequestProps): Promise<IResponseModel<TResponse>> {
    try {
      const config: AxiosRequestConfig = {};

      const callUrl = `${this.baseUrl}/${url}`;
      let response: AxiosResponse<TResponse> | undefined;

      switch (method) {
        case "GET": {
          response = await this.axiosInstance.get(callUrl, {
            ...config,
            params: data,
          });
          break;
        }
        case "POST": {
          response = await this.axiosInstance.post(callUrl, data, config);
          break;
        }
        case "PUT": {
          response = await this.axiosInstance.put(callUrl, data, config);
          break;
        }
        case "DELETE": {
          response = await this.axiosInstance.delete(callUrl, {
            ...config,
            params: data,
          });
          break;
        }
        default:
          break;
      }

      const responseModel: IResponseModel<TResponse> = {
        data: response?.data,
        statusCode: response?.status || 400,
      };

      return responseModel;
    } catch (error) {
      console.error(error);
      return {
        statusCode: 400,
      };
    }
  }
}

export default HttpClient;

interface IRequestProps<T = unknown> {
  method: "GET" | "POST" | "DELETE" | "PUT";
  url: string;
  data?: TextDecodeOptions | FormData | T;
}

export interface IResponseModel<T> {
  statusCode: number;
  data?: T;
}
