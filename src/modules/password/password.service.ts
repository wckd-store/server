import { Injectable } from '@nestjs/common';
import * as argon2 from "argon2";

@Injectable()
export class PasswordService {

  async hash(password: string): Promise<string> {
    try {
      return argon2.hash(password)
    } catch (exception) {
      throw exception;
    }
  }

  async checkHash(hash: string, password: string): Promise<boolean> {
    try {
      return argon2.verify(hash, password);
    } catch (exception) {
      throw exception;
    }
  }

}