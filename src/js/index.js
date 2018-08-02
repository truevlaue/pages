//_Definitions.js
//_ContractAddresses.js
//_TransactionConfigs.js
//_ABIs.js
//_QrCodeUtils.js
//_Web3Utils.js


let QrList = [

    // bonus
    TransactionConfigs.bonusInvest1Eth,
    TransactionConfigs.bonusInvest10Eth,
    TransactionConfigs.bonusInvest100Eth,

    // token
    TransactionConfigs.tokenInvest1Eth,
    TransactionConfigs.tokenInvest10Eth,
    TransactionConfigs.tokenInvest100Eth,
];


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

        // token
        , tokenDistributedPer: 40
        , tokenTotal: 210000000

        // bonus
        , bonusTotal: 1000
        , bonusProfitTotal: 123123

        // spread
        , spreadRewardTotal: 234234
    }

    , methods: {

        init: function () {

            // # rename this
            let t = this;

            // # init meta mask alike web3 provider
            t.browserWeb3Enabled = !!window.web3;

            if (t.browserWeb3Enabled) {
                t.browserWeb3 = window.web3;
                log("use MetaMask");
            }

            t.providerWeb3 = new Web3(new Web3.providers.HttpProvider(Definitions.infuraProviderUrl));

            // # start render rq codes.
            QrCodeUtils.drawQrCodes(QrList, t.providerWeb3);

        }

        // bonus invest
        , investBonus1EthViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.bonusInvest1Eth, t.browserWeb3);
        }
        , investBonus10EthViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.bonusInvest10Eth, t.browserWeb3);
        }
        , investBonus100EthViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.bonusInvest100Eth, t.browserWeb3);
        }

        // token invest
        , investToken1EthViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.tokenInvest1Eth, t.browserWeb3);
        }
        , investToken10EthViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.tokenInvest10Eth, t.browserWeb3);
        }
        , investToken100EthViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.tokenInvest100Eth, t.browserWeb3);
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