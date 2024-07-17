import { AppDataSource } from '../../../../datasource';
import { VehicleRepository } from '../../../Domain/Repositories/VehicleRepository';
import { VehicleEntity } from '../Entities/VehicleEntity';
import { Vehicle } from '../../../Domain/Entities/Vehicle';
import { Location } from '../../../Domain/Entities/Location';
import { VehicleIsAlreadyParkedAtLocationError, VehicleNotFoundError } from '../../../Domain/Errors';

export class TypeORMVehicleRepository implements VehicleRepository {
    private repository = AppDataSource.getRepository(VehicleEntity);

    async findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
        const vehicleEntity = await this.repository.findOne({
            where: { plateNumber },
        });
        if (!vehicleEntity) return undefined;

        const location = vehicleEntity.location
            ? new Location(
                  vehicleEntity.location.latitude,
                  vehicleEntity.location.longitude,
                  vehicleEntity.location.altitude,
              )
            : undefined;

        return new Vehicle(vehicleEntity.plateNumber, location);
    }

    async save(vehicle: Vehicle): Promise<void> {
        const vehicleEntity = new VehicleEntity();
        vehicleEntity.plateNumber = vehicle.plateNumber;
        const location = vehicle.getLocation();
        if (location) {
            vehicleEntity.location = {
                latitude: location.latitude,
                longitude: location.longitude,
                altitude: location.altitude,
            };
        } else {
            vehicleEntity.location = null;
        }
        await this.repository.save(vehicleEntity);
    }

    async addLocation(vehicle: Vehicle, location: Location): Promise<void> {
        const vehicleFound = await this.findByPlateNumber(vehicle.plateNumber);

        if (!vehicleFound) {
            throw new VehicleNotFoundError();
        }

        const currentLocationIfIsExist = vehicleFound.getLocation();
        if(currentLocationIfIsExist && currentLocationIfIsExist.equals(location)) {
            throw new VehicleIsAlreadyParkedAtLocationError();
        }

        vehicleFound.setLocation(location);

        await this.repository.update({plateNumber: vehicleFound.plateNumber}, {
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                altitude: location.altitude || 0,
            }
        });
    }
}
