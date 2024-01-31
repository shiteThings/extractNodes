addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
});
// 存储拼接后的字符串，用于去重
const uniqueStrings = new Set();


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
		{ url: "https://raw.githubusercontent.com/Alvin9999/pac2/master/quick/4/config.yaml", type: "clash" },
		{ url: "https://raw.githubusercontent.com/Alvin9999/pac2/master/quick/1/config.yaml", type: "clash" },
		{ url: "https://raw.githubusercontent.com/Alvin9999/pac2/master/quick/config.yaml", type: "clash" },
		{ url: "https://raw.githubusercontent.com/Alvin9999/pac2/master/quick/3/config.yaml", type: "clash" },

		//naive		
		{ url: "https://www.gitlabip.xyz/Alvin9999/PAC/master/naiveproxy/1/config.json", type: "naiveh" },
		{ url: "https://gitlab.com/free9999/ipupdate/-/raw/master/naiveproxy/config.json", type: "naive" },
		{ url: "https://www.githubip.xyz/Alvin9999/PAC/master/naiveproxy/config.json", type: "naive" },
		{ url: "https://fastly.jsdelivr.net/gh/Alvin9999/PAC@latest/naiveproxy/config.json", type: "naive" },
		// 添加更多的网站地址和类型...
	];

	

	// 遍历所有地址并发送请求
	const promises = sites.map(site => fetchData(site));
	await Promise.all(promises);

	const mergedContent = Array.from(uniqueStrings).join("\n");

	const encoder = new TextEncoder();
	const bufferFromStr = encoder.encode(mergedContent);
	
	// 使用 btoa 将二进制数据转为 Base64 编码的字符串
	const base64Str = btoa(String.fromCharCode.apply(null, new Uint8Array(bufferFromStr)));



	return new Response(base64Str, {
		headers: { 'Content-Type': 'text/plain' },
	});
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
		let formattedString;
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
	const auth_Str = data.auth_str;
	const server_name = data.server_name;
	const alpn = data.alpn;
	const server = data.server;

	const formattedString = `hysteria://${server}?upmbps=${up_mps}&downmbps=${down_mps}&auth=${auth_Str}&insecure=1&peer=${server_name}&alpn=${alpn}`;
	uniqueStrings.add(formattedString)
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

	const formattedString = `hysteria2://${auth}@${server}?insecure=${insecure}&sni=${sni}`;
	uniqueStrings.add(formattedString)

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
	if (security === 'tls' && (fp === null || fp === undefined || fp === ''))
		fp = 'chrome'

	const formattedString = `${protocol}://${id}@${address}:${port}?security=${security}&sni=${sni}&fp=${fp}&type=${type}&path=${path}&host=${host}`;
	uniqueStrings.add(formattedString)
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

	const formattedString = `hysteria://${server}:${port}?upmbps=${up_mps}&downmbps=${down_mps}&auth=${auth_Str}&insecure=1&peer=${server_name}&alpn=${alpn}`;
	uniqueStrings.add(formattedString)
}

