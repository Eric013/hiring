import { AfterAll, Before } from '@cucumber/cucumber';

import { RegisterVehicleHandler } from '../../src/App/Handlers/RegisterVehicleHandler';
import { ParkVehicleHandler } from '../../src/App/Handlers/ParkVehicleHandler';
import { VehicleService } from '../../src/App/Services/VehicleService';
import { FleetService } from '../../src/App/Services/FleetService';
import { CucumberContext } from '../cucumberContext';
import { userData, vehicleData } from '../fixtures/mock';
import { AbstractRepositoryFactory } from '../../src/Domain/Factories/AbstractRepositoryFactory';

import {
    clearDatabase,
    closeDatabase,
    initializeDatabase,
} from '../setup/database';

AfterAll(async function () {
    await closeDatabase();
});

Before({ tags: '@memory' }, async function () {
    this.repositoryFactory = AbstractRepositoryFactory.createFactory('memory');
});

Before({ tags: '@db' }, async function () {
    await clearDatabase();
    await initializeDatabase();

    this.repositoryFactory =
        AbstractRepositoryFactory.createFactory('database');
});

Before({ tags: '@memory or @db' }, async function (this: CucumberContext) {
    this.users = [userData.user1, userData.user2];
    this.vehicles = [vehicleData.vehicle1, vehicleData.vehicle2];

    this.fleetRepository = this.repositoryFactory.createFleetRepository();
    this.vehicleRepository = this.repositoryFactory.createVehicleRepository();
    this.userRepository = this.repositoryFactory.createUserRepository();

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

    await this.userRepository.save(userData.user1);
    await this.userRepository.save(userData.user2);
});
