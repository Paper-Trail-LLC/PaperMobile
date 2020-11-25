import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MeetingAgreementModel, PurchaseAgreementModel } from ".."

/**
 * Model description here for TypeScript hints.
 */
export const PurchaseMeetingModel = types
  .model("PurchaseMeeting")
  .props({
    id: types.string,
    purchaseRequest: PurchaseAgreementModel,
    meetingAreement: MeetingAgreementModel
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PurchaseMeetingType = Instance<typeof PurchaseMeetingModel>
export interface PurchaseMeeting extends PurchaseMeetingType {}
type PurchaseMeetingSnapshotType = SnapshotOut<typeof PurchaseMeetingModel>
export interface PurchaseMeetingSnapshot extends PurchaseMeetingSnapshotType {}
