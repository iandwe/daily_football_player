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

 Ti.App.addEventListener( 'resume', function(e) {
    // do something here
	if (Titanium.Network.online && youtubeOpened == false)
	{
    	if(showingPlayer == true)
		{
			view.animate(
	    	{
		      left:-290,
		      //top:100,
		      duration:250
		    });
		      showingPlayer = false;
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
    contentWidth:320,
    contentHeight:'auto',
 	height:'auto',
    top:44,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:false,
 	//backgroundColor:'green'
 	
});



view = Ti.UI.createView({
		backgroundColor:'#ffffff',
		top:0,
		left:0,
		width:320,
		height:'100%',
		

	});
	//#6e6e6e
playerHistoryLabel = Ti.UI.createLabel({
	top:15,
	left:38,
	width:'auto',
	color:'#979797',
	font:{fontSize:12,
          fontFamily:'Helvetica Neue'},
          text:'Player history'

});

var showMoreView = Ti.UI.createView({
		//backgroundImage:'images/topBar.png',
		bottom:8,
		width:110,
		height:20,
		left:120,
		//backgroundColor:'#fff'
	});
	
var arrow = Ti.UI.createImageView({
	width:11,
	height:9,
	image:'images/triangleBtn.png',
	right:12,
});

var skugga = Ti.UI.createImageView({
	width:24,
	height:447,
	image:'images/skugga.png',
	right:284,
	opacity:0.8,
});

showMoreLabel = Ti.UI.createLabel({
	//top:15,
	left:3,
	width:'auto',
	color:'#a7a7a7',
	font:{fontSize:12,
          fontFamily:'Helvetica Neue'},
          text:'Show 10 more'

});

showMoreView.add(showMoreLabel,arrow);

var showMoreViewOverlay = Ti.UI.createView({
		//backgroundImage:'images/topBar.png',
		bottom:0,
		width:120,
		height:37,
		//backgroundColor:'#fff'
	});
showMoreViewOverlay.addEventListener('click',function() 
{
	fillDataArrayWithRows(0);
	
});

win.add(playerHistoryLabel, showMoreView);

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
		backgroundImage:'images/topBar.png',
		top:0,
		left:0,
		width:320,
		height:44,
		
	});
	


view.add(topBar);

var topShadow = Ti.UI.createImageView({
	backgroundImage:'images/topshadow.png',
	top:44,
	height:2,
	left:0,
	width:320,
	opacity:0.7,
});

var bottomShadow = Ti.UI.createImageView({
	backgroundImage:'images/topshadow.png',
	top:270,
	height:2,
	left:0,
	width:320,
	opacity:0.5,
	
});

var line = Ti.UI.createImageView({
	backgroundImage:'images/line.png',
	top:365,
	//bottom:55,
	height:1,
	width:'100%',
	
});

var bannerView = Titanium.UI.createImageView({
 
    width: 100,
    height:240,
  	//backgroundColor:'brown',
    top:0,
    left:0,
 
});	
	//#6e6e6e
dateLabel = Ti.UI.createLabel({
	top:9,
	width:'auto',
	color:'#ffffff',
	font:{fontSize:22,
		fontWeight:'bold',
          fontFamily:'Helvetica Neue'}
});

var nameLabel = Ti.UI.createLabel({
	top:0,
	left:5,
	width:'48%',
	height:30,
	color:'#eeeeee',
	font:{fontSize:14,
          fontFamily:'Helvetica Neue'},
         
});

var positionLabel = Ti.UI.createLabel({
	top:0,
	right:0,
	width:'48%',
	height:30,
	color:'#eeeeee',
	font:{fontSize:14,
          fontFamily:'Helvetica Neue'}
});

namePosView = Ti.UI.createView({
	top:240,
	width:320,
	color:'#979797',
	font:{fontSize:28,
          fontFamily:'Helvetica Neue'},
    height:30,
    backgroundImage:'images/namePos2.png'
});

namePosView.add(nameLabel,positionLabel);

//195
//25

var dateBirthTitleLabel = Ti.UI.createLabel({
	//bottom:115,
	top:280,
	left:0,
	width:100,
	height:25,
	color:'#5a5a5a',
	font:{fontSize:15,
          fontFamily:'Helvetica Neue'},
    textAlign:'right',
    text:'Date of birth:',
    //backgroundColor:'brown'
});


