//built at 2018-08-02 15:25:40
let Definitions = {
    infuraProviderUrl: "https://ropsten.infura.io/qePENhv4I7T4cLaAUOVr"
};

let log = function (obj) {
    console.log("obj = " + obj);
    console.log("obj.json = " + JSON.stringify(obj));
};
let ContractAddresses = {
    BonusDivestServiceImpl: '0x6312e4332f0c30d604fdde91e470d350b26255a2',
    BonusServiceImpl: '0x40160ddb05bb97ab04802f8470113ff24d92b911',
    CommonStorage: '0x21705d84182b45bbf4be8a61a1691300232b3139',
    Migrations: '0x2b2929aaa8542f6dc7f1cf9d37340734b3893c44',
    StandardToken: '0x56c71b77416b097fec1aec314e12b89ea4684e36',
    TokenServiceImpl: '0xd6ea6f5a0ab768321b3585902e89a2b2a5ead6d1'
};

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

let ABIs = {
    BonusServiceABI: "",
    TokenServiceABI: "",
};

let Web3Utils = {
    sendEth: function (_config, _web3) {


        if (!_web3) {
            alert("Web3 (like MetaMask ) not enabled");
            return;
        }

        _web3.eth.sendTransaction(
            {
                to: _config.to,
                value: _web3.toWei(_config.value, _config.uom),
                gas: _config.gas,
                data: _web3.toHex(123)
            },
            function (error, hash) {
                if (error) {
                    console.log("error happens");
                    console.log(error);
                } else {
                    console.log("tx ok");
                    console.log(hash);
                }
                // _config.callback(error, hash);
            }
        );
    }
};


let vueApp = new Vue({
    el: '#vueEl',
    data: {
        // # web3 providers
        browserWeb3Enabled: false
        , browserWeb3: null // meta mask etc provider
        , providerWeb3: null // meta mask etc provider

        // # services
        , bonusService: null
        , tokenService: null


        // address role

        // inner contract

        // period job
        , periodJobInterval

        // partner contract

        // configurations
        ,

    }

    , methods: {

        // # init page
        init: function () {

            //  rename this
            let t = this;

            //  init meta mask alike web3 provider
            t.browserWeb3Enabled = !!window.web3;

            if (t.browserWeb3Enabled) {
                t.browserWeb3 = window.web3;
                log("use MetaMask");
            }

            t.providerWeb3 = new Web3(new Web3.providers.HttpProvider(Definitions.infuraProviderUrl));

        }

        // # address role manages
        , addAddressRole: function () {

        }
        , removeAddressRole: function () {

        }

        // # inner contract manage

        // # period job manage
        , changePeriod: function () {

        }
        , updatePeriodJobInterval: function () {

        }

        // # partner contract manage


        // # configurations
        , updateConfig: function () {

        }
    }
});


$(function () {
    try {
        vueApp.init();
    } catch (e) {
        log(e);
    }
});