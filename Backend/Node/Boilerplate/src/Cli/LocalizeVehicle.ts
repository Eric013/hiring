import { AbstractRepositoryFactory } from '../Domain/Factories/AbstractRepositoryFactory';
import { ParkVehicleHandler } from '../App/Handlers/ParkVehicleHandler';
import { Location } from '../Domain/Models/Location';
import { VehicleService } from '../App/Services/VehicleService';

export const localizeVehicleCommandAction = async (
    fleetId: string,
    vehiclePlateNumber: string,
    lat: string,
    lng: string,
    alt: string,
) => {
    const repositoryFactory = AbstractRepositoryFactory.createFactory(
        process.env.STORAGE_TYPE === 'db' ? 'database' : 'memory',
    );

    const vehicleService = new VehicleService(
        repositoryFactory.createVehicleRepository(),
        repositoryFactory.createFleetRepository(),
    );
    const handler = new ParkVehicleHandler(vehicleService);
    const location = new Location(
        parseFloat(lat),
        parseFloat(lng),
        alt ? parseFloat(alt) : 0,
    );

    await handler.handle({
        fleetId,
        vehiclePlateNumber,
        location,
    });
    console.log(
        `Vehicle ${vehiclePlateNumber} localized at (${location.latitude}, ${location.longitude}, ${location.altitude})`,
    );
};
