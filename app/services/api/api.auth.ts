import { ApisauceInstance, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class ApiAuth {
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
     * Logins user given an email and password
     *
     * @param {string} email user's email
     * @param {string} password user's account password
     * @returns {Promise<Types.TokenResult>}
     * @memberof ApiAuth
     */
    async login(email: string, password: string): Promise<Types.TokenResult> {
        // make the api call
        const response: ApiResponse<any> = await this.apisauce.post(`/auth/login`, { email: email, password: password });
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        return { kind: "ok", token: response.data }
    }
    /**
     * Registers new user to PaperTrail service.
     *
     * @param {string} email
     * @param {string} password
     * @param {string} firstname
     * @param {string} lastname
     * @param {string} phone
     * @param {string} gender
     * @returns {Promise<Types.GeneralActionResult>}
     * @memberof ApiAuth
     */
    async register(email: string, password: string, firstname: string, lastname: string, phone: string, gender: string): Promise<Types.GeneralActionResult> {
        // make the api call
        const BODY = { email: email, hash: password, firstname: firstname, lastname: lastname, phone: phone, gender: gender }
        const response: ApiResponse<any> = await this.apisauce.post(`/user/register`, BODY);
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        return { kind: "ok" }
    }
}
