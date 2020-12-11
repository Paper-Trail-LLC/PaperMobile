import { PurchaseMeetingModel, PurchaseMeeting } from "./purchase-meeting"

test("can be created", () => {
  const instance: PurchaseMeeting = PurchaseMeetingModel.create({})

  expect(instance).toBeTruthy()
})