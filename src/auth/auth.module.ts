import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/models/users.model';
import { AuthController } from './auth.controller';
import { ServicesService } from './services/services.service';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [ServicesService],
})
export class AuthModule {}
