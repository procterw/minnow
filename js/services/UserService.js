// Utilities for the current Parse user. Builds models and saves / retrieves objects to/from Parse.

angular.module("App")
	.factory("UserService", function() {

	var P = {};

	// Create a new user. Get name from Facebook, set blank array of logs
	P.newUser = function(user, callback) {
		FB.api(
	    "/me",
	    function (response) {
	      if (response && !response.error) {
	        user.set("name", response.first_name);
	        user.save().then(function(){
	        	callback(user)
	        })
	      }
	    }
		)
	}

	P.model = null;

	// Build a user model given a Parse user
	P.buildModel = function(user, callback) {
		// Get properties from user
		P.model = {};
		P.model.name = user.get("name");
		P.model.id = user.id;
	}

	P.logout = function() {
    FB.getLoginStatus(function(response) {
	    if (response && response.status === 'connected') {
        FB.logout(function(response) {
        	Parse.User.logOut()
	    		P.model = null;
          document.location.reload();
        });
	    }
    });
	};

	// refreshUser();

	return P;

});