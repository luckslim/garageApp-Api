import { Files } from '@/domain/enterprise/entities/files';
import { left, right, type Either } from '@/core/either';
import { InvalidFileError } from './errors/invalid-file-error';
import { FileRepository } from '../repositories/file-repository';
import { Uploader } from '../storage/uploader';
import { Inject, Injectable } from '@nestjs/common';

interface UploadAndCreateUseCaseRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}
type UploadAndCreateUseCaseResponse = Either<InvalidFileError, { files: Files }>;
@Injectable()
export class UploadAndCreateUseCase {
  constructor(

    @Inject(FileRepository) private fileRepository: FileRepository,
    @Inject(Uploader) private uploader: Uploader,
  ) {}
  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateUseCaseRequest): Promise<UploadAndCreateUseCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidFileError(fileType));
    }
    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    });
    const files = Files.create({
      fileName,
      url
    });
    await this.fileRepository.create(files);
    return right({ files });
  }
}
