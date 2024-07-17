import { FleetNotFoundError, VehicleAlreadyRegisteredError } from '../../Domain/Errors';
import { Vehicle } from '../../Domain/Entities/Vehicle';
import { RegisterVehicleCommand } from '../Commands/RegisterVehicleCommand';
import { FleetRepository } from '../../Domain/Repositories/FleetRepository';
import { VehicleRepository } from '../../Domain/Repositories/VehicleRepository';

export class RegisterVehicleHandler {
    constructor(private fleetRepository: FleetRepository, private vehicleRepository: VehicleRepository) {}

    async handle(command: RegisterVehicleCommand): Promise<void> {
        const fleet = await this.fleetRepository.findById(command.fleetId);
        if(!fleet) {
            throw new FleetNotFoundError();
        }

        let vehicle = await this.vehicleRepository.findByPlateNumber(command.plateNumber);
        if(!vehicle) {
            vehicle = new Vehicle(command.plateNumber);
        } else if(fleet.getVehicle(vehicle.plateNumber)) {
            throw new VehicleAlreadyRegisteredError();
        }

        fleet.registerVehicle(vehicle);

        await this.fleetRepository.addVehicle(fleet, vehicle);
    }
}