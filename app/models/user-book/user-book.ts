import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BookModel } from "../book/book";

/**
 * Model description here for TypeScript hints.
 */
export const UserBookModel = types
  .model("UserBook")
  .props({
    id: types.optional(types.string,''),
    ownerId: types.string,
    book: BookModel,
    status: types.optional(types.string, "available"),
    selling: types.optional(types.boolean, false),
    lending: types.optional(types.boolean, false),
    location: types.optional(types.array(types.number), [18.220833, -66.590149]),
    images: types.optional(types.array(types.string), [])
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    // setBook: (book: Book) => {
    //   self.book = book;
    // },
    // setStatus: (status: string) => {
    //   self.status = status;
    // },
    // setSelling: (isSelling: boolean) => {
    //   self.selling = isSelling;
    // },
    // setLending: (isLending: boolean) => {
    //   self.lending = isLending;
    // },
    // setLocation: (latitude: number, longitude: number) => {
    //   self.location.clear();
    //   self.location.push(latitude);
    //   self.location.push(longitude);
    // }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserBookType = Instance<typeof UserBookModel>
export interface UserBook extends UserBookType {}
type UserBookSnapshotType = SnapshotOut<typeof UserBookModel>
export interface UserBookSnapshot extends UserBookSnapshotType {}
