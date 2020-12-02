import { BorrowMeetingModel, BorrowMeeting } from "./borrow-meeting"

test("can be created", () => {
  const instance: BorrowMeeting = BorrowMeetingModel.create({})

  expect(instance).toBeTruthy()
})