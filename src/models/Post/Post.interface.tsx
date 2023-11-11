import { UserInfo } from "../usuario/Usuario.interface"

export interface Post {
    data?: PostagemDados[],
    success: boolean,
    code: number,
    message: string,
    resultCount: number
}

export interface PostagemDados {
    id?: number,
    title?: string,
    text?: string,
    usuarioId?: number,
    createdAt?: Date,
    updateAt?: Date,
    fotos?: Fotos[],
    usuario?: UserInfo,
    comentario?: Comentarios[],
    like?: Like[]
}

export interface Fotos {
    id: string,
    urlPhoto: string,
    postId: number
}

export interface Comentarios {
    id?: number,
    postId?: number,
    usuarioId?: number,
    texto: string,
    createdAt: Date,
    updatedAt: Date,
    usuario?: UserInfo
}

export interface Like {
    id?: number,
    postId?: number,
    usuarioId?: number,
    createdAt?: Date
}
