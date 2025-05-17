import { useMemo, useState } from "react"
import { useQuery, gql } from '@apollo/client';
import { graphClient } from '@soulBase/network/src/config/graphClient';
import { LPTransaction } from "../types";
import { ethers } from "ethers";
import { useAccount } from "./useAccount";

// the graph subgraph와 graphql을 이용하여 풀의 이벤트를 추적하고 분류하는 hook
export const usePoolEvent = () => {

  const userPOLprovided = 0;
  const userBBTprovided = 0;
  const {account} = useAccount();
      // //the graph subgraph에 쿼리
    const GET_RECENT_EVENTS = gql`
    query MyQuery {
  liquidityAxqddeds(first: 100, orderBy: blockTimestamp, orderDirection: desc) {
    _account
    _liquidity
    _ethAmount
    _tokenAmount
    blockTimestamp
  }
  liquidityRemoveds(first: 100, orderBy: blockTimestamp, orderDirection: desc) {
    _account
    _liquidity
    _ethAmount
    _tokenAmount
    blockTimestamp
  }
  tradedTokens_collection(first: 100, orderBy: blockTimestamp, orderDirection: desc) {
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
  query GetLiquidityAddedsBeforeRemove($account: Bytes!, $beforeBlock: BigInt!) {
    liquidityAddeds(
      where: {
        _account: $account
        blockNumber_lt: $beforeBlock
      }
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

      //현재 시간 기준 24시간 전의 타임스탬프
  const { data: recent_events } = useQuery(GET_RECENT_EVENTS, {
    client: graphClient,
    variables: {},
  });

  const { data: removeData } = useQuery(GET_FIRST_REMOVE_EVENT,{
  client:graphClient,
  variables: { account },
});

 const firstRemoveBlock = removeData?.liquidityRemoveds?.[0]?.blockNumber;


 const { data: liquidity_add_events } =  useQuery(GET_LIQUIDITY_ADDEDS_BEFORE_REMOVE,{
    client : graphClient,
    variables: {
      account,
      beforeBlock: firstRemoveBlock,
    },
  });
   

  // const LPTransaction :LPTransaction[]= useMemo(()=>{
  //   if (!data) return [];

  //    const addEvents = data.liquidityAddeds.map((e: any) => ({
  //   type: 'ADD_LIQUIDITY' as const,
  //   amount: `${parseFloat(ethers.formatUnits(e._liquidity, 18)).toFixed(2)} BBT + ??? POL`, // POL 수치는 추정 필요
  //   amountUsd: '$0.00',
  //   account: e._account,
  //   timestamp: parseInt(e.blockTimestamp),
  //   txHash: e.id,
  // }));


  // },[data])



return { userPOLprovided, userBBTprovided,recent_events,liquidity_add_events };
}