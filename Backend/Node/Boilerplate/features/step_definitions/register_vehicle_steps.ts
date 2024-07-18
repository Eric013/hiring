import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { RegisterVehicleCommand } from '../../src/App/Commands/RegisterVehicleCommand';
import {
    FleetNotFoundError,
    VehicleAlreadyRegisteredError,
} from '../../src/Domain/Errors';
import { CucumberContext } from '../cucumberContext';
import { fleetData, userData } from '../fixtures/mock';

Given('the fleet of another user', async function (this: CucumberContext) {
    const secondUser = userData.user2;
    const secondFleet = fleetData.fleet2;
    this.otherFleet = await this.fleetService.createFleet(
        secondUser.id,
        secondFleet.id,
    );
});

Given(
    "this vehicle has been registered into the other user's fleet",
    function (this: CucumberContext) {
        const command = new RegisterVehicleCommand(
            this.otherFleet.id,
            this.vehicle.plateNumber,
        );
        this.registerVehicleHandler.handle(command);
    },
);

When('I register this vehicle into my fleet', function (this: CucumberContext) {
    try {
        const command = new RegisterVehicleCommand(
            this.fleet.id,
            this.vehicle.plateNumber,
        );
        this.registerVehicleHandler.handle(command);
    } catch (e) {
        this.error = e as Error;
    }
});

When(
    'I try to register this vehicle into my fleet',
    async function (this: CucumberContext) {
        try {
            const command = new RegisterVehicleCommand(
                this.fleet.id,
                this.vehicle.plateNumber,
            );
            await this.registerVehicleHandler.handle(command);
        } catch (e) {
            this.error = e as Error;
        }
    },
);

Then(
    'this vehicle should be part of my vehicle fleet',
    async function (this: CucumberContext) {
        const fleetFound = await this.fleetService.getFleet(this.fleet);
        if (!fleetFound) {
            throw new FleetNotFoundError();
        }
        const vehicleFound = fleetFound.getVehicle(this.vehicle.plateNumber);
        assert.strictEqual(vehicleFound?.plateNumber, this.vehicle.plateNumber);
    },
);

Then(
    'I should be informed this vehicle has already been registered into my fleet',
    function (this: CucumberContext) {
        assert(this.error instanceof VehicleAlreadyRegisteredError);
    },
);
