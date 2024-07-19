import { VehicleRepository } from '../../Domain/Repositories/VehicleRepository';
import { Vehicle } from '../../Domain/Models/Vehicle';
import { Location } from '../../Domain/Models/Location';
import { VehicleNotFoundError } from '../../Domain/Errors';

export class InMemoryVehicleRepository implements VehicleRepository {
    private vehicles: Map<string, Vehicle> = new Map();

    constructor(vehicles: Vehicle[] = []) {
        this.vehicles = new Map(
            vehicles.map((vehicle) => [vehicle.plateNumber, vehicle]),
        );
    }

    async findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
        return Promise.resolve(this.vehicles.get(plateNumber));
    }

    async save(vehicle: Vehicle): Promise<void> {
        Promise.resolve(this.vehicles.set(vehicle.plateNumber, vehicle));
    }

    async addLocation(vehicle: Vehicle, location: Location): Promise<void> {
        const vehicleFound = this.vehicles.get(vehicle.plateNumber);
        if (!vehicleFound) {
            throw new VehicleNotFoundError();
        }
        Promise.resolve(vehicleFound.setLocation(location));
    }
}
