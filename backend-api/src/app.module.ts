import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { HomesModule } from './homes/homes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Specify MySQL as the database type
      host: 'localhost', // Your MySQL host (usually localhost)
      port: 3306, // Default MySQL port
      username: 'new_user', // Your MySQL username
      password: 'new_password', // Your MySQL password
      database: 'home_db', // Your database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Automatically sync entities with the database (disable in production)
    }),
    UsersModule,
    HomesModule,
  ],
})
export class AppModule {}
