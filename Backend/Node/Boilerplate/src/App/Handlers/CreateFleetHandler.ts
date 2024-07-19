import { CreateFleetCommand } from '../Commands/CreateFleetCommand';
import { Fleet } from '../../Domain/Models/Fleet';
import { FleetService } from '../Services/FleetService';

export class CreateFleetHandler {
    constructor(private fleetService: FleetService) {}

    async handle(command: CreateFleetCommand): Promise<Fleet> {
        return await this.fleetService.createFleet(command.userId);
    }
}
