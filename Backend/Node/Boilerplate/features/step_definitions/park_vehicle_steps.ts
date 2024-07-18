import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { Location } from '../../src/Domain/Models/Location';
import { ParkVehicleCommand } from '../../src/App/Commands/ParkVehicleCommand';
import {
    FleetNotFoundError,
    VehicleIsAlreadyParkedAtLocationError,
    VehicleNotAPartOfFleetError,
    VehicleNotFoundError,
} from '../../src/Domain/Errors';
import { locationData } from '../fixtures/mock';
import { CucumberContext } from '../cucumberContext';

Given('a location', function (this: CucumberContext) {
    this.location = new Location(
        locationData.location1.latitude,
        locationData.location1.longitude,
        locationData.location1.altitude,
    );
});

Given(
    'my vehicle has been parked into this location',
    async function (this: CucumberContext) {
        await this.vehicleService.parkVehicle(
            this.fleet.id,
            this.vehicle.plateNumber,
            this.location,
        );
    },
);

When(
    'I park my vehicle at this location',
    async function (this: CucumberContext) {
        try {
            const command = new ParkVehicleCommand(
                this.fleet.id,
                this.vehicle.plateNumber,
                this.location,
            );
            await this.parkVehicleHandler.handle(command);
        } catch (e) {
            this.error = e as Error;
        }
    },
);

When(
    'I try to park my vehicle at this location',
    async function (this: CucumberContext) {
        try {
            const command = new ParkVehicleCommand(
                this.fleet.id,
                this.vehicle.plateNumber,
                this.location,
            );
            await this.parkVehicleHandler.handle(command);
        } catch (e) {
            this.error = e as Error;
        }
    },
);

Then(
    'the known location of my vehicle should verify this location',
    async function (this: CucumberContext) {
        const fleetFound = await this.fleetService.getFleet(this.fleet);
        if (!fleetFound) {
            throw new FleetNotFoundError();
        }

        const vehicleFound = await fleetFound.getVehicle(
            this.vehicle.plateNumber,
        );

        if (!vehicleFound) {
            throw new VehicleNotFoundError();
        }

        if (!fleetFound.getVehicle(vehicleFound.plateNumber)) {
            throw new VehicleNotAPartOfFleetError();
        }

        const vehicleLocation = vehicleFound.getLocation();

        assert.strictEqual(vehicleLocation?.latitude, this.location.latitude);
        assert.strictEqual(vehicleLocation?.longitude, this.location.longitude);
        assert.strictEqual(vehicleLocation?.altitude, this.location.altitude);
    },
);

Then(
    'I should be informed that my vehicle is already parked at this location',
    function (this: CucumberContext) {
        assert(this.error instanceof VehicleIsAlreadyParkedAtLocationError);
    },
);
