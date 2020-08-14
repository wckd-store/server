import { PassportStrategy } from '@nestjs/passport';
import { Strategy as Local } from 'passport-local';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Local) {}