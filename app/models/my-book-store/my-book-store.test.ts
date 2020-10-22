import { MyBookStoreModel, MyBookStore } from "./my-book-store"

test("can be created", () => {
  const instance: MyBookStore = MyBookStoreModel.create({})

  expect(instance).toBeTruthy()
})