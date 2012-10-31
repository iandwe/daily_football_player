var win = Ti.UI.currentWindow;
var view;
var imageView;
var nameLabel;
var table;
var data = [];
var youtubeBtn;
var slides = [];
var showingPlayer = true;
var currentYoutubeLink = "";
 var added = false;
 var oldAdded;
 var playerToShow = {};
 var animationPaused = false;
 var playerArray = [];
 var uglyDate;
 var amountOfRowsToShow = 10;
  var amountOfRowsToShowToAddOnUpdate = 10;
 var counterForAmountOfRowRequests = 0;
 var amountRowsCurrentlyShowing = 0;
 var startIndex = 0;
 var isReloadingFromResume = false;
 var doingtheclearstuff = false;
 isReloadingFromPull = false;
 var lastUpdatedLabel;
 var youtubeOpened = false;
 
 var screenWidth = Ti.Platform.displayCaps.platformWidth;
	var subtractvalue = 0.12 * screenWidth;
	var w = screenWidth - subtractvalue;

if (Ti.Platform.osname == 'android'){
            Ti.Gesture.addEventListener('orientationchange', function(e) {
 
              Ti.Android.currentActivity.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
            });
        }

 Ti.App.addEventListener( 'resume', function(e) {
    // do something here
	if (Titanium.Network.online && youtubeOpened == false)
	{
    		if(showingPlayer == true)
		{
			view.animate(
	    	{
	      left:-w,
	      //top:100,
	      duration:300});
	      setShowingPlayerTo(false);
		}
		
    	isReloadingFromResume = true;
    	actInd.show();
    	getToday();
    	
    }
    else if(youtubeOpened == true)
    {
    	youtubeOpened = false;
    }
});
 
 var howtofetch = {};
 howtofetch.statedata = "loadsaved";
 
var amountOfTimesAppStarted;

amountOfTimesAppStarted = Ti.App.Properties.getInt('amountTimesStarted', 0);
amountOfTimesAppStarted += 1;
Ti.App.Properties.setInt('amountTimesStarted', amountOfTimesAppStarted);
if(amountOfTimesAppStarted >= 3)
{
	howtofetch.statedata = "loadnew";
	
	//alert("got in here " + STATE_OF_FETCH_DATA);
	amountOfTimesAppStarted = 0;
	Ti.App.Properties.setInt('amountTimesStarted', amountOfTimesAppStarted);
}

 
 Ti.include('dateHandler.js');
 Ti.include('../datafetch/dataFetcherController.js');

Ti.include('../datafetch/getPlayerByDate.js');

var scrollView = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
   
    showVerticalScrollIndicator:true,
    //showHorizontalScrollIndicator:true,
    scrollType:'vertical',
    top:'314dp',
    
 	//backgroundColor:'green'
 	
});



view = Ti.UI.createView({
		backgroundColor:'#ffffff',
		top:0,
		left:0,
		width:'100%',
		height:'100%',
		

	});
	//#6e6e6e
playerHistoryLabel = Ti.UI.createLabel({
	top:'20dp',
	left:'52dp',
	width:'auto',
	color:'#979797',
	font:{fontSize:'12sp',
          fontFamily:'Helvetica Neue'},
          text:'Player history'

});

var refreshBtn = Ti.UI.createButton({
	top:'15dp',
	right:'10dp',
	width:'30dp',
	height:'30dp',
	backgroundImage:'../ios/images/android_refresh.png',
});

var showMoreView = Ti.UI.createView({
		//backgroundImage:'images/topBar.png',
		bottom:'8dp',
		width:'110dp',
		height:'20dp',
		left:'120dp',
		//backgroundColor:'#fff'
	});
	
var arrow = Ti.UI.createImageView({
	width:'11dp',
	height:'9dp',
	image:'../ios/images/triangleBtn.png',
	right:'12dp',
});

var skugga = Ti.UI.createImageView({
	width:'24dp',
	height:'100%',
	backgroundImage:'../ios/images/skugga.png',
	right:'86%',
	opacity:0.8,
});

showMoreLabel = Ti.UI.createLabel({
	//top:15,
	left:'3dp',
	width:'auto',
	color:'#a7a7a7',
	font:{fontSize:'12sp',
          fontFamily:'Helvetica Neue'},
          text:'Show 10 more'

});

