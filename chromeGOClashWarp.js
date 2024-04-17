addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
});
// 存储拼接后的字符串，用于去重
const uniqueStrings = new Set();

// 使用 js-yaml 或其他方式来解析 YAML 数据
const jsyaml = require('js-yaml');
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
		// //hy2
		{ url: 'https://www.gitlabip.xyz/Alvin9999/pac2/master/hysteria2/1/config.json', type: "hysteria2" },
		{ url: 'https://gitlab.com/free9999/ipupdate/-/raw/master/hysteria2/config.json', type: "hysteria2" },
		{ url: 'https://www.githubip.xyz/Alvin9999/pac2/master/hysteria2/config.json', type: "hysteria2" },
		{ url: 'https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/hysteria2/config.json', type: "hysteria2" },
		{ url: 'https://www.gitlabip.xyz/Alvin9999/pac2/master/hysteria2/13/config.json', type: "hysteria2" },
		{ url: 'https://gitlab.com/free9999/ipupdate/-/raw/master/hysteria2/2/config.json', type: "hysteria2" },
		{ url: 'https://www.githubip.xyz/Alvin9999/pac2/master/hysteria2/2/config.json', type: "hysteria2" },
		{ url: 'https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/hysteria2/2/config.json', type: "hysteria2" },
		//xray
		{ url: 'https://www.gitlabip.xyz/Alvin9999/pac2/master/xray/1/config.json', type: "xray" },
		{ url: 'https://gitlab.com/free9999/ipupdate/-/raw/master/xray/config.json', type: "xray" },
		{ url: 'https://www.githubip.xyz/Alvin9999/pac2/master/xray/config.json', type: "xray" },
		{ url: 'https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/xray/config.json', type: "xray" },
		{ url: 'https://www.gitlabip.xyz/Alvin9999/pac2/master/xray/3/config.json', type: "xray" },
		{ url: 'https://gitlab.com/free9999/ipupdate/-/raw/master/xray/2/config.json', type: "xray" },
		{ url: 'https://www.githubip.xyz/Alvin9999/pac2/master/xray/2/config.json', type: "xray" },
		//singbox
		{ url: "https://gitlab.com/free9999/ipupdate/-/raw/master/singbox/config.json", type: "singbox" },
		{ url: "https://www.githubip.xyz/Alvin9999/pac2/master/singbox/config.json", type: "singbox" },
		{ url: "https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/singbox/config.json", type: "singbox" },
		{ url: "https://www.gitlabip.xyz/Alvin9999/pac2/master/singbox/1/config.json", type: "singbox" },
		//clash
		{ url: "https://gitlab.com/free9999/ipupdate/-/raw/master/clash.meta2/config.yaml", type: "clash" },
		{ url: "https://gitlab.com/free9999/ipupdate/-/raw/master/clash.meta2/config.yaml", type: "clash" },
		{ url: "https://www.githubip.xyz/Alvin9999/pac2/master/clash.meta2/config.yaml", type: "clash" },
		{ url: "https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/clash.meta2/config.yaml", type: "clash" },
		{ url: "https://www.gitlabip.xyz/Alvin9999/pac2/master/clash.meta2/13/config.yaml", type: "clash" },
		{ url: "https://gitlab.com/free9999/ipupdate/-/raw/master/clash.meta2/2/config.yaml", type: "clash" },
		{ url: "https://www.githubip.xyz/Alvin9999/pac2/master/clash.meta2/2/config.yaml", type: "clash" },
		{ url: "https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/clash.meta2/2/config.yaml", type: "clash" },
		{ url: "https://www.gitlabip.xyz/Alvin9999/pac2/master/clash.meta2/15/config.yaml", type: "clash" },
		{ url: "https://gitlab.com/free9999/ipupdate/-/raw/master/clash.meta2/3/config.yaml", type: "clash" },
		{ url: "https://www.githubip.xyz/Alvin9999/pac2/master/clash.meta2/3/config.yaml", type: "clash" },
		{ url: "https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/clash.meta2/3/config.yaml", type: "clash" },
		// { url: "https://raw.githubusercontent.com/Alvin9999/pac2/master/quick/4/config.yaml", type: "clash" },
		// { url: "https://raw.githubusercontent.com/Alvin9999/pac2/master/quick/1/config.yaml", type: "clash" },
		// { url: "https://raw.githubusercontent.com/Alvin9999/pac2/master/quick/config.yaml", type: "clash" },
		// { url: "https://raw.githubusercontent.com/Alvin9999/pac2/master/quick/3/config.yaml", type: "clash" },
		//quick
		{ url: "https://www.gitlabip.xyz/Alvin9999/pac2/master/quick/1/config.yaml", type: "clash" },
		{ url: "https://gitlab.com/free9999/ipupdate/-/raw/master/quick/config.yaml", type: "clash" },
		{ url: "https://www.githubip.xyz/Alvin9999/pac2/master/quick/config.yaml", type: "clash" },
		{ url: "https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/quick/config.yaml", type: "clash" },
		{ url: "https://www.gitlabip.xyz/Alvin9999/pac2/master/quick/3/config.yaml", type: "clash" },
		{ url: "https://gitlab.com/free9999/ipupdate/-/raw/master/quick/3/config.yaml", type: "clash" },
		{ url: "https://www.githubip.xyz/Alvin9999/pac2/master/quick/4/config.yaml", type: "clash" },
		{ url: "https://fastly.jsdelivr.net/gh/Alvin9999/pac2@latest/quick/4/config.yaml", type: "clash" },

		//naive		
		// { url: "https://www.gitlabip.xyz/Alvin9999/PAC/master/naiveproxy/1/config.json", type: "naiveh" },
		// { url: "https://gitlab.com/free9999/ipupdate/-/raw/master/naiveproxy/config.json", type: "naive" },
		// { url: "https://www.githubip.xyz/Alvin9999/PAC/master/naiveproxy/config.json", type: "naive" },
		// { url: "https://fastly.jsdelivr.net/gh/Alvin9999/PAC@latest/naiveproxy/config.json", type: "naive" },
		// 添加更多的网站地址和类型...
	];



	// 遍历所有地址并发送请求
	const promises = sites.map(site => fetchData(site));
	await Promise.all(promises);

	let proxies = uniqueStrings

	const proxiesArray = Array.from(proxies); // 将 Set 转换为数组

	let proxiesNames = []
	for (let i = 0; i < proxiesArray.length; i++) {
		try {
			var obj = JSON.parse(proxiesArray[i])
			obj.name = "节点"+ (i+1)

			proxiesArray[i] = JSON.stringify(obj)
			proxiesNames.push(obj.name)
		} catch (error) {
			console.error(`Error ==================== ${i}: ${error}`);
		}
	}

	const yamlString = proxiesArray.map(proxy => {
		try {
			`- ${JSON.stringify(proxy).slice(1, -1)}`
		} catch (error) {
			console.error(`Error ==================== ${error}`);
		}
	}).join('\n').replace(/\\/g, '');  // 使用正则表达式替换所有的反斜杠

	// 使用 Array.map 处理每个数组元素，添加缩进
	const indentedArray = proxiesNames.map(item => `  - ${item}`);

	// 将处理后的数组转换为字符串
	const yamlNames = indentedArray.join('\n');


	// 将 proxiesNames 转换为 YAML 格式的字符串
	// const proxiesNamesString = proxiesNames.map((name, index) => {
	// 	return `${index}:\n  name: ${name}`;
	// }).join('\n');

	const yamlContent = `
port: 7890
allow-lan: true
mode: rule
log-level: info
unified-delay: true
global-client-fingerprint: chrome
dns:
  enable: true
  listen: :53
  ipv6: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver:
    - 223.5.5.5
    - 8.8.8.8
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://1.0.0.1/dns-query
    - tls://dns.google
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4
proxies:
- {name: "WARP",type: wireguard,server: 188.114.97.68,port: 928,ip: 172.16.0.2,private-key: SHVqHEGI7k2+OQ/oWMmWY2EQObbRQjRBdDPimh0h1WY=,public-key: bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=,remote-dns-resolve: false,udp: true,dialer-proxy: "WARP前置节点"}
${yamlString}
proxy-groups:
- name: 节点选择
  type: select
  proxies:
  - WARP
  - 自动选择
  - 负载均衡
  - 手动选择
  - DIRECT
- name: WARP前置节点
  type: select
  proxies:
  - 自动选择
  - 负载均衡
  - 手动选择
- name: 自动选择
  type: url-test
  url: http://www.gstatic.com/generate_204
  interval: 300
  tolerance: 50
  proxies:\n${yamlNames}
- name: 手动选择
  type: select
  proxies:\n${yamlNames}
- name: 负载均衡
  type: load-balance
  proxies:\n${yamlNames}
  url: http://www.gstatic.com/generate_204
  interval: 300
  strategy: round-robin
rules:
- DOMAIN,clash.razord.top,DIRECT
- DOMAIN,yacd.haishan.me,DIRECT
- GEOIP,LAN,DIRECT
- GEOIP,CN,DIRECT
- MATCH,节点选择	
    `;

	// 设置响应头，告诉浏览器这是一个可下载的文件
	const headers = {
		'Content-Type': 'text/yaml',
		'Content-Disposition': 'attachment; filename=data.yaml',
	};

	// 构建响应
	const response = new Response(yamlContent, { headers });

	return response;
}

