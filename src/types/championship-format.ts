export type RoundRobinFormatConfig = {
  numberOfTeams: number;
  hasHomeAndAway: boolean;
};

export type KnockoutFormatConfig = {
  numberOfTeams: number;
  hasHomeAndAway: boolean;
};

export type GroupAndKnockoutFormatConfig = {
  numberOfTeams: number;
  numberOfGroups: number;
  qualifiedPerGroup: number;
  hasHomeAndAwayGroup: boolean;
  hasHomeAndAwayKnockout: boolean;
};

export type RoundRobinAndKnockoutFormatConfig = {
  numberOfTeams: number;
  qualifiedToKnockout: number;
  hasHomeAndAwayRoundRobin: boolean;
  hasHomeAndAwayKnockout: boolean;
};

export type ChampionshipFormatConfig =
  | RoundRobinFormatConfig
  | KnockoutFormatConfig
  | GroupAndKnockoutFormatConfig
  | RoundRobinAndKnockoutFormatConfig;

export enum ChampionshipFormat {
  ROUND_ROBIN = "round_robin",
  KNOCKOUT = "knockout",
  GROUP_AND_KNOCKOUT = "group_and_knockout",
  ROUND_ROBIN_AND_KNOCKOUT = "round_robin_and_knockout",
}
