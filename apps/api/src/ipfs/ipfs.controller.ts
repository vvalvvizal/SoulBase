import { Body, Controller, Post } from '@nestjs/common';
import { IpfsService } from './ipfs.service';

@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Post('upload-file') //ipfs 업로드 요청
  async uploadFileToIPFS(@Body() file: Express.Multer.File) {
    this.ipfsService.uploadFileToIPFS(file);
  }
  @Post('upload-metadata')
  async uploadMetadataToIPFS() {}
}
