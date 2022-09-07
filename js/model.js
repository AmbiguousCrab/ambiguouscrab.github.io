model.appid = "1205230359544852"; //MY ID

model.pageid = "815157038515764";//Dms Travel ID

//Callbacks to view, that are passed in from the controller. Call backs are function.
model.displayLoginCallback; //This one shows the status next to the button
model.displayMessagesCallBack;//This on Shows the album covers, description and feed.

//The arrays global is the best
model.feed = []; 
model.albums = [];


// This is called with the results from from FB.getLoginStatus().
model.statusChangeCallback = function(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
       model.ShowContent();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      model.displayLoginCallback('Please log ' + 'into this app.');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
     model.displayLoginCallback('Please login to Facebook' + ' in order to proceed.');
     controller.splash(); 
    }
}

//Login
//check if already logged in, gets called in controller as soon as the Facebook sdk is loaded
model.getLoginStatus = function(displayLoginCallback,displayMessagesCallBack){
	//grab the callbacks to talk to the view using the controller
	model.displayLoginCallback = displayLoginCallback;
	model.displayMessagesCallBack = displayMessagesCallBack;
	
	FB.getLoginStatus(function(response) {
	    model.statusChangeCallback(response);
	});	

	
}

//checks the login status and calls statusChangeCallback, gets called when the button is clicked.
model.checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      model.statusChangeCallback(response);
    });
}

//Show the content page, with an api call
model.ShowContent = function(){
	controller.content();
    FB.api('/me',function(user){
       model.displayLoginCallback('Thanks for logging in, ' + user.name + '!');
    });
    model.getInitial();
}

//Get messages from feed that are a story and liked by 815157038515764, which is same as model.pageid?
model.getInitial = function(){
	FB.api(
	'/'+model.pageid,
	'GET',
	{"fields":"feed{likes,story,message,from},description,albums{cover_photo{images},name,location,likes,id,description}"},
	function(response) {
	  // Insert your code here
		//feed
		responseFeed = response.feed.data;
		model.feed = []; 
		for (var i = 0; i < responseFeed.length; i++){//loop through all the data that I got
			if (responseFeed.story == undefined && responseFeed[i].likes != undefined){
				for (var j = 0; j <  responseFeed[i].likes.data.length; j++){ //Loop through all the likes that I got
					if ('815157038515764'.indexOf(responseFeed[i].likes.data[j].id) != -1){
						var feedObject = {name:responseFeed[i].from.name, message: responseFeed[i].message}
						model.feed.push(feedObject);
					}
				}
			}
		}
		//albumbs
		responseAlbumCovers = response.albums.data;
		model.albums = []; 
		for (var i = 0; i < responseAlbumCovers.length; i++){
			var likes = 0;
			if (responseAlbumCovers[i].likes != undefined){
				likes = responseAlbumCovers[i].likes.data.length;
			}
			if (responseAlbumCovers[i].location != undefined ){
				if (responseAlbumCovers[i].location.indexOf("Australia") != -1){
					var photoObject = {id:responseAlbumCovers[i].id, name: responseAlbumCovers[i].name, likes: likes, source: responseAlbumCovers[i].cover_photo.images[2].source, location: responseAlbumCovers[i].location};
					model.albums.push(photoObject);
				}
			}
		}
		//Sort by likes here, using the sort function in the last lecture backwards
		model.albums.sort(function(a, b){
			return (b.likes - a.likes);
		});
		
		model.displayMessagesCallBack(model.feed,model.albums,response.description);
	}
	);
}
