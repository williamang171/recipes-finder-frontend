export interface Prediction {
    label: string,
    score: number
}

export interface Image {
    img: string,
    imgForSubmit: string,
    title?: string,
    author: string,
    featured?: boolean,
    authorLink?: any
}

export interface Recipe {
    id?: number;
    name: string;
    url: string;
    image_url: string;
    mealdb_id?: string;
}

export interface User {
    email: string;
    password: string;
    name: string;
}

export interface UserLogin {
    username: string;
    password: string;
}