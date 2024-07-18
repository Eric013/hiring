import { ParkVehicleCommand } from '../Commands/ParkVehicleCommand';
import { VehicleService } from '../Services/VehicleService';

export class ParkVehicleHandler {
    constructor(private vehicleService: VehicleService) {}

    async handle(command: ParkVehicleCommand): Promise<void> {
        await this.vehicleService.parkVehicle(
            command.fleetId,
            command.vehiclePlateNumber,
            command.location,
        );
    }
}
