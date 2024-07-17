import { FleetNotFoundError, VehicleAlreadyRegisteredError, VehicleIsAlreadyParkedAtLocationError, VehicleNotAPartOfFleetError, VehicleNotFoundError } from '../../Domain/Errors';
import { FleetRepository } from '../../Domain/Repositories/FleetRepository';
import { ParkVehicleCommand } from '../Commands/ParkVehicleCommand';
import { VehicleRepository } from '../../Domain/Repositories/VehicleRepository';

export class ParkVehicleHandler {
    constructor(
        private fleetRepository: FleetRepository,
        private vehicleRepository: VehicleRepository,
    ) {}

    async handle(command: ParkVehicleCommand): Promise<void> {
        const fleet = await this.fleetRepository.findById(command.fleetId);
        if (!fleet) {
            throw new FleetNotFoundError();
        }

        const vehicle = await this.vehicleRepository.findByPlateNumber(command.vehiclePlateNumber);
        if(!vehicle) {
            throw new VehicleNotFoundError();
        }

        const vehicleExistsInFleet = fleet.getVehicle(vehicle.plateNumber);
        if(!vehicleExistsInFleet) {
            throw new VehicleNotAPartOfFleetError();
        }

        if(vehicleExistsInFleet.getLocation()?.equals(command.location)) {
            throw new VehicleIsAlreadyParkedAtLocationError();
        }

        vehicleExistsInFleet.park(command.location);

        this.vehicleRepository.addLocation(vehicleExistsInFleet, command.location);
    }
}