function processClash(data) {
	// 使用 js-yaml 或其他方式来解析 YAML 数据
	const jsyaml = require('js-yaml');

	// 解析 YAML 内容
	const content = jsyaml.load(data)

	// 提取 proxies 部分并合并到 merged_proxies 中
	const proxies = content.proxies || [];



	proxies.forEach(proxy => {


		let type = proxy.type

		if (type === 'hysteria') {
			let server = proxy.server
			let port = proxy.port

			let protocol = proxy.protocol// 处理 proxy.up
			let up
			if (typeof proxy.up === 'number') {
				up = proxy.up;
			} else if (typeof proxy.up === 'string') {
				const matchResult = proxy.up.match(/\d+/);
				if (matchResult) {
					up = parseInt(matchResult[0], 10);
				} else {
					// console.error('未找到匹配的数字。');
				}
			} else {
				// console.error('proxy.up 不是数字或字符串。');
			}

			// 处理 proxy.down
			let down
			if (typeof proxy.down === 'number') {
				down = proxy.down;
			} else if (typeof proxy.down === 'string') {
				const matchResult = proxy.down.match(/\d+/);
				if (matchResult) {
					down = parseInt(matchResult[0], 10);
				} else {
					// console.error('未找到匹配的数字。');
				}
			}
			else {
				// console.error('proxy.down 不是数字或字符串。');
			}

			let ports = proxy.port ?? ''
			let obfs = proxy.obfs ?? ''
			let fast_open = proxy['fast_open'] ?? 1
			let auth = proxy['auth-str'] || proxy['auth_str'];
			let insecure = 1
			let alpn = proxy.alpn[0]
			let sni = proxy.sni ?? ''
			let name = proxy.name ?? 'hy1'
			//hysteria://167.160.90.251:48089?peer=&auth=dongtaiwang.com&insecure=1&upmbps=50&downmbps=80&alpn=h3&mport=48089&obfs=&protocol=udp&fastopen=1#United States_
			// hysteria_meta = f"hysteria://{server}:{port}?peer={sni}&auth={auth}&insecure={insecure}&upmbps={up_mbps}&downmbps={down_mbps}&alpn={alpn}&mport={ports}&obfs={obfs}&protocol={protocol}&fastopen={fast_open}#${name}"
			// hysteria_meta = f"       hysteria://{server}:{port}?peer={sni}&auth={auth}&insecure={insecure}&upmbps={up_mbps}&downmbps={down_mbps}&alpn={alpn}&mport={ports}&obfs={obfs}&protocol={protocol}&fastopen={fast_open}#{name}"
			// hysteria://167.160.90.251:48089?upmbps=50&downmbps=80&auth=dongtaiwang.com&mport=48089&insecure=1&alpn=h3#United%20States_hy_0
			const formattedString = `hysteria://${server}:${port}?peer=${sni}&upmbps=${up}&downmbps=${down}&auth=${auth}&obfs=${obfs}&mport=${ports}&protocol=${protocol}&fastopen=${fast_open}&insecure=1&alpn=${alpn}#${name}`;

			uniqueStrings.add(formattedString)
		}
		else if (type === 'hysteria2') {
			let server = proxy.server
			let port = proxy.port
			let auth = proxy.password ?? ""
			let obfs = proxy.obfs ?? ''
			let obfs_password = proxy['obfs-password'] ?? ''
			let sni = proxy.sni ?? ''
			let insecure = proxy['skip-cert-verify'] ?? 1

			let name = proxy.name ?? 'hy2'
			let protocol = proxy.protocol 
			let formattedString = `hysteria2://${auth}@${server}:${port}?&insecure=${insecure}&sni=${sni}&obfs=${obfs}&obfs-password=${obfs_password}#${name}`;

			uniqueStrings.add(formattedString)
		}
		else if (type === 'vless') {

			let server = proxy.server
			let port = proxy.port
			let udp = proxy.udp ?? ""
			let uuid = proxy.uuid
			let network = proxy.network
			let tls = proxy.tls ?? 0
			let xudp = proxy.xudp ?? ""
			let sni = proxy.servername ?? ""
			let flow = proxy.flow ?? ""
			//获取 'reality-opts' 键的值，如果该键不存在，默认值为一个空对象 {}
			let realityOpts = proxy['reality-opts'] || {};
			// 获取 使'public-key' 键的值，如果该键不存在，默认值为一个空字符串 ''
			let publicKey = realityOpts['public-key'] || '';
			let short_id = realityOpts['short-id'] || '';
			let fp = proxy['client-fingerprint'] ?? ''
			let insecure = proxy['skip-cert-verify'] ?? 1
			let grpcOpts = proxy['grpc-opts'] || {};
			let grpc_serviceName = grpcOpts['rpc-service-name'] ?? ''
			let ws_opts = proxy['ws-opts'] || {}

			let ws_path = ws_opts.path ?? ''
			let ws_headers = ws_opts.headers ?? {}
			let ws_headers_host = ws_headers.host ?? ''
			let security
			if (tls === 0) {
				security = 'none'
			}
			else if (tls === 1 && publicKey != '') {
				security = 'reality'
			}
			else {
				security = 'tls'
			}
			let name = proxy.name ?? "vls"
			const formattedString = `vless://${uuid}@${server}:${port}?security=${security}&allowInsecure${insecure}&flow=${flow}&type=${network}&fp=${fp}&pbk=${publicKey}&sid=${short_id}&sni=${sni}&serviceName=${grpc_serviceName}&path=${ws_path}&host=${ws_headers_host}#${name}`
		
			uniqueStrings.add(formattedString)

		}
		else if (type === 'vmess') {
			let server = proxy.server
			let port = proxy.port
			let udp = proxy.udp ?? ""
			let uuid = proxy.uuid
			let network = proxy.network
			let alertId = proxy.alterId
			let tls = proxy.tls ?? 0
			let xudp = proxy.xudp ?? ""
			let sni = proxy.servername ?? ""
			let fp = proxy['client-fingerprint'] ?? ""
			let insecure = proxy['skip-cert-verify'] ?? 1
			let security
			if (tls === 0)
				security = 'none'
			else if (tls === 1)
				security = 'tls'
			let ws_opts = proxy['ws-opts'] || {}
			let ws_path = ws_opts.path ?? ''
			let ws_headers = ws_opts.headers ?? {}
			let ws_headers_host = ws_headers.host ?? ''
			let name = proxy.name ?? 'vms'
			let formattedString = `vmess://${uuid}@${server}:${port}?security=${security}&allowInsecure${insecure}&type=${network}&fp=${fp}&sni=${sni}&path=${ws_path}&host=${ws_headers_host}#vms`
	
			uniqueStrings.add(formattedString)
		}
		else if (type === 'tuic') {

			let server = proxy.server
			let port = proxy.port
			let uuid = proxy.uuid
			let password = proxy.password ?? ''
			let sni = proxy.sni ?? ''
			let insecure = 1
			let congestion = proxy['congestion-controller'] ?? "bbr"
			let udp_relay_mode = proxy['udp-relay-mode'] ?? "naive"
			congestion = proxy['congestion-controller'] ?? "bbr"
			let alpn = proxy.alpn[0]
			let name = 'tuic'
			const formattedString = `tuic://${uuid}:${password}@${server}:${port}?sni=${sni}&congestion_control=${congestion}&udp_relay_mode=${udp_relay_mode}&alpn=${alpn}&allow_insecure=${insecure}#${name}`
			uniqueStrings.add(formattedString)
		}
		//目前仅支持最原始版本ss，无插件支持
		else if (type === 'ss') {
			let server = proxy.server
			let port = proxy.port
			let password = proxy.password ?? ''
		
			let cipher = proxy.cipher ?? ''
			//  生成url @${server}:${port}
			let ss_url = `${cipher}:${password}`
			// 使用 Base64 编码对配置信息进行编码
			ss_url = btoa(unescape(encodeURIComponent(ss_url)));
			let ss_meta = `ss://${ss_url}@${server}:${port}`
			// console.log(ss_meta)x
	

			uniqueStrings.add(ss_meta)

		}
		else if (type === 'ssr') {
			let server = proxy.server
			let port = proxy.port
			let password = proxy.password ?? ""
			password = btoa(unescape(encodeURIComponent(password)));
			let cipher = proxy.cipher ?? ''
			let obfs = proxy.obfs ?? ""
			let protocol = proxy.protocol ?? ""
			let protocol_param = proxy['protocol-param'] ?? ""
			protocol_param = btoa(unescape(encodeURIComponent(protocol_param)));
			let obfs_param = proxy['obfs-param'] ?? ""
			obfs_param = btoa(unescape(encodeURIComponent(obfs_param)));
			// 生成URL
			let ssr_source = `${server}:${port}:${protocol}:${cipher}:${obfs}:${password}/?obfsparam=${obfs_param}&protoparam=${protocol_param}&remarks=ssr_nodes&protoparam=${protocol_param}=&obfsparam=${obfs_param}`
			ssr_source = btoa(unescape(encodeURIComponent(ssr_source)));
			let ssr_meta = `ssr://${ssr_source}`
			uniqueStrings.add(ssr_meta)

		}

	});
}
//处理naive
function processNaive(data) {
	let proxy_str = data.proxy
	let naiveproxy = btoa(unescape(encodeURIComponent(proxy_str)));
	uniqueStrings.add(naiveproxy)
}
