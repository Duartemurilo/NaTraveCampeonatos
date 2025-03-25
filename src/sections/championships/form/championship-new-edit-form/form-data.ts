import dayjs from "dayjs";
import { z as zod } from "zod";

import { Category } from "src/types/category";
import { MatchType } from "src/types/match-type";
import { MatchDays } from "src/types/match-days";
import { TournamentFormat } from "src/types/tournament-format";

export const championshipNewEditFormDefaultValues: ChampionshipSchemaType = {
  // Ficha do Campeonato
  championshipName: "",
  championshipDescription: "",
  championshipBanner: null,

  startDate: dayjs().format("YYYY-MM-DD"),
  endDate: dayjs().format("YYYY-MM-DD"),
  matchDays: [],
  startTime: "",
  endTime: "",
  state: "SP",
  city: "",

  // Modelo do Campeonato
  category: Category.MALE,
  numberOfTeams: 0,
  minAge: 18,
  maxAge: 100,
  minPlayersPerTeam: 10,
  maxPlayersPerTeam: 100,
  matchType: MatchType.SEVEN_VS_SEVEN,
  tournamentFormat: TournamentFormat.POINTS,
};

export const ChampionshipSchema = zod
  .object({
    // Ficha do Campeonato
    championshipName: zod.string().min(1, { message: "Nome do campeonato é obrigatório" }),
    championshipDescription: zod
      .string()
      .max(1000, { message: "A descrição pode ter no máximo 1000 caracteres" })
      .optional()
      .or(zod.literal("")),

    championshipBanner: zod.union([zod.string(), zod.instanceof(File), zod.null()]),

    // Datas e Localização
    startDate: zod.string().min(1, { message: "Data de início é obrigatória" }),
    endDate: zod.string().min(1, { message: "Data de término é obrigatória" }),
    matchDays: zod.array(zod.nativeEnum(MatchDays), {
      required_error: "Dias de jogo são obrigatórios",
    }),
    startTime: zod.string().min(1, { message: "Hora de início é obrigatória" }),
    endTime: zod.string().min(1, { message: "Hora de término é obrigatória" }),
    state: zod.string().min(1, { message: "Estado é obrigatório" }),
    city: zod.string().min(1, { message: "Cidade é obrigatória" }),

    category: zod.nativeEnum(Category, {
      errorMap: () => ({ message: "Categoria é obrigatória" }),
    }),

    tournamentFormat: zod.nativeEnum(TournamentFormat, {
      errorMap: () => ({ message: "Formato do campeonato é obrigatório" }),
    }),

    numberOfTeams: zod.number().min(1, { message: "Número de times deve ser pelo menos 1" }),
    minAge: zod.number().min(1, { message: "Idade mínima deve ser pelo menos 1" }),
    maxAge: zod.number().min(1, { message: "Idade máxima é obrigatória" }),
    minPlayersPerTeam: zod
      .number()
      .min(1, { message: "Mínimo de jogadores por time deve ser pelo menos 1" }),
    maxPlayersPerTeam: zod
      .number()
      .min(1, { message: "Máximo de jogadores por time deve ser pelo menos 1" }),
    matchType: zod.nativeEnum(MatchType, {
      errorMap: () => ({ message: "Tipo de jogo é obrigatório" }),
    }),
  })
  .refine((data) => data.maxAge >= data.minAge, {
    message: "Idade máxima deve ser maior ou igual à idade mínima",
    path: ["maxAge"],
  })
  .refine((data) => data.maxPlayersPerTeam >= data.minPlayersPerTeam, {
    message: "Máximo de jogadores por time deve ser maior ou igual ao mínimo",
    path: ["maxPlayersPerTeam"],
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    {
      message: "A data de término não pode ser anterior à data de início",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      const start = new Date(`1970-01-01T${data.startTime}`);
      const end = new Date(`1970-01-01T${data.endTime}`);
      return end >= start;
    },
    {
      message: "O horário de término não pode ser anterior ao horário de início",
      path: ["endTime"],
    }
  );

export type ChampionshipSchemaType = zod.infer<typeof ChampionshipSchema>;
