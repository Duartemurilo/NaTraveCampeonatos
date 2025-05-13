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
    createDraft: "/tournaments/tournament/draft/create",
    updateDraft: "/tournaments/tournament/draft/update",
    getDraft: "/tournaments/tournament/draft",

    setPeriodLocation: "/tournaments/tournament/period-location/set",
    getPeriodLocation: "/tournaments/tournament/period-location",

    createSetup: "/tournaments/tournament/setup",

    myTournaments: "/tournaments/my-tournaments",

    getConfigurationSteps: "/tournaments/tournament/configuration-steps",
  },

  auth: {
    checkPhone: "/auth/organization-user/check-phone",
    organizationRegister: "/auth/organization-registration/register",
  },
};
