import { useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { graphClient } from '@soulBase/network/src/config/graphClient';
import { LPTransaction } from '../types';
import { ethers, isAddress } from 'ethers';
// the graph subgraph와 graphql을 이용하여 풀의 이벤트를 추적하고 분류하는 hook
export const usePoolEvent = (account: string) => {
  // //the graph subgraph에 쿼리
  const GET_RECENT_EVENTS = gql`
    query GetRecentEvents {
      liquidityAddeds(
        first: 100
        orderBy: blockTimestamp
        orderDirection: desc
      ) {
        id
        _account
        _liquidity
        _ethAmount
        _tokenAmount
        blockTimestamp
      }
      liquidityRemoveds(
        first: 100
        orderBy: blockTimestamp
        orderDirection: desc
      ) {
        id
        _account
        _liquidity
        _ethAmount
        _tokenAmount
        blockTimestamp
      }
      tradedTokens_collection(
        first: 100
        orderBy: blockTimestamp
        orderDirection: desc
      ) {
        id
        _account
        _ethTraded
        tokenTraded
        blockTimestamp
      }
    }
  `;

  const GET_FIRST_REMOVE_EVENT = gql`
    query GetFirstRemoveBlock($account: Bytes!) {
      liquidityRemoveds(
        where: { _account: $account }
        orderBy: blockNumber
        orderDirection: asc
        first: 1
      ) {
        blockNumber
      }
    }
  `;

  const GET_LIQUIDITY_ADDEDS_BEFORE_REMOVE = gql`
    query GetLiquidityAddedsBeforeRemove(
      $account: Bytes!
      $beforeBlock: BigInt!
    ) {
      liquidityAddeds(
        where: { _account: $account, blockNumber_lt: $beforeBlock }
        orderBy: blockNumber
        orderDirection: asc
      ) {
        _ethAmount
        _tokenAmount
        _liquidity
        blockNumber
      }
    }
  `;

  //최근 100개의 이벤트
  const { data: recent_events } = useQuery(GET_RECENT_EVENTS, {
    skip: !account || !isAddress(account),
    client: graphClient,
    variables: {},
  });

  //유저의 remove 이벤트 춰적
  const { data: removeData } = useQuery(GET_FIRST_REMOVE_EVENT, {
    skip: !account || !isAddress(account),
    client: graphClient,
    variables: { account },
  });

  const firstRemoveBlock = removeData?.liquidityRemoveds?.[0]?.blockNumber;

  const { data: liquidity_add_events } = useQuery(
    GET_LIQUIDITY_ADDEDS_BEFORE_REMOVE,
    {
      client: graphClient,
      skip: !account || !isAddress(account) || firstRemoveBlock === undefined, // 블록 없으면 쿼리 자체를 건너뜀
      variables: {
        account,
        beforeBlock: firstRemoveBlock,
      },
    },
  );

  const userProvided = useMemo(() => {
    if (!liquidity_add_events) {
      return {
        polSum: '0.00',
        bbtSum: '0.00',
        rawPolSum: BigInt(0),
        rawBbtSum: BigInt(0),
      };
    }

    let rawPolSum = BigInt(0);
    let rawBbtSum = BigInt(0);

    liquidity_add_events.liquidityAddeds.forEach((e: any) => {
      rawPolSum += BigInt(e._ethAmount);
      rawBbtSum += BigInt(e._tokenAmount);
    });
    return {
      polSum: parseFloat(ethers.formatUnits(rawPolSum, 18)).toFixed(2),
      bbtSum: parseFloat(ethers.formatUnits(rawBbtSum, 18)).toFixed(2),
      rawPolSum,
      rawBbtSum,
    };
  }, [liquidity_add_events]);

  const LPTransaction: LPTransaction[] = useMemo(() => {
    if (!recent_events) return [];

    const addEvents = recent_events.liquidityAddeds.map((e: any) => ({
      type: 'ADD_LIQUIDITY' as const,
      ethAmount: parseFloat(ethers.formatUnits(e._ethAmount, 18)).toFixed(2),
      tokenAmount: parseFloat(ethers.formatUnits(e._tokenAmount, 18)).toFixed(
        2,
      ),
      account: e._account,
      timestamp: parseInt(e.blockTimestamp),
      txHash: e.id,
    }));

    const removeEvents = recent_events.liquidityRemoveds.map((e: any) => ({
      type: 'REMOVE_LIQUIDITY' as const,
      ethAmount: parseFloat(ethers.formatUnits(e._ethAmount, 18)).toFixed(2),
      tokenAmount: parseFloat(ethers.formatUnits(e._tokenAmount, 18)).toFixed(
        2,
      ),
      account: e._account,
      timestamp: parseInt(e.blockTimestamp),
      txHash: e.id,
    }));

    const SWAPEvents = recent_events.tradedTokens_collection.map((e: any) => ({
      type: 'SWAP' as const,
      ethAmount: parseFloat(ethers.formatUnits(e._ethTraded, 18)).toFixed(2),
      tokenAmount: parseFloat(ethers.formatUnits(e.tokenTraded, 18)).toFixed(2),
      account: e._account,
      timestamp: parseInt(e.blockTimestamp),
      txHash: e.id,
    }));

    return [...addEvents, ...removeEvents, ...SWAPEvents]; //useMemo 콜백에서 반환값
  }, [recent_events]);

  return {
    userProvided,
    LPTransaction,
  };
};
