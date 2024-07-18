import { UserRepository } from './../../Domain/Repositories/UserRepository';
import { FleetService as IFleetService } from '../../Domain/Services/FleetService';
import { FleetRepository } from '../../Domain/Repositories/FleetRepository';
import { Fleet } from '../../Domain/Models/Fleet';
import { Vehicle } from '../../Domain/Models/Vehicle';
import {
    FleetNotFoundError,
    UserNotFoundError,
    VehicleAlreadyRegisteredError,
} from '../../Domain/Errors';
import { VehicleRepository } from '../../Domain/Repositories/VehicleRepository';

export class FleetService implements IFleetService {
    constructor(
        private fleetRepository: FleetRepository,
        private userRepository: UserRepository,
        private vehicleRepository: VehicleRepository,
    ) {}

    async createFleet(userId: string, fleetId?: string): Promise<Fleet> {
        const userFound = await this.userRepository.findById(userId);
        if (!userFound) {
            throw new UserNotFoundError();
        }

        const fleet = new Fleet(userFound.id, fleetId);
        await this.fleetRepository.save(fleet);
        return fleet;
    }

    async addVehicleToFleet(fleet: Fleet, plateNumber: string): Promise<void> {
        const fleetFound = await this.fleetRepository.findById(fleet.id);
        if (!fleetFound) {
            throw new FleetNotFoundError();
        }

        let vehicle =
            await this.vehicleRepository.findByPlateNumber(plateNumber);
        if (!vehicle) {
            vehicle = new Vehicle(plateNumber);
            await this.vehicleRepository.save(vehicle);
        } else if (fleet.getVehicle(plateNumber)) {
            throw new VehicleAlreadyRegisteredError();
        }

        // fleetFound.registerVehicle(vehicle);
        await this.fleetRepository.addVehicle(fleetFound, vehicle);
    }

    async getFleet(fleet: Fleet): Promise<Fleet | undefined> {
        return this.fleetRepository.findById(fleet.id);
    }
}