var funFact = Ti.UI.createLabel({
	top:370,
	left:10,
	width:300,
	right:10,
	height:45,
	//minimumFontSize: 14,
	color:'#5a5a5a',
	font:{fontSize:12,
          fontFamily:'Helvetica Neue', fontWeight:'bold'},
    textAlign:'center',
   // text:'Masopust was one of the greatest players I ever saw. But it is not possible that he was born in Europe. With those explosive dribbles, he had to be Brazilian!',
    //backgroundColor:'brown'
});

var line2 = Ti.UI.createImageView({
	backgroundImage:'images/line.png',
	top:420,
	//bottom:55,
	height:1,
	width:'100%',
	
});

//dummy beskrivning
var description = Ti.UI.createLabel({
	top:435,
	left:10,
	width:300,
	right:10,
	height:'auto',
	color:'#6f6f6f',
	font:{fontSize:14,
          fontFamily:'Helvetica Neue'},
    textAlign:'left',
    bottom:270,
    
   // text:'Masopust was one of the greatest players I ever saw. But it is not possible that he was born in Europe. With those explosive dribbles, he had to be Brazilian!',
    //backgroundColor:'brown'
});

var bottomView = Ti.UI.createView({
	bottom:0,
	
	width:'100%',
	
	height:260,
	//backgroundColor:'red',
	
    
   // text:'Masopust was one of the greatest players I ever saw. But it is not possible that he was born in Europe. With those explosive dribbles, he had to be Brazilian!',
    //backgroundColor:'brown'
});

var teamClubGoalHeaderView = Ti.UI.createView({
	bottom:225,
	left:0,
	height:29,
	width:'100%',
	backgroundImage:'images/clubTable2.png'
});

var teamLabelForLowerTable = Ti.UI.createLabel({
	
	left:0,
	width:160,
	height:29,
	color:'#eeeeee',
	font:{fontSize:14,
          fontFamily:'Helvetica Neue'},
    text:"Team",
    textAlign:'center',
});

var yearLabelForLowerTable = Ti.UI.createLabel({
	
	left:175,
	width:95,
	height:29,
	color:'#eeeeee',
	font:{fontSize:14,
          fontFamily:'Helvetica Neue'},
    text:"Years",
    textAlign:'center',
    //backgroundColor:'red',
         
});
var goalLabelForLowerTable = Ti.UI.createLabel({
	
	right:0,
	width:45,
	height:29,
	color:'#eeeeee',
	font:{fontSize:14,
          fontFamily:'Helvetica Neue'},
    text:"Goals",
    textAlign:'center',
    
    
         
});
teamClubGoalHeaderView.add(yearLabelForLowerTable);
teamClubGoalHeaderView.add(teamLabelForLowerTable);
teamClubGoalHeaderView.add(goalLabelForLowerTable);


var dateBirthLabel = Ti.UI.createLabel({
	//bottom:115,
	top:280,
	left:110,
	width:200,
	height:25,
	color:'#979797',
	font:{fontSize:15,
          fontFamily:'Helvetica Neue'},
    textAlign:'left',
    //text:'Date of birth:',
    //backgroundColor:'brown'
});

var goalsScoredLabel = Ti.UI.createLabel({
	top:305,
	//bottom:90,
	left:0,
	width:100,
	height:25,
	color:'#5a5a5a',
	font:{fontSize:15,
          fontFamily:'Helvetica Neue'},
    textAlign:'right',
    text:'Goals scored:',
   // backgroundColor:'brown'
});

var goalsLabel = Ti.UI.createLabel({
	top:305,
	//bottom:90,
	left:110,
	width:200,
	height:25,
	color:'#979797',
	font:{fontSize:15,
          fontFamily:'Helvetica Neue'},
    textAlign:'left',
    //text:'Goals scored:',
    //backgroundColor:'brown'
});

var placeOfBirthLabel = Ti.UI.createLabel({
	top:330,
	//bottom:65,
	left:0,
	width:100,
	height:25,
	color:'#5a5a5a',
	font:{fontSize:15,
          fontFamily:'Helvetica Neue'},
    textAlign:'right',
    text:'Place of birth:',
    //backgroundColor:'brown'
});

var placeBirthLabel = Ti.UI.createLabel({
	top:330,
	//bottom:65,
	left:110,
	width:200,
	height:25,
	color:'#979797',
	font:{fontSize:15,
          fontFamily:'Helvetica Neue'},
    textAlign:'left',
    //text:'Place of birth:',
   // backgroundColor:'brown'
});

