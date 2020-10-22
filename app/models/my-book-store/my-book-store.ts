import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MyBookModel } from "../my-book/my-book"

/**
 * Model description here for TypeScript hints.
 */
export const MyBookStoreModel = types
  .model("MyBookStore")
  .props({
    myBooks: types.optional(types.array(MyBookModel), [])
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addToLibrary: (b) => {
      self.myBooks.push(MyBookModel.create(b));
    },
    getBook: function (id:string) {
      for (let i=0; i< self.myBooks.length; i++){
        if (self.myBooks[i].id == id){
          return self.myBooks[i];
        }
      }
      return MyBookModel.create({});
    },
    deleteFromLibrary: function (id:string) {
      for (let i=0; i< self.myBooks.length; i++){
        if (self.myBooks[i].id == id){
          self.myBooks.splice(i, 1);
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

type MyBookStoreType = Instance<typeof MyBookStoreModel>
export interface MyBookStore extends MyBookStoreType {}
type MyBookStoreSnapshotType = SnapshotOut<typeof MyBookStoreModel>
export interface MyBookStoreSnapshot extends MyBookStoreSnapshotType {}
