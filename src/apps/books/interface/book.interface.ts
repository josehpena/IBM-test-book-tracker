export enum EStatus {
    QUERO_LER = 'QUERO_LER',
    LENDO = 'LENDO',
    LIDO = 'LIDO'
}

export interface BaseBook {
    title?: string;
    author?: string
    createdAt?: Date;
    finishedAt?: Date;
    grade?: number;
    status?: EStatus;
    userId?: any;
}


export interface Book extends BaseBook {
    bookId?: string;
}
