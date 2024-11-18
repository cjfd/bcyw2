const { assert } = require('chai');

const EtherGame = artifacts.require('EtherGame');
const Attack= artifacts.require('Attack');
contract('EtherGame', function (accounts){

    beforeEach(async () => {
        //选手填写部分
    });

    it("should successfully attack EtherGame contract", async () => {
        //获取攻击前Alice账户余额
        const balanceAliceBefore = await web3.eth.getBalance(alice);
        //Bob先往合约中充值1个eth
        await etherGame.deposit({value: web3.utils.toWei("1", "ether"), from:bob})
        //获取攻击前合约余额，判断bob是否充值成功
        const balanceBefore = await web3.eth.getBalance(etherGame.address);
        assert.equal(balanceBefore, 1e18, "Bob should successfully deposited");
        //发起攻击，往合约中充值达到胜利条件-1数量的eth
        const remain = 7e18 - balanceBefore - 1e18;
        await attack.attack({ value: web3.utils.toWei(String(remain), "wei"), from: alice });
        //正常调用deposit函数，使得Alice成为赢家
        await etherGame.deposit({value:web3.utils.toWei("1", "ether"), from:alice});
        //验证攻击结果
        //选手填写部分

    })
})
