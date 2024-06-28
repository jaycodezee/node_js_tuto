var dns = require('dns');

dns.lookup('www.google.com', function onLookup(err, address, family) {
   console.log('address:', address);
   dns.reverse(address, function (err) {
      if (err) {
         console.log(err.stack);
      }

      console.log('Reverse for ' + address );
   });  
});