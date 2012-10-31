function getToday()
{
	var obj;
	var myFetchedDate;
		
	
	
	xhr = Ti.Network.createHTTPClient();
	xhr.onerror = function(e)
	{ 
		var errMsg = "";
		if (!Titanium.Network.online) 
		{ 
			//alert('You are not online please restart the app after you are online.');
			errMsg = "You are not online please restart the app after you are online";
					Ti.App.fireEvent('errorInFetch', errMsg);
		}
		else
		{
			errMsg = "something went wrong when fetching the data, please restart app.";
					Ti.App.fireEvent('errorInFetch', errMsg);
			//alert('something went wrong.');
			
		}
			
	}
	
	xhr.onload = function(){
	
		var resp = xhr.responseText;
		myFetchedDate = resp;
		//alert("date: " + resp);

		/*obj = JSON.parse(resp);
	
		
		for(var i = 0; i < obj.length; i++)
		{
			var currentPost = obj[i];	
			myFetchedDate = currentPost.today;
		}*/
		
		Ti.App.fireEvent('dateFetched', {date:myFetchedDate});
	}	
	
	//xhr.open('GET', 'http://www.konfa.me/?json=get_recent_posts&custom_fields=longitude,latitude,kontaktNamn,kontaktTel,kontaktEmail,svenskakyrkanUrl,facebookGruppID');
	xhr.open('GET','http://www.iandwe.se/playeroftheday/today.php');
	xhr.send();
}


