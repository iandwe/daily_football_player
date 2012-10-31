function getAllPlayers()
{
	var obj;
	var allPlayersArray = [];
	
	

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

		//allPlayersArray = obj;	
			for(var i = 0; i < obj.length; i++)
			{
				allPlayersArray.push(obj[i]);
			}
		
		Ti.App.fireEvent('allPlayersFetched', {thearray:allPlayersArray});
	
	}	
	
	
	xhr.open('GET',"http://www.iandwe.se/playeroftheday/archive.json");
	xhr.send();
}


