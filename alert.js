//$('form').hide();
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
function createIframe(){
	var urls=conQueryStr();
	var str="";
	for(i in urls){
		var frm = document.createElement('iframe');
		frm.src=domainURL+urls[i]+"&111";
		document.title=rNames[i];
		//document.body.appendChild(frm);
		window.open(domainURL+urls[i]+"&111");
	}
}

if(document.URL.toString().endsWith('&111')){
	var meta=document.createElement('meta');
	meta.setAttribute('http-equiv','refresh');
	meta.setAttribute("content","120");
	document.head.appendChild(meta);
}else{
	var rst = document.createElement('div');
	rst.setAttribute('id','rst');
	document.body.appendChild(rst);
	//createIframe();
}
var s=document.createElement('script');s.setAttribute('src','https://cdn.rawgit.com/xzs603/logintest/master/bookRoom.js');document.head.appendChild(s);
//checkAvb();
// refresh
if($('.room-available').length>0){
	//var r = parent.document.getElementById('rst');
	//if(r)
	//	r.innerHTML=r.innerHTML+'<br/>'+document.title;
alert(document.URL);
}

$.ajax({
   type: "POST",
   url: "http://gzfa.xdz.com.cn/ModuleBook/PersonSelectRoom/Index?CommunityID=e46fe9e8-bd85-4b87-b68d-a3c501146273&BuildingID=a14b374b-bb3b-4b78-b574-a3c600a44858&RoomTypeID=9e6fed87-a185-4040-b4ff-a3c600a41758",
   beforeSend: function( xhr ) { xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }}); }, 
   dataTyp: "html",
   processData: false,
   success: function(data){alert(data);}
 });
