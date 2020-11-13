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
      // console.log(b);
      self.books.push(BookModel.create(b));
      // console.log(self.books);
    },
    clear: function () {
      self.books.clear();
    },
    getBook: function (isbn13:string) {
      let i = self.books.findIndex((item) => item.isbn13 == isbn13);
      if(i<0) return;
      else return self.books[i];
    },
    setChoice: (isbn13: string) => {
      self.choice = isbn13;
    }
  }))
  .actions(self => ({
    getBookByISBN: flow(function*(isbn:string) {
      const result: GetBookByISBNResult = yield self.environment.api.Books.searchBook(isbn);
      console.info('getBookByISBN: ', result);
      if (result.kind === "ok"){
        result.book.releaseDate = new Date(result.book.releaseDate);
        if(!self.getBook(result.book.isbn13)) self.addBook(result.book);
        return result.book;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return;
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
