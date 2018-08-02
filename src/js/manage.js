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

        // inner contract

        // period job
        , periodJobInterval: -1

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