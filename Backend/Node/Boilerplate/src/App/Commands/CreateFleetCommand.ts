import { IdGenerator } from '../../Domain/Utils/IdGenerator';

export class CreateFleetCommand {
    constructor(
        public userId: string,
        public fleetId?: string,
    ) {
        if (!fleetId) {
            this.fleetId = IdGenerator.generate('fleet');
        }
    }
}
