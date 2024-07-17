import { Vehicle } from './../Entities/Vehicle';
import { Location } from './../Entities/Location';

export interface VehicleRepository {
    findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined>;
    save(vehicle: Vehicle): Promise<void>;
    addLocation(vehicle: Vehicle, location: Location): Promise<void>;
}