youtubeBtn = Ti.UI.createButton({
	height:32,
	width:32,
	//title:'youtube',
	backgroundImage:'images/youtubeBtn.png',
	left:7,
	top:6,
});
	
//#f5f5f5

var sidebarViewBtn = Ti.UI.createView({
	height:35,
	width:32,
	right:2,
	top:5,
	backgroundColor:'transparent',
	//opacity:0.1,
 
});

var info = Titanium.UI.createButton({
	height:15,
	width:21,
	right:5,
	top:15,
	
	backgroundImage:'images/sideBarBtn.png'
});

sidebarViewBtn.addEventListener('click',function() 
{
	
	if(showingPlayer == true)
		{
			view.animate(
	    	{
	      left:-290,
	      //top:100,
	      duration:250});
	      showingPlayer = false;
		}
		else if(showingPlayer == false)
		{
			
			view.animate(
	    	{
	      left:0,
	      //top:100,
	      duration:250});
	      showingPlayer = true;
		}
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
		
		
		width:220,
		height:240,
		top:0,
		right:0,
		
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


	view.add(scrollView);

	scrollView.add(line);	
	scrollView.add(line2);	
	scrollView.add(bannerView);
	scrollView.add(imageView);
	scrollView.add(namePosView);
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
	view.add(youtubeBtn);
	//view.add(topShadow);
	//scrollView.add(bottomShadow);
	
	youtubeBtn.addEventListener('click',function()
	{
		//alert("clicked");
		youtubeOpened = true;
		Titanium.Platform.openURL(currentYoutubeLink);
	});
	
	
	
	view.addEventListener('swipe', function(e) {
		//alert(e.direction);
		if(e.direction == 'left' && showingPlayer == true)
		{
			view.animate(
	    	{
	      left:-290,
	      //top:100,
	      duration:250});
	      showingPlayer = false;
		}
		else if(e.direction == 'right' && showingPlayer == false)
		{
			view.animate(
	    	{
	      left:0,
	      //top:100,
	      duration:250});
	      showingPlayer = true;
		}
			
	    	
	});
	fillDataArrayWithRows(0);
	
	
	var search=Ti.UI.createSearchBar({
	showCancel:true,
	hintText:'type to search',
	barColor:'#383838',
	//borderColor:'#383838'
	});

search.addEventListener('cancel',function(e){
	search.value='';
});
	
	
	
	table = Titanium.UI.createTableView({
	//style:Ti.UI.iPhone.TableViewStyle.GROUPED,
	data:data,
	top:37,
	bottom:37,
	left:30,
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
	win.add(skugga);
	win.add(view);
	Ti.include("pulltorefresh.js");
	
	fillSlides();
	createBanner();
 }//end if isreloadingfromresume
}//end dothis

function showThisPlayer()
{
	
     
	
	
		if(showingPlayer == true)
		{
			
			view.animate(
	    	{
	      left:-290,
	      //top:100,
	      duration:250});
	      showingPlayer = false;
		}
		else if(showingPlayer == false)
		{
			
			view.animate(
	    	{
	      left:0,
	      //top:100,
	      duration:250});
	      showingPlayer = true;
		}
		
		clearBanner();
		
		imageView.image = playerToShow.picture;
		dateLabel.text = playerToShow.nicedate;
		nameLabel.text = playerToShow.name;
		positionLabel.text = playerToShow.position;
		currentYoutubeLink = playerToShow.youtube;
		placeBirthLabel.text = playerToShow.placeofbirth;
	dateBirthLabel.text = playerToShow.dateofbirth;
	
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
		backgroundImage:'images/cell.png',
		//font:{fontSize:16,
          //fontFamily:'Helvetica Neue'},
		height:44,
		//color:"#979797",
		//title:playerInLoop.name,
		id:i,
		});
		
		if(uglyDate >= makeNiceDateToUglyDate(playerInLoop.nicedate))
		{
			var rowNameLabel = Ti.UI.createLabel({
				
				left:10,
				width:'47%',
				height:44,
				color:'#979797',
				font:{fontSize:15,
			          fontFamily:'Helvetica Neue'},
			    textAlign:'left',
			    text:playerInLoop.name,
			    //backgroundColor:'brown'
			});
			
			
			
			var rowDateLabel = Ti.UI.createLabel({
				
				right:10,
				width:'47%',
				height:44,
				color:'#979797',
				font:{fontSize:15,
			          fontFamily:'Helvetica Neue'},
			    textAlign:'right',
			    text:playerInLoop.nicedate,
			    //backgroundColor:'brown'
			});
			row.searchNode = playerInLoop.name;
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

function fillSlides()
{
	for(var k = 0; k < playerToShow.clubarray.length; k++)
	{
		//alert("inne i loop length " +  playerToShow.clubArray.length);
		var clubLabel = Ti.UI.createLabel({
			height:30,
			minimumFontSize: 8,
			width:200,
			top:20,
			left:15,
			font:{fontSize:30,
          fontFamily:'Helvetica Neue'},
          color:'#5a5a5a',
          textAlign:'left',
			text:playerToShow.clubarray[k].clubname,
			//backgroundColor:'red'
		});
		
		
		
		var periodLabel = Ti.UI.createLabel({
			height:35,
			minimumFontSize: 8,
			width:150,
			top:55,
			left:15,
			textAlign:'left',
			color:'#5a5a5a',
			font:{fontSize:22,
          fontFamily:'Helvetica Neue'},
			text:playerToShow.clubarray[k].period,
			//backgroundColor:'green'
		});
		
		var imageViewWithClubAndPeriod = Ti.UI.createImageView({
			height:100,
			width:240,
			left:0,
			//backgroundColor:'blue'
		});
		
		imageViewWithClubAndPeriod.add(clubLabel,periodLabel);
		
		imageViewWithClubAndPeriod.transform = Ti.UI.create2DMatrix().rotate(-90);
		imageViewWithClubAndPeriod.left = -70;
		//imageViewWithClubAndPeriod.top = 120;
		var slide1 = {img:imageViewWithClubAndPeriod, displayTime: 2500, opacity:0};
		
		//view.add(imageViewLogo);
		
		slides.push(slide1);
	}
	
}

function clearBanner()
{
	animation.removeEventListener('complete',dothisnow);
	animationPaused = true;
	slides.length = 0;
	bannerView.opacity = 0;
	fillSlides();
	
	setTimeout(function() 
		{
			
				createBanner();
			
		}, 3000);
	
	
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
		top:topValue,
		left:5,
		right:5,
		width:310,
		height:20,
		backgroundColor:'transparent',
	});
		var clubLabel = Ti.UI.createLabel({
		left:0,
		width:160,
		height:20,
		color:'#5a5a5a',
		minimumFontSize: 8,
		font:{fontSize:'14sp',
	          fontFamily:'Helvetica Neue',fontWeight:'bold'},
	    textAlign:'left',
	    text:klubbArray[k].clubname,
	    
	});
	var clubYearLabel = Ti.UI.createLabel({
			
			left:170,
			width:95,
			height:20,
			color:'#979797',
			font:{fontSize:'13sp',
		          fontFamily:'Helvetica Neue'},
		    textAlign:'left',
		    text:klubbArray[k].period,
		    
		});
	
	var amountGoalsLabel = Ti.UI.createLabel({
			
			right:0,
			width:35,
			height:20,
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

function createBanner()
{
	
	animationPaused = false;
	
	var idx = 0;
	var countSlides = slides.length;
	
	var getNextSlide = function() 
	{
		idx = idx >= countSlides ? 0 : idx;
		var slide = slides[idx++];
		
		return slide;
	}
	
	var showSlide = function(slide) {
		if(added)
		{
			bannerView.remove(oldAdded);	
		}
		bannerView.add(slide.img);
		added = true;
		oldAdded = slide.img;
		bannerView.opacity = slide.opacity;
		
		
		
		bannerView.animate(animation);
		animation.addEventListener('complete',dothisnow); 
	 
	 
		setTimeout(function() 
		{
			if(!animationPaused)
			{
				showSlide(getNextSlide());
			}
				
			
		}, slide.displayTime);
	}
	 
	 	showSlide(getNextSlide());
	 
	
	
}


var animation = Titanium.UI.createAnimation(); 
animation.opacity = 1; 
animation.duration = 1000; 
animation.curve = Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;



function dothisnow()
{
	animation.removeEventListener('complete',dothisnow); 
	//animation.opacity = 0;
	
	//bannerView.animate(animation);
}



