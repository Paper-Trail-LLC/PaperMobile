import { GeneralApiProblem } from "./api-problem"
import { Book } from "../../models/book/book"
export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetBookByISBNResult = {kind: "ok", book: Book} | GeneralApiProblem