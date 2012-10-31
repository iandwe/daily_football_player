
function getDate()
{
	var currentTime = new Date();
	var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate();
var year = currentTime.getFullYear();
	//return month + "/" + day + "/" + year + "-" + hours +":"+minutes;
	return year+""+month+""+day;
}

function getFineDate()
{
	var currentDate = new Date();
var twoDigitMonth=((currentDate.getMonth()+1)>=10)? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);  
var twoDigitDate=((currentDate.getDate())>=10)? (currentDate.getDate()) : '0' + (currentDate.getDate());
var createdDateTo = currentDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate; 
//alert(createdDateTo);
	return createdDateTo;
}

function makeNiceDateToUglyDate(dateToConvert)
{
	var str2 = dateToConvert.replace(/\-/g,"");
	return str2;
}
function formatDate()
{
	var d = new Date;
	var datestr = d.getMonth()+'/'+d.getDate()+'/'+d.getFullYear();
	if (d.getHours()>=12)
	{
           datestr+=' '+(d.getHours()==12 ? 
              d.getHours() : d.getHours()-12)+':'+
              d.getMinutes()+' PM';
	}
	else
	{
		datestr+=' '+d.getHours()+':'+d.getMinutes()+' AM';
	}
	return datestr;
}