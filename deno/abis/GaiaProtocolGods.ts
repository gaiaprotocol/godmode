/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  AddressLike,
  BaseContract,
  BigNumberish,
  BytesLike,
  ContractMethod,
  ContractRunner,
  EventFragment,
  FunctionFragment,
  Interface,
  Listener,
  Result,
} from "https://esm.sh/ethers@6.7.0";
import type {
  TypedContractEvent,
  TypedContractMethod,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedLogDescription,
} from "https://raw.githubusercontent.com/yjgaia/contract-module/refs/heads/main/deno/abi/common.ts";

export interface GaiaProtocolGodsInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "airdrop"
      | "airdropCompleted"
      | "approve"
      | "balanceOf"
      | "batchTransferFrom"
      | "completeAirdrop"
      | "exists"
      | "getApproved"
      | "isApprovedForAll"
      | "name"
      | "owner"
      | "ownerOf"
      | "paused"
      | "renounceOwnership"
      | "safeTransferFrom(address,address,uint256)"
      | "safeTransferFrom(address,address,uint256,bytes)"
      | "setApprovalForAll"
      | "setBaseURI"
      | "setPause"
      | "supportsInterface"
      | "symbol"
      | "tokenURI"
      | "totalSupply"
      | "transferFrom"
      | "transferOwnership",
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "ApprovalForAll"
      | "CompleteAirdrop"
      | "ConsecutiveTransfer"
      | "OwnershipTransferred"
      | "Paused"
      | "SetBaseURI"
      | "Transfer"
      | "Unpaused",
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "airdrop",
    values: [AddressLike[], BigNumberish[]],
  ): string;
  encodeFunctionData(
    functionFragment: "airdropCompleted",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: "batchTransferFrom",
    values: [AddressLike, AddressLike, BigNumberish[]],
  ): string;
  encodeFunctionData(
    functionFragment: "completeAirdrop",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "exists",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [AddressLike, AddressLike],
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    values: [AddressLike, AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    values: [AddressLike, AddressLike, BigNumberish, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [AddressLike, boolean],
  ): string;
  encodeFunctionData(functionFragment: "setBaseURI", values: [string]): string;
  encodeFunctionData(functionFragment: "setPause", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike],
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike],
  ): string;

  decodeFunctionResult(functionFragment: "airdrop", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "airdropCompleted",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "batchTransferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "completeAirdrop",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setBaseURI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    approved: AddressLike,
    tokenId: BigNumberish,
  ];
  export type OutputTuple = [owner: string, approved: string, tokenId: bigint];
  export interface OutputObject {
    owner: string;
    approved: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ApprovalForAllEvent {
  export type InputTuple = [
    owner: AddressLike,
    operator: AddressLike,
    approved: boolean,
  ];
  export type OutputTuple = [
    owner: string,
    operator: string,
    approved: boolean,
  ];
  export interface OutputObject {
    owner: string;
    operator: string;
    approved: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CompleteAirdropEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ConsecutiveTransferEvent {
  export type InputTuple = [
    fromTokenId: BigNumberish,
    toTokenId: BigNumberish,
    from: AddressLike,
    to: AddressLike,
  ];
  export type OutputTuple = [
    fromTokenId: bigint,
    toTokenId: bigint,
    from: string,
    to: string,
  ];
  export interface OutputObject {
    fromTokenId: bigint;
    toTokenId: bigint;
    from: string;
    to: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetBaseURIEvent {
  export type InputTuple = [baseURI_: string];
  export type OutputTuple = [baseURI_: string];
  export interface OutputObject {
    baseURI_: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    tokenId: BigNumberish,
  ];
  export type OutputTuple = [from: string, to: string, tokenId: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    tokenId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface GaiaProtocolGods extends BaseContract {
  connect(runner?: ContractRunner | null): GaiaProtocolGods;
  waitForDeployment(): Promise<this>;

  interface: GaiaProtocolGodsInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent,
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent,
  ): Promise<this>;

  airdrop: TypedContractMethod<
    [recipients: AddressLike[], amounts: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  airdropCompleted: TypedContractMethod<[], [boolean], "view">;

  approve: TypedContractMethod<
    [to: AddressLike, tokenId: BigNumberish],
    [void],
    "payable"
  >;

  balanceOf: TypedContractMethod<[owner: AddressLike], [bigint], "view">;

  batchTransferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenIds: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  completeAirdrop: TypedContractMethod<[], [void], "nonpayable">;

  exists: TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;

  getApproved: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  isApprovedForAll: TypedContractMethod<
    [owner: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;

  name: TypedContractMethod<[], [string], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  ownerOf: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  paused: TypedContractMethod<[], [boolean], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  "safeTransferFrom(address,address,uint256)": TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "payable"
  >;

  "safeTransferFrom(address,address,uint256,bytes)": TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BigNumberish,
      _data: BytesLike,
    ],
    [void],
    "payable"
  >;

  setApprovalForAll: TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;

  setBaseURI: TypedContractMethod<[baseURI_: string], [void], "nonpayable">;

  setPause: TypedContractMethod<[status: boolean], [void], "nonpayable">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  symbol: TypedContractMethod<[], [string], "view">;

  tokenURI: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "payable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: "airdrop",
  ): TypedContractMethod<
    [recipients: AddressLike[], amounts: BigNumberish[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "airdropCompleted",
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "approve",
  ): TypedContractMethod<
    [to: AddressLike, tokenId: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "balanceOf",
  ): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "batchTransferFrom",
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenIds: BigNumberish[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "completeAirdrop",
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "exists",
  ): TypedContractMethod<[tokenId: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "getApproved",
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "isApprovedForAll",
  ): TypedContractMethod<
    [owner: AddressLike, operator: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "name",
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "owner",
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "ownerOf",
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "paused",
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership",
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "safeTransferFrom(address,address,uint256)",
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "safeTransferFrom(address,address,uint256,bytes)",
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BigNumberish,
      _data: BytesLike,
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "setApprovalForAll",
  ): TypedContractMethod<
    [operator: AddressLike, approved: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setBaseURI",
  ): TypedContractMethod<[baseURI_: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setPause",
  ): TypedContractMethod<[status: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "supportsInterface",
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "symbol",
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "tokenURI",
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "totalSupply",
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferFrom",
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, tokenId: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership",
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "Approval",
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "ApprovalForAll",
  ): TypedContractEvent<
    ApprovalForAllEvent.InputTuple,
    ApprovalForAllEvent.OutputTuple,
    ApprovalForAllEvent.OutputObject
  >;
  getEvent(
    key: "CompleteAirdrop",
  ): TypedContractEvent<
    CompleteAirdropEvent.InputTuple,
    CompleteAirdropEvent.OutputTuple,
    CompleteAirdropEvent.OutputObject
  >;
  getEvent(
    key: "ConsecutiveTransfer",
  ): TypedContractEvent<
    ConsecutiveTransferEvent.InputTuple,
    ConsecutiveTransferEvent.OutputTuple,
    ConsecutiveTransferEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred",
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Paused",
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "SetBaseURI",
  ): TypedContractEvent<
    SetBaseURIEvent.InputTuple,
    SetBaseURIEvent.OutputTuple,
    SetBaseURIEvent.OutputObject
  >;
  getEvent(
    key: "Transfer",
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused",
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "ApprovalForAll(address,address,bool)": TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;
    ApprovalForAll: TypedContractEvent<
      ApprovalForAllEvent.InputTuple,
      ApprovalForAllEvent.OutputTuple,
      ApprovalForAllEvent.OutputObject
    >;

    "CompleteAirdrop()": TypedContractEvent<
      CompleteAirdropEvent.InputTuple,
      CompleteAirdropEvent.OutputTuple,
      CompleteAirdropEvent.OutputObject
    >;
    CompleteAirdrop: TypedContractEvent<
      CompleteAirdropEvent.InputTuple,
      CompleteAirdropEvent.OutputTuple,
      CompleteAirdropEvent.OutputObject
    >;

    "ConsecutiveTransfer(uint256,uint256,address,address)": TypedContractEvent<
      ConsecutiveTransferEvent.InputTuple,
      ConsecutiveTransferEvent.OutputTuple,
      ConsecutiveTransferEvent.OutputObject
    >;
    ConsecutiveTransfer: TypedContractEvent<
      ConsecutiveTransferEvent.InputTuple,
      ConsecutiveTransferEvent.OutputTuple,
      ConsecutiveTransferEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "SetBaseURI(string)": TypedContractEvent<
      SetBaseURIEvent.InputTuple,
      SetBaseURIEvent.OutputTuple,
      SetBaseURIEvent.OutputObject
    >;
    SetBaseURI: TypedContractEvent<
      SetBaseURIEvent.InputTuple,
      SetBaseURIEvent.OutputTuple,
      SetBaseURIEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
  };
}
