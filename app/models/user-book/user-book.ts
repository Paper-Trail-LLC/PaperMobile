import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const UserBookModel = types
  .model("UserBook")
  .props({
    status: types.optional(types.string, "available"),
    selling: types.optional(types.number, 0),
    lending: types.optional(types.number, 0),
    location: types.optional(types.array(types.number), []),
    images: types.optional(types.array(types.string), [])
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setStatus: (status: string) => {
      self.status = status;
    },
    setSelling: (isSelling: boolean) => {
      if(isSelling) self.selling = 1;
      else self.selling = 0;
    },
    setLending: (isLending: boolean) => {
      if(isLending) self.lending = 1;
      else self.lending = 0;
    },
    setLocation: (latitude: number, longitude: number) => {
      self.location.clear();
      self.location.push(latitude);
      self.location.push(longitude);
    }
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
