import { BookPetitionStoreModel } from "../book-petition-store/book-petition-store"
import { BookStoreModel } from "../book-store/book-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  bookPetitionStore: types.optional(BookPetitionStoreModel, {}),
  bookStore: types.optional(BookStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
