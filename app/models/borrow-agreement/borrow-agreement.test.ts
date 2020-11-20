import { BorrowAgreementModel, BorrowAgreement } from "./borrow-agreement"

test("can be created", () => {
  const instance: BorrowAgreement = BorrowAgreementModel.create({})

  expect(instance).toBeTruthy()
})