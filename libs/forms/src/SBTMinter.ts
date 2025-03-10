import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const schemaSBTMinter = z.object({
  to: z.string().min(1), //property not empty 최소 1
  tokenId: z.string().min(1),
  metadataJSON_url: z.string().min(1),
});

export type FormTypeSBTMinter = z.infer<typeof schemaSBTMinter>;

export const useFormSBTMinter = () =>
  useForm<FormTypeSBTMinter>({
    resolver: zodResolver<FormTypeSBTMinter>(schemaSBTMinter),
  });

const { handleSubmit } = useFormSBTMinter();
