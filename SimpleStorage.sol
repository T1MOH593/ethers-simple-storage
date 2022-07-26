// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FirstContract {
    struct People {
        uint id;
        string firstName;
    }

    People[] public people;
    mapping(string => uint) public favouriteNumber;

    function addPerson(uint _id, string memory _firstName) public {
        people.push(People(_id, _firstName));

        favouriteNumber[_firstName] = _id;
    }
}