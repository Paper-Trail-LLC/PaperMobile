import { GeneralApiProblem } from "./api-problem"
import { Book } from "../../models/book/book"
import { types } from "mobx-state-tree"
import { UserBook } from "../../models/user-book/user-book"
import { User } from "../../models/user/user"

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type TokenResult = { kind: "ok"; token: string} | GeneralApiProblem
export type GeneralActionResult = { kind: "ok"} | GeneralApiProblem
export type GetBookByISBNResult = {kind: "ok", book: Book} | GeneralApiProblem
export type GetBooksByQuery = {kind: "ok", books: Book[] } | GeneralApiProblem
export type UserLibraryResult = {kind: "ok", userBooks: UserBook[] } | GeneralApiProblem
