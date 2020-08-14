import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { User } from './user.entity';
import { SnowflakeService } from '../snowflake/snowflake.service';


@Injectable()
export class UserService {

  constructor (
    private readonly snowflakeService: SnowflakeService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(user: User): Promise<User> {
    return new this.userModel({id: this.snowflakeService.create(), ...user }).save();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({id})
  }

}