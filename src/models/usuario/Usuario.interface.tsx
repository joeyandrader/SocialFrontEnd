export interface UsuarioRegister {
    Nome: string,
    Sobrenome: string,
    Email: string,
    Password: string,
    ConfirmPassword: string
}


/**
 * User Metodo Response
 */
export interface User {
    data: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        age: number,
        biography: string,
        accountType: number,
        active: boolean,
        createdAt: Date,
        updateAt: Date
    },
    success: boolean,
    code: number,
    message: string,
    resultCount: number
}


export interface UserInfo {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    biography: string,
    accountType: number,
    active: boolean,
    createdAt: Date,
    updateAt: Date
}