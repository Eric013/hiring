import { AppDataSource } from '../../datasource';

export const initializeDatabase = async (): Promise<void> => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        await AppDataSource.synchronize(true);
    }
};

export const closeDatabase = async (): Promise<void> => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
};

export const clearDatabase = async (): Promise<void> => {
    if (!AppDataSource.isInitialized) {
        await initializeDatabase();
    }

    // Specify manually the deletion order of tables
    // to avoid foreign key constraint violation
    await AppDataSource.getRepository('FleetVehicles').clear();
    await AppDataSource.getRepository('FleetEntity').clear();
    await AppDataSource.getRepository('VehicleEntity').clear();
    await AppDataSource.getRepository('UserEntity').clear();
};
