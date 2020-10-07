import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { screensEnabled } from "react-native-screens";
import { BookModel, BookSnapshot, Book } from "../book/book"
/**
 * Model description here for TypeScript hints.
 */
export const BookStoreModel = types
  .model("BookStore")
  .props({
    books: types.optional(types.array(BookModel),[] ),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addBook: (b) => {
      self.books.push(BookModel.create(b));
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getBook: function (id:string) {
      for (let i=0; i< self.books.length; i++){
        if (self.books[i].id == id){
          return self.books[i];
        }
      }
      return "not found!";   
    }
  }))
  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type BookStoreType = Instance<typeof BookStoreModel>
export interface BookStore extends BookStoreType {}
type BookStoreSnapshotType = SnapshotOut<typeof BookStoreModel>
export interface BookStoreSnapshot extends BookStoreSnapshotType {}
