import { AbstractRepositoryFactory } from '../Domain/Factories/AbstractRepositoryFactory';
import { CreateFleetHandler } from '../App/Handlers/CreateFleetHandler';
import { FleetService } from '../App/Services/FleetService';

export const createFleetCommandAction = async (userId: string) => {
    const repositoryFactory = AbstractRepositoryFactory.createFactory(
        process.env.STORAGE_TYPE === 'db' ? 'database' : 'memory',
    );

    const fleetService = new FleetService(
        repositoryFactory.createFleetRepository(),
        repositoryFactory.createUserRepository(),
        repositoryFactory.createVehicleRepository(),
    );

    const handler = new CreateFleetHandler(fleetService);
    const { id: fleetId } = await handler.handle({ userId });
    console.log(`Fleet created with ID: ${fleetId}`);
};
