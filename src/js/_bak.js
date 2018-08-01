t.bonusService = t.siteWeb3Provider.eth.contract(BonusServiceABI).at(ContractAddresses.BonusServiceImpl);
t.tokenService = t.siteWeb3Provider.eth.contract(TokenServiceABI).at(ContractAddresses.TokenServiceImpl);
let userBonus = t.bonusService.getCurrentInvest.call(userAccount);
