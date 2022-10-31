const getServerNameByServer = (server: string): string => {
  if (server.startsWith('cn_gf')) {
    return '天空岛';
  } else if (server.startsWith('cn_qd')) {
    return '世界树';
  } else {
    return '国际服';
  }
};

export default getServerNameByServer;
