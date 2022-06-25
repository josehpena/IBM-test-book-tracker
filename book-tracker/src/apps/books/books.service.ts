import { BaseBook, Book } from "./book.interface";
import { Books } from "./books.interface";

let books: Books = {
    1: {
        id: 1,
      titulo: "A regra é não ter regras",
      autor: "Burger",
      dataDeCadastro: "Tasty",
      dataDeConclusao: "://cdn.auth0.com/blog/whatabyte/burger-sm.png",
      nota: 0,
      status: "QueroLer"
    },
    2: {
        id: 2,
        titulo: "Pequeno Principe",
        autor: "Pizza",
        dataDeCadastro: "Cheesy",
        dataDeConclusao: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
        nota: 0,
        status: "Lendo"
    },
    3: {
        id: 3,
        titulo: "Harry Potter",
        autor: "Tea",
        dataDeCadastro: "Informative",
        dataDeConclusao: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png",
        nota: 0,
        status: "Lido"
    }
  };

  export const findAllBooks =async (): Promise<Book[]> => Object.values(books)

  export const findAbookById = async (id: number): Promise<Book> => books[id];

  export const create = async (newBook: BaseBook): Promise<Book> => {
    const id = new Date().valueOf();

    books[id] = {
        id,
        ...newBook,
    };

    return books[id];
  }

  export const update = async (
    id: number,
    bookUpdate: BaseBook
  ): Promise<Book | null> => {
    const book = await findAbookById(id);

    if(!book){
        return null;
    }

    books[id] = {id, ...bookUpdate};

    return books[id];
  }

  export const remove = async (id: number): Promise<null | void> => {
    const book = await findAbookById(id);

    if (!book){
        return null;
    }

    delete books[id];
  };