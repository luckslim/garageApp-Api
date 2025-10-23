import { UploadAndCreateUseCase } from '@/domain/aplication/use-cases/upload-and-create-files';
import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post, UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/upload')
@UseGuards(AuthGuard('jwt'))
export class UploadFileController {
  constructor(private uploadAndCreateFile: UploadAndCreateUseCase) {}
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), //2mb
          new FileTypeValidator({ fileType: '.(jpeg|png|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.uploadAndCreateFile.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
    });
    if(result.isLeft()){
      throw new BadRequestException()
    }
    const {files} = result.value
    return {
       fileId: files.id.toString()
    }
  }
}
