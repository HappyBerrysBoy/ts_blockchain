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

import * as CryptoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calcalateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string,
  ): string => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  };

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.timestamp === 'number' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.data === 'string';

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number,
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlockData = {
  name: 'Genesis Block',
  data: 'Genesis',
};

const genesisBlock: Block = new Block(
  1,
  '00000000000000000000',
  '',
  JSON.stringify(genesisBlockData),
  1608817599133,
);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getBlockByIndex = (idx: number): Block => blockchain[idx];

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const getHashforBlock = (aBlock: Block): string =>
  Block.calcalateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data,
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) return false;

  if (previousBlock.index + 1 !== candidateBlock.index) return false;

  if (previousBlock.hash !== candidateBlock.previousHash) return false;

  if (getHashforBlock(candidateBlock) !== candidateBlock.hash) return false;

  return true;
};

const addBlock = (candidateBlock: Block): void => {
  if (!isBlockValid(candidateBlock, getLatestBlock())) return;

  blockchain.push(candidateBlock);
};

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const nextTimestamp: number = getNewTimestamp();
  const nextHash: string = Block.calcalateBlockHash(
    newIndex,
    previousBlock.hash,
    nextTimestamp,
    data,
  );

  const newBlock: Block = new Block(
    newIndex,
    nextHash,
    previousBlock.hash,
    data,
    nextTimestamp,
  );

  addBlock(newBlock);

  return newBlock;
};

getBlockByIndex(0);
createNewBlock(`{"name":"happy1, "data":"hahaha"}`);
createNewBlock(`{"name":"happy2, "data":"hihihi"}`);

console.log(blockchain);

export {};
