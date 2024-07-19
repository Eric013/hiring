import { RepositoryFactory } from './../src/Domain/Factories/RepositoryFactory';
import { ParkVehicleHandler } from '../src/App/Handlers/ParkVehicleHandler';
import { RegisterVehicleHandler } from '../src/App/Handlers/RegisterVehicleHandler';
import { Fleet } from '../src/Domain/Models/Fleet';
import { Location } from '../src/Domain/Models/Location';
import { FleetRepository } from '../src/Domain/Repositories/FleetRepository';
import { Vehicle } from '../src/Domain/Models/Vehicle';
import { VehicleRepository } from '../src/Domain/Repositories/VehicleRepository';
import { VehicleService } from '../src/App/Services/VehicleService';
import { FleetService } from '../src/App/Services/FleetService';
import { UserRepository } from '../src/Domain/Repositories/UserRepository';
import { User } from '../src/Domain/Models/User';

export interface CucumberContext {
    repositoryFactory: RepositoryFactory;
    users: User[];
    vehicles: Pick<Vehicle, 'plateNumber'>[];
    fleet: Fleet;
    otherFleet: Fleet;
    userRepository: UserRepository;
    fleetRepository: FleetRepository;
    vehicleRepository: VehicleRepository;
    fleetService: FleetService;
    vehicleService: VehicleService;
    vehicle: Vehicle;
    location: Location;
    error: Error | null;
    registerVehicleHandler: RegisterVehicleHandler;
    parkVehicleHandler: ParkVehicleHandler;
}
