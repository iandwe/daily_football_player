function getTodaysPlayerByDate(dateToUseInUrl)
{
	var obj;
	var todaysPlayerByDate = {};
	
	

	xhr = Ti.Network.createHTTPClient();
	xhr.onerror = function(e)
	{ 
	
		var errMsg = "";
		if (!Titanium.Network.online) 
		{ 
			//alert('You are not online please restart the app after you are online.');
			errMsg = "You are not online please restart the app after you are online";
					Ti.App.fireEvent('errorInFetchPlayerByDate', errMsg);
		}
		else
		{
			errMsg = "something went wrong when fetching the data, please restart app.";
					Ti.App.fireEvent('errorInFetchPlayerByDate', errMsg);
			//alert('something went wrong.');
			
		}
			
			
	}
	
	xhr.onload = function(){
	
		var resp = xhr.responseText;
	
		obj = JSON.parse(resp);

		todaysPlayerByDate = obj[0];		
		
		Ti.App.fireEvent('playerFetchedByDate', {fetchedTodaysPlayerByDate:todaysPlayerByDate});
	
	}	
	
	//alert("ska hämta: " + "http://www.iandwe.se/playeroftheday/player-" + dateToUseInUrl + ".json");
	xhr.open('GET',"http://www.iandwe.se/playeroftheday/player-" + dateToUseInUrl + ".json");
	xhr.send();
}


