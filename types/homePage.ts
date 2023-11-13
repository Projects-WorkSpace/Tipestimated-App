export interface IHomePageDetails {
  tipsterFollowers: TipsterFollowers;
  predictionPosts: PredictionPosts;
}

export interface ISuggestedData {
  suggestedTipsters: ISuggestedTipsters;
  suggestedPosts: PredictionPosts;
}
export interface IHomePageAnonymousDetails {
  predictionPosts: PredictionPosts;
}
export interface TipsterFollowers {
  edges?: FollowingEdgesEntity[] | null;
}
export interface FollowingEdgesEntity {
  node: FollowingNode;
}
export interface FollowingNode {
  id: string;
  tipsterId: FollowingTipster;
}
export interface FollowingTipster {
  id: string;
  penName: string;
}
export interface PredictionPosts {
  edges?: EdgesEntity1[] | null;
}
export interface EdgesEntity1 {
  node: PostsNode;
}
export interface PostsNode {
  id: string;
  createdAt: string;
  likes: number;
  isLikedByMe: boolean;
  tipsterId: ITipsterDetails;
  predictionpostitemSet: PredictionpostitemSet;
}
export interface ITipsterDetails {
  penName: string;
  id: string;
  telegramLink: string;
  socialLink: string;
  imageUrl: string;
  isFollowedByUser: boolean;
  followerCount: number;
  user: TipsterUserDetails;
}

export interface TipsterUserDetails {
  userName: string;
}
export interface PredictionpostitemSet {
  edges?: PostEdgesEntity[] | null;
}
export interface PostEdgesEntity {
  node: ItemNode;
}
export interface ItemNode {
  id: string;
  eventId: string;
  sport: string;
  country: string;
  leagueName: string;
  startTime: number;
  homeName: string;
  homeImage: string;
  awayName: string;
  awayImage: string;
  predictionName: string;
  predictionValue: string;
  bookmaker: string;
  bookmakerImg: string;
  odds: number;
  win?: null;
  resultValue?: null;
}

//

export interface ISuggestedTipsters {
  edges?: TipsterEdgesEntity[] | null;
}

export interface TipsterEdgesEntity {
  node: TipsterNode;
}

export interface TipsterNode {
  id: string;
  penName: string;
  imageUrl: string;
  followerCount: number;
  isFollowedByUser: boolean;
  country: string;
  favoriteSport: string;
  createdAt: string;
}
