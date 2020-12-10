import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserBookModel } from "../user-book/user-book"
import { UserModel } from "../user/user"

/**
 * Model description here for TypeScript hints.
 */
export const AgreementModel = types
  .model("Agreement")
  .props({
    id: types.optional(types.string, ''),
    userBook: UserBookModel,
    userId: types.string,
    status: types.optional(types.string, 'available'),
    created_on: types.optional(types.Date, new Date()),
    updated_on: types.optional(types.Date, new Date())
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type AgreementType = Instance<typeof AgreementModel>
export interface Agreement extends AgreementType {}
type AgreementSnapshotType = SnapshotOut<typeof AgreementModel>
export interface AgreementSnapshot extends AgreementSnapshotType {}
