import { Before } from '@cucumber/cucumber';

import { RegisterVehicleHandler } from '../../src/App/Handlers/RegisterVehicleHandler';
import { ParkVehicleHandler } from '../../src/App/Handlers/ParkVehicleHandler';
import { VehicleService } from '../../src/App/Services/VehicleService';
import { InMemoryFleetRepository } from '../../src/Infra/InMemory/InMemoryFleetRepository';
import { InMemoryVehicleRepository } from '../../src/Infra/InMemory/InMemoryVehicleRepository';

Before(function () {
    this.fleetRepository = new InMemoryFleetRepository();
    this.vehicleRepository = new InMemoryVehicleRepository();
    this.vehicleService = new VehicleService(
        this.vehicleRepository,
        this.fleetRepository,
    );
    this.registerVehicleHandler = new RegisterVehicleHandler(
        this.vehicleService,
    );
    this.parkVehicleHandler = new ParkVehicleHandler(this.vehicleService);
    this.error = null;
});
