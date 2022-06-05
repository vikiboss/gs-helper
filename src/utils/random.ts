/** 取指定范围随机数的函数 */
const random = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

export default random;
