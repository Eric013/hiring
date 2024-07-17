import { VehicleAlreadyRegisteredError, VehicleNotFoundError } from '../Errors';
import { Location } from './Location';
import { Vehicle } from './Vehicle';

export class Fleet {
    private vehicles: Map<string, Vehicle> = new Map();
    public id: string;

    constructor(
        public userId: string,
        id?: string,
        vehicles?: Vehicle[],
    ) {
        if (vehicles) {
            this.vehicles = new Map(
                vehicles.map((vehicle) => [vehicle.plateNumber, vehicle]),
            );
        }

        this.id = id ?? `fleet-${Math.random().toString(36).substring(7)}`;
    }

    getVehicles(): Vehicle[] {
        return Array.from(this.vehicles.values());
    }

    registerVehicle(vehicle: Vehicle): void {
        if (this.vehicles.has(vehicle.plateNumber)) {
            throw new VehicleAlreadyRegisteredError();
        }
        this.vehicles.set(vehicle.plateNumber, vehicle);
    }

    parkVehicle(vehicle: Vehicle, location: Location): void {
        const vehicleFound = this.getVehicle(vehicle.plateNumber);
        vehicleFound?.park(location);
    }

    getVehicle(plateNumber: string): Vehicle | undefined {
        const vehicleFound = this.vehicles.get(plateNumber);
        if (!vehicleFound) {
            throw new VehicleNotFoundError();
        }

        return this.vehicles.get(plateNumber);
    }
}
