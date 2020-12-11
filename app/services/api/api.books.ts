import { ApisauceInstance, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { Book, BookModel } from "../../models/book/book"
import * as Types from "./api.types"
import { UserBook } from "../../models";

/**
 * Manages all requests to the API.
 */
export class ApiBooks {
    API_PAGE_SIZE = 10;
    /**
     * The underlying apisauce instance which performs the requests.
     */
    apisauce: ApisauceInstance

    /**
     * Creates the api.
     *
     * @param api apisauce instance which performs the requests.
     */
    constructor(api: ApisauceInstance) {
        this.apisauce = api;
    }

    private createBook(res: ApiResponse<any, any>): Book {
        const resultBook: Book = {
            id: res.data.data.id || '',
            title: res.data.data.title || '',
            authors: res.data.data.authors,
            isbn: res.data.data.isbn,
            isbn13: res.data.data.isbn13 || '',
            releaseDate: res.data.data.releaseDate || '',
            edition: res.data.data.edition,
            coverURI: res.data.data.coverURI,
            synopsis: res.data.data.synopsys
        }
        return resultBook;
    }

    private createUserBook(res: ApiResponse<any, any>): UserBook {
        const book: Book = {
            id: res.data.data.bookId,
            title: res.data.data.title || '',
            authors: res.data.data.authors,
            isbn: res.data.data.isbn,
            isbn13: res.data.data.isbn13 || '',
            releaseDate: res.data.data.releaseDate || '',
            edition: res.data.data.edition,
            coverURI: res.data.data.coverURI,
            synopsis: res.data.data.synopsys
        }
        const resultBook: UserBook = {
            id: res.data.data.userBookId,
            ownerId: res.data.data.userId,
            book: book,
            status: res.data.data.status,
            selling: res.data.data.selling,
            lending: res.data.data.lending,
            location: res.data.data.location,
            images: res.data.data.images
        }
        return resultBook;
    }

    /**
     * Gets a single book by ISBN
     */

    async searchBookByISBN(isbn: string): Promise<Types.GetBookByISBNResult> {
        // make the api call
        const response: ApiResponse<any> = await this.apisauce. get(`/books/isbn/${isbn}`)
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        // transform the data into the format we are expecting
        try {
            // BookModel.create(response.data.data)
            return { kind: "ok", book: this.createBook(response) }
        } catch {
            return { kind: "bad-data" }
        }
    }

    /**
     * Gets a list of books by search query
     */

    async searchBook(keyword: string, page: number = 1, limit: number = this.API_PAGE_SIZE, criteria?: string): Promise<Types.GetBooksByQuery> {
        // make the api call
        console.log('Searching a book...BEEP BOOP...')
        const response: ApiResponse<any> = await this.apisauce.get(`/books/search?keywords=${keyword}&page=${1}&limit=${limit}${criteria? '&criteria='+criteria: ''}`)
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        // transform the data into the format we are expecting
        try {
            let books: Book[] = [];
            console.log(response.data.data);
            response.data.data.forEach(b => {
                books.push(<Book>b);
            });
            console.log(books)
            return { kind: "ok", books: books }
        } catch {
            return { kind: "bad-data" }
        }
    }

    async getLibrary(userId: string, page: number = 1, limit: number = this.API_PAGE_SIZE): Promise<Types.UserLibraryResult> {
        const response: ApiResponse<any> = await this.apisauce.get(`/library/${userId}`);

        if(!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }

        try {
            let books: UserBook[] = [];
            response.data.data.forEach(b => {
                books.push(this.createUserBook(b));
            });
            console.log(books)
            return { kind: "ok", userBooks: books }
        } catch {
            return { kind: "bad-data" }
        }
    }

}
