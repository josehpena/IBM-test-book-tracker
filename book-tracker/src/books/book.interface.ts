export interface BaseBook {
    titulo: string;
    autor: string;
    dataDeCadastro: string;
    dataDeConclusao: string;
}

export interface Book extends BaseBook {
    id: number;
}
