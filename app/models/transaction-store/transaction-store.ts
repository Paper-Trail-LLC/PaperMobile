import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BorrowAgreementModel } from "../borrow-agreement/borrow-agreement"
import { PurchaseAgreementModel } from "../purchase-agreement/purchase-agreement"

/**
 * Model description here for TypeScript hints.
 */
export const TransactionStoreModel = types
  .model("TransactionStore")
  .props({
    myPurchaseAgreements: types.optional(types.array(PurchaseAgreementModel), []),
    purchaseChoice: types.number,
    myBorrowAgreements: types.optional(types.array(BorrowAgreementModel), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addPurchaseAgreement: (purchaseAgreement) => {
      self.myPurchaseAgreements.push(purchaseAgreement);
    },
    setPurchaseChoice: (id: string) => {
      for(let i=0; i<self.myPurchaseAgreements.length; i++) {
        if(self.myPurchaseAgreements[i].agreement.id === id) {
          self.purchaseChoice = i;
        }
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TransactionStoreType = Instance<typeof TransactionStoreModel>
export interface TransactionStore extends TransactionStoreType {}
type TransactionStoreSnapshotType = SnapshotOut<typeof TransactionStoreModel>
export interface TransactionStoreSnapshot extends TransactionStoreSnapshotType {}
