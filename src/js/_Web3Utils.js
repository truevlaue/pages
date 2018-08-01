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