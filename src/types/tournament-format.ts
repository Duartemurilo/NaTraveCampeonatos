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

export type TournamentFormatConfig =
  | RoundRobinFormatConfig
  | KnockoutFormatConfig
  | GroupAndKnockoutFormatConfig
  | RoundRobinAndKnockoutFormatConfig;
