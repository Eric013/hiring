import { AbstractRepositoryFactory } from '../Domain/Factories/AbstractRepositoryFactory';
import { CreateFleetHandler } from '../App/Handlers/CreateFleetHandler';

export const createFleetCommandAction = async (userId: string) => {
    const repositoryFactory = AbstractRepositoryFactory.createFactory(
        process.env.STORAGE_TYPE === 'db' ? 'database' : 'memory',
    );
    const handler = new CreateFleetHandler(
        repositoryFactory.createFleetRepository(),
        repositoryFactory.createUserRepository(),
    );
    const fleetId = await handler.handle({ userId });
    console.log(`Fleet created with ID: ${fleetId}`);
};
