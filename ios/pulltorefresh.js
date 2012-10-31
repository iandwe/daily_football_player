var border = Ti.UI.createView({
	backgroundColor:"#191919",
	height:2,
	bottom:0
})
 
var tableHeader = Ti.UI.createView({
	backgroundColor:"#383838",
	width:320,
	height:60
});
 
// fake it til ya make it..  create a 2 pixel
// bottom border
tableHeader.add(border);

var arrow = Ti.UI.createView({
	backgroundImage:"images/arrow.png",
	width:23,
	height:60,
	bottom:10,
	left:20
});
var statusLabel = Ti.UI.createLabel({
	text:"Pull to reload",
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#979797",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	//shadowColor:"#999",
	//shadowOffset:{x:0,y:1}
});
 
lastUpdatedLabel = Ti.UI.createLabel({
	text:"Last Updated: "+formatDate(),
	left:55,
	width:200,
	bottom:15,
	height:"auto",
	color:"#979797",
	textAlign:"center",
	font:{fontSize:12},
	//shadowColor:"#999",
	//shadowOffset:{x:0,y:1}
});
tableHeader.add(arrow, statusLabel, lastUpdatedLabel);
// var actInd = Titanium.UI.createActivityIndicator({
	// left:20,
	// bottom:13,
	// width:30,
	// height:30
// });



table.headerPullView = tableHeader;

table.addEventListener('scroll',function(e)
{
	
	var offset = e.contentOffset.y;
	if (offset <= -65.0 && !pulling)
	{
		
		var t = Ti.UI.create2DMatrix();
		t = t.rotate(-180);
		pulling = true;
		arrow.animate({transform:t,duration:180});
		//alert(offset + " " +pulling);
		statusLabel.text = "Release to refresh...";
	}
	else if (pulling && offset > -65.0 && offset < 0)
	{
		//alert("pulling && offset > -65.0 && offset < 0");
		//pulling = false;
		var t = Ti.UI.create2DMatrix();
		arrow.animate({transform:t,duration:180});
		statusLabel.text = "Pull down to refresh...";
		//alert("efter satuslabel.text");
	}
});
table.addEventListener('scrollEnd',function(e)
{
	//alert(pulling + " " + reloading + " " + e.contentOffset.y);
	if (pulling && !reloading && e.contentOffset.y <= 0)
	{
		//alert("ipulling && !reloading && e.contentOffset.y <= -65.0");
		reloading = true;
		pulling = false;
		arrow.hide();
		//actInd.show();
		statusLabel.text = "Reloading...";
		table.setContentInsets({top:60},{animated:true});
		arrow.transform=Ti.UI.create2DMatrix();
		//alert("innan begin reloading");
		beginReloading();
	}
});

var pulling = false;
var reloading = false;
 
function beginReloading()
{
	// just mock out the reload
	if (Titanium.Network.online)
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
    	isReloadingFromPull = true;
    	actInd.show();
    	getToday();
    }
	//setTimeout(endReloading,2000);
}
 
function endReloading()
{
	table.setContentInsets({top:0},{animated:true});
	reloading = false;
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	statusLabel.text = "Pull down to refresh...";
	//actInd.hide();
	arrow.show();
}