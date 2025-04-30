import type { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from "axios";

import axios from "axios";

import { CONFIG } from "src/global-config";

export type TRequestData = Record<never, unknown>;

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(private baseUrl: string) {
    this.axiosInstance = axios.create({ baseURL: baseUrl });
  }

  public buildHeaders(): AxiosRequestHeaders {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    } as AxiosRequestHeaders;
  }

  async request<T = never, R = TRequestData>(
    method: string,
    path: string,
    body?: R,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const headers = this.buildHeaders();

    const response = await this.axiosInstance.request<T>({
      method,
      url: path,
      data: body,
      headers: {
        ...headers,
        ...(config?.headers || {}),
      },
      ...config,
    });

    return response.data;
  }

  async post<T = never>(
    path: string,
    body?: TRequestData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("post", path, body, config);
  }

  async put<T = never>(path: string, body?: TRequestData, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("put", path, body, config);
  }

  async patch<T = never>(
    path: string,
    body?: TRequestData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("patch", path, body, config);
  }

  async get<T = never>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("get", path, undefined, config);
  }

  async delete<T = never>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("delete", path, undefined, config);
  }
}

const httpRequest = new HttpClient(CONFIG.serverUrl);
export default httpRequest;
