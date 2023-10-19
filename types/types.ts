export interface IListProps {
    name: string;
    icon?: string;
    disabled?: boolean;
}
export interface ILoginResponse {
    tokenAuth: IUserAuth;
}
export interface IUserAuth {
    refreshExpiresIn?: number;
    token: string;
    payload: IPayload;
    refreshToken: string;
    tipster?: ITipsterPayload | null;
}
export interface IUserDetails {
    id: string;
    userName: string
    email: string
}
export interface IPayload {
    email: string;
    userID: string;
    exp: number;
    origIat: number;
}
export interface ITipsterPayload {
    tipsterID: string;
}
export interface IRefreshToken {
    refreshExpiresIn: number;
    refreshToken: string;
}
export interface IRegisterUserResponse {
    registerAppUser: IRegisterAppUser;
}
export interface IRegisterAppUser {
    token: string;
    payload: string;
    isTipster: boolean;
    user: IUser;
    errors: (RegisterErrorsEntity)[];
}
export interface IUser {
    id: string;
    userName: string;
    dob: string;
    dateJoined: string;
}
export interface RegisterErrorsEntity {
    field: string;
    messages: (string)[];
}
export interface IErrorTipsterStatus {
    pen_name: boolean;
    nationality: boolean;
    favorite_sport: boolean;
    telegram: boolean;
    experience: boolean;
    profile: boolean;
    social_link: boolean
}

export interface IFileWithPreview extends File {
    preview?: string;
}

export interface IProfileImage {
    imageFile: IFileWithPreview | null
    imageURL: string | null
    imageName: string | null
}

// 
export interface IDropdownItem {
    exact?: boolean | undefined;
    label: string;
    slot?: string | undefined;
    icon?: string | undefined;
    iconClass?: string | undefined;
    shortcuts?: string[] | undefined;
    disabled?: boolean | undefined;
    click?: Function | undefined;
}

// 
export interface IAllSport {
    allSports: AllSports;
}
export interface AllSports {
    edges?: (EdgesEntity)[] | null;
}
export interface EdgesEntity {
    node: Node;
}
export interface Node {
    name: string;
    icon: string;
}

// 
export interface IGetTipsterByUser {
    getTipsterByUser: GetTipsterByUser;
}
export interface GetTipsterByUser {
    id: string;
    penName: string;
    isApproved: boolean;
    createdAt: string;
}
export interface IMoreData {
    tipsterFollowers: TipsterFollowers;
    allTipsters: AllTipsters;
}
export interface TipsterFollowers {
    edges?: (IMoreDataEdgesEntity)[] | null;
}
export interface IMoreDataEdgesEntity {
    node: IMoreDataNode;
}
export interface IMoreDataNode {
    tipsterId: TipsterId;
    id: string;
}
export interface TipsterId {
    id: string;
    penName: string;
}
export interface AllTipsters {
    edges?: (AllTipstersEdgesEntity)[] | null;
}
export interface AllTipstersEdgesEntity {
    node: AllTipstersNode;
}
export interface AllTipstersNode {
    id: string;
    penName: string;
}

//
export interface ITipsters {
    allTipsters: ITipstersAllTipsters;
}
export interface ITipstersAllTipsters {
    edges?: (ITipstersEdgesEntity)[] | null;
}
export interface ITipstersEdgesEntity {
    node: ITipstersNode;
}
export interface ITipstersNode {
    id: string;
    penName: string;
    country: string;
    favoriteSport: string;
    imageUrl: string;
    createdAt: string;
    followerCount: number;
    isFollowedByUser: boolean;
}
export interface IFollowData {
    followTipster: FollowTipster;
}
export interface FollowTipster {
    followers: Followers;
    errors?: (string)[] | null;
}
export interface Followers {
    id: string;
    createdAt: string;
}
export interface IUnFollowData {
    unFollowTipster: UnFollowTipster;
}
export interface UnFollowTipster {
    success: boolean;
    errors?: (string)[] | null;
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

