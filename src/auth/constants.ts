export const endpoints = {
  championship: {
    get: "/api/championship/get",
    getById: "/api/championship/details",
    create: "/api/championship/create",
    update: "/api/championship/update",
    delete: "/api/championship/delete",

    createDraft: "/api/championship/draft/create",
    updateDraft: "/api/championship/draft/update",
    createFormat: "/api/championship/format/create",
    updateFormat: "/api/championship/format/update",

    createFinalize: "/api/championship/finalize/create",
    finalize: "/api/championship/finalize",
  },
};
