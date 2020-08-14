import { prop } from '@typegoose/typegoose'

export class User {

  @prop({required: true, unique: true})
  readonly id: string;

  @prop({required: true})
  name: string;

  @prop({required: true})
  surname: string;

  @prop({required: true, unique: true})
  email: string;

  @prop({required: true})
  password: string;

}