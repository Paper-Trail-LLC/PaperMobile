import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BookPetition, BookPetitionModel } from "../book-petition/book-petition"
import {  Book } from "../book/book"
/**
 * Model description here for TypeScript hints.
 */
export const BookPetitionStoreModel = types
  .model("BookPetitionStore")
  .props({
    petitions: types.optional(types.array(BookPetitionModel), []),
    choice: types.optional(types.string, "")
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addPetition: (p: BookPetition) => {
      self.petitions.push(p);
    },
    setChoice: (id: string) => {
      self.choice = id;
    }
 

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type BookPetitionStoreType = Instance<typeof BookPetitionStoreModel>
export interface BookPetitionStore extends BookPetitionStoreType {}
type BookPetitionStoreSnapshotType = SnapshotOut<typeof BookPetitionStoreModel>
export interface BookPetitionStoreSnapshot extends BookPetitionStoreSnapshotType {}
