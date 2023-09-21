export interface IFixturesData {
  DATA: (IFixturesDataEntity)[];
}
export interface IFixturesDataEntity {
  NAME: string;
  HEADER: string;
  NAME_PART_1: string;
  NAME_PART_2: string;
  TOURNAMENT_TEMPLATE_ID: string;
  COUNTRY_ID: number;
  COUNTRY_NAME: string;
  TOURNAMENT_STAGE_ID: string;
  TOURNAMENT_TYPE: string;
  TOURNAMENT_ID: string;
  SOURCE_TYPE: number;
  HAS_LIVE_TABLE: number;
  STANDING_INFO: number;
  TEMPLATE_ID: string;
  TOURNAMENT_STAGE_TYPE: number;
  SHORT_NAME: string;
  URL: string;
  TOURNAMENT_IMAGE: string;
  SORT: string;
  STAGES_COUNT: number;
  ZKL?: null;
  ZKU?: null;
  TOURNAMENT_SEASON_ID: string;
  CATEGORY_NAME: string;
  EVENTS: (IFixturesEventsEntity)[];
}
export interface IFixturesEventsEntity {
  EVENT_ID: string;
  START_TIME: number;
  START_UTIME: number;
  STAGE_TYPE: string;
  MERGE_STAGE_TYPE: string;
  STAGE: string;
  SORT: string;
  ROUND: string;
  VISIBLE_RUN_RATE: number;
  HAS_LINEPS: number;
  GAME_TIME: string;
  PLAYING_ON_SETS?: null;
  RECENT_OVERS?: null;
  SHORTNAME_HOME: string;
  HOME_PARTICIPANT_IDS?: (string)[] | null;
  HOME_PARTICIPANT_TYPES?: (number)[] | null;
  HOME_NAME: string;
  HOME_PARTICIPANT_NAME_ONE: string;
  HOME_EVENT_PARTICIPANT_ID: string;
  HOME_GOAL_VAR: number;
  HOME_IMAGES: string[];
  IMM: string;
  IMW: string;
  IMP: string;
  IME?: null;
  SHORTNAME_AWAY: string;
  AWAY_PARTICIPANT_IDS?: (string)[] | null;
  AWAY_PARTICIPANT_TYPES?: (number)[] | null;
  AWAY_NAME: string;
  AWAY_PARTICIPANT_NAME_ONE: string;
  AWAY_EVENT_PARTICIPANT_ID: string;
  AWAY_GOAL_VAR: number;
  AWAY_IMAGES: string[];
  HAS_LIVE_CENTRE: number;
  AN: string;
  LIVE_IN_OFFER_BOOKMAKER_ID: number;
  LIVE_IN_OFFER_STATUS: number;
}

//

export interface ILeagueEntity {
  LEAGUE_NAME: string;
  COUNTRY_NAME: string;
  COUNTRY_ID: number;
  ACTUAL_TOURNAMENT_SEASON_ID: string;
  GROUP_ID: string;
  SEASON_ID: number;
  TEMPLATE_ID: string;
  STAGES?: (STAGESEntity)[] | null;
}

export interface STAGESEntity {
  STAGE_ID: string;
  STAGE_NAME: string;
  OUT: string;
}

export interface IFixtureData {
  NAME: string;
  HEADER: string;
  NAME_PART_1: string;
  NAME_PART_2: string;
  TOURNAMENT_TEMPLATE_ID: string;
  COUNTRY_ID: number;
  COUNTRY_NAME: string;
  TOURNAMENT_STAGE_ID: string;
  TOURNAMENT_TYPE: string;
  TOURNAMENT_ID: string;
  SOURCE_TYPE: number;
  HAS_LIVE_TABLE: number;
  STANDING_INFO: number;
  TEMPLATE_ID: string;
  TOURNAMENT_STAGE_TYPE: number;
  SHORT_NAME: string;
  URL: string;
  TOURNAMENT_IMAGE: string;
  SORT: string;
  STAGES_COUNT: number;
  ZKL?: null;
  ZKU?: null;
  TOURNAMENT_SEASON_ID: string;
  CATEGORY_NAME: string;
}
