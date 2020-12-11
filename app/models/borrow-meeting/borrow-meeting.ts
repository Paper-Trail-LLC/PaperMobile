import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BorrowAgreementModel } from "../borrow-agreement/borrow-agreement"
import { MeetingAgreementModel } from "../meeting-agreement/meeting-agreement"

/**
 * Model description here for TypeScript hints.
 */
export const BorrowMeetingModel = types
  .model("BorrowMeeting")
  .props({
    id: types.string,
    borrowRequest: BorrowAgreementModel,
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

type BorrowMeetingType = Instance<typeof BorrowMeetingModel>
export interface BorrowMeeting extends BorrowMeetingType {}
type BorrowMeetingSnapshotType = SnapshotOut<typeof BorrowMeetingModel>
export interface BorrowMeetingSnapshot extends BorrowMeetingSnapshotType {}
