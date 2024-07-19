import { RepositoryFactory } from '../../Domain/Factories/RepositoryFactory';
import { FleetRepository } from '../../Domain/Repositories/FleetRepository';
import { UserRepository } from '../../Domain/Repositories/UserRepository';
import { VehicleRepository } from '../../Domain/Repositories/VehicleRepository';
import { InMemoryFleetRepository } from '../InMemory/InMemoryFleetRepository';
import { InMemoryUserRepository } from '../InMemory/InMemoryUserRepository';
import { InMemoryVehicleRepository } from '../InMemory/InMemoryVehicleRepository';

export class InMemoryRepositoryFactory implements RepositoryFactory {
    createFleetRepository(): FleetRepository {
        return new InMemoryFleetRepository();
    }

    createUserRepository(): UserRepository {
        return new InMemoryUserRepository();
    }

    createVehicleRepository(): VehicleRepository {
        return new InMemoryVehicleRepository();
    }
}
