import { OfferModel, Offer } from "./offer"

test("can be created", () => {
  const instance: Offer = OfferModel.create({})

  expect(instance).toBeTruthy()
})