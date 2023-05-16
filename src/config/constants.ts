export const SLIPPAGE = 0.001;

export const STAKED_DECIMALS = 18;
export const STAKED_PRECISION = 6;

//if max boost is zero or less than 0.001, then FAST option will be MIN_FAST_BOOST
export const MIN_FAST_BOOST = 0.001;

//this will multiply in maxBoost. if maxBoost is grater than 0.001 and user clicks on FAST, then it will multiply by  INCREASE_MAX_BOOST_FACTOR like (0.015 * INCREASE_MAX_BOOST_FACTOR)
export const INCREASE_MAX_BOOST_FACTOR = 1.01;

export const CREATE_ORDER_DEADLINE = 60; //seconds
