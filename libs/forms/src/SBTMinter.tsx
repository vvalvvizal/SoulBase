import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const schemaSBTMinter = z.object({
  to: z.string().min(1, {message:'To Address is required'}),
  metadataJSON_url: z.string().min(1,{message:'metadataJSON_url is required'}), 
});

export type FormTypeSBTMinter = z.infer<typeof schemaSBTMinter>;

export const useFormSBTMinter = () =>
  useForm<FormTypeSBTMinter>({
    resolver: zodResolver<FormTypeSBTMinter>(schemaSBTMinter),
  });
