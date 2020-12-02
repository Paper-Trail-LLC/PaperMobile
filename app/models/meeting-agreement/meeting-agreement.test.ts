import { MeetingAgreementModel, MeetingAgreement } from "./meeting-agreement"

test("can be created", () => {
  const instance: MeetingAgreement = MeetingAgreementModel.create({})

  expect(instance).toBeTruthy()
})