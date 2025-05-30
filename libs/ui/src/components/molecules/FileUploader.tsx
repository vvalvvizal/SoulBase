import axios from 'axios';
import { useFormCreateMetadata } from '../../../../forms/src/create_metadata';
import { Form } from '@soulBase/ui/src/components/atmos/Form';
import { Upload } from 'lucide-react';
import Button from '../atmos/Button';
import { HtmlInput } from '../atmos/HtmlInput';
import { MetadataType } from '@soulBase/util/src/types';

export const FileUploader = () => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useFormCreateMetadata();

  const onSubmit = async (data: MetadataType) => {
    const attributes = [
      { trait_type: 'player', value: data.player },
      { trait_type: 'team', value: data.team },
      { trait_type: 'season', value: data.season },
      { trait_type: 'achievement', value: data.achievement },
      { trait_type: 'imgsource', value: data.imgsource },
    ];

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('attributes', JSON.stringify(attributes));
    try {
      const res = await axios.post('/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('업로드 성공:', res.data);
    } catch (err) {
      console.error('업로드 실패:', err);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center"
      >
        <div className="space-y-2">
          <Upload className="h-4 w-4 mr-2" />
          <HtmlInput
            type="text"
            placeholder="이름"
            {...register('name', { required: true })}
          />
          <HtmlInput
            type="text"
            placeholder="설명"
            {...register('description', { required: true })}
          />
          <HtmlInput
            type="text"
            placeholder="이미지 CID주소"
            {...register('image', { required: true })}
          />
          <HtmlInput
            type="text"
            placeholder="선수 이름 (player)"
            {...register('player', { required: true })}
          />
          <HtmlInput
            type="text"
            placeholder="소속팀 (team)"
            {...register('team', { required: true })}
          />
          <HtmlInput
            type="text"
            placeholder="시즌 (season)"
            {...register('season', { required: true })}
          />
          <HtmlInput
            type="text"
            placeholder="기록 (achievement)"
            {...register('achievement', { required: true })}
          />
          <HtmlInput
            type="text"
            placeholder="이미지 출처 (imgsource)"
            {...register('imgsource', { required: true })}
          />

          <Button type="submit">업로드</Button>
        </div>
      </Form>
    </>
  );
};