showMoreView.add(showMoreLabel);
showMoreView.add(arrow);

var showMoreViewOverlay = Ti.UI.createView({
		//backgroundImage:'images/topBar.png',
		bottom:0,
		width:'120dp',
		height:'37dp',
		//backgroundColor:'#fff'
	});
showMoreViewOverlay.addEventListener('click',function() 
{
	fillDataArrayWithRows(0);
	
});

win.add(playerHistoryLabel);
win.add(refreshBtn);
win.add(showMoreView);
win.add(showMoreViewOverlay);

/*var searchBar = Ti.UI.createView({
		backgroundImage:'images/searchBar.png',
		top:35,
		right:10,
		width:268,
		height:37,
	});
	*/
//win.add(searchBar);

var topBar = Ti.UI.createImageView({
		backgroundImage:'../ios/images/topBar.png',
		top:0,
		left:0,
		width:'100%',
		height:'44dp',
		
	});
	


view.add(topBar);

var topShadow = Ti.UI.createImageView({
	backgroundImage:'../ios/images/topshadow.png',
	top:'44dp',
	height:'2dp',
	left:0,
	width:'100%',
	opacity:0.7,
});

var bottomShadow = Ti.UI.createImageView({
	backgroundImage:'../ios/images/topshadow.png',
	top:'270dp',
	height:'2dp',
	left:0,
	width:'320dp',
	opacity:0.5,
	
});

var line = Ti.UI.createImageView({
	backgroundImage:'../ios/images/line.png',
	top:'85dp',
	//bottom:55,
	height:'1dp',
	width:'100%',
	
});

var bannerView = Titanium.UI.createScrollView({
 	
    width: '100dp',
    height:'240dp',
    //contentWidth:'auto',
    contentHeight:'auto',
   
    showVerticalScrollIndicator:true,
    //showHorizontalScrollIndicator:true,
    scrollType:'vertical',
  	//backgroundColor:'brown',
    top:'44dp',
    left:0,
 
});	

var bannerViewHolder = Titanium.UI.createView({
 
    width: '100%',
    height:'auto',
  	//backgroundColor:'blue',
    top:0,
    left:0,
 
});	

bannerView.add(bannerViewHolder);
	//#6e6e6e
dateLabel = Ti.UI.createLabel({
	top:'9dp',
	width:'auto',
	color:'#ffffff',
	font:{fontSize:'22sp',
		fontWeight:'bold',
          fontFamily:'Helvetica Neue'}
});

var nameLabel = Ti.UI.createLabel({
	top:0,
	left:'5dp',
	width:'48%',
	height:'30dp',
	color:'#eeeeee',
	font:{fontSize:'14sp',
          fontFamily:'Helvetica Neue'},
         
});

var positionLabel = Ti.UI.createLabel({
	top:0,
	right:0,
	width:'48%',
	height:'30dp',
	color:'#eeeeee',
	font:{fontSize:'14sp',
          fontFamily:'Helvetica Neue'}
});

namePosView = Ti.UI.createView({
	top:'284dp',
	width:'100%',
	color:'#979797',
	font:{fontSize:'28sp',
          fontFamily:'Helvetica Neue'},
    height:'30dp',
    backgroundImage:'../ios/images/namePos2.png'
});

namePosView.add(nameLabel);
namePosView.add(positionLabel);

//195
//25

var dateBirthTitleLabel = Ti.UI.createLabel({
	//bottom:115,
	top:'0dp',
	left:0,
	width:'100dp',
	height:'25dp',
	color:'#5a5a5a',
	font:{fontSize:'15sp',
          fontFamily:'Helvetica Neue'},
    textAlign:'right',
    text:'Date of birth:',
    //backgroundColor:'brown'
});


var funFact = Ti.UI.createLabel({
	top:'90dp',
	left:'10dp',
	
	right:'10dp',
	height:'45dp',
	//minimumFontSize: 14,
	color:'#5a5a5a',
	font:{fontSize:'12sp',
          fontFamily:'Helvetica Neue', fontWeight:'bold'},
    textAlign:'center',
   // text:'Masopust was one of the greatest players I ever saw. But it is not possible that he was born in Europe. With those explosive dribbles, he had to be Brazilian!',
    //backgroundColor:'brown'
});

