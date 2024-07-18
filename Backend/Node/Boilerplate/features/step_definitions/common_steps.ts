import { Given } from '@cucumber/cucumber';
import { Vehicle } from '../../src/Domain/Models/Vehicle';
import { fleetData, vehicleData } from '../fixtures/mock';
import { CucumberContext } from '../cucumberContext';

Given('my fleet', async function (this: CucumberContext) {
    const firstUser = this.users[0];
    const firstFleet = fleetData.fleet1;
    this.fleet = await this.fleetService.createFleet(
        firstUser.id,
        firstFleet.id,
    );
});

Given('a vehicle', function (this: CucumberContext) {
    this.vehicle = new Vehicle(vehicleData.vehicle1.plateNumber);
});

Given(
    'I have registered this vehicle into my fleet',
    async function (this: CucumberContext) {
        await this.fleetService.addVehicleToFleet(
            this.fleet,
            this.vehicle.plateNumber,
        );
    },
);
