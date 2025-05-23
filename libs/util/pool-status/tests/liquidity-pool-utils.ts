import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts';
import {
  AdminChanged,
  Approval,
  BeaconUpgraded,
  Initialized,
  LiquidityAdded,
  LiquidityRemoved,
  OwnershipTransferred,
  TradedTokens,
  Transfer,
  Upgraded,
} from '../generated/LiquidityPool/LiquidityPool';

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address,
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent());

  adminChangedEvent.parameters = new Array();

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      'previousAdmin',
      ethereum.Value.fromAddress(previousAdmin),
    ),
  );
  adminChangedEvent.parameters.push(
    new ethereum.EventParam('newAdmin', ethereum.Value.fromAddress(newAdmin)),
  );

  return adminChangedEvent;
}

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt,
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent());

  approvalEvent.parameters = new Array();

  approvalEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)),
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam('spender', ethereum.Value.fromAddress(spender)),
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam('value', ethereum.Value.fromUnsignedBigInt(value)),
  );

  return approvalEvent;
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent());

  beaconUpgradedEvent.parameters = new Array();

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam('beacon', ethereum.Value.fromAddress(beacon)),
  );

  return beaconUpgradedEvent;
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent());

  initializedEvent.parameters = new Array();

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      'version',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version)),
    ),
  );

  return initializedEvent;
}

export function createLiquidityAddedEvent(
  _account: Address,
  _liquidity: BigInt,
): LiquidityAdded {
  let liquidityAddedEvent = changetype<LiquidityAdded>(newMockEvent());

  liquidityAddedEvent.parameters = new Array();

  liquidityAddedEvent.parameters.push(
    new ethereum.EventParam('_account', ethereum.Value.fromAddress(_account)),
  );
  liquidityAddedEvent.parameters.push(
    new ethereum.EventParam(
      '_liquidity',
      ethereum.Value.fromUnsignedBigInt(_liquidity),
    ),
  );

  return liquidityAddedEvent;
}

export function createLiquidityRemovedEvent(
  _account: Address,
  _liquidity: BigInt,
): LiquidityRemoved {
  let liquidityRemovedEvent = changetype<LiquidityRemoved>(newMockEvent());

  liquidityRemovedEvent.parameters = new Array();

  liquidityRemovedEvent.parameters.push(
    new ethereum.EventParam('_account', ethereum.Value.fromAddress(_account)),
  );
  liquidityRemovedEvent.parameters.push(
    new ethereum.EventParam(
      '_liquidity',
      ethereum.Value.fromUnsignedBigInt(_liquidity),
    ),
  );

  return liquidityRemovedEvent;
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address,
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent());

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      'previousOwner',
      ethereum.Value.fromAddress(previousOwner),
    ),
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam('newOwner', ethereum.Value.fromAddress(newOwner)),
  );

  return ownershipTransferredEvent;
}

export function createTradedTokensEvent(
  _account: Address,
  _ethTraded: BigInt,
  tokenTraded: BigInt,
): TradedTokens {
  let tradedTokensEvent = changetype<TradedTokens>(newMockEvent());

  tradedTokensEvent.parameters = new Array();

  tradedTokensEvent.parameters.push(
    new ethereum.EventParam('_account', ethereum.Value.fromAddress(_account)),
  );
  tradedTokensEvent.parameters.push(
    new ethereum.EventParam(
      '_ethTraded',
      ethereum.Value.fromUnsignedBigInt(_ethTraded),
    ),
  );
  tradedTokensEvent.parameters.push(
    new ethereum.EventParam(
      'tokenTraded',
      ethereum.Value.fromUnsignedBigInt(tokenTraded),
    ),
  );

  return tradedTokensEvent;
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt,
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent());

  transferEvent.parameters = new Array();

  transferEvent.parameters.push(
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from)),
  );
  transferEvent.parameters.push(
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to)),
  );
  transferEvent.parameters.push(
    new ethereum.EventParam('value', ethereum.Value.fromUnsignedBigInt(value)),
  );

  return transferEvent;
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent());

  upgradedEvent.parameters = new Array();

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      'implementation',
      ethereum.Value.fromAddress(implementation),
    ),
  );

  return upgradedEvent;
}