// 发送请求并处理响应
async function fetchData(site) {
	try {
		const response = await fetch(site.url);
		let data
		let stype = site.type
		if (stype === 'clash') {

			data = await response.text()
		} else {

			data = await response.json();
		}
		// 根据类型选择对应的处理函数
	
		if (site.type === "hysteria") {
			processHysteri(data)
		}
		else if (site.type === "hysteria2") {
			processHysteria2(data)
		}
		else if (site.type === "xray") {
			processXray(data)
		}
		else if (site.type === 'singbox') {
			processSingbox(data)

		}
		else if (site.type === 'clash') {
			processClash(data)
		}
		else if (site.type === 'naive') {
			processNaive(data)
		}

	} catch (error) {
		console.error(`Error fetching data from ${site.url}: ${error}`);
	}
}

// 处理类型1的数据
function processHysteri(data) {

	// 从 JSON 数据中提取字段，并按指定格式拼接字符串
	const up_mps = data.up_mbps;
	const down_mps = data.down_mbps;
	const auth = data.auth_str;
	const server_name = data.server_name;
	const alpn = data.alpn;
	const serverAndPort = data.server
	const serverInfo = data.server.split(":");
	const server = serverInfo[0]
	const port = serverInfo[1]
	const fast_open = true
	const name = "hy";
	const protocol = data.protocol;
	const insecure = data.insecure ?? true;
	let proxy = {
		"name": name,
		"type": "hysteria",
		"server": server,
		"port": port,
		"auth_str": auth,
		"up": up_mps,
		"down": down_mps,
		"fast-open": fast_open,
		"protocol": protocol,
		"sni": server_name,
		"skip-cert-verify": insecure,
		"alpn": [alpn]
	}

	 uniqueStrings.add(JSON.stringify(proxy))
}

