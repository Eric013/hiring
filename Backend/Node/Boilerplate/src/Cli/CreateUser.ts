import { AbstractRepositoryFactory } from '../Domain/Factories/AbstractRepositoryFactory';
import { CreateUserHandler } from '../App/Handlers/CreateUserHandler';
import { UserService } from '../App/Services/UserService';

export const createUserCommandAction = async (
    userId: string,
    userName: string,
) => {
    try {
        console.log('Creating user...');

        const repositoryFactory = AbstractRepositoryFactory.createFactory(
            process.env.STORAGE_TYPE === 'db' ? 'database' : 'memory',
        );
        const userService = new UserService(
            repositoryFactory.createUserRepository(),
        );
        const handler = new CreateUserHandler(userService);
        await handler.handle({ userId, userName });
        console.log(`User created with ID: ${userId}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
