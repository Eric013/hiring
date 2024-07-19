import { User } from '../Models/User';
import { FleetRepository } from '../Repositories/FleetRepository';
import { UserRepository } from '../Repositories/UserRepository';
import { VehicleRepository } from '../Repositories/VehicleRepository';

export interface RepositoryFactory {
    createFleetRepository(): FleetRepository;
    createUserRepository(users?: User[]): UserRepository;
    createVehicleRepository(): VehicleRepository;
}
