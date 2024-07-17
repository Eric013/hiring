import { AbstractRepositoryFactory } from '../Domain/Factories/AbstractRepositoryFactory';
import { RegisterVehicleHandler } from '../App/Handlers/RegisterVehicleHandler';

export const registerVehicleCommandAction = async (
    fleetId: string,
    vehiclePlateNumber: string,
) => {
    const repositoryFactory = AbstractRepositoryFactory.createFactory(
        process.env.STORAGE_TYPE === 'db' ? 'database' : 'memory',
    );

    const handler = new RegisterVehicleHandler(
        repositoryFactory.createFleetRepository(),
        repositoryFactory.createVehicleRepository(),
    );

    await handler.handle({ fleetId, plateNumber: vehiclePlateNumber });
    console.log(`Vehicle ${vehiclePlateNumber} registered in fleet ${fleetId}`);
};
