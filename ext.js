addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 定义要发送请求的地址数组，每个元素包含一个 url 和一个处理函数

  const sites = [
    { url: "https://www.gitlabip.xyz/Alvin9999/pac2/master/hysteria/1/config.json", type: "hysteria" },
    { url: "https://gitlab.com/free9999/ipupdate/-/raw/master/hysteria/config.json", type: "hysteria" },
    { url: "https://www.githubip.xyz/Alvin9999/pac2/master/hysteria/config.json", type: "hysteria" },
    { url: "https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/hysteria/config.json", type: "hysteria" },
    { url: "https://www.gitlabip.xyz/Alvin9999/pac2/master/hysteria/13/config.json", type: "hysteria" },
    { url: "https://gitlab.com/free9999/ipupdate/-/raw/master/hysteria/2/config.json", type: "hysteria" },
    { url: "https://www.githubip.xyz/Alvin9999/pac2/master/hysteria/2/config.json", type: "hysteria" },
    { url: "https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/hysteria/2/config.json", type: "hysteria" },
    //hy2
    { url: 'https://www.gitlabip.xyz/Alvin9999/pac2/master/hysteria2/1/config.json', type: "hysteria2" },
    { url: 'https://gitlab.com/free9999/ipupdate/-/raw/master/hysteria2/config.json', type: "hysteria2" },
    { url: 'https://www.githubip.xyz/Alvin9999/pac2/master/hysteria2/config.json', type: "hysteria2" },
    { url: 'https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/hysteria2/config.json', type: "hysteria2" },
    { url: 'https://www.gitlabip.xyz/Alvin9999/pac2/master/hysteria2/13/config.json', type: "hysteria2" },
    { url: 'https://gitlab.com/free9999/ipupdate/-/raw/master/hysteria2/2/config.json', type: "hysteria2" },
    { url: 'https://www.githubip.xyz/Alvin9999/pac2/master/hysteria2/2/config.json', type: "hysteria2" },
    { url: 'https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/hysteria2/2/config.json', type: "hysteria2" },
    //xray
    { url: 'https://www.gitlabip.xyz/Alvin9999/pac2/master/xray/1/config.json',type: "xray" },
    { url: 'https://gitlab.com/free9999/ipupdate/-/raw/master/xray/config.json',type: "xray"},
    { url: 'https://www.githubip.xyz/Alvin9999/pac2/master/xray/config.json',type: "xray"},
    { url: 'https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/xray/config.json',type: "xray"},
    { url: 'https://www.gitlabip.xyz/Alvin9999/pac2/master/xray/3/config.json',type: "xray"},
    { url: 'https://gitlab.com/free9999/ipupdate/-/raw/master/xray/2/config.json',type: "xray"},
    { url: 'https://www.githubip.xyz/Alvin9999/pac2/master/xray/2/config.json',type: "xray"},
    //singbox
    { url: "https://gitlab.com/free9999/ipupdate/-/raw/master/singbox/config.json",type: "singbox"},
    { url: "https://www.githubip.xyz/Alvin9999/pac2/master/singbox/config.json",type: "singbox"},
    { url: "https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/singbox/config.json", type: "singbox"},
    { url: "https://www.gitlabip.xyz/Alvin9999/pac2/master/singbox/1/config.json", type: "singbox"}
    // 添加更多的网站地址和类型...
  ];

  // 存储拼接后的字符串，用于去重
  const uniqueStrings = new Set();

  // 发送请求并处理响应
  async function fetchData(site) {
    try {
      const response = await fetch(site.url);
      const data = await response.json();

      // 根据网站类型选择对应的处理函数
      let formattedString ;
      if(site.type === "hysteria") {
        formattedString = processHysteri(data)
      }
      else if(site.type === "hysteria2") {
        formattedString = processHysteria2(data)
      }
      else if(site.type === "xray"){
        formattedString = processXray(data)
      }
      else {
        formattedString = processSingbox(data)

    }
      // 将拼接的字符串添加到集合中
      uniqueStrings.add(formattedString);
    } catch (error) {
      console.error(`Error fetching data from ${site.url}: ${error}`);
    }
  }

  // 处理类型1的数据
  function processHysteri(data) {
    // 从 JSON 数据中提取字段，并按指定格式拼接字符串
    const up_mps = data.up_mbps;
    const down_mps = data.down_mbps;
    const auth_Str = data.auth_str;
    const server_name = data.server_name;
    const alpn = data.alpn;
    const server = data.server;

    return `hysteria://${server}?upmbps=${up_mps}&downmbps=${down_mps}&auth=${auth_Str}&insecure=1&peer=${server_name}&alpn=${alpn}`;
  }

  // 处理类型2的数据
  function processHysteria2(data) {
    // 根据类型2的数据提取字段，并按指定格式拼接字符串
    // 这里提供一个示例，实际情况需要根据实际数据结构调整
     // 从 JSON 数据中提取所需字段
     const auth = data.auth || '';
     const server = data.server || '';
     
     // 根据 data.insecure 的值设置 insecure
     const insecure = data.tls.insecure ? 1 : 0;
     
     const sni = data.tls.sni || '';

    return `hy2://${auth}@${server}?insecure=${insecure}&sni=${sni}`;
  }

  // 处理xray的数据
  function processXray(data) {
    let protocol, address, port, id, encryption, type, security, sni, fp, path, host;
    let outboundConfig = data.outbounds[0];
    protocol = outboundConfig.protocol;
    id = outboundConfig.settings?.vnext?.[0]?.users?.[0]?.id;
    address = outboundConfig.settings?.vnext?.[0]?.address;
    port = outboundConfig.settings?.vnext?.[0]?.port;
    encryption = outboundConfig.settings?.vnext?.[0]?.users?.[0]?.encryption;
    type = outboundConfig?.streamSettings?.network;
    security = outboundConfig?.streamSettings?.security;
    sni = outboundConfig?.streamSettings?.tlsSettings?.serverName;
    fp = outboundConfig?.streamSettings?.tlsSettings?.fingerprint;
    path = outboundConfig?.streamSettings?.wsSettings?.path;
    host = outboundConfig?.streamSettings?.wsSettings?.headers?.Host;

    return `${protocol}://${id}@${address}:${port}?security=${security}&sni=${sni}&fp=${fp}&type=${type}&path=${path}&host=${host}`;
  }

  // 处理singbox的数据
  function processSingbox(data) {
    const outbounds = data.outbounds[0];
    const up_mps = outbounds.up_mbps;
    const down_mps = outbounds.down_mbps;
    const auth_Str = outbounds.auth_str;
    const server_name = outbounds.tls.server_name;
    const alpn = outbounds.tls.alpn[0];
    const server = outbounds.server;
    const port = outbounds.server_port;

    return `hysteria://${server}:${port}?upmbps=${up_mps}&downmbps=${down_mps}&auth=${auth_Str}&insecure=1&peer=${server_name}&alpn=${alpn}`;
  }
  // 遍历所有地址并发送请求
  const promises = sites.map(site => fetchData(site));
  await Promise.all(promises);

  // 构建最终字符串
  const finalStrings = [...uniqueStrings];

  // 生成 HTML 页面内容
  const htmlContent = finalStrings.map(str => `<p>${str}</p>`).join('\n');

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}