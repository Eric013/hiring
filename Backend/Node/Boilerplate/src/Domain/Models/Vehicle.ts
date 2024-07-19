import { Location } from './Location';
import { VehicleIsAlreadyParkedAtLocationError } from '../Errors';

export class Vehicle {
    constructor(
        public plateNumber: string,
        private location?: Location,
    ) {
        if (location) {
            this.location = location;
        }
    }

    park(location: Location): void {
        if (this.location && this.location.equals(location)) {
            throw new VehicleIsAlreadyParkedAtLocationError();
        }

        this.location = location;
    }

    setLocation(location: Location): void {
        this.location = location;
    }

    getLocation(): Location | undefined {
        return this.location;
    }
}
