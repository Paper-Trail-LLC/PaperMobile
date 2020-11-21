import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AgreementModel } from "../agreement/agreement"

/**
 * Model description here for TypeScript hints.
 */
export const PurchaseAgreementModel = types
  .model("PurchaseAgreement")
  .props({
    agreement: AgreementModel,
    cost: types.optional(types.number, 0)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PurchaseAgreementType = Instance<typeof PurchaseAgreementModel>
export interface PurchaseAgreement extends PurchaseAgreementType {}
type PurchaseAgreementSnapshotType = SnapshotOut<typeof PurchaseAgreementModel>
export interface PurchaseAgreementSnapshot extends PurchaseAgreementSnapshotType {}