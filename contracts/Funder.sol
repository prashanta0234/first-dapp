// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Funder{
    uint public numofFunder;
    mapping(uint => address) funders;

    receive()  external payable {

    }

    function transfer() external payable {
        funders[numofFunder]= msg.sender;
    }
    function withdraw(uint withdrawAmount) external {
        require(withdrawAmount <= 2000000000000000000,"Cannot withdraw");
        payable(msg.sender).transfer(withdrawAmount);
    }
}