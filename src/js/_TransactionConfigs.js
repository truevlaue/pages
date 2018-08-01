let TransactionConfigs = {

    // bonus transactions
    bonusInvest1Eth: {
        to: ContractAddresses.BonusServiceImpl,
        gas: 210000,
        value: 1,
        uom: 'ether',
        selector: 'bonusInvest1EthQr'
    }
    , bonusInvest10Eth: {
        to: ContractAddresses.BonusServiceImpl,
        gas: 210000,
        value: 1,
        uom: 'ether',
        selector: 'bonusInvest10EthQr'
    }
    , bonusInvest100Eth: {
        to: ContractAddresses.BonusServiceImpl,
        gas: 210000,
        value: 1,
        uom: 'ether',
        selector: 'bonusInvest100EthQr'
    }
    , bonusDivest: {
        to: ContractAddresses.BonusServiceImpl,
        gas: 210000,
        value: 0,
        uom: 'ether',
        selector: 'bonusDivestQr'
    }
    , bonusWithdrawProfit: {
        to: ContractAddresses.BonusServiceImpl,
        gas: 210000,
        value: 0,
        uom: 'ether',
        selector: 'bonusWithdrawProfitQr'
    }

    // token transactions
    , tokenInvest1Eth: {
        to: ContractAddresses.TokenServiceImpl,
        gas: 210000,
        value: 1,
        uom: 'ether',
        selector: 'tokenInvest1EthQr'
    }
    , tokenInvest10Eth: {
        to: ContractAddresses.TokenServiceImpl,
        gas: 210000,
        value: 10,
        uom: 'ether',
        selector: 'tokenInvest10EthQr'
    }
    , tokenInvest100Eth: {
        to: ContractAddresses.TokenServiceImpl,
        gas: 210000,
        value: 100,
        uom: 'ether',
        selector: 'tokenInvest100EthQr'
    }
    , tokenWithdrawProfit: {
        to: ContractAddresses.TokenServiceImpl,
        gas: 210000,
        value: 0,
        uom: 'ether',
        selector: 'tokenWithdrawProfitQr'
    }

    // common withdraw : withdraw user balance (game rewards ,spread rewards etc. )
    , balanceWithdraw: {
        to: ContractAddresses.TokenServiceImpl,
        gas: 210000,
        value: 0,
        uom: 'ether',
        selector: 'balanceWithdrawQr'
    }
};
