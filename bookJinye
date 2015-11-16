// init UI
$('form').first().hide();
$('body').append('<div id="rstContent"></div>')

// all building ids
var bIDs=[],i=0;$('#BuildingID option').each(function(){bIDs[i++]=this.value});bIDs.shift();
// all room ids
var rIDs=[["9e6fed87-a185-4040-b4ff-a3c600a41758"],["2ba8e032-907f-45f1-9a9a-a3c600a58dbe"],["42e3462c-aab6-4237-a2de-a3c60108a329","622de26b-e7c2-44c8-a37c-a3c60108d092","28db79cb-d37f-4c80-ad71-a3c601090d8b","a5c842f0-edf4-4220-9c3a-a3c60109accf","81067aaa-cc53-44f0-89fe-a3c60109c80e","12223f6d-256e-4d3d-a467-a3c60109f743"],["193f32e1-5ad4-4e6a-adf8-a3c6010d406e","1724fe64-1658-4188-b6f8-a3c6010dc676","c8c02138-0ad1-4157-ad95-a3c6010de4a3","62407d64-15ed-4284-8ea0-a3c6010e18e1","76d43803-b28f-4105-a189-a3c6010e97fd","268607f0-2921-496f-be79-a3c6010ed534"],["c959ca5a-fc88-4d18-ae2c-a3c6010f0fa6","fcc14689-29f9-4be6-8f63-a3c6010f27f3","61cf44f3-8b25-4ef9-b502-a3c6010f688c","216b5603-7903-4da0-a957-a3c6010f82ea","5ff39954-fd3a-4df0-829b-a3c6010fca20","98f8b041-9543-4e86-866d-a3c6010fdfc9"]];
// all room names;
var rNames=[];
// query base URL
var queryDetail='http://gzfa.xdz.com.cn/ModuleBook/PersonSelectRoom/Index?CommunityID=e46fe9e8-bd85-4b87-b68d-a3c501146273';
var queryNumer='http://gzfa.xdz.com.cn/ModuleBook/PersonSelectRoom/GetRoomCountByRoomType/?1';
var numURIs=[],detailURIs=[];
// connect the query string
function initQueryURI(){
	// {1-1},{2-2},{3,3~8},{4,9~14},{5,15~20}
	var splitNums=[1,1,6,6,6],idx=0;
	// a. query room total number. b. query root details.
	var numB='buildid',numR='roomtypeid',detailB='BuildingID',detailR='RoomTypeID';
	for(var i=0;i<splitNums.length;i++){
		for(var j=0;j<splitNums[i];j++,idx++){
			numURIs[idx]='&'+numB+'='+bIDs[i]+'&'+numR+'='+rIDs[i][j];
			detailURIs[idx]='&'+detailB+'='+bIDs[i]+'&'+detailR+'='+rIDs[i][j];
			rNames[idx]='楼号'+(i+1)+',户型号'+(j+1);
		}
	}
};
initQueryURI();
function doQuery(){
	$('#rstContent').append('request at ' + Date() + '<br/>');
	//for(var i=0;i<numURIs.length;i++)//queryNum(queryNumer+numURIs[i],i);
	for(var i=0;i<detailURIs.length;i++)
		qeuryDetail(queryDetail+detailURIs[i],i);
}
function queryNum(url,roomNo){
   $.post(url,function(data){var num=data.result;if(num>0)reqDetail(detailURIs[roomNo],roomNo);},"json");
}
function qeuryDetail(url,roomNo){
   $.ajax({type: "POST",url: url,
   beforeSend: function( xhr ) { xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }}); }, dataTyp: "html",
   success: function(data){dispRst(data,roomNo)}
 });
}
function dispRst(data,roomNo){
	$(data).find('.room-available').each(function(){
		var info=$(this).attr('room-no') + ' ' + $(this).attr('houseorientation');
		$('#rstContent').append('<div style="color:#a00">'+rNames[roomNo]+' '+info+' '+Date()+' </div>');
	});
}
// set up the timer
doQuery();window.setInterval("doQuery()", 60000);
