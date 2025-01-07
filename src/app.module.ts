import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';
import { AppDataSource } from './datasource.migration';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entities/project.entity';
import { DevsModule } from './devs/devs.module';
import { Dev } from './devs/entities/dev.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Client, Project, Dev],
        migrations: ['dist/migrations/*.js'],
        dataSource: AppDataSource,
      }),
    }),
    ClientsModule,
    ProjectsModule,
    DevsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
