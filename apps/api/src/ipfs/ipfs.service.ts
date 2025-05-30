import axios from 'axios';
import FormData from 'form-data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IpfsService {
  private readonly pinataApiKey = process.env.PINATA_API_KEY;
  private readonly pinataSecret = process.env.PINATA_SECRET_API_KEY;

  async uploadFileToIPFS(file: Express.Multer.File): Promise<string> {
    // image
    if (!file?.buffer) {
      throw new Error('No file buffer found');
    }
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const res = await axios.post<{ IpfsHash: string }>(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: this.pinataApiKey,
          pinata_secret_api_key: this.pinataSecret,
        },
      },
    );

    return res.data.IpfsHash;
  }

  async uploadMetadata(metadata): Promise<string> {
    //metadata는
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const res = await axios.post<{ IpfsHash: string }>(url, metadata, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: this.pinataApiKey,
        pinata_secret_api_key: this.pinataSecret,
      },
    });
    return res.data.IpfsHash;
  }
}