var line2 = Ti.UI.createImageView({
	backgroundImage:'../ios/images/line.png',
	top:'140dp',
	//bottom:55,
	height:'1dp',
	width:'100%',
	
});

//dummy beskrivning
var description = Ti.UI.createLabel({
	top:'155dp',
	left:'10dp',
	
	right:'10dp',
	height:'auto',
	color:'#6f6f6f',
	font:{fontSize:'14sp',
          fontFamily:'Helvetica Neue'},
    textAlign:'left',
    bottom:'200dp',
    
   // text:'Masopust was one of the greatest players I ever saw. But it is not possible that he was born in Europe. With those explosive dribbles, he had to be Brazilian!',
    //backgroundColor:'brown'
});

var bottomView = Ti.UI.createView({
	bottom:0,
	
	width:'100%',
	
	height:'200dp',
	//backgroundColor:'red',
	
    
   // text:'Masopust was one of the greatest players I ever saw. But it is not possible that he was born in Europe. With those explosive dribbles, he had to be Brazilian!',
    //backgroundColor:'brown'
});

var teamClubGoalHeaderView = Ti.UI.createView({
	bottom:'161dp',
	left:0,
	height:'29dp',
	width:'100%',
	backgroundImage:'../ios/images/clubTable2.png'
});

var teamLabelForLowerTable = Ti.UI.createLabel({
	
	left:'5dp',
	width:'100dp',
	height:'29dp',
	color:'#eeeeee',
	font:{fontSize:'14sp',
          fontFamily:'Helvetica Neue'},
    text:"Team",
    textAlign:'left',
   
         
});
var yearLabelForLowerTable = Ti.UI.createLabel({
	
	left:'175dp',
	width:'95dp',
	height:'29dp',
	color:'#eeeeee',
	font:{fontSize:'14sp',
          fontFamily:'Helvetica Neue'},
    text:"Years",
    textAlign:'center',
    //backgroundColor:'red',
         
});
var goalLabelForLowerTable = Ti.UI.createLabel({
	
	right:0,
	width:'45dp',
	height:'29dp',
	color:'#eeeeee',
	font:{fontSize:'14sp',
          fontFamily:'Helvetica Neue'},
    text:"Goals",
    textAlign:'center',
    
    
         
});
teamClubGoalHeaderView.add(yearLabelForLowerTable);
teamClubGoalHeaderView.add(teamLabelForLowerTable);
teamClubGoalHeaderView.add(goalLabelForLowerTable);


var dateBirthLabel = Ti.UI.createLabel({
	//bottom:115,
	top:'0dp',
	left:'110dp',
	width:'200dp',
	height:'25dp',
	color:'#979797',
	font:{fontSize:'15sp',
          fontFamily:'Helvetica Neue'},
    textAlign:'left',
    //text:'Date of birth:',
    //backgroundColor:'brown'
});

var goalsScoredLabel = Ti.UI.createLabel({
	top:'25dp',
	//bottom:90,
	left:0,
	width:'100dp',
	height:'25dp',
	color:'#5a5a5a',
	font:{fontSize:'15sp',
          fontFamily:'Helvetica Neue'},
    textAlign:'right',
    text:'Goals scored:',
   // backgroundColor:'brown'
});

var goalsLabel = Ti.UI.createLabel({
	top:'25dp',
	//bottom:90,
	left:'110dp',
	width:'200dp',
	height:'25dp',
	color:'#979797',
	font:{fontSize:'15sp',
          fontFamily:'Helvetica Neue'},
    textAlign:'left',
    //text:'Goals scored:',
    //backgroundColor:'brown'
});

var placeOfBirthLabel = Ti.UI.createLabel({
	top:'50dp',
	//bottom:65,
	left:0,
	width:'100dp',
	height:'25dp',
	color:'#5a5a5a',
	font:{fontSize:'15sp',
          fontFamily:'Helvetica Neue'},
    textAlign:'right',
    text:'Place of birth:',
    //backgroundColor:'brown'
});

