import { RepositoryFactory } from '../../../Domain/Factories/RepositoryFactory';
import { User } from '../../../Domain/Models/User';
import { FleetRepository } from '../../../Domain/Repositories/FleetRepository';
import { UserRepository } from '../../../Domain/Repositories/UserRepository';
import { VehicleRepository } from '../../../Domain/Repositories/VehicleRepository';
import { TypeORMFleetRepository } from './TypeORMFleetRepository';
import { TypeORMUserRepository } from './TypeORMUserRepository';
import { TypeORMVehicleRepository } from './TypeORMVehicleRepository';

export class TypeORMRepositoryFactory implements RepositoryFactory {
    createFleetRepository(): FleetRepository {
        return new TypeORMFleetRepository();
    }

    createUserRepository(users?: User[]): UserRepository {
        return new TypeORMUserRepository(users);
    }

    createVehicleRepository(): VehicleRepository {
        return new TypeORMVehicleRepository();
    }
}
