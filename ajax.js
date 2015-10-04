function init(){
  $('form').first().hide()
  var rstContent=document.createElement('div');
  rstContent.setAttribute('id', 'rstContent');
  document.body.appendChild(rstContent);
}
init();

//var url="http://gzfa.xdz.com.cn/ModuleBook/PersonSelectRoom/Index?CommunityID=e46fe9e8-bd85-4b87-b68d-a3c501146273&BuildingID=a14b374b-bb3b-4b78-b574-a3c600a44858&RoomTypeID=9e6fed87-a185-4040-b4ff-a3c600a41758"
function dispRst(data,roomNo){
	$(data).find('.room-available').each(function(){
		var info=$(this).attr('room-no') + ' ' + $(this).attr('houseorientation');
		$('#rstContent').append(rNames[roomNo]+' '+info+' '+Date()+' </br>');
	});
}
function req(url,roomNo){
   $.ajax({
   type: "POST",
   url: url,
   beforeSend: function( xhr ) { xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }}); }, 
   dataTyp: "html",
   success: function(data){dispRst(data,roomNo)}
 });
}

var domainURL="http://gzfa.xdz.com.cn/ModuleBook/PersonSelectRoom/Index?CommunityID=e46fe9e8-bd85-4b87-b68d-a3c501146273";
var rNames=[],i=0;$('#RoomTypeID option').each(function(){rNames[i++]=this.text});
function conQueryStr(){
	var bIDs=[],i=0;$('#BuildingID option').each(function(){bIDs[i++]=this.value});
	var rIDs=[],i=0;$('#RoomTypeID option').each(function(){rIDs[i++]=this.value});
	// {1-1},{2-2},{3,3~8},{4,9~14},{5,15~20}
	var strs = [],idx=0;
	for(var i=1;i<3;i++){
		strs[idx++]='&BuildingID='+bIDs[i]+'&RoomTypeID='+rIDs[i];
	}
	for(var i=3;i<9;i++){
		strs[idx++] = '&BuildingID='+bIDs[3]+'&RoomTypeID='+rIDs[i];
	}
	for(var i=9;i<15;i++){
		strs[idx++] = '&BuildingID='+bIDs[4]+'&RoomTypeID='+rIDs[i];
	}
	for(var i=15;i<21;i++){
		strs[idx++] = '&BuildingID='+bIDs[5]+'&RoomTypeID='+rIDs[i];
	}
	return strs;
}
var urls=conQueryStr();
function doQuery(){
	$('#rstContent').append('request at ' + Date() + '<br/>');
	for(var i in urls)
		req(domainURL+urls[i],i);
}

window.setInterval("doQuery()", 60000);