var placeBirthLabel = Ti.UI.createLabel({
	top:'50dp',
	//bottom:65,
	left:'110dp',
	width:'200dp',
	height:'25dp',
	color:'#979797',
	font:{fontSize:'15sp',
          fontFamily:'Helvetica Neue'},
    textAlign:'left',
    //text:'Place of birth:',
   // backgroundColor:'brown'
});

youtubeBtn = Ti.UI.createButton({
	height:'32dp',
	width:'32dp',
	//title:'youtube',
	backgroundImage:'../ios/images/youtubeBtn@2x.png',
	left:'7dp',
	top:'6dp',
});
	
//#f5f5f5

var sidebarViewBtn = Ti.UI.createView({
	height:'35dp',
	width:'32dp',
	right:'2dp',
	top:'5dp',
	backgroundColor:'transparent',
	//opacity:0.1,
 
});

var info = Titanium.UI.createButton({
	height:'15dp',
	width:'21dp',
	right:'5dp',
	top:'15dp',
	
	backgroundImage:'../ios/images/sideBarBtn.png'
});

sidebarViewBtn.addEventListener('click',function() 
{
	
	if(showingPlayer == true)
		{
			view.animate(
	    	{
	      left:-w,
	      //top:100,
	      duration:300});
	      setShowingPlayerTo(false);
		}
		/*else if(showingPlayer == false)
		{
			view.animate(
	    	{
	      left:0,
	      //top:100,
	      duration:300});
	      setShowingPlayerTo(true);
			
		}*/
});


var currentDate = getDate();




function dothis()
{
	
	//alert(theFetchedDate);
	uglyDate = makeNiceDateToUglyDate(theFetchedDate);
	playerArray = allPlayers;
	playerToShow = theFetchedPlayer;
	//alert("name: " + theFetchedPlayer.name + " arr: " + theFetchedPlayer.clubarray[0].);
	playerToShow.clubarray = theFetchedPlayer.clubarray;
	var foundPlayer = true;
	
 if(isReloadingFromResume == true)
 {
	clearResetAndFilltable();
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	
 }
 else if(isReloadingFromPull == true)
 {
 	//alert("refetchat ska cleara table");
	clearResetAndFilltable();
	//isReloadingFromPull = false;
 }
 
 else
 {
		
	
	imageView = Ti.UI.createImageView({
		
		
		width:'220dp',
		height:'240dp',
		top:'44dp',
		//right:0,
		
		image:playerToShow.picture
	});
	
	dateLabel.text = playerToShow.nicedate;
	nameLabel.text = playerToShow.name;
	positionLabel.text = playerToShow.position;
	currentYoutubeLink = playerToShow.youtube;
	placeBirthLabel.text = playerToShow.placeofbirth;
	dateBirthLabel.text = playerToShow.dateofbirth;
	goalsLabel.text = playerToShow.goalsscored;
	funFact.text = playerToShow.funfact;
	description.text = playerToShow.description;
	
	view.add(info);
	view.add(sidebarViewBtn);
	view.add(dateLabel);
	view.add(youtubeBtn);
	view.add(bannerView);
	view.add(imageView);
	view.add(scrollView);
	view.add(namePosView);
	scrollView.add(line);	
	scrollView.add(line2);	
	
	
	scrollView.add(dateBirthTitleLabel);
	scrollView.add(goalsScoredLabel);
	scrollView.add(placeOfBirthLabel);
	
	scrollView.add(placeBirthLabel);
	scrollView.add(goalsLabel);
	scrollView.add(dateBirthLabel);
	scrollView.add(funFact);
	scrollView.add(description);
	scrollView.add(bottomView);
	scrollView.add(teamClubGoalHeaderView);
	fillBottomView();
	
	//view.add(topShadow);
	//scrollView.add(bottomShadow);
	
	youtubeBtn.addEventListener('click',function()
	{
		//alert("clicked");
		youtubeOpened = true;
		Titanium.Platform.openURL(currentYoutubeLink);
	});
	
	
	
	view.addEventListener('touchstart', function (e) {
   		x_start = e.x;
   		if(showingPlayer == false)
		{
			view.animate(
	    	{
	      left:0,
	      //top:100,
	      duration:300});
	      setShowingPlayerTo(true);
		}
   		
	});
	
	view.addEventListener('touchend', function (e) {
	    if (e.x < x_start && showingPlayer == true) {
	      // swipe({direction: 'right'});
	      swipe({direction: 'left'});
	    }
	    
	});
	fillDataArrayWithRows(0);
	
	
	var search=Ti.UI.createSearchBar({
	showCancel:true,
	hintText:'type to search',
	barColor:'#383838',
	//borderColor:'#383838'
	});


	search.addEventListener('cancel',function(e)
	{
		search.value='';
		search.blur();

	});

	search.addEventListener('return', function(e)
	{
  	  search.blur();
	});
	
	var leftValue = subtractvalue;
	
	table = Titanium.UI.createTableView({
	//style:Ti.UI.iPhone.TableViewStyle.GROUPED,
	data:data,
	top:'52dp',
	bottom:'37dp',
	left:leftValue,
	search:search,
	filterCaseInsensitive:true,
	filterAttribute:'searchNode',
	backgroundColor:'transparent',
	separatorStyle:0,
	});
	
	table.addEventListener('click', function(e)
	{
		
		var objectToShow = playerArray[e.rowData.id];
		var testString;
		
	  if(howtofetch.statedata == "loadsaved")
      {
      	
      	  testString= Ti.App.Properties.getString(objectToShow.nicedate, "notsaved");
      	  
      }
      else
      {
      	
      	testString = "notsaved";
      }
		
		if(testString == "notsaved" && STATE_OF_APP == "online")
		{
			
			var dateToGetPlayerBy = objectToShow.nicedate;
			actIndForFetchingPlayerFromTableview.show();
			getTodaysPlayerByDate(dateToGetPlayerBy);
		}
		else
		{
			
			var playerSavedEarlier = JSON.parse(Ti.App.Properties.getString(objectToShow.nicedate));
			if(playerSavedEarlier == '' || playerSavedEarlier == null && STATE_OF_APP == "notonline")
			{
				alert("this player has not been saved to memory, please turn on internetconnection and restart app.");
			}
			else
			{
				//alert(playerSavedEarlier);
				playerToShow = playerSavedEarlier;
				showThisPlayer();
			}
			
		}
		
	});
	
	win.add(table);
	//win.add(skugga);
	win.add(view);
	Ti.include("pulltorefresh.js");
	//fillBannerView();
	//fillSlides();
	//createBanner();
 }//end if isreloadingfromresume
}//end dothis

