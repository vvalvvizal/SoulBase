import { useFormSBTMinter } from '@soulBase/forms/src/SBTMinter';
import { useAccount } from '@soulBase/util/src/hooks/ether';
import { useState, useEffect } from 'react';
import { Form } from '../atmos/Form';
import { HtmlLabel } from '../atmos/HtmlLabel';
import { HtmlInput } from '../atmos/HtmlInput';
import Button from '../atmos/Button';
import { sbtMinter } from '@soulBase/ui/utils/actions/sbtMinter';
import { useNavigate } from 'react-router-dom';
import { useApolloClient} from '@apollo/client';
import {namedOperations }from '@soulBase/network/src/gql/generated';


export const SBTMint = () => {

    const { register, handleSubmit, reset, formState:{errors}} = useFormSBTMinter();
    const {contract, account, initializeWeb3Provider} = useAccount();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const client = useApolloClient();

    useEffect(() => {
      initializeWeb3Provider();
    }, []);

    const onSubmit = async ({ to, metadataJSON_url }: { to: string; metadataJSON_url: string }) => {
        if (!contract) {
          console.log('Contract not found');
          return;
        }
    
        setLoading(true);
        const success = await sbtMinter({ contract, payload: { to, metadataJSON_url } });
        setLoading(false);
    
        if (success) {
          reset();
          navigate(`/sbt/${account}`); 
          client.refetchQueries({include: [namedOperations.Query.SBTs]});
        }
      };

    return (
        <Form className="max-w-md p-4 bg-white rounded mt-20" onSubmit={handleSubmit(onSubmit)}>
            <HtmlLabel title="to" error={errors.to?.message}>
                <HtmlInput placeholder='Enter to address'{...register('to')}/>
            </HtmlLabel>
            <HtmlLabel title="metadataJSON_url" error={errors.metadataJSON_url?.message}>
                <HtmlInput placeholder='Enter metadataJSON_url'{...register('metadataJSON_url')}/>
            </HtmlLabel>

            <Button loading={loading} type='submit'> Submit</Button>
        </Form>
    )


}