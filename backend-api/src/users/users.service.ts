import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['homes'] });
  }

  findByHome(homeId: number): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.homes', 'home', 'home.home_id = :homeId', { homeId })
      .getMany();
  }
}
