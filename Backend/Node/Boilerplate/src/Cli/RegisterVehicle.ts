import { AbstractRepositoryFactory } from '../Domain/Factories/AbstractRepositoryFactory';
import { RegisterVehicleHandler } from '../App/Handlers/RegisterVehicleHandler';
import { VehicleService } from '../App/Services/VehicleService';

export const registerVehicleCommandAction = async (
    fleetId: string,
    vehiclePlateNumber: string,
) => {
    const repositoryFactory = AbstractRepositoryFactory.createFactory(
        process.env.STORAGE_TYPE === 'db' ? 'database' : 'memory',
    );

    const vehicleService = new VehicleService(
        repositoryFactory.createVehicleRepository(),
        repositoryFactory.createFleetRepository(),
    );

    const handler = new RegisterVehicleHandler(vehicleService);

    await handler.handle({ fleetId, plateNumber: vehiclePlateNumber });
    console.log(`Vehicle ${vehiclePlateNumber} registered in fleet ${fleetId}`);
};
