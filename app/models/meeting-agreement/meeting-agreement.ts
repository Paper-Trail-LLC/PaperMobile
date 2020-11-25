import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const MeetingAgreementModel = types
  .model("MeetingAgreement")
  .props({
    id: types.string,
    status: types.optional(types.string, ''),
    geolocation: types.optional(types.array(types.number), [0,0]),
    place: types.optional(types.string, ''),
    timestamp: types.optional(types.Date, new Date()),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type MeetingAgreementType = Instance<typeof MeetingAgreementModel>
export interface MeetingAgreement extends MeetingAgreementType {}
type MeetingAgreementSnapshotType = SnapshotOut<typeof MeetingAgreementModel>
export interface MeetingAgreementSnapshot extends MeetingAgreementSnapshotType {}
