import { Before } from '@cucumber/cucumber';

import { RegisterVehicleHandler } from '../../src/App/Handlers/RegisterVehicleHandler';
import { ParkVehicleHandler } from '../../src/App/Handlers/ParkVehicleHandler';
import { VehicleService } from '../../src/App/Services/VehicleService';
import { InMemoryFleetRepository } from '../../src/Infra/InMemory/InMemoryFleetRepository';
import { InMemoryVehicleRepository } from '../../src/Infra/InMemory/InMemoryVehicleRepository';
import { FleetService } from '../../src/App/Services/FleetService';
import { CucumberContext } from '../cucumberContext';
import { InMemoryUserRepository } from '../../src/Infra/InMemory/InMemoryUserRepository';
import { userData, vehicleData } from '../fixtures/mock';

Before(function (this: CucumberContext) {
    this.users = [userData.user1, userData.user2];
    this.vehicles = [vehicleData.vehicle1, vehicleData.vehicle2];

    this.fleetRepository = new InMemoryFleetRepository();
    this.vehicleRepository = new InMemoryVehicleRepository();
    this.userRepository = new InMemoryUserRepository(this.users);

    this.fleetService = new FleetService(
        this.fleetRepository,
        this.userRepository,
        this.vehicleRepository,
    );
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
