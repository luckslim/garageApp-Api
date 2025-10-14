import { Client } from '@/domain/enterprise/entities/client';
import { ClientRepository } from '../repositories/client-repository';
import { Inject, Injectable } from '@nestjs/common';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { CheckInRepository } from '../repositories/check-in-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from './errors/Resource-not-found-error';

interface fetchByVehicleIdUseCaseRequest {
  clientId: UniqueEntityID;
  VehicleId: string;
}
type fetchByVehicleIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { checkIn: CheckIn }
>;

export class fetchByVehicleIdUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private clientRepository: ClientRepository,
  ) {}
  async execute({
    clientId,
    VehicleId,
  }: fetchByVehicleIdUseCaseRequest): Promise<fetchByVehicleIdUseCaseResponse> {
    const user = await this.clientRepository.findById(clientId);
    if (!user) {
      return left(new ResourceNotFoundError());
    }
    const checkIn = await this.checkInRepository.findByVehicleId(VehicleId);
    if (!checkIn) {
      return left(new ResourceNotFoundError());
    }
    return right({checkIn})
  }
}
