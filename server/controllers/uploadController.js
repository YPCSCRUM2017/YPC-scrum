var path = require("path");
var htmlPath = path.join(__dirname, "./../../server/");
var crypto = require('crypto');

// var s3 = require('./../../server/config/s3functions.js');
// var AWS = require('aws-sdk');


// var s3Config = require('./../config/s3-keys.js');
// AWS.config.update({ accessKeyId: s3Config.accessKey, secretAccessKey: s3Config.secretKey });
// AWS.config.update({region: s3Config.region});
// var s3sdk = new AWS.S3();

module.exports = {
  index: function(req, res){
    // var path = "path/to/";
    var params = {Bucket: s3Config.bucket};
    // var req = s3.listObjects(params);
    // console.log(req)
    // req.send();
    s3sdk.listObjects(params, function (err, data) {
      if(err){
        throw err;
      }
      // console.log(data);
      res.render("./views/admin/upload/index.ejs", {allFiles: data.Contents, bucketName: s3Config.bucket});
    });
  },
	credentials: function(req, res){
    // console.log("this function generates credentials");
    if (req.query.filename) {
      // var filename = crypto.randomBytes(16).toString('hex') + path.extname(req.query.filename);
      var filename = req.query.filename;
      filename = path.basename(filename, path.extname(filename)) + " (" + new Date().toISOString() + ")" + path.extname(req.query.filename);
      // console.log(filename);
      // console.log(request.query.filename);
      // console.log(s3Config);
      res.json(s3.s3Credentials(s3Config, {filename: filename, contentType: req.query.content_type}));
    }
    else {
      // console.log("filename is required");
      res.status(400).send('filename is required');
    }
  },
  destroy: function(req, res){
    console.log("hitting destroy key route");
    var key=req.params.key;
    console.log(key);
    var params = {
      Bucket: s3Config.bucket, /* required */
      Key: key /* required */
    };
    s3sdk.deleteObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        console.log(data);           // successful response
      }
    });
    res.redirect("/upload");
  }


}
