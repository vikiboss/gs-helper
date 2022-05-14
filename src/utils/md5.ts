import crypto from "crypto";

// MD5 加密算法
const md5 = (value: string) => crypto.createHash("md5").update(value).digest("hex");

export default md5;
