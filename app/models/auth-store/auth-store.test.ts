import { AuthStoreModel, AuthStore } from "./auth-store"

test("can be created", () => {
  const instance: AuthStore = AuthStoreModel.create({})

  expect(instance).toBeTruthy()
})