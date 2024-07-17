import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './src/Infra/TypeORM/Entities/UserEntity';
import { FleetEntity } from './src/Infra/TypeORM/Entities/FleetEntity';
import { VehicleEntity } from './src/Infra/TypeORM/Entities/VehicleEntity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [UserEntity, FleetEntity, VehicleEntity],
  migrations: ['src/Infra/TypeORM/migrations/*.ts'],
  subscribers: [],
});