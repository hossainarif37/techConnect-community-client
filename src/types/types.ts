
// Slices Interface
export interface IRootState {
    userSlice: IUser;
    navbarSlice: INavbar;
}

export type UserType = {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
    followers?: string[];
    following?: string[];
    articles?: string[];
    savedArticles?: string[];
}

// User Interface
export interface IUser {
    isAuthenticated: boolean;
    user: UserType | null
}


// Navbar Slice Interface
export interface INavbar {
    isNavToggle: boolean,
    isProfileDropdown: boolean;
}

export type LoginErrorType = {
    status: number | string;
    data: {
        success: boolean;
        message: string;
    }
}

export interface IComment {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
        profilePicture: string;
    };
    article: string;
    createdAt: string;
}