import { BookPetitionModel, BookPetition } from "./book-petition"

test("can be created", () => {
  const instance: BookPetition = BookPetitionModel.create({})

  expect(instance).toBeTruthy()
})