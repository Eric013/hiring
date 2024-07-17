import { AbstractRepositoryFactory } from '../Domain/Factories/AbstractRepositoryFactory';
import { ParkVehicleHandler } from '../App/Handlers/ParkVehicleHandler';
import { Location } from '../Domain/Models/Location';

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

    const handler = new ParkVehicleHandler(
        repositoryFactory.createFleetRepository(),
        repositoryFactory.createVehicleRepository(),
    );
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
        `Vehicle ${vehiclePlateNumber} localized at (${lat}, ${lng}, ${alt})`,
    );
};
