//_Definitions.js
//_ContractAddresses.js
//_TransactionConfigs.js
//_ABIs.js
//_Web3Utils.js


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