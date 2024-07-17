import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { FleetEntity } from './FleetEntity';

@Entity('Vehicle')
export class VehicleEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    plateNumber: string;

    @ManyToMany(() => FleetEntity, (fleet) => fleet.vehicles)
    fleets: FleetEntity;

    @Column('simple-json', { nullable: true })
    location: {
        latitude: number;
        longitude: number;
        altitude?: number;
    } | null = null;
}
