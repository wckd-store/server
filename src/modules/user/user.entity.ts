import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { RoleType } from '../role/role.type';
import { Roles } from '../role/role.population';

export class User extends TimeStamps {

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

  @prop({required: true, default: 'USER'})
  roleName: string;

  public get role(): RoleType {
    return Roles.find(role => {return role.name == this.roleName}) || Roles['USER'];
  }

}