// 处理类型2的数据
function processHysteria2(data) {
	// 根据类型2的数据提取字段，并按指定格式拼接字符串
	// 这里提供一个示例，实际情况需要根据实际数据结构调整
	// 从 JSON 数据中提取所需字段
	const auth = data.auth || '';
	const server_info = data.server || '';
	const serverInfo = server_info.split(":")
	const serverIp = serverInfo[0]
	const serverPort = serverInfo[1]

	// 根据 data.insecure 的值设置 insecure
	const insecure = data.tls.insecure ?? true
	const fast_open = true
	const sni = data.tls.sni || '';
	const name = 'hy2'

	let proxy = {
		"name": name,
		"type": "hysteria2",
		"server": serverIp,
		"port": serverPort,
		"password": auth,
		"fast-open": fast_open,
		"sni": sni,
		"skip-cert-verify": insecure
	}
	uniqueStrings.add(JSON.stringify(proxy))

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
	if(security === 'tls') {
		istls = true
	}
	else {
		istls = false
	}
	const name = 'xray'
	path = outboundConfig?.streamSettings?.wsSettings?.path;
	host = outboundConfig?.streamSettings?.wsSettings?.headers?.Host;
	const cipher = "auto"
	if (security === 'tls' && (fp === null || fp === undefined || fp === ''))
		fp = 'chrome'
	let proxy
	if (type === "tcp") {
		proxy = {
			"name": name,
			"type": protocol,
			"server": server,
			"port": port,
			"uuid": uuid,
			"network": type,
			"tls": istls,
			"udp": isudp,
			"flow": flow,
			"client-fingerprint": fp,
			"servername": sni,                
			"reality-opts":{
				"public-key": publicKey,
				"short-id": shortId}
		}
	}
	else if (type === "grpc") {
		proxy = {
			"name": name,
			"type": protocol,
			"server": server,
			"port": port,
			"uuid": uuid,
			"network": network,
			"tls": istls,
			"udp": isudp,
			"flow": flow,
			"client-fingerprint": fingerprint,
			"servername": sni,
			"grpc-opts":{
				"grpc-service-name": serviceName
			},
			"reality-opts":{
				"public-key": publicKey,
				"short-id": shortId}
		}
	}
	else if(type === "ws"){
		proxy = {
			"name": name,
			"type": protocol,
 			"server": address,
 			"port": port,
 			"uuid": id,
			"tls": istls,
			"skip-cert-verify": true,
			"servername": sni,
			"network": type,
			"cipher": cipher,
			"alterId": 0,
			"ws-opts":{
				"path": path,
				"headers":{
					"host": host
				}
			},
			"client-fingerprint": fp
		}
	}


	uniqueStrings.add(JSON.stringify(proxy))
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
	const fast_open = true
	const protocol = "udp"
	const name = "singbox";
	const insecure = outbounds.tls.insecure ?? true
	const type = outbounds.type;
	let proxy;
	if(type == "hysteria") {
		proxy = {
			"name": name,
			"type": "hysteria",
			"server": server,
			"port": port,
			"auth_str": auth_Str,
			"up": up_mps,
			"down": down_mps,
			"fast-open": fast_open,
			"protocol": protocol,
			"sni": server_name,
			"skip-cert-verify": insecure,
			"alpn": [alpn]
		}
	}
	

	uniqueStrings.add(JSON.stringify(proxy))
}
// const uniqueStrings = new Set();
function processClash(data) {


	// 解析 YAML 内容
	const content = jsyaml.load(data)


	// 提取 proxies 部分并合并到 merged_proxies 中
	const proxies = content.proxies || [];

	// 打印结果
	// for (const proxy of proxies) {
	// 	// 做一些处理
	// 	uniqueStrings.add(proxy)
	// }
	for (const key in proxies) {
		if (proxies.hasOwnProperty(key)) {
			const value = proxies[key];

			uniqueStrings.add(JSON.stringify(value));
		}
	}


}
//处理naive
function processNaive(data) {
	let proxy_str = data.proxy
	let naiveproxy = btoa(unescape(encodeURIComponent(proxy_str)));
	uniqueStrings.add(naiveproxy)
}
