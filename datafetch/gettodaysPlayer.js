function getTodaysPlayer(dateToUseInUrl)
{
	var obj;
	var todaysPlayer = {};
	
	

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
	
		obj = JSON.parse(resp);

		todaysPlayer = obj[0];	
		var clubarray = obj[0].clubarray;	
		todaysPlayer.clubarray = clubarray;
		Ti.App.fireEvent('playerFetched', {fetchedTodaysPlayer:todaysPlayer});
	
	}	
	
	//alert("ska hämta: " + "http://www.iandwe.se/playeroftheday/player-" + dateToUseInUrl + ".json");
	xhr.open('GET',"http://www.iandwe.se/playeroftheday/player-" + dateToUseInUrl + ".json");
	xhr.send();
}


