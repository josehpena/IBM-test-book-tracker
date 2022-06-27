import { Book, BaseBook } from '../interface/book.interface'
import { BookModel } from '../schema/books.entity'

class BookService {
  /**
   * Get all books
   * @returns {Promise<Book[]>}
   */
  async geAList(userId?: string): Promise<Book[]> {
    return await BookModel.find({ userId: userId})
  }

  /**
   * Create a new book
   * @param {Book} data
   * @returns {Promise<Book>}
   */
  async create(data: Book): Promise<Book> {
    console.log(data)
    const newBook = new BookModel({ ...data })
    const dataValidate = newBook.validateSync()
    if (dataValidate) {
      throw new Error(dataValidate.message)
    }
    return await newBook.save()
  }

  /**
   * Get a book by id
   * @param {string} bookId - Book id
   * @returns {Promise<Book>} - Book
   */
  async getByBookId(bookId: string, userId?: string): Promise<Book> {
    const book: Book | null = await BookModel.findOne({ bookId, userId })

    if (!book) {
      throw new Error('Book not found')
    }

    return book
  }

  /**
   * Change a grade with 'Read' at status
   * @param {string} bookId - Book id
   * @param {number} grade - grade
   * @returns {Promise<Book>} - Book
   */
  async changeGrade(bookId: string, grade: number, userId?: string): Promise<Book>{
    const bookResult = await BookModel.findOne({ bookId, userId });
    
    if (!bookResult) {
      throw new Error('Book not found')
    }
    if(bookResult.status != "LIDO"){
      throw new Error(" Incompatible Status");
    }
    
    return await bookResult.update({grade});
  }
  /**
   * Update a book
   * @param {string} bookId - Book id
   * @param {BaseBook} data - Book data
   * @returns {Promise<Book>} - Book
   */
  async update(bookId: string, bookUpdate: BaseBook, userId?: string): Promise<Book> {
    const bookResult = await BookModel.findOne({ bookId, userId })

    if (!bookResult) {
      throw new Error('Book not found')
    }
    const bookUpdated = Object.assign(bookResult, bookUpdate)
    const dataValidate = bookUpdated.validateSync()
    if (dataValidate) {
      throw new Error(dataValidate.message)
    }
    return await bookUpdated.save()
  }

  /**
   * Delete a book
   * @param {string} userId - User id
   * @param {string} bookId - Book id
   * @returns {Promise<Book>} - Book
   */
  async remove(bookId: string, userId?: string): Promise<Book> {
    const book = await BookModel.findOneAndDelete({ bookId, userId})

    if (!book) {
      throw new Error('Book not found')
    }
    return book
  }

}
export default new BookService()