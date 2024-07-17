export class CreateFleetCommand {
    constructor(public userId: string, public fleetId?: string) {
      if (!fleetId) {
        this.fleetId = `fleet-${Math.random().toString(36).substring(7)}`;
      }
    }
  }
