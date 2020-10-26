import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetBookByISBNResult } from "../../services/api";
import { BookModel } from "../book/book"
import { withEnvironment } from "../extensions/with-environment";
/**
 * Model description here for TypeScript hints.
 */
export const BookStoreModel = types
  .model("BookStore")
  .props({
    books: types.optional(types.array(BookModel), []),
    choice: types.optional(types.string, "")
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addBook: (b) => {
      self.books.push(BookModel.create(b));
    },
    clear: function () {
      self.books.clear();
    },
    getBook: function (id:string) {
      for (let i=0; i< self.books.length; i++){
        if (self.books[i].id == id){
          return self.books[i];
        }
      }
      return BookModel.create({});
    },
    setChoice: (id: string) => {
      self.choice = id;
    }
  }))
  .actions(self => ({
    getBookByISBN: flow(function*(isbn:string) {
      const result: GetBookByISBNResult = yield self.environment.api.Books.searchBook(isbn);
      console.log(result);
      if (result.kind === "ok"){
        self.addBook(result.book);
        return result.book;
      } else {
        __DEV__ && console.tron.log(result.kind);
      }
      
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

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
