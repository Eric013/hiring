import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { VehicleEntity } from './VehicleEntity';

@Entity('Fleet')
export class FleetEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    userId: string;

    @ManyToMany(() => VehicleEntity, (vehicle) => vehicle.fleets, {
        cascade: false,
    })
    @JoinTable({
        name: 'FleetVehicles',
        joinColumn: {
            name: 'fleetId',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'FK_Fleet_Vehicle',
        },
        inverseJoinColumn: {
            name: 'vehicleId',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'FK_Vehicle_Fleet',
        },
        synchronize: true,
    })
    vehicles: VehicleEntity[];
}
