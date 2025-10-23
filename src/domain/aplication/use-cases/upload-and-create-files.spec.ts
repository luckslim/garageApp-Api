import { InMemoryFilesRepository } from 'test/repositories/in-memory-files-repository';
import { UploadAndCreateUseCase } from './upload-and-create-files';
import { FakeUploader } from 'test/storage/fake-uploader';

let inMemoryFileRepository: InMemoryFilesRepository;
let uploader: FakeUploader;
let sut: UploadAndCreateUseCase;
describe('Upload and create files', () => {
  beforeEach(() => {
    inMemoryFileRepository = new InMemoryFilesRepository();
    uploader = new FakeUploader();
    sut = new UploadAndCreateUseCase(inMemoryFileRepository, uploader);
  });
  it('should be able do upload', async () => {
    const result = await sut.execute({
      fileName: 'file.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    });
    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      files: inMemoryFileRepository.items[0],
    });
    expect(uploader.uploads).toHaveLength(1);
  });
  it('should not be able do upload an file with invalid type', async () => {
    const result = await sut.execute({
      fileName: 'file.mp3',
      fileType: 'image/mpeg',
      body: Buffer.from(''),
    });
    expect(result.isLeft()).toBe(true)
  });
});
