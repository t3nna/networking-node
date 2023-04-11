const dns = require('node:dns/promises');

(async () =>{

    const result = await dns.lookup('www.amazon.com')
    console.log(result)
})()