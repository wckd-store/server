import { JwtModule as JwtInnerModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';

const jwtModule = JwtInnerModule.register({secret: 'secretodemais', signOptions: {expiresIn: '5h'}});

@Module({
  imports: [
    jwtModule
  ],
  exports: [
    jwtModule
  ]
})
@Global()
export class JwtModule { }