let QrCodeUtils = {
    qrGenerator: new EthereumQRPlugin(),
    drawQrCode: function (_config, _web3) {
        const configDetails = {
            size: _config.size || 180,
            selector: '#' + _config.selector,
            options: {
                margin: _config.margin || 2
            }
        };

        const transactionDetail = {
            to: _config.to,
            value: _web3.toWei(_config.value, _config.uom),
            gas: _config.gas
        };

        this.qrGenerator.toCanvas(transactionDetail, configDetails);
    }

    , drawQrCodes: function (_configs, _web3) {
        for (let i = 0; i < _configs.length; i++) {
            this.drawQrCode(_configs[i], _web3);
        }
    }
};



