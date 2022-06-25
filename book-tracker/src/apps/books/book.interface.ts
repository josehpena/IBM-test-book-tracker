export interface BaseBook {
    titulo: string;
    autor: string;
    dataDeCadastro: string;
    dataDeConclusao: string;
    nota: number;
    status: string;
}


export interface Book extends BaseBook {
    id: number;
}
