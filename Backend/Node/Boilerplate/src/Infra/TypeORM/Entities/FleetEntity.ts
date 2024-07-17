import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { VehicleEntity } from './VehicleEntity';

@Entity("Fleet")
export class FleetEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId: string;

  @ManyToMany(() => VehicleEntity, vehicle => vehicle.fleets, { cascade: true })
  @JoinTable({
    name: 'fleet_vehicles',
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
