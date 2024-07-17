import { FleetRepository } from '../../Domain/Repositories/FleetRepository';
import { UserRepository } from '../../Domain/Repositories/UserRepository';
import { CreateFleetCommand } from '../Commands/CreateFleetCommand';
import { Fleet } from '../../Domain/Models/Fleet';
import { UserNotFoundError } from '../../Domain/Errors';

export class CreateFleetHandler {
    constructor(
        private fleetRepository: FleetRepository,
        private userRepository: UserRepository,
    ) {}

    async handle(command: CreateFleetCommand): Promise<string> {
        const user = await this.userRepository.findById(command.userId);
        if (!user) throw new UserNotFoundError();

        const fleet = new Fleet(command.userId);
        await this.fleetRepository.save(fleet);
        return fleet.id;
    }
}
