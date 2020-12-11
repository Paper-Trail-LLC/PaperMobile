import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Book, BookModel } from "../book/book"

/**
 * Model description here for TypeScript hints.
 */
export const BookPetitionModel = types
  .model("BookPetition")
  .props({
    id: types.string,
    book: BookModel,
    description: types.optional(types.string, ''),
    buying: types.optional(types.boolean, false),
    borrowing: types.optional(types.boolean, false),
    location: types.optional(types.array(types.number), [0,0]), //Not sure!
    maxRadius: types.optional(types.number, 0),
    expirationDate: types.optional(types.Date, new Date())
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    //setters
    setBook: (book: Book) => {
      self.book = book;
    },
    setDescription: (desc: string) => {
      self.description = desc;
    },
    setBuying: (buying: boolean) => {
      self.buying = buying;
    },
    setBorrowing: (borrowing: boolean) => {
      self.borrowing = borrowing;
    },
    setLocation: (location: number[]) => {
      self.location[0] = location[0];
      self.location[1] = location[1];
    },
    setMaxRadius: (radius: number) => {
      self.maxRadius = radius;
    },
    setExpDate: (expDate: Date) => {
      self.expirationDate = expDate;
    },

    //getters
    getDescription: () => {
      return self.description;
    },
    getbuying: () => {
      return self.buying;
    },
    getborrowing: () => {
      return self.borrowing;
    },
    getLocation: () => {
      return self.location;
    },
    getMaxRadius: () => {
      return self.maxRadius;
    },
    getExpDate: () => {
      return self.expirationDate;
    }

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type BookPetitionType = Instance<typeof BookPetitionModel>
export interface BookPetition extends BookPetitionType {}
type BookPetitionSnapshotType = SnapshotOut<typeof BookPetitionModel>
export interface BookPetitionSnapshot extends BookPetitionSnapshotType {}
