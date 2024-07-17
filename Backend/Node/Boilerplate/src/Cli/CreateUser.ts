import { AbstractRepositoryFactory } from '../Domain/Factories/AbstractRepositoryFactory';
import { CreateUserHandler } from '../App/Handlers/CreateUserHandler';

export const createUserCommandAction = async (
    userId: string,
    userName: string,
) => {
    try {
        console.log('Creating user...');

        const repositoryFactory = AbstractRepositoryFactory.createFactory(
            process.env.STORAGE_TYPE === 'db' ? 'database' : 'memory',
        );
        const handler = new CreateUserHandler(
            repositoryFactory.createUserRepository(),
        );
        await handler.handle({ userId, userName });
        console.log(`User created with ID: ${userId}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
