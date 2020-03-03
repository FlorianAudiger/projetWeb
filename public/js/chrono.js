<form name="chronoForm">
<input type="text" class="form-control" name="chronotime" id="chronotime" value="0:00:00:00"/>
  <input type="button" class="btn btn-danger" name="startstop" value="start!" onClick="chronoStart()" />
  <input type="button" class="btn btn-danger" name="reset" value="reset!" onClick="chronoReset()" />
</form>
<button onclick="alertCookie()">Show cookies</button>

<script>
var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0

window.onload = chronoStart;
function getCookie(name){
     if(document.cookie.length == 0)
       return null;

     var regSepCookie = new RegExp('(; )', 'g');
     var cookies = document.cookie.split(regSepCookie);

     for(var i = 0; i < cookies.length; i++){
       var regInfo = new RegExp('=', 'g');
       var infos = cookies[i].split(regInfo);
       if(infos[0] == name){
         return unescape(infos[1]);
       }
     }
     return null;
   }
function alertCookie() {
  alert(document.cookie);
}
function chrono(){
	end = new Date()
	diff = end - start
    diff = new Date(diff)
	var msec = diff.getMilliseconds()
	var sec = diff.getSeconds()
	var min = diff.getMinutes()
	/*if (min < 10){
		min = "0" + min
	}*/
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
    }
    document.cookie = 'sec='+sec;
    document.cookie = 'min='+min;
	document.getElementById("chronotime").value = min + ":" + sec + ":" + msec
	timerID = setTimeout("chrono()", 10)
}
function chronoStart(){
	document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
    start = new Date()
    console.log("a"+start)
    if(getCookie("sec")==null || getCookie("min")==null) {
        start.setMilliseconds(0);
        start.setMinutes(0);
    }
    else{
        var a = (parseInt(getCookie("sec")+60*parseInt(getCookie("min"))))
        d = new Date(Date.now()+(a*1000));
        start = d
    }

    console.log(start)
	chrono()
}
function chronoContinue(){
	document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()-diff
	start = new Date(start)
	chrono()
}
function chronoReset(){
	document.getElementById("chronotime").value = "0:00:00:000"
	start = new Date()
}
function chronoStopReset(){
	document.getElementById("chronotime").value = "0:00:00:000"
	document.chronoForm.startstop.onclick = chronoStart
}
function chronoStop(){
	document.chronoForm.startstop.value = "start!"
	document.chronoForm.startstop.onclick = chronoContinue
	document.chronoForm.reset.onclick = chronoStopReset
	clearTimeout(timerID)
}
</script>