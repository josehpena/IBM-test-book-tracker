export interface BaseBook {
    titulo: string;
    autor: string;
    dataDeCadastro: number;
    dataDeConclusao: number;
}

export interface Book extends BaseBook {
    id: number;
}
