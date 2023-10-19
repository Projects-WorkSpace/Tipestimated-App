export interface IActivePostData {
  activePredictedPosts: IPredictedPosts;
}
export interface IExpiredPostData {
  expiredPredictedPosts: IPredictedPosts;
}
export interface IPredictedPosts {
  edges?: (IPostEntity)[] | null;
}
export interface IPostEntity {
  node: IPostNode;
}
export interface IPostNode {
  id: string;
  createdAt: string;
  likes: number;
  isLikedByMe: boolean;
  tipsterId: ITipsterIdData;
  predictionpostitemSet: IPredictionpostitemSet;
}
export interface ITipsterIdData {
  penName: string;
  imageUrl: string;
}
export interface IPredictionpostitemSet {
  edges?: (IPostItemEntity)[] | null;
}
export interface IPostItemEntity {
  node: IPostItem;
}
export interface IPostItem {
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
  odds: number;
  bookmaker?: string;
  bookmakerImg?: string;
  resultValue?: string;
  win?: boolean;
}

export interface ITipsterData {
  getTipster: ISingleTipster;
}
export interface ISingleTipster {
  id: string;
  penName: string;
  country: string;
  favoriteSport: string;
  otherSport: string;
  telegramLink: string;
  socialLink: string;
  isApproved: boolean;
  imageUrl: string;
  followerCount: number;
  isFollowedByUser: boolean;
  user: IUserDetail;
}
export interface IUserDetail {
  id: string;
  userName: string;
}

export interface IUnFollowTipster {
  unFollowTipster: UnFollowTipsterData;
}
export interface UnFollowTipsterData {
  success: boolean;
  errors?: (string)[] | null;
}

export interface IFollowTipster {
  followTipster: FollowTipsterData;
}
export interface FollowTipsterData {
  errors?: (string)[] | null;
  follower: FollowerData | null;
}
export interface FollowerData {
  id: string;
}


export interface ILikeResponse {
  likePost: LikePostData;
}
export interface LikePostData {
  success: boolean;
  predictionPostLike: PredictionPostLikeData | null;
  liked: boolean;
}
export interface PredictionPostLikeData {
  id: string;
}
