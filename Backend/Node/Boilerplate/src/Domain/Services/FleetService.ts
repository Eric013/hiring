import { Fleet } from '../Models/Fleet';

export interface FleetService {
    createFleet(userId: string): Promise<Fleet>;
    addVehicleToFleet(fleet: Fleet, plateNumber: string): Promise<void>;
    getFleet(fleet: Fleet): Promise<Fleet | undefined>;
}
