import { useFormSBTMinter } from '@soulBase/forms/src/SBTMinter';
import { useAccount } from '@soulBase/util/src/hooks/ether';
import { useState } from 'react';
import { Form } from '../atmos/Form';
import { HtmlLabel } from '../atmos/HtmlLabel';
import { HtmlInput } from '../atmos/HtmlInput';
import Button from '../atmos/Button';

export const SBTMinter = () => {

    const { register, handleSubmit, reset, formState:{errors}} = useFormSBTMinter();
    const {contract, account} = useAccount();
    const [loading, setLoading] = useState(false);

    return (
        <Form className='max-w-md'>
            <HtmlLabel title="to" error={errors.to?.message}>
                <HtmlInput {...register('to')}/>
            </HtmlLabel>
            <HtmlLabel title="tokenId" error={errors.tokenId?.message}>
                <HtmlInput {...register('tokenId')}/>
            </HtmlLabel>
            <HtmlLabel title="metadataJSON_url" error={errors.metadataJSON_url?.message}>
                <HtmlInput {...register('metadataJSON_url')}/>
            </HtmlLabel>

            <Button loading={loading} type='submit'> Submit</Button>
        </Form>
    )


}