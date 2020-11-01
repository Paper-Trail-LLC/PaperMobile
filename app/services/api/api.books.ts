import { ApisauceInstance, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { Book } from "../../models/book/book"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class ApiBooks {
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

    /**
     * Gets a single user by ID
     */

    async searchBook(isbn: string): Promise<Types.GetBookByISBNResult> {
        // make the api call
        const response: ApiResponse<any> = await this.apisauce.get(`/books/isbn/${isbn}`)
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        // transform the data into the format we are expecting
        try {
            const resultBook: Book = {
                id: response.data.data.id,
                title: response.data.data.title,
                authors: response.data.data.authors,
                isbn: response.data.data.isbn,
                isbn13: response.data.data.isbn13,
                releaseDate: response.data.data.releaseDate,
                edition : response.data.data.edition,
                coverURI: response.data.data.coverURI,
                synopsis: response.data.data.synopsys
                
            }
            return { kind: "ok", book: resultBook }
        } catch {
            return { kind: "bad-data" }
        }
    }
}
