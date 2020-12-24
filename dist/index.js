"use strict";
// Typescript Sample
// class Human {
//   public userName: string;
//   public age: number;
//   public gender: string;
//   constructor(userName: string, age: number, gender: string) {
//     this.userName = userName;
//     this.age = age;
//     this.gender = gender;
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
// const happy = new Human('happy', 40, 'female');
// // interface Human {
// //   userName: string;
// //   age: number;
// //   gender: string;
// // }
// // const person = { userName: 'happy', age: 39, gender: 'male' };
// const sayHi = (user: Human): string => {
//   return `Name:${user.userName}, Age:${user.age}, Gender:${user.gender}!!!`;
// };
// console.log(sayHi(happy));
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calcalateBlockHash = (index, previousHash, timestamp, data) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};
Block.validateStructure = (aBlock) => typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.timestamp === 'number' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.data === 'string';
const genesisBlockData = {
    name: 'Genesis Block',
    data: 'Genesis',
};
const genesisBlock = new Block(1, '00000000000000000000', '', JSON.stringify(genesisBlockData), 1608817599133);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getBlockByIndex = (idx) => blockchain[idx];
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const getHashforBlock = (aBlock) => Block.calcalateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock))
        return false;
    if (previousBlock.index + 1 !== candidateBlock.index)
        return false;
    if (previousBlock.hash !== candidateBlock.previousHash)
        return false;
    if (getHashforBlock(candidateBlock) !== candidateBlock.hash)
        return false;
    return true;
};
const addBlock = (candidateBlock) => {
    if (!isBlockValid(candidateBlock, getLatestBlock()))
        return;
    blockchain.push(candidateBlock);
};
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const nextTimestamp = getNewTimestamp();
    const nextHash = Block.calcalateBlockHash(newIndex, previousBlock.hash, nextTimestamp, data);
    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
    addBlock(newBlock);
    return newBlock;
};
getBlockByIndex(0);
createNewBlock(`{"name":"happy1, "data":"hahaha"}`);
createNewBlock(`{"name":"happy2, "data":"hihihi"}`);
console.log(blockchain);
//# sourceMappingURL=index.js.map