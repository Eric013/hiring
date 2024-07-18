import { User } from '../../src/Domain/Models/User';
import { Vehicle } from '../../src/Domain/Models/Vehicle';

export const fleetData = {
    fleet1: {
        id: 'fleet-1',
    },
    fleet2: {
        id: 'fleet-2',
    },
};

export const vehicleData: { [key: string]: Pick<Vehicle, 'plateNumber'> } = {
    vehicle1: {
        plateNumber: 'AB123CD',
    },
    vehicle2: {
        plateNumber: 'EF456GH',
    },
};

export const locationData = {
    location1: {
        // Orange Velodrome stadium :)
        latitude: 43.2699761513722,
        longitude: 5.395976599252035,
        altitude: 0,
    },
};

export const userData: { [key: string]: User } = {
    user1: {
        id: 'user-1',
        name: 'John Doe',
    },
    user2: {
        id: 'user-2',
        name: 'Jane Doe',
    },
};
