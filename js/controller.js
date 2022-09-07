var controller = {};
var view = {};
var model = {};

//Twitter widgets kit  
window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
     
      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };
     
      return t;
    }(document, "script", "twitter-wjs"));

//When the page has loaded
$(document).ready(function(){
    $('#content').hide(); 
    $.ajaxSetup({cache:true});
    //when the SDK has fully been getted/got
    $.getScript('//connect.facebook.net/en_US/sdk.js',function(){
        FB.init({
            appId: '1205230359544852',
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8'
        });
        
        //goes to content screen
        controller.content = function(){
            $('#splash').slideUp();
            $('#content').slideDown();
        };
        
        //go back to splash screen
        controller.splash = function(){
    		$('#content').hide();
            $('#splash').slideDown();
        };
        
        //Don't move untill working    
    	controller.createEvent = function(){
            $('.album').click(function(eventObj){
    			//call event in model next
    			window.open('https://www.facebook.com/DMS-Travel-815157038515764/photos/?tab=album&album_id='+eventObj.currentTarget.id);
    		});
        }
        
        //Starts everything
        model.getLoginStatus(view.displayLogin,view.displayFeed);
    });
});
