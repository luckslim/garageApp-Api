import { CheckInFiles } from '@/domain/enterprise/entities/checkIn-file';

export abstract class CheckInFilesRepository {
    abstract findManyCheckInId(CheckInId: string):Promise<CheckInFiles[]>
    abstract deleteManyByCheckInId(CheckInId: string):Promise<void>
}
