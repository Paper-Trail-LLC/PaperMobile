import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { GeneralActionResult, GetUserResult, TokenResult } from "../../services/api"
import { UserModel } from "../user/user";
/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    token: types.maybeNull(types.string),
    token_date: types.maybeNull(types.Date),
    user: types.maybeNull(UserModel)
  })
  .extend(withEnvironment)
  .views(self => ({
    isSignedIn: () => {
      return self.token ? true : false;
    },
    isExpired: () => {
      const now = new Date().getTime();
      const microSecondsDiff = Math.abs(now - self.token_date.getTime());
      // Math.round is used instead of Math.floor to account for certain DST cases
      // Number of milliseconds per day =
      //   24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 ms/second
      const daysDiff = Math.round(microSecondsDiff / (1000 * 60 * 60 * 24));
      return daysDiff >= 15;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    loadUser: flow(function* () {
      const result: GetUserResult = yield self.environment.api.UserApi.whoAmI(self.token);
      __DEV__ && console.tron.log(result);
      if (result.kind === "ok") {
        console.log(result);
        self.user = result.user;
        return result.user;
      } else {
        __DEV__ && console.tron.log(result.kind);
        console.log(result.kind);
        return;
      }
    }),
  }))
  .actions(self => ({
    setToken: (newToken: string) => {
      self.token = newToken;
      self.token_date = new Date();
      return;
    },
    login: flow(function* (email: string, password: string) {
      const result: TokenResult = yield self.environment.api.Auth.login(email, password);
      __DEV__ && console.tron.log(result);
      if (result.kind === "ok") {
        self.token = result.token;
        self.token_date = new Date();
        self.loadUser();
        return self.token;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return;
      }
    }),
    logout: () => {
      self.token = undefined;
      self.user = undefined;
      self.token_date = undefined;
      return;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    register: flow(function* (email: string, password: string, firstname: string, lastname: string, phone: string, gender: string) {
      const result: GeneralActionResult = yield self.environment.api.Auth.register(email, password, firstname, lastname, phone, gender);
      __DEV__ && console.tron.log(result);
      if (result.kind === "ok") {
        self.login(email, password);
        return;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return;
      }
    }),
  }))

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType { }
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType { }
