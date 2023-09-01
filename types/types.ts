export interface IListProps {
    name: string;
    icon?: string;
    disabled?: boolean;
}

export interface IUserAuth {
    refreshExpiresIn: number;
    token: string;
    payload: IPayload;
    refreshToken: string;
}
export interface IPayload {
    email: string;
    exp: number;
    origIat: number;
}

export interface IRefreshToken {
    refreshExpiresIn: number;
    refreshToken: string;
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