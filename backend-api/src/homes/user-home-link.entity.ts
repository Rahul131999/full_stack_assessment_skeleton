import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Home } from './home.entity';

@Entity('user_home_links')
export class UserHomeLink {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  home_id: number;

  @ManyToOne(() => User, user => user.homes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Home, home => home.users, { onDelete: 'CASCADE' })
  home: Home;
}
