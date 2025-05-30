import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const schemaCreateMetadata = z.object({
  name: z.string().min(1, '이름은 필수입니다.'),
  description: z.string().min(1, '설명은 필수입니다.'),
  image: z
    .string()
    .url('IPFS URL이 잘못되었습니다.')
    .startsWith('ipfs://', 'IPFS로 업로드된 이미지여야 합니다.'),
  player: z.string().min(1, '선수 이름은 필수입니다.'),
  team: z.string().min(1, '팀 이름은 필수입니다.'),
  season: z.string().min(1, '시즌은 필수입니다.'),
  achievement: z.string().min(1, '기록은 필수입니다.'),
  imgsource: z.string().url('이미지 출처는 유효한 URL이어야 합니다.'),
  attributes: z
    .array(
      z.object({
        trait_type: z.string(),
        value: z.union([z.string(), z.number()]),
      }),
    )
    .optional(),
});

export type FormTypeCreateMetadata = z.infer<typeof schemaCreateMetadata>;
export const useFormCreateMetadata = () =>
  useForm<FormTypeCreateMetadata>({
    resolver: zodResolver<FormTypeCreateMetadata>(schemaCreateMetadata),
  });
