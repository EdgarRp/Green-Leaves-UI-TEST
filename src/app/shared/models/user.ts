export class User{
    name: string;
    email: string;
    phone: string;
    date: Date;
    city:string;
}

export class DefaultAuthUser{
    firstName: string;
    userName: string;
    lastName: string;
    token: string;
    expiration : Date;
    rol :string;
}
export class LoginViewModel{
    username : string;
    password : string;
}