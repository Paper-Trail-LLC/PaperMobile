import { MyBookStoreModel } from "../my-book-store/my-book-store"
import { BookStoreModel } from "../book-store/book-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserBookModel } from "../user-book/user-book"
import { BookPetitionModel } from "../book-petition/book-petition"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  myBookStore: types.optional(MyBookStoreModel, {}),
  bookStore: types.optional(BookStoreModel, {}),
  userBookStore: types.optional(UserBookModel, {}),
  bookPetitionStore: types.optional(BookPetitionModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
