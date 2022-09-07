
//update the login status
view.displayLogin = function(data) {
    $('#status').html(data);
};

//display comments, album covers{object}, and description{string} by injection into html
view.displayFeed = function(feed,albums,description) {
	var htmlStr = ""; 
	//
	for (var i = 0; i < feed.length-1; i++) {
		htmlStr += '<p><strong>'+ feed[i].name +'</strong><br>'+ feed[i].message +'</p>'
	}
	$('#feed').html(htmlStr);
		
	
	console.log(feed);
	console.log(albums);
	console.log(description);
	
	//Now do the album covers.
	htmlStr = ""; //almost forgot to clear it.
	for (var i = 0; i < albums.length; i++) {
		htmlStr += '<div class="col-sm-6 col-md-3" ><div class="thumbnail album" id=' + albums[i].id + '><img src="' + albums[i].source + '" alt="' + albums[i].name + '" > <div class="caption"> <h3>' + albums[i].name +'</h3><p>Likes:'+ albums[i].likes + '</p></div></div></div>';
	}
	$('#albums').html(htmlStr); 
	$('#description').html(description); 
	

	controller.createEvent();    
};