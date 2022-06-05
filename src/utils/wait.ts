/** 进行延时操作的函数 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default wait;
