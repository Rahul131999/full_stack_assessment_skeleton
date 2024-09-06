import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from './home.entity';
import { User } from '../users/user.entity';

@Injectable()
export class HomesService {
  constructor(
    @InjectRepository(Home)
    private homesRepository: Repository<Home>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUser(userId: number, page: number): Promise<Home[]> {
    const take = 16;
    const skip = (page - 1) * take;
    
    return this.homesRepository
      .createQueryBuilder('home')
      .leftJoinAndSelect('home.users', 'user')  // Join and select related users
      .where('user.user_id = :userId', { userId })
      .skip(skip)
      .take(take)
      .getMany();

  }

  async updateUsers(homeId: number, userIds: number[]): Promise<Home> {
    const home = await this.homesRepository.findOne({ where: { home_id: homeId }, relations: ['users'] });

    if (!home) {
      throw new Error('Home not found');
    }

    const users = await this.usersRepository.findByIds(userIds);

    if (!users.length) {
      throw new Error('At least one user must be selected');
    }

    home.users = users;
    return this.homesRepository.save(home);
  }
}
