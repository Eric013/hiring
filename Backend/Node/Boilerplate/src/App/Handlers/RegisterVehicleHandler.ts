import { RegisterVehicleCommand } from '../Commands/RegisterVehicleCommand';
import { VehicleService } from '../Services/VehicleService';

export class RegisterVehicleHandler {
    constructor(private vehicleService: VehicleService) {}

    async handle(command: RegisterVehicleCommand): Promise<void> {
        await this.vehicleService.registerVehicle(
            command.fleetId,
            command.plateNumber,
        );
    }
}
