// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Add{
    uint public a=5;
    uint public b=10;
function add() public view returns(uint){
        return a+b;
    }
}