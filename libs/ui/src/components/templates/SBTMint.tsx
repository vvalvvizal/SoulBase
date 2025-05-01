import { useFormSBTMinter } from '@soulBase/forms/src/SBTMinter';
import { useAccount } from '@soulBase/util/src/hooks/useAccount';
import { useState, useEffect } from 'react';
import { Form } from '../atmos/Form';
import { HtmlLabel } from '../atmos/HtmlLabel';
import { HtmlInput } from '../atmos/HtmlInput';
import Button from '../atmos/Button';
import { sbtMinter } from '@soulBase/ui/utils/actions/sbtMinter';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { namedOperations } from '@soulBase/network/src/gql/generated';
import Badge from '../atmos/Badge';

export const SBTMint = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormSBTMinter();
  const { contract, account, initializeWeb3Provider } = useAccount();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const client = useApolloClient();

  useEffect(() => {
    initializeWeb3Provider();
  }, []);

  const onSubmit = async ({
    to,
    metadataJSON_url,
  }: {
    to: string;
    metadataJSON_url: string;
  }) => {
    if (!contract) {
      console.log('Contract not found');
      return;
    }

    setLoading(true);
    const success = await sbtMinter({
      contract,
      payload: { to, metadataJSON_url },
    });
    setLoading(false);
    if (success) {
      reset();
      navigate('/user/2');
      client.refetchQueries({ include: [namedOperations.Query.SBTs] });
    }
    // if (success) {
    //   reset();
    //   navigate(`/sbts/${account}`);
    //   client.refetchQueries({ include: [namedOperations.Query.SBTs] });
    // }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Mint SBT</h1>
        <p className="text-gray-600 text-center mb-6">
          관리자는 SBT를 발행할 수 있습니다 <br />
        </p>
      </div>
      <div className="flex justify-center">
        <Form
          className="max-w-md p-4 bg-white rounded mt-15"
          onSubmit={handleSubmit(onSubmit)}
        >
          <HtmlLabel title="to" error={errors.to?.message}>
            <Badge className="" size="sm" variant="gray">
              Where the SBT will be sent
            </Badge>
            <HtmlInput placeholder="Enter to address" {...register('to')} />
          </HtmlLabel>
          <HtmlLabel
            title="metadataJSON_url"
            error={errors.metadataJSON_url?.message}
          >
            <HtmlInput
              placeholder="Enter metadataJSON_url"
              {...register('metadataJSON_url')}
            />
          </HtmlLabel>

          <Button loading={loading} intent="primary" size="small" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
