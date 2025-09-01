import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [JwtModule.register({
        secret: "jwt_secret",
        signOptions: {expiresIn: "1d"}
      }), PrismaModule],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
