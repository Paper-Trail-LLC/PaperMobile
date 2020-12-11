import { BookPetitionStoreModel, BookPetitionStore } from "./book-petition-store"

test("can be created", () => {
  const instance: BookPetitionStore = BookPetitionStoreModel.create({})

  expect(instance).toBeTruthy()
})