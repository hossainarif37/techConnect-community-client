
// Slices Interface
export interface IRootState {
    userSlice: IUser;
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