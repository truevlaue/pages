//built at 2018-08-02 17:54:57
let Definitions = {
    infuraProviderUrl: "https://ropsten.infura.io/qePENhv4I7T4cLaAUOVr"
};

let log = function () {
    console.log("-----------");
    console.log(arguments);
    console.log(JSON.stringify(arguments));
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
    BonusServiceABI: ""
    , TokenServiceABI: ""
    , StorageServiceABI: ""
    , ControlServiceABI: ""
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
            , userRoleAddress: -1
            , userRole: -1
            // inner contract

            // period job
            , periodJobInterval: -1

            // partner contract

            // configurations
            , KEY_CFG_BONUS_SPREAD_REWARD_RATIO: "6000"
            , bonusSpreadRewardRatio: -1
            , KEY_CFG_BONUS_PARENT_REWARD_RATIO: "6001"
            , bonusParentRewardRatio: -1
            , KEY_CFG_BONUS_GRAND_REWARD_RATIO: "6002"
            , bonusGrandRewardRatio: -1
            , KEY_CFG_TOKEN_SPREAD_REWARD_RATIO: "6003"
            , tokenSpreadRewardRatio: -1
            , KEY_CFG_TOKEN_PARENT_REWARD_RATIO: "6004"
            , tokenParentRewardRatio: -1
            , KEY_CFG_TOKEN_GRAND_REWARD_RATIO: "6005"
            , tokenGrandRewardRatio: -1
            , KEY_CFG_GAME_HOLDER_REWARD_RATIO: "6006"
            , gameHolderRewardRatio: -1
            , KEY_CFG_ETH_TO_TOKEN_RATIO: "6007"
            , ethToTokenRatio: -1
            , KEY_ADDRESS_ALL_USERS_GRAND: "7001"
            , addressAllUserGrand: -1
            , KEY_ADDRESS_TOKEN: "7002"
            , addressToken: -1
            , KEY_ADDRESS_TOKEN_SERVICE: "7003"
            , addressTokenService: -1

            // auth checker
            , authCheckerAddress: -1

        }

        ,
        methods: {

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
            ,
            grantAddressRole: function () {
                // todo cc ControlService.grant
                let t = this;
                log(t.userRoleAddress, t.userRole);
            }
            ,
            disGrantAddressRole: function () {
                // todo cc ControlService.disgrant
                let t = this;
                log(t.userRoleAddress, t.userRole);
            }

            // # inner contract manage

            // # period job manage
            ,
            changePeriod: function () {

            }
            ,
            updatePeriodJobInterval: function () {

            }

            // # partner contract manage


            // # configurations
            , updateConfig: function (key, value) {
                // todo cc call storageService
                log(key, value);
            }

            // # auth checker
            , updateAuthChecker: function () {
                // todo cc call storageService.setAuthChecker
                let t = this;
                log(t.authCheckerAddress);

            }
        }
    })
;


$(function () {
    try {
        vueApp.init();
    } catch (e) {
        log(e);
    }
});