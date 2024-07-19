import {
    FleetNotFoundError,
    VehicleAlreadyRegisteredError,
} from '../../Domain/Errors';
import { Fleet } from '../../Domain/Models/Fleet';
import { Vehicle } from '../../Domain/Models/Vehicle';
import { FleetRepository } from '../../Domain/Repositories/FleetRepository';

export class InMemoryFleetRepository implements FleetRepository {
    private fleets: Map<string, Fleet> = new Map();

    async findById(fleetId: string): Promise<Fleet | undefined> {
        return Promise.resolve(this.fleets.get(fleetId));
    }

    async save(fleet: Fleet): Promise<void> {
        Promise.resolve(this.fleets.set(fleet.id, fleet));
    }

    async addVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void> {
        const fleetFound = this.fleets.get(fleet.id);
        if (!fleetFound) {
            throw new FleetNotFoundError();
        }

        if (this.fleets.get(vehicle.plateNumber)) {
            throw new VehicleAlreadyRegisteredError();
        }

        this.fleets.set(fleet.id, fleetFound);
        Promise.resolve();
    }
}
