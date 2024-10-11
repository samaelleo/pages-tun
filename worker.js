export default {
   async fetch(request) {
       const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || (request.socket && request.socket.remoteAddress);
       let url = new URL(request.url);
       const worker_domain = url.hostname;
       url.hostname = "savana.bossk8.ir";                        
       url.protocol = request.headers.get('x-forwarded-proto') || "https";
       let newRequest = new Request(url, request);
       if (ip) {
           newRequest.headers.set('cf-connecting-ip', ip);
       }
       newRequest.headers.set('Host', worker_domain);
       return fetch(newRequest);
   }
};
