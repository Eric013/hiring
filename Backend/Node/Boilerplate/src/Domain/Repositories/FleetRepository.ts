import { Fleet } from '../Models/Fleet';
import { Vehicle } from '../Models/Vehicle';

export interface FleetRepository {
    findById(fleetId: string): Promise<Fleet | undefined>;
    save(fleet: Fleet): Promise<void>;
    addVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void>;
}
