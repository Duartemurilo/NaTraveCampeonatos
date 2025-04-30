import type { AxiosRequestConfig } from "axios";

import axios from "axios";

import { CONFIG } from "src/global-config";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong!")
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  tournament: {
    get: "/api/tournament/get",
    getById: "/api/tournament/details",

    createDraft: "/tournament-creation/draft/create",
    updateDraft: "/tournament-creation/draft/update",

    createFormat: "/api/tournament/format/create",
    updateFormat: "/api/tournament/format/update",

    createFinalize: "/tournament-creationfinalize/reate",
    updateFinalize: "/tournament-creationfinalize/update",
  },

  auth: {
    organizationRegister: "/auth/organization-registration/register",
    get: "/tournaments/get",
    getById: "/tournaments/details",

    createDraft: "/tournaments/tournament-creation/draft/create",
    updateDraft: "/tournaments/tournament-creation/draft/update",

    createFormat: "/tournaments/tournament-creation/format/create",
    updateFormat: "/tournaments/tournament-creation/format/update",

    createFinalize: "/tournaments/tournament-creation/finalize/create",
    updateFinalize: "/tournaments/tournament-creation/finalize/update",
  },
};

