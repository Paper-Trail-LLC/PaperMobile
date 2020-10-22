import { MyBookModel, MyBook } from "./my-book"

test("can be created", () => {
  const instance: MyBook = MyBookModel.create({})

  expect(instance).toBeTruthy()
})