import { VehicleRepository } from '../../Domain/Repositories/VehicleRepository';
import { Vehicle } from '../../Domain/Entities/Vehicle';
import { Location } from '../../Domain/Entities/Location';

export class InMemoryVehicleRepository implements VehicleRepository {
    private vehicles: Map<string, Vehicle> = new Map();

    async findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
        return this.vehicles.get(plateNumber);
    }

    async save(vehicle: Vehicle): Promise<void> {
        this.vehicles.set(vehicle.plateNumber, vehicle);
    }

    async addLocation(vehicle: Vehicle, location: Location): Promise<void> {
        const vehicleFound = this.vehicles.get(vehicle.plateNumber);
        if (vehicleFound) {
            vehicleFound.setLocation(location);
        }
    }
}
