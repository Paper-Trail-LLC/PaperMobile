import { ApisauceInstance, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { Book } from "../../models/book/book"
import * as Types from "./api.types"
import { User } from "../../models/user/user"

/**
 * Manages all requests to the API.
 */
export class ApiUser {
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

    async whoAmI(token: string): Promise<Types.GetUserResult> {
        // make the api call
        this.apisauce.setHeader('auth', token);
        const response: ApiResponse<any> = await this.apisauce.get(`/user/me`)
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        // transform the data into the format we are expecting
        try {
            console.log(response);
            const resultUser: User = {
                id: response.data[0].id,
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                email: response.data[0].email,
                gender: response.data[0].gender,
                created_on: response.data[0].created_on,
                updated_on: response.data[0].updated_on,
                likes: response.data[0].likes        
            }
            return { kind: "ok", user: resultUser }
        } catch {
            return { kind: "bad-data" }
        }
    }

    // async getUserById(id: string) {
    //     const response: ApiResponse<any> = await this.apisauce.get(`/${id}`)
    // }
}
