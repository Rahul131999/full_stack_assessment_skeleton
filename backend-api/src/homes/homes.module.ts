import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomesService } from './homes.service';
import { HomesController } from './homes.controller';
import { Home } from './home.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Home, User])],
  providers: [HomesService],
  controllers: [HomesController],
})
export class HomesModule {}
