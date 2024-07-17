import { FleetRepository } from '../../../Domain/Repositories/FleetRepository';
import { FleetEntity } from '../Entities/FleetEntity';
import { Fleet } from '../../../Domain/Entities/Fleet';
import { Vehicle } from '../../../Domain/Entities/Vehicle';
import { AppDataSource } from '../../../../datasource';
import { Location } from '../../../Domain/Entities/Location';
import { VehicleEntity } from '../Entities/VehicleEntity';
import {
    FleetNotFoundError,
    VehicleAlreadyRegisteredError,
} from '../../../Domain/Errors';

export class TypeORMFleetRepository implements FleetRepository {
    private repository = AppDataSource.getRepository(FleetEntity);
    private vehicleRepository = AppDataSource.getRepository(VehicleEntity);

    async findById(fleetId: string): Promise<Fleet | undefined> {
        const fleetEntity = await this.repository.findOne({
            where: {
                id: fleetId,
            },
            relations: { vehicles: true },
        });
        if (!fleetEntity) {
            throw new FleetNotFoundError();
        }

        const vehicles = fleetEntity.vehicles.map(
            (v) =>
                new Vehicle(
                    v.plateNumber,
                    v.location
                        ? new Location(
                              v.location.latitude,
                              v.location.longitude,
                              v.location.altitude,
                          )
                        : undefined,
                ),
        );
        return new Fleet(fleetEntity.userId, fleetEntity.id, vehicles);
    }

    async save(fleet: Fleet): Promise<void> {
        const fleetEntity = new FleetEntity();
        fleetEntity.id = fleet.id;
        fleetEntity.userId = fleet.userId;
        fleetEntity.vehicles = fleet.getVehicles().map((vehicle) => {
            const vehicleEntity = new VehicleEntity();
            vehicleEntity.plateNumber = vehicle.plateNumber;
            const location = vehicle.getLocation();
            if (location) {
                vehicleEntity.location = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    altitude: location.altitude,
                };
            }
            return vehicleEntity;
        });
        await this.repository.save(fleetEntity);
    }

    async addVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void> {
        const fleetEntity = await this.repository.findOne({
            where: {
                id: fleet.id,
            },
            relations: { vehicles: true },
        });
        if (!fleetEntity) {
            throw new FleetNotFoundError();
        }

        let vehicleEntity = await this.vehicleRepository.findOne({
            where: {
                plateNumber: vehicle.plateNumber,
            },
        });

        if (!vehicleEntity) {
            vehicleEntity = new VehicleEntity();
            vehicleEntity.plateNumber = vehicle.plateNumber;
            const location = vehicle.getLocation();

            if (location) {
                vehicleEntity.location = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    altitude: location.altitude,
                };
            }
            await this.vehicleRepository.save(vehicleEntity);
        }

        if(!fleetEntity.vehicles.some((v) => v.plateNumber === vehicle.plateNumber)) {
            fleetEntity.vehicles.push(vehicleEntity);
            await this.repository.save(fleetEntity);
        }
    }
}
