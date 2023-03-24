export interface Pool {
  underlyingLabel: string;
  underlyingIcon: JSX.Element;
  accountingLabel: string;
  accountingIcon: JSX.Element;
  value: string;
}

export interface PoolState {
  pool: string;
  updatePool: (newPool: string) => void;
}

export interface orderType {
  id: string;
  value: number;
  volume: number;
  time: number;
}
