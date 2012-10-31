// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000000');

// create tab group

var url;

if (Ti.Platform.osname == 'android')
{
    url = '/and/showFirstplayer2.js'; 
}
else
{
	url = '/ios/showFirstplayer2.js';
}

var win1 = Titanium.UI.createWindow({  
    title:'Player of the day',
    backgroundImage:'/ios/images/sideBar.png',
    url:url,
    
});



win1.open();


