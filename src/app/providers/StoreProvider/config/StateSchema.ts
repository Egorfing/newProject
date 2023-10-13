import { UserSchema } from "entites/User";
import { LoginSchema } from "features/AuthByUsername";
import { CounterSchema } from "../../../../entites/Counter";

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  loginForm: LoginSchema
}