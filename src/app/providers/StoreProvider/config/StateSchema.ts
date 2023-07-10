import { UserSchema } from "entites/User";
import { CounterSchema } from "../../../../entites/Counter";

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
}