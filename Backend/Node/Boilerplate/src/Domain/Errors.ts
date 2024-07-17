export class VehicleAlreadyRegisteredError extends Error {
    constructor() {
        super('Vehicle already registered in the fleet');
        this.name = 'VehicleAlreadyRegisteredError';
    }
}

export class VehicleNotAPartOfFleetError extends Error {
    constructor() {
        super('Vehicle is not part of the fleet');
        this.name = 'VehicleNotAPartOfFleetError';
    }
}

export class VehicleIsAlreadyParkedAtLocationError extends Error {
    constructor() {
        super('Vehicle is already parked at this location');
        this.name = 'VehicleIsAlreadyParkedAtLocationError';
    }
}

export class VehicleNotFoundError extends Error {
    constructor() {
        super('Vehicle not found');
        this.name = 'VehicleNotFoundError';
    }
}
export class FleetNotFoundError extends Error {
    constructor() {
        super('Fleet not found');
        this.name = 'FleetNotFoundError';
    }
}

export class UserNotFoundError extends Error {
    constructor() {
        super('User not found');
        this.name = 'UserNotFoundError';
    }
}