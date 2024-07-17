import { Vehicle } from '../Models/Vehicle';
import { Location } from '../Models/Location';

export interface VehicleRepository {
    findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined>;
    save(vehicle: Vehicle): Promise<void>;
    addLocation(vehicle: Vehicle, location: Location): Promise<void>;
}
