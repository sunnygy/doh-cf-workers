export async function onRequest(context) {
    // Contents of context object
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

  const doh = 'https://cloudflare-dns.com/dns-query'
	const contype = 'application/dns-message'
	const { method, headers, url } = request
	const { host, searchParams } = new URL(url)
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
