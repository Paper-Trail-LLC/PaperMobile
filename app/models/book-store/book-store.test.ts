import { BookStoreModel, BookStore } from "./book-store"

test("can be created", () => {
  const instance: BookStore = BookStoreModel.create({})

  expect(instance).toBeTruthy()
})