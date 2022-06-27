
import MongooseClient from '../../../config/db/index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import BookService from './book.service';
import { Book, EStatus } from '../interface/book.interface';
import { IUser } from './../../users/interface/user.interface';
import UserService from './../../users/service/user.service';

class UtilTest {
  books: Book[] = [
    {
      title: "string",
      author: "string",
    }
  ]
  users: IUser[] = [
    {
      name: "Antonio",
    },
    {
      name: "Pedro",
      id: 'e5e64f77-fcf6-4b55-808b-99fd39a40065'
    }
  ]
  getBooks(): Book[] {
    return this.books;
  }
  getUsers(): IUser[] {
    return this.users;
  }
}

describe('BookService', () => {
  const mongodb = new MongoMemoryServer();
  const bookService = BookService
  const userService = UserService
  const testMock = new UtilTest();
  const dbClient = new MongooseClient()
  const users = testMock.getUsers();
  const books = testMock.getBooks();

  beforeAll(async () => {
    await mongodb.start()
    const dbUri = mongodb.getUri();
    dbClient.connect(dbUri);
  })
  afterEach(async () => {
    mongodb.removeAllListeners()
  })
  afterAll(async () => {
    await mongodb.stop()
    dbClient.disconnect()
  });

  describe('Create a new User', () => {
    it("Using a new name without id'", async () => {
      const user = users[0];
      const userTest: IUser = await userService.findOrCreate(user);
      expect(userTest.name).toBe("Antonio");
    });

    it('Using a existing name with a id', async () => {

      let user: IUser = { name: users[1].name };
      const result = await userService.findOrCreate(user);
      expect(result.name).toBe("Pedro");

    });

  })

  describe('Create a new Book', () => {
    it("should return an array of books", async () => {
      const user: IUser = users[0];
      const book: Book = books[0];
      const userTest: IUser = await userService.findOrCreate(user);
      const createResult: Book = await bookService.create({ ...book, userId: userTest.id });
      expect(createResult.title).toBe(book.title);
      expect(createResult.userId).toBe(userTest.id);
    })

    it('should return exception because the datavalidade is false', async () => {
      const user: IUser = users[0];
      let book = {
        "title": "Pequeno Principe",
        "grade": -1
      };
      await expect(bookService.create({ ...book, userId: user.id })).rejects.toThrow(Error);
    })

  })
  describe('getBooks', () => {
    it('should be defined', () => {
      expect(bookService).toBeDefined();
      expect(userService).toBeDefined();
    });

    it('Get all books from a user id', async () => {
      const user: IUser = users[1];
      const book: Book = books[0];
      const userTest: IUser = await userService.findOrCreate(user);
      await bookService.create({ ...book, userId: userTest.id });
      await bookService.create({ ...book, userId: userTest.id });
      const booksResult: Book[] = await bookService.geAList(user.id);
      expect(booksResult[0].userId).toBe(userTest.id);
      expect(booksResult[1].userId).toBe(userTest.id);
    })
  });

  describe('Get book by id', () => {
    const user: IUser = users[1];
    const book: Book = books[0];
    it('should be defined', () => {
      expect(bookService).toBeDefined();
      expect(userService).toBeDefined();
    });

    it('Get all books from a user id', async () => {
      const userTest: IUser = await userService.findOrCreate(user);
      const bookId: any = (await bookService.create({ ...book, userId: userTest.id })).bookId;
      const booksResult: Book = await bookService.getByBookId(bookId, user.id);
      expect(booksResult.bookId).toEqual(bookId);
      expect(booksResult.userId).toBe(userTest.id);
    });

    it('Get all books from a user id', async () => {
      const bookId: any = "5e64f77-fcf6-4b55-808b-99fd39a40065";
      const userId: any = "5e64f77-fcf6-4b55-808b-99fd39a40064"
      await expect(bookService.getByBookId(bookId, userId)).rejects.toThrow(Error);
    });
  });

  describe('Change grade', () => {
    const user: IUser = users[1];
    let book: Book = books[0];

    it('Should change grade', async () => {
      const userTest: IUser = await userService.findOrCreate(user);
      const bookId: any = (await bookService.create({ ...book, userId: userTest.id, status: EStatus.LIDO })).bookId;

      await bookService.changeGrade(bookId, 10, userTest.id);

      const booksResult: Book = await bookService.getByBookId(bookId, user.id);

      expect(booksResult.grade).toBe(10);

    })

    it('Should throw error Incompatible Status ', async () => {
      const userTest: IUser = await userService.findOrCreate(user);

      const bookId: any = (await bookService.create({ ...book, userId: userTest.id })).bookId;
      await expect(bookService.changeGrade(bookId, 10, userTest.id)).rejects.toThrow(Error);
    })

    it('Should throw error book not found', async () => {
      const userTest: IUser = await userService.findOrCreate(user);

      const bookId: any = '1234';
      await expect(bookService.changeGrade(bookId, 10, userTest.id)).rejects.toThrow(Error);

    })
  })

  describe('Book Update', () => {
    const user: IUser = users[1];
    const book: Book = books[0];

    it('Should update with success', async () => {
      const userTest: IUser = await userService.findOrCreate(user);
      const bookId: any = (await bookService.create({ ...book, userId: userTest.id })).bookId;
      const updateData = { title: "Titulo alterado" }
      await bookService.update(bookId, updateData, userTest.id);

      expect((await bookService.getByBookId(bookId, user.id)).title).toEqual(updateData.title);
    })

    it('Should throw error when try update with wrong bookId', async () => {
      const userTest: IUser = await userService.findOrCreate(user);
      const bookId: any = "5e64f77-fcf6-4b55-808b-99fd39a40065";
      const updateData = { title: "Titulo alterado" }
      await expect(bookService.update(bookId, updateData, userTest.id)).rejects.toThrow(Error);
    })
    it('Should throw error when try update with wrong data type', async () => {
      const userTest: IUser = await userService.findOrCreate(user);
      const bookId: any = (await bookService.create({ ...book, userId: userTest.id })).bookId;
      const updateData: any = { grade: -1 }
      await expect(bookService.update(bookId, updateData, userTest.id)).rejects.toThrow(Error);
    })

  })

});