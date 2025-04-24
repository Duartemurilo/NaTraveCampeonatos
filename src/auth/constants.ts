export const endpoints = {
  tournament: {
    get: "/api/tournament/get",
    getById: "/api/tournament/details",

    createDraft: "/tournament-creation/draft/create",
    updateDraft: "/tournament-creation/draft/update",

    createFormat: "/api/tournament/format/create",
    updateFormat: "/api/tournament/format/update",

    createFinalize: "/api/tournament/finalize/create",
    finalize: "/api/tournament/finalize",
  },
};
