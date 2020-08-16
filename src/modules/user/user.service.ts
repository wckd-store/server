import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { User } from './user.entity';
import { SnowflakeService } from '../snowflake/snowflake.service';
import { PasswordService } from '../password/password.service';
import { UserCreateDto, UserUpdateDto } from './user.dto';

@Injectable()
export class UserService {

  constructor(
    private readonly snowflakeService: SnowflakeService,
    private readonly passwordService: PasswordService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(user: UserCreateDto): Promise<User> {
    return new this.userModel({
      ...user,
      id: this.snowflakeService.create(),
      password: await this.passwordService.hash(user.password),
    }).save();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({ id });
  }

  async existsById(id: string): Promise<boolean> {
    return this.userModel.exists({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.userModel.exists({ email });
  }

  async updateById(id: string, update: UserUpdateDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ id }, update, { omitUndefined: true });
  }

  async deleteById(id: string): Promise<User> {
    return this.userModel.findOneAndDelete({ id });
  }


}