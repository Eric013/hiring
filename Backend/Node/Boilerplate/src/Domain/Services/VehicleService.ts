import { Vehicle } from '../Models/Vehicle';
import { Location } from '../Models/Location';

export interface VehicleService {
    registerVehicle(fleetId: string, plateNumber: string): Promise<Vehicle>;
    parkVehicle(
        fleetId: string,
        vehiclePlateNumber: string,
        location: Location,
    ): Promise<void>;
    getVehicle(plateNumber: string): Promise<Vehicle | undefined>;
}
