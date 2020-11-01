import { UserBookModel, UserBook } from "./user-book"

test("can be created", () => {
  const instance: UserBook = UserBookModel.create({})

  expect(instance).toBeTruthy()
})