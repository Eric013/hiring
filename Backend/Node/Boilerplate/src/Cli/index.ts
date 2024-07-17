import 'reflect-metadata';
import { AppDataSource } from '../../datasource';
import { Command } from 'commander';
import { createUserCommandAction } from './CreateUser';
import { createFleetCommandAction } from './CreateFleet';
import { registerVehicleCommandAction } from './RegisterVehicle';
import { localizeVehicleCommandAction } from './LocalizeVehicle';
import { config } from 'dotenv';

config();

AppDataSource.initialize()
    .then(async () => {
        const program = new Command();

        program
            .command('create-user <userId> <userName>')
            .description('Create a new user')
            .action(createUserCommandAction);
        program
            .command('create <userId>')
            .description('Create a new fleet')
            .action(createFleetCommandAction);
        program
            .command('register-vehicle <fleetId> <vehiclePlateNumber>')
            .description('Register a vehicle in the fleet')
            .action(registerVehicleCommandAction);
        program
            .command(
                'localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]',
            )
            .description('Localize a vehicle')
            .action(localizeVehicleCommandAction);

        program.parse(process.argv);
    })
    .catch((error) => console.log('TypeORM connection error: ', error));
