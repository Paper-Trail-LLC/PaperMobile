import { BookModel, Book } from "./book"

test("can be created", () => {
  const instance: Book = BookModel.create({})

  expect(instance).toBeTruthy()
})