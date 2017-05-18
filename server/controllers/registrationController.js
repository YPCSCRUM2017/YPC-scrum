//Registration controller
//This controller handles registration for members

//

var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = requireFolder("models");
var session = require("express-session");
var mongoose = require("mongoose");
var User = mongoose.model("User");




module.exports = {

	//sends the registration page
	regPage: function(req, res, data){
		// console.log(req.session.errors );
		if (req.session.errors === undefined){
			req.session.errors = {};
		}
		res.render("./views/join.ejs", {errors: req.session.errors, navBar: data.navBar});
	},

	//user tries to register
	newUser: function(req, res){
		// console.log(req.body);
		var valid = true;
		var validationErrors = {};
		req.session.errors = {};

		if(req.body.first_name.length < 2){
			valid = false;
			validationErrors.first_name = "First name is required.";
		}
		if(req.body.last_name.length < 2){
			valid = false;
			validationErrors.last_name = "Last name is required.";
		}
		if(req.body.phone < 10){
			valid = false;
			validationErrors.phone = "Invalid phone number.";
		}

		if(req.body.email.length < 1){
			valid = false;
			validationErrors.email = "Email is required.";
		}
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var validateEmail = re.test(req.body.email);

		if (!validateEmail){
			validationErrors.email = "Email is not in email format";
		}

		if(req.body.pw1.length < 8){
			valid = false;
			validationErrors.password = "Password must be at least 8 characters";
		}
		else{
			if(req.body.pw1 !== req.body.pw2){
				valid = false;
				validationErrors.password = "Passwords do not match.";
			}
			else{
				var hasUpperCase = /[A-Z]/.test(req.body.pw1);
		    var hasLowerCase = /[a-z]/.test(req.body.pw1);
		    var hasNumbers = /\d/.test(req.body.pw1);
		    var hasNonalphas = /\W/.test(req.body.pw1);
		    if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 3){
		        valid = false;
		     		validationErrors.password = "Password needs a combination of upper-case letters, lower-case letters, numbers, and special characters";
		    }
			}
		}

		if(valid === true){
			// models.registrationModel.newUser(req, res, function(err, rows, fields){
			// 	for(key in err){
			// 		console.log(key, ":", err[key]);
			// 		// console.log("--");
			// 	}

			// hashing password
			var bcrypt = require("bcryptjs");
			var salt = bcrypt.genSaltSync(10);
			var hashedPW = bcrypt.hashSync(req.body.pw1, salt);

			var user = new User({first_name:req.body.first_name, last_name:req.body.last_name, email:req.body.email, password: hashedPW, phone:req.body.phone, company: req.body.company, position: req.body.position, street: req.body.street, city: req.body.city,
			 	zipcode: req.body.zipcode, first_pref: req.body.first_pref, sec_pref: req.body.sec_pref, third_pref: req.body.third_pref })
			user.save(function(err){
				if(err){
					console.log("something when wrong in saving the new User")
				}else{
					console.log("successfully added a user")
					res.redirect('/');
				}

			})
				// if(err != undefined && err.errno !== undefined)
				// {
				// 	switch(err.errno)
				// 	{
				// 		case 1062: validationErrors.email = "Email address already taken.";
				// 		break;
				// 	}
				// 	req.session.errors = validationErrors;
				// 	res.redirect('/registration');
				// }
				// else{
				// 	// console.log(rows, "rows from controller");
				// 	req.session.data = {};
				// 	// req.session.data.first_name = "test name 1";
				// 	req.session.data.userid = rows.insertId;
				// 	models.registrationModel.get1User(req, res, rows.insertId, function(errors, rows2, fields){
				// 		req.session.data.first_name = rows2[0].first_name;
				// 		res.redirect('/');
				// 	})
				// }


		}
		else
		{
			// console.log("Validation failed.");
			req.session.errors = validationErrors;
			res.redirect('/registration');
		}
	}
};
