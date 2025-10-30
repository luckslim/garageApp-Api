import { AggregateRoot } from '@/core/entities/aggregate-root';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { CheckInFileWatchedList } from './checkIn-file-watched-list';
export interface CheckInProps {
  clientId: string;
  typeVehicle: string;
  vehicleId: string;
  vehiclePhoto: string;
  file: CheckInFileWatchedList;
  checkInAt?: Date;
  checkOutAt?: Date;
}
export class CheckIn extends AggregateRoot<CheckInProps> {
  get clientId() {
    return this.props.clientId;
  }
  get typeVehicle() {
    return this.props.typeVehicle;
  }
  get vehicleId() {
    return this.props.vehicleId;
  }
  get vehiclePhoto() {
    return this.props.vehiclePhoto;
  }
  get file() {
    return this.props.file;
  }
  get checkInAt() {
    return this.props.checkInAt;
  }
  get checkOutAt() {
    return this.props.checkOutAt;
  }
  set file(file: CheckInFileWatchedList) {
    this.props.file = file;
  }
  set typeVehicle(typeVehicle: string) {
    this.props.typeVehicle = typeVehicle;
  }
  set vehicleId(vehicleId: string) {
    this.props.vehicleId = vehicleId;
  }
  set checkOutAt(checkOutAt: Date | undefined) {
    this.props.checkOutAt = checkOutAt;
  }
  static create(
    props: Optional<CheckInProps, 'checkInAt' | 'checkOutAt' | 'file'>,
    id?: UniqueEntityID,
  ) {
    const checkIn = new CheckIn(
      {
        ...props,
        file: props.file ?? new CheckInFileWatchedList(),
        checkInAt: props.checkOutAt ?? new Date(),
      },
      id,
    );
    return checkIn;
  }
}
