import {
    FleetNotFoundError,
    VehicleAlreadyRegisteredError,
    VehicleIsAlreadyParkedAtLocationError,
    VehicleNotAPartOfFleetError,
    VehicleNotFoundError,
} from '../../Domain/Errors';
import { Vehicle } from '../../Domain/Models/Vehicle';
import { FleetRepository } from '../../Domain/Repositories/FleetRepository';
import { VehicleRepository } from '../../Domain/Repositories/VehicleRepository';
import { Location } from '../../Domain/Models/Location';
import { VehicleService as IVehicleService } from '../../Domain/Services/VehicleService';

export class VehicleService implements IVehicleService {
    constructor(
        private vehicleRepository: VehicleRepository,
        private fleetRepository: FleetRepository,
    ) {}

    async registerVehicle(
        fleetId: string,
        plateNumber: string,
    ): Promise<Vehicle> {
        const fleetFound = await this.fleetRepository.findById(fleetId);
        if (!fleetFound) {
            throw new FleetNotFoundError();
        }

        let vehicle =
            await this.vehicleRepository.findByPlateNumber(plateNumber);
        if (!vehicle) {
            vehicle = new Vehicle(plateNumber);
        } else if (fleetFound.getVehicle(vehicle.plateNumber)) {
            throw new VehicleAlreadyRegisteredError();
        }

        await this.fleetRepository.addVehicle(fleetFound, vehicle);
        return vehicle;
    }

    async parkVehicle(
        fleetId: string,
        vehiclePlateNumber: string,
        location: Location,
    ): Promise<void> {
        const fleetFound = await this.fleetRepository.findById(fleetId);
        if (!fleetFound) {
            throw new FleetNotFoundError();
        }

        const vehicleFound =
            await this.vehicleRepository.findByPlateNumber(vehiclePlateNumber);
        if (!vehicleFound) {
            throw new VehicleNotFoundError();
        }

        const vehicleExistsInFleet = fleetFound.getVehicle(
            vehicleFound.plateNumber,
        );

        if (!vehicleExistsInFleet) {
            throw new VehicleNotAPartOfFleetError();
        }

        if (vehicleExistsInFleet.getLocation()?.equals(location)) {
            throw new VehicleIsAlreadyParkedAtLocationError();
        }

        vehicleExistsInFleet.park(location);

        this.vehicleRepository.addLocation(vehicleExistsInFleet, location);
    }

    async getVehicle(plateNumber: string): Promise<Vehicle | undefined> {
        return this.vehicleRepository.findByPlateNumber(plateNumber);
    }
}
