---
title: js根据奖品权重计算中奖概率实现抽奖的方法
category: 前端
tags:
  - JavaScript
cover: https://cdn.pixabay.com/photo/2020/10/20/08/49/sunrise-5669884_960_720.jpg
---

```js
/**
 *获取随机整数
 * 原理是随机数和最大值减最小值的差相乘最后再加上最小值,
 * Math.round(Math.random() * 9 ) + 1,相当于[1,10],
 * Math.round(Math.random()* 9)相当于Math.round(Math.random()*10*(9/10) ),
 * 生成的[0,9]范围的随机值再加一个1,就是[1,10]
 * @param {Number} min -最大值
 * @param {Number} max -最小值
 * @return {Number} result 结果
 */
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 经典的概率算法
 * 现在有数组:[10, 20, 30, 40]
 * 假设对应中奖几率:特等奖10%,一等奖20%,二等奖30%,三等奖40%,总共100%.
 * 算法开始时,从数组中选出一个值value,再从1-100概率空间内随机选出一个数random.
 * 比较value和random,如果random在value概率范围之内,则直接返回value对应的key.
 * 如果不在,则将概率空间的值减去value值.
 * 在本例中,第一次判断之后,就是减去10,也就是说第二次是在1-90这个范围内筛选的.
 * 这样筛选到最后,总会有一个数满足要求.
 * 就相当于去一个箱子里摸东西,
 * 第一个不是,第二个不是,第三个还不是,那最后一个一定是.
 * 这个算法简单,而且效率非常高.
 * @param {Array} weight 权重
 * @returns {Number} 数组下标
 */
function getRandom(weight) {
  //本程式的奖项权重和值
  let weightSum = weight.reduce((preVal, currVal) => preVal + currVal);
  for (let index = 0; index < weight.length; index++) {
    //生成一个权重随机数(1到weightSum之间)
    let random = Math.round(Math.random() * (weightSum - 1) + 1);
    if (random <= weight[index]) {
      return index;
    } else {
      weightSum -= weight[index];
    }
  }
}
//奖项名称
const prizes = ["一等奖", "二等奖", "三等奖", "四等奖", "未中奖"];
//奖项权重
const prizeWeight = [0, 10, 20, 30, 40];
let resault = []
for (let index = 0; index < 100; index++) {
  let idx = getRand(prizeWeight, prizes)
  resault.push(prizes[idx])
}

var countedNames = resault.reduce((prev, curr) => {
  if (curr in prev) {
    prev[curr]++;
  } else {
    prev[curr] = 1;
  }
  return prev
}, []);

console.log(countedNames, resault);
module.exports = getRandom

```
