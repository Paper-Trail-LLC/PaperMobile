import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BookModel = types
  .model("Book")
  .props({ 
    id: types.optional(types.string,''),
    coverURI: types.optional(types.string, ''),
    title: types.string,
    authors: types.array(types.string),
    releaseDate: types.Date,
    isbn: types.optional(types.string, ''),
    isbn13: types.string,
    edition: types.optional(types.string, ''),
    synopsis: types.optional(types.string, '')
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type BookType = Instance<typeof BookModel>
export interface Book extends BookType {}
type BookSnapshotType = SnapshotOut<typeof BookModel>
export interface BookSnapshot extends BookSnapshotType {}
