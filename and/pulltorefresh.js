

refreshBtn.addEventListener('click',function(){
	beginReloading();
});


 
function beginReloading()
{
	// just mock out the reload
	if (Titanium.Network.online)
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
		
    	isReloadingFromPull = true;
    	actInd.show();
    	getToday();
    }
	//setTimeout(endReloading,2000);
}
 
function endReloading()
{
	//table.setContentInsets({top:0},{animated:true});
	reloading = false;
	//lastUpdatedLabel.text = "Last Updated: "+formatDate();
	//statusLabel.text = "Pull down to refresh...";
	//actInd.hide();
	//arrow.show();
}