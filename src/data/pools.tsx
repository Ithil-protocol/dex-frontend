import ETH from 'cryptocurrency-icons/svg/icon/eth.svg';
import USDC from 'cryptocurrency-icons/svg/icon/usdc.svg';
import DAI from 'cryptocurrency-icons/svg/icon/dai.svg';
import WBTC from 'cryptocurrency-icons/svg/icon/wbtc.svg';
import { Pool } from 'types'

export const pools: Pool[] = [
    {
        underlyingLabel: 'WETH',
        underlyingIcon: <ETH />,
        accountingLabel: 'USDC',
        accountingIcon: <USDC />,
        value: '1'
    },
    {
        underlyingLabel: 'USDC',
        underlyingIcon: <USDC />,
        accountingLabel: 'WETH',
        accountingIcon: <ETH />,
        value: '2'
    },
    {
        underlyingLabel: 'DAI',
        underlyingIcon: <DAI />,
        accountingLabel: 'WBTC',
        accountingIcon: <WBTC />,
        value: '3'
    },
    {
        underlyingLabel: 'WBTC',
        underlyingIcon: <WBTC />,
        accountingLabel: 'DAI',
        accountingIcon: <DAI />,
        value: '4'
    }
]

