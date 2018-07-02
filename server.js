const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
var router = express.Router();
var jsSHA = require("jssha");

router.route('/NYWebsite/getHash').post(function(req, res) {
  if (!req.body.txnid || !req.body.amount || !req.body.productinfo
       || !req.body.firstname || !req.body.email) {
         res.send("Mandatory fields missing");
   } else {
         var pd = req.body;
         var hashString = config.payumoney.key // Merchant Key
                  + '|' + pd.txnid
                  + '|' + pd.amount + '|' + pd.productinfo + '|'
                  + pd.firstname + '|' + pd.email + '|'
                  + '||||||||||'
                  + config.payumoney.salt // Your salt value
         var sha = new jsSHA('SHA-512', "TEXT");
         sha.update(hashString)
         var hash = sha.getHash("HEX");
         res.send({ 'hash': hash });
   }
});

router.route('/NYWebsite/responseHash').post(function (req, res) {
    var pd = req.body;
    //Generate new Hash
     var hashString = config.payumoney.salt + '|' + pd.status + '||||||||||' + '|' + pd.email + '|' + pd.firstname + '|' + pd.productinfo + '|' + pd.amount + '|' + pd.txnid + '|' + config.payumoney.key
     var sha = new jsSHA('SHA-512', "TEXT");
     sha.update(hashString)
     var hash = sha.getHash("HEX");
     // Verify the new hash with the hash value in response
     if (hash == pd.hash) {
         res.send({'status':pd.status});
     } else {
         res.send({'status':"Error occured"});
     }
  });


app.listen(port, () => console.log(`Listening on port ${port}`));
