import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('home')
export class Home {
  @PrimaryGeneratedColumn()
  home_id: number;

  @Column()
  street_address: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column('float')
  sqft: number;

  @Column('int')
  beds: number;

  @Column('int')
  baths: number;

  @Column('float')
  list_price: number;

  @ManyToMany(() => User, user => user.homes)
  users: User[];
}
