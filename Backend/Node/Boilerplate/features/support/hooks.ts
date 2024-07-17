import { VehicleRepository } from './../../src/Domain/Repositories/VehicleRepository';
import { Before } from '@cucumber/cucumber';

import { RegisterVehicleHandler } from '../../src/App/Handlers/RegisterVehicleHandler';
import { ParkVehicleHandler } from '../../src/App/Handlers/ParkVehicleHandler';
import { InMemoryFleetRepository } from '../../src/Infra/InMemory/InMemoryFleetRepository';
import { InMemoryVehicleRepository } from '../../src/Infra/InMemory/InMemoryVehicleRepository';

Before(function () {
    this.fleetRepository = new InMemoryFleetRepository();
    this.vehicleRepository = new InMemoryVehicleRepository();
    this.registerVehicleHandler = new RegisterVehicleHandler(this.fleetRepository, this.vehicleRepository);
    this.parkVehicleHandler = new ParkVehicleHandler(this.fleetRepository, this.vehicleRepository);
    this.error = null;
});