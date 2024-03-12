
// Slices Interface
export interface IRootState {
    userSlice: IUser;
    navbarSlice: INavbar;
}

// User Interface
export interface IUser {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
    followers?: string[];
    following?: string[];
    articles?: string[];
    savedArticles?: string[];
}


// Navbar Slice Interface
export interface INavbar {
    isNavToggle: boolean
}