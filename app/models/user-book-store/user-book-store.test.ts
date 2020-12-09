import { UserBookStoreModel, UserBookStore } from "./user-book-store"

test("can be created", () => {
  const instance: UserBookStore = UserBookStoreModel.create({})

  expect(instance).toBeTruthy()
})