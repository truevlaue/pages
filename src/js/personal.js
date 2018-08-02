//_Definitions.js
//_ContractAddresses.js
//_TransactionConfigs.js
//_ABIs.js
//_QrCodeUtils.js
//_Web3Utils.js


let QrList = [

    // bonus
    TransactionConfigs.bonusDivest,
    TransactionConfigs.bonusWithdrawProfit,

    // token
    TransactionConfigs.tokenWithdrawProfit,

    // direct balance
    TransactionConfigs.balanceWithdraw

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
        , divestBonusViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.bonusDivest, t.browserWeb3);
        }
        , withdrawBonusProfitViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.bonusWithdrawProfit, t.browserWeb3);
        }

        // token invest
        , withdrawTokenProfitViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.tokenWithdrawProfit, t.browserWeb3);
        }


        // direct balance
        , withdrawDirectBalanceViaBrowser: function () {
            let t = this;
            Web3Utils.sendEth(TransactionConfigs.balanceWithdraw, t.browserWeb3);
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
