import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BookPetitionModel } from "../book-petition/book-petition"
import { UserBookModel } from "../user-book/user-book"

/**
 * Model description here for TypeScript hints.
 */
export const OfferModel = types
  .model("Offer")
  .props({
    id: types.string,
    bookPetition: BookPetitionModel,
    userBook: UserBookModel,
    description: types.optional(types.string, ''),
    accepted: types.optional(types.boolean, false),
    location: types.optional(types.array(types.number), [0,0]),
    lending: types.optional(types.boolean, false),
    selling: types.optional(types.boolean, false),
    createdOn: types.optional(types.Date, new Date)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type OfferType = Instance<typeof OfferModel>
export interface Offer extends OfferType {}
type OfferSnapshotType = SnapshotOut<typeof OfferModel>
export interface OfferSnapshot extends OfferSnapshotType {}
