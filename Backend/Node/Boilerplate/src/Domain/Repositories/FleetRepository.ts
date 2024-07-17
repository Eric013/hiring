import { Fleet } from '../Entities/Fleet';
import { Vehicle } from '../Entities/Vehicle';

export interface FleetRepository {
    findById(fleetId: string): Promise<Fleet | undefined>;
    save(fleet: Fleet): Promise<void>;
    addVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void>;
}
