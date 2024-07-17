import { ParkVehicleHandler } from '../src/App/Handlers/ParkVehicleHandler';
import { RegisterVehicleHandler } from '../src/App/Handlers/RegisterVehicleHandler';
import { Fleet } from '../src/Domain/Models/Fleet';
import { Location } from '../src/Domain/Models/Location';
import { FleetRepository } from '../src/Domain/Repositories/FleetRepository';
import { Vehicle } from '../src/Domain/Models/Vehicle';
import { VehicleRepository } from '../src/Domain/Repositories/VehicleRepository';

export interface CucumberContext {
    fleet: Fleet;
    otherFleet: Fleet;
    fleetRepository: FleetRepository;
    vehicleRepository: VehicleRepository;
    vehicle: Vehicle;
    location: Location;
    error: Error | null;
    registerVehicleHandler: RegisterVehicleHandler;
    parkVehicleHandler: ParkVehicleHandler;
}
