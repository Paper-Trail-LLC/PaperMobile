import { TransactionStoreModel, TransactionStore } from "./transaction-store"

test("can be created", () => {
  const instance: TransactionStore = TransactionStoreModel.create({})

  expect(instance).toBeTruthy()
})