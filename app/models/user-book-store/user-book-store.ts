import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { UserBookModel } from "../user-book/user-book"
import { withEnvironment } from "../extensions/with-environment";
import { UserLibraryResult } from "../../services/api/api.types";
import { AuthStore } from "../auth-store/auth-store"
/**
 * Model description here for TypeScript hints.
 */
export const UserBookStoreModel = types
  .model("UserBookStore")
  .props({
    nearbyBooks: types.optional(types.array(UserBookModel), []),
    myLibraryBooks: types.optional(types.array(UserBookModel), []),
    otherUserLibraryBooks: types.optional(types.array(UserBookModel), []),

  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getUserLibrary: flow(function* (userId: string, page: number = 0, limit: number = 10, criteria?: string) {
      const result: UserLibraryResult = yield self.environment.api.Books.getLibrary(userId, page, limit);
      __DEV__ && console.tron.log(result);
      if (result.kind === "ok") {
        result.userBooks.map((b) => { b.book.releaseDate = new Date(b.book.releaseDate) });
        return result.userBooks;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return [];
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getMyLibrary: () =>{
      
    }

  }))
/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type UserBookStoreType = Instance<typeof UserBookStoreModel>
export interface UserBookStore extends UserBookStoreType { }
type UserBookStoreSnapshotType = SnapshotOut<typeof UserBookStoreModel>
export interface UserBookStoreSnapshot extends UserBookStoreSnapshotType { }
