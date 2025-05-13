// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/autenticacao",
  DASHBOARD: "/dashboard",
  TOURNAMENT: "/campeonato",
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
      signIn: `${ROOTS.AUTH}/entrar`,
      signUp: `${ROOTS.AUTH}/cadastro`,
      verifyEmail: `${ROOTS.AUTH}/verificar-e-mail`,
      resetPassword: `${ROOTS.AUTH}/esqueci-minha-senha`,
    },
  },

  dashboard: {
    home: {
      root: `${ROOTS.DASHBOARD}/home`,
    },

    tournaments: {
      details: (id: string | number) => `${ROOTS.DASHBOARD}${ROOTS.TOURNAMENT}/${id}/detalhes`,
      criar: (step: number, id?: string) => {
        let url = `${ROOTS.DASHBOARD}${ROOTS.TOURNAMENT}/criar/?step=${step}`;
        if (id) {
          url += `&id=${id}`;
        }
        return url;
      },
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
