import { useEffect, useState } from 'react';
import { POL_TOKEN_INFO } from '../../../ui/src/components/organisms/TokenInput';

export const usePOLPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${POL_TOKEN_INFO.address}&vs_currencies=usd`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
            },
          },
        );

        const data = await res.json();
        const maticPrice =
          data?.['0x0000000000000000000000000000000000001010']?.usd;
        if (maticPrice) setPrice(maticPrice);
        else throw new Error('usd 가격을 가져오지 못했습니다.');
      } catch (err: any) {
        setError(err.message || '오류 발생');
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return { price, loading, error };
};
