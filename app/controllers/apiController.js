'use strict';

var Url = require("../models/urls.js");



function ApiHandler () {

	this.newUrl = function (req, res) {
		
		 var requrl=req.params["0"];
		 
		 var insertUrl = function(){
	   	   var dataset=Url({url: requrl});
	  	    dataset.save(function(err){
			if(err)
			{
				res.status(400).json({"error:":err.message});
				return;
			}
			res.json({"original_url":requrl,"short_url":process.env.APP_URL+dataset._id});
		  });
		 }

		 
		 Url.findOne({ url: requrl }, function (err, foundUrl) {
			if(foundUrl && !err)
			 res.json({"original_url":requrl,"short_url":process.env.APP_URL+foundUrl._id});
			else
			 insertUrl();
		 });

	};

 this.requestUrl = function(req, res){
 	
 	var id=req.params.id;
	Url.findById(id, function (err, url) {
  		if (err || !url) {
  			return res.sendStatus(404);
  		}
	   res.redirect(307,url.url);
        
  });
 }

}

module.exports = ApiHandler;
