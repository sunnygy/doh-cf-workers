export default {		
    async fetch(request, env) {
		const doh = 'https://cloudflare-dns.com/dns-query'
		const contype = 'application/dns-message'
		const endpointPath = '/chfyxj1n3q8utfx1';
		const { method, headers, url } = request
		const { host, pathname, searchParams,} = new URL(url)
		if (pathname != endpointPath) {
		  return new Response('Hello World!', { status: 404 });
	        }
		if (method == 'GET' && searchParams.has('dns')) {
			return await fetch(doh + '?dns=' + searchParams.get('dns'), {
				method: 'GET',
				headers: {
					'Accept': contype,
				}
			});
		} else if (method == 'POST' && headers.get('content-type')=='application/dns-message') {
			return await fetch(doh, {
				method: 'POST',
				headers: {
					'Accept': contype,
					'Content-Type': contype,
				},
				body: await request.arrayBuffer()
			});
		} else {
			return new Response("", {status: 404})
		}      
    }
};
