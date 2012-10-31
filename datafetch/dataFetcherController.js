
// dessa variabler används senare i showfirstplayer.js
var theFetchedDate;
var theFetchedPlayer;
var allPlayers = [];
var STATE_OF_APP = "online";

//if use of saved data change STATE_OF_FETCH_DATA to "loadsaved"

// api anropen, alla utom get player by date som anropas i showfirstplayer.js
Ti.include("strip_tags.js");
Ti.include("gettoday.js");
Ti.include("gettodaysPlayer.js");
Ti.include("getAllPlayers.js");

//activityindikatorn som sätts på under tiden laddningen sker

var actInd = Titanium.UI.createActivityIndicator();
actInd.message = 'Please wait...';//message will only shows in android. 
Ti.UI.currentWindow.add(actInd);
actInd.show();

 


if (!Titanium.Network.online) 
			{ 
				//alert('You are not connected to internet, you will now be in offline-mode');
				STATE_OF_APP = "notonline";
				var testSavedDate = Ti.App.Properties.getString('todaysDateSaved', 'nofetchedDate');
				if(testSavedDate == 'nofetchedDate')
				{
					actInd.hide();
					alert("You are not connected to internet and have no saved data, please connect and restart app.");
				}
				else
				{
					theFetchedDate = testSavedDate;
					theFetchedPlayer = JSON.parse(Ti.App.Properties.getString(theFetchedDate));
					allPlayers = Ti.App.Properties.getList('allPlayersSaved');
					actInd.hide();
					alert("You are not connected to internet, you will now enter the app in offline-mode.");
    				dothis();
				}
					
			}
			else
			{
				getToday();
			}


Ti.App.addEventListener('dateFetched', function(data) 
{ 
	//alert("fick datum");
	 actInd.message="Fetching todays player";
     theFetchedDate = data.date;
    // alert(theFetchedDate);
      var testString;
      if(howtofetch.statedata =="loadsaved")
      {
      	 testString = Ti.App.Properties.getString(theFetchedDate, "notsaved");
      }
      else
      {
      	testString = "notsaved";
      }
    
	//getTodaysPlayer(theFetchedDate);
	//Ti.App.Properties.setString('todaysDateSaved', theFetchedDate);
	
		if(testString == "notsaved")
		{
			getTodaysPlayer(theFetchedDate);
     		Ti.App.Properties.setString('todaysDateSaved', theFetchedDate);
		}
		else
		{
			theFetchedPlayer = JSON.parse(Ti.App.Properties.getString(theFetchedDate));
			//getAllPlayers();
			var testArray = Ti.App.Properties.getList('allPlayersSaved');
			if(testArray.length != 0)
			{
				allPlayers = testArray;
				actInd.hide();
				
				
					dothis();
				
    			
    			//alert("använder sparad array");
			}
			else
			{
				getAllPlayers();
			}
			
			
		}
     
    

});

Ti.App.addEventListener('playerFetched', function(data) 
{ 
	//alert("fick player");
	 actInd.message="Fetching list of all players";
     theFetchedPlayer = data.fetchedTodaysPlayer;
     Ti.App.Properties.setString('todaysPlayerSaved', JSON.stringify(theFetchedPlayer));
     Ti.App.Properties.setString(theFetchedPlayer.nicedate, JSON.stringify(theFetchedPlayer));
     getAllPlayers();
     
});

Ti.App.addEventListener('allPlayersFetched', function(data) 
{ 
	//alert("fick alla spelare");
     allPlayers = data.thearray;
     actInd.hide();
    
     	 dothis();
     
    
     Ti.App.Properties.setList('allPlayersSaved', allPlayers);
     
});
Ti.App.addEventListener('errorInFetch', function(msg) 
{ 
	if(isReloadingFromResume == true)
	{
		isReloadingFromResume = false;
	}
	if(isReloadingFromPull == true)
	{
		isReloadingFromPull = false;
	}
	actInd.hide();
	alert(msg);
	
    
});

var actIndForFetchingPlayerFromTableview = Titanium.UI.createActivityIndicator();
actIndForFetchingPlayerFromTableview.message = 'Please wait while fetching player';//message will only shows in android. 
Ti.UI.currentWindow.add(actIndForFetchingPlayerFromTableview);



