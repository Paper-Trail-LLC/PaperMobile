import { PurchaseAgreementModel, PurchaseAgreement } from "./purchase-agreement"

test("can be created", () => {
  const instance: PurchaseAgreement = PurchaseAgreementModel.create({})

  expect(instance).toBeTruthy()
})