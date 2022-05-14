const getServerByUid = (uid: string) => {
  if (!uid[0]) return "";
  return uid[0] === "5" ? "cn_qd01" : "cn_gf01";
};

export default getServerByUid;
