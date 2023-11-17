// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Storage {
    struct Step {
        int length;
        bool direction;
        string info;
    }

    mapping(address => Step) public stepsMap;
    event StepLogSet(address indexed _address, string _info);
    event StepLogRemove(address indexed _address);

    function set(address _addr, int _length, bool _direction, string memory _info) public {
        stepsMap[_addr] = Step(_length, _direction, _info);
        emit StepLogSet(msg.sender, _info);
    }

    function remove(address _addr) public {
        delete stepsMap[_addr];
        emit StepLogRemove(msg.sender);
    }


    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}