function fillBannerView()
{
	
		
		if(bannerViewHolder.children)
    {
    	//alert("har children");
        while(bannerViewHolder.children.length != 0)
        {
            var len = bannerViewHolder.children.length;
            bannerViewHolder.remove( bannerViewHolder.children[0] );
        }
    }
	
	
	var topValue = 0;
	var klubbArray = [];
	//alert("name " + playerToShow.name + " clubarray " + playerToShow.clubarray);
		klubbArray = playerToShow.clubarray;
	for(var k = 0; k < klubbArray.length; k++)
	{
		topValue = (k*36)+8;
		topValue = topValue.toString() + 'dp';
		
		var clubLabel = Ti.UI.createLabel({
		top:0,
		left:'5dp',
		width:'auto',
		height:'30dp',
		color:'#5a5a5a',
		font:{fontSize:'12sp',
	          fontFamily:'Helvetica Neue',fontWeight:'bold'},
	    textAlign:'left',
	    text:klubbArray[k].clubname,
	    //backgroundColor:'brown'
	});
	var clubYearLabel = Ti.UI.createLabel({
			top:'26dp',
			left:'5dp',
			width:'auto',
			height:'20dp',
			color:'#979797',
			font:{fontSize:'12sp',
		          fontFamily:'Helvetica Neue'},
		    textAlign:'left',
		    text:klubbArray[k].period,
		    //backgroundColor:'brown'
		});
	var bannerViewItemHolder = Ti.UI.createView({
		height:'50dp',
		width:'100%',
		top:topValue,
	});
		
		
		bannerViewItemHolder.add(clubLabel);
		bannerViewItemHolder.add(clubYearLabel);
		bannerViewHolder.add(bannerViewItemHolder);
	}
	
	bannerView.add(bannerViewHolder);
}

function showThisPlayer()
{
	
		if(showingPlayer == true)
		{
			
			view.animate(
	    	{
	      left:-w,
	      //top:100,
	      duration:300});
	      setShowingPlayerTo(false);
		}
		else if(showingPlayer == false)
		{
			
			view.animate(
	    	{
	      left:0,
	      duration:300});
	      setShowingPlayerTo(true);
		}
		
		imageView.image = playerToShow.picture;
		//alert("playerToShow.picture: "+playerToShow.picture);
	dateLabel.text = playerToShow.nicedate;
	nameLabel.text = playerToShow.name;
	positionLabel.text = playerToShow.position;
	currentYoutubeLink = playerToShow.youtube;
	placeBirthLabel.text = playerToShow.placeofbirth;
	dateBirthLabel.text = playerToShow.dateofbirth;
	goalsLabel.text = playerToShow.goalsscored;
	//fillBannerView();
	
	funFact.text = playerToShow.funfact;
	description.text = playerToShow.description;
	
	goalsLabel.text = playerToShow.goalsscored;
	
	fillBottomView();
	
	actIndForFetchingPlayerFromTableview.hide();

}

Ti.App.addEventListener('playerFetchedByDate', function(data) 
{ 
	
     playerToShow = data.fetchedTodaysPlayerByDate;
      Ti.App.Properties.setString(playerToShow.nicedate, JSON.stringify(playerToShow));
     showThisPlayer();
});
Ti.App.addEventListener('errorInFetchPlayerByDate', function(msg) 
{ 
	actIndForFetchingPlayerFromTableview.hide();
	alert(msg);
    
});

function clearResetAndFilltable()
{
	if(isReloadingFromPull == false && isReloadingFromResume == false)
	{
	amountOfRowsToShow = 10;
  	amountOfRowsToShowToAddOnUpdate = 10;
 	counterForAmountOfRowRequests = 0;
 	amountRowsCurrentlyShowing = 0;
 	startIndex = 0;
 	}
 	else
 	{
 		counterForAmountOfRowRequests -= 1;
 	}
 	
 	
 	/*if (table.data.length > 0) {
    	for (var i = table.data[0].rows.length-1; i >= 0; i--) {
       	 table.deleteRow(i);
    	}
	}*/
	//alert("table.data[0].rows.length: " + table.data[0].rows.length);
	data.length = 0;
 	data = null;
 	data = [];
	
	doingtheclearstuff = true;
	fillDataArrayWithRows(1);
}

function fillDataArrayWithRows(valueForReloadDataToTable)
{
	if(isReloadingFromPull == true || isReloadingFromResume == true)
	{
		startIndex = 0;
	}
	else
	{
		startIndex = counterForAmountOfRowRequests * amountOfRowsToShowToAddOnUpdate;
	}
	
	counterForAmountOfRowRequests += 1;
	amountOfRowsToShow = amountOfRowsToShowToAddOnUpdate * counterForAmountOfRowRequests;
	//alert("playerArray.length " + playerArray.length + "amountOfRowsToShow " + amountOfRowsToShow);
	if(playerArray.length >= amountOfRowsToShow)
	{
		
		dotheloop(valueForReloadDataToTable);
	}
	else if(playerArray.length > amountRowsCurrentlyShowing)
	{
		
		amountOfRowsToShow = amountOfRowsToShow - (amountOfRowsToShow - playerArray.length);
		dotheloop(valueForReloadDataToTable);
	}
	else{
			if(isReloadingFromPull)
			{
				isReloadingFromPull = false;
				
				endReloading();
			}
			else if(isReloadingFromResume)
			{
				isReloadingFromResume = false;
			}
			else
			{
				
				alert('reached maximum entries');
			}
			doingtheclearstuff = false;
			
		}
	
}

