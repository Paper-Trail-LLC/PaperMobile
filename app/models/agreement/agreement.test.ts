import { AgreementModel, Agreement } from "./agreement"

test("can be created", () => {
  const instance: Agreement = AgreementModel.create({})

  expect(instance).toBeTruthy()
})