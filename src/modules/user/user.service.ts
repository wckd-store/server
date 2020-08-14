import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { User } from './user.entity';
import { SnowflakeService } from '../snowflake/snowflake.service';
import { PasswordService } from '../password/password.service';

@Injectable()
export class UserService {

  constructor (
    private readonly snowflakeService: SnowflakeService,
    private readonly passwordService: PasswordService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(user: User): Promise<User> {
    return new this.userModel({
      id: this.snowflakeService.create(),
      password: this.passwordService.hash(user.password),
      ...user
    }).save();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({id})
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email});
  }

  async updateById(id: string, update: User): Promise<User> {
    return this.userModel.findOneAndUpdate({id}, update, {omitUndefined: true});
  }

  async deleteById(id: string): Promise<User> {
    return this.userModel.findOneAndDelete({id});
  }

}