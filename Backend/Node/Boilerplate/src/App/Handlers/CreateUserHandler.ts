import { UserService } from './../../Domain/Services/UserService';
import { User } from '../../Domain/Models/User';
import { CreateUserCommand } from '../Commands/CreateUserCommand';

export class CreateUserHandler {
    constructor(private userService: UserService) {}

    async handle(command: CreateUserCommand): Promise<void> {
        await this.userService.createUser(command.userId, command.userName);
    }
}
