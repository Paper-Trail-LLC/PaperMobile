import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const MyBookModel = types
  .model("MyBook")
  .props({
    id: types.string,
    bookImage: types.string,
    title: types.string,
    author: types.string,
    releaseDate: types.string,
    status: types.string,
    lending: types.boolean,
    selling: types.boolean
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type MyBookType = Instance<typeof MyBookModel>
export interface MyBook extends MyBookType {}
type MyBookSnapshotType = SnapshotOut<typeof MyBookModel>
export interface MyBookSnapshot extends MyBookSnapshotType {}
