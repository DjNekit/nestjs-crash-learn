import { User } from './users/entity/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'test',
      entities: [
        // __dirname +'/../**/*.entity{.ts,.js}'
        User
      ],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    ChatsModule
  ]
})
export class AppModule {}
