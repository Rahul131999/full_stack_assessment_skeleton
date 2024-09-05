import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Home } from '../homes/home.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Home, home => home.users)
  @JoinTable({
    name: 'user_home_links',
    joinColumn: { name: 'user_id', referencedColumnName: 'user_id' },
    inverseJoinColumn: { name: 'home_id', referencedColumnName: 'home_id' },
  })
  homes: Home[];
}
