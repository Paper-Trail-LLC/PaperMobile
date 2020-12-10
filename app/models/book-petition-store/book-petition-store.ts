import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BookPetitionModel } from "../book-petition/book-petition"

/**
 * Model description here for TypeScript hints.
 */
export const BookPetitionStoreModel = types
  .model("BookPetitionStore")
  .props({
    myPetitions: types.optional(types.array(BookPetitionModel), []),
    selection: types.maybeNull(types.number)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addPetition: (newPetition) => {
      self.myPetitions.push(newPetition);
    },
    setSelection: (id: string) => {
      for(var i=0; i<self.myPetitions.length; i++) {
        if(self.myPetitions[i].id === id) {
          self.selection = i;
          return;
        }
      }
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