function dotheloop(valueForReloadDataToTable)
{
		
		for(var i = startIndex; i < amountOfRowsToShow; i++)
		{
			
			var playerInLoop = playerArray[i];
			
		var row = Ti.UI.createTableViewRow({
		//title:weekdayNames[i],
		backgroundImage:'../ios/images/cell.png',
		//font:{fontSize:16,
          //fontFamily:'Helvetica Neue'},
		height:'44dp',
		//color:"#979797",
		//title:playerInLoop.name,
		searchNode:playerInLoop.name,
		id:i,
		});
		
		if(uglyDate >= makeNiceDateToUglyDate(playerInLoop.nicedate))
		{
			var rowNameLabel = Ti.UI.createLabel({
				
				left:'10dp',
				width:'47%',
				height:'44dp',
				color:'#979797',
				font:{fontSize:'15sp',
			          fontFamily:'Helvetica Neue'},
			    textAlign:'left',
			    text:playerInLoop.name,
			    //backgroundColor:'brown'
			});
			
			
			
			var rowDateLabel = Ti.UI.createLabel({
				
				right:'10dp',
				width:'47%',
				height:'44dp',
				color:'#979797',
				font:{fontSize:'15sp',
			          fontFamily:'Helvetica Neue'},
			    textAlign:'right',
			    text:playerInLoop.nicedate,
			    //backgroundColor:'brown'
			});
			
			row.add(rowNameLabel);
			row.add(rowDateLabel);
			
			data.push(row);		
			}
			//alert("inne i loop: " + i); 
		}
		if(counterForAmountOfRowRequests > 1 || doingtheclearstuff == true)
		{
			table.setData(data);
			doingtheclearstuff = false;
			if(isReloadingFromPull)
			{
				
				endReloading();
			}
		}
	
	if(isReloadingFromPull == false && isReloadingFromResume == false)
	{
		amountRowsCurrentlyShowing += (amountOfRowsToShow - startIndex);
		
	}
	else
	{
		isReloadingFromPull = false;
		isReloadingFromResume = false;
	}
	
	
}




function fillBottomView()
{
	if (bottomView.children && bottomView.children.length > 0) 
	{
    // Make a copy of the array
	    var children = bottomView.children.slice(0);
	    var numChildren = children.length;
	    for( i = 0; i < numChildren; i++) 
	    {
	        bottomView.remove(children[i]);
	    }
	    fillItUp();
    }
    else{fillItUp();}
	
}

function fillItUp()
{
	var topValue = 0;
	var klubbArray = [];
	//alert("name " + playerToShow.name + " clubarray " + playerToShow.clubarray);
		klubbArray = playerToShow.clubarray;
	for(var k = 0; k < klubbArray.length; k++)
	{
		topValue = (k*20)+40;
		topValue = topValue;
		
		var container = Ti.UI.createView({
		top:topValue.toString()+"dp",
		left:'5dp',
		right:'5dp',
		//width:'97%',
		height:'20dp',
		backgroundColor:'transparent',
	});
		var clubLabel = Ti.UI.createLabel({
		left:0,
		width:'160dp',
		height:'20dp',
		color:'#5a5a5a',
		
		font:{fontSize:'14sp',
	          fontFamily:'Helvetica Neue',fontWeight:'bold'},
	    textAlign:'left',
	    text:klubbArray[k].clubname,
	    
	});
	var clubYearLabel = Ti.UI.createLabel({
			
			left:'55%',
			width:'95dp',
			height:'20dp',
			color:'#979797',
			font:{fontSize:'13sp',
		          fontFamily:'Helvetica Neue'},
		    textAlign:'left',
		    text:klubbArray[k].period,
		    
		});
	
	var amountGoalsLabel = Ti.UI.createLabel({
			
			right:0,
			width:'35dp',
			height:'20dp',
			color:'#979797',
			font:{fontSize:'13sp',
		          fontFamily:'Helvetica Neue'},
		    textAlign:'left',
		    text:klubbArray[k].goals,
		   
		});
	
	
		container.add(clubLabel);
		container.add(clubYearLabel);
		container.add(amountGoalsLabel);
		
		bottomView.add(container);
		
	}
}



function swipe(e) {
   if(e.direction == 'left' && showingPlayer == true)
		{
			view.animate(
	    	{
	      left:-w,
	      //top:100,
	      duration:300});
	      setShowingPlayerTo(false);
		}

}

function setShowingPlayerTo(value)
{
    setTimeout(function(e){
             showingPlayer = value;
                },300);
}
