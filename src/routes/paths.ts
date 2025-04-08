// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

// ----------------------------------------------------------------------

export const paths = {
  about: "/about-us",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  contact: "/contact-us",
  faqs: "/faqs",
  minimalStore: "/minimal-store",
  auth: {
    clerk: {
      signIn: `${ROOTS.AUTH}/clerk/sign-in`,
      signUp: `${ROOTS.AUTH}/clerk/sign-up`,
      verifyEmail: `${ROOTS.AUTH}/clerk/verify-email`,
      resetPassword: `${ROOTS.AUTH}/clerk/reset-password`,
    },
  },

  dashboard: {
    home: {
      root: `${ROOTS.DASHBOARD}/home`,
    },

    championships: {
      root: `${ROOTS.DASHBOARD}/championships/cards`,
      cards: `${ROOTS.DASHBOARD}/championships/cards`,
      list: `${ROOTS.DASHBOARD}/championships/list`,
      new: `${ROOTS.DASHBOARD}/championships/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/championships/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/championships/${id}/edit`,
    },

    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    },
  },
};
