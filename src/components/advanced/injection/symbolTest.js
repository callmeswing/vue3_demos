// ES6 引入得原始数据类型 表示唯一得标识符
// 每次调用都会返回一个唯一值
const sym1 = Symbol();
const sym2 = Symbol();
console.log(sym1 === sym2);

// 带描述的symbol（上面的都是匿名型式的）
const symWithDesc = Symbol("symWithDescription");

// 场景：定义常量枚举值
const COLOR = {
  RED: Symbol("RED"),
  GREEN: Symbol("GREEN"),
};

function getColorName(color) {
  switch (color) {
    case COLOR.RED:
      return "Red";
    case COLOR.GREEN:
      return "Green";
    default:
      return "Unknown";
  }
}
console.log(getColorName(COLOR.RED));

// 场景：用symbol作为对象key
const obj = {};
const mykey = Symbol("myKey"); // 这个一个Symbol对象，传入的字符串只是描述
obj[mykey] = "myValue"; // 为什么不用obj.myKey的方式赋值？.赋值key只能是字符串，[]赋值才能将对象作为key （有点类似于vue的动态赋值）

// JavaScript 的内置 Symbol
// Symbol 名称	作用
// Symbol.iterator	控制对象的 for...of 行为
// Symbol.toPrimitive	控制对象在需要转原始值时的表现
// Symbol.toStringTag	控制 Object.prototype.toString.call(obj) 的返回值
// Symbol.hasInstance	控制 instanceof 判断行为
// 举例
//        什么是 Symbol.toPrimitive
// 当 JavaScript 试图把一个对象变成原始值（比如数字或字符串）的时候，它会优先看这个对象有没有定义 Symbol.toPrimitive 方法。
// 这个过程在下面这些场景中发生：
// +obj
// String(obj)
// 模板字符串 ${obj}
// 和原始值做运算，比如 obj + 1
// ❗参数 hint 表示 “我想要哪种类型的原始值”

// 场景：自定义对象原生行为（使用上面介绍的内置Symbol）
class Money {
  constructor(value) {
    this.value = value;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.value;
    if (hint === "string") return `¥${this.value}`;
    return this.value;
  }
}

const cash = new Money(100);
console.log(cash + 50); // 150
console.log(`我有${cash}`); // 我有¥100
