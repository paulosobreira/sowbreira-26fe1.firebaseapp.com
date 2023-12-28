var agt = navigator.userAgent.toLowerCase();
var is_ie = (agt.indexOf('msie') != -1);
var is_ie5 = (agt.indexOf('msie 5') != -1);

function CreateXmlHttpReq(handler) {
	var xmlhttp = null;
	if (is_ie) {
	var control = (is_ie5) ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP";
	try {
xmlhttp = new ActiveXObject(control);
xmlhttp.onreadystatechange = handler;
	} catch(e) {
alert("You need to enable active scripting and activeX controls");
	}
		} else {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = handler;
	xmlhttp.onerror = handler;
		}
		return xmlhttp;
}
function DummyHandler() { }
var uniqnum_counter = (new Date).getTime();
function XmlHttpGET(xmlhttp, url) {
					xmlhttp.open('GET', url, true);
					xmlhttp.send(null);
			}
function SendRequest(url) {
		var xmlhttp = CreateXmlHttpReq(DummyHandler);
		++uniqnum_counter;
		XmlHttpGET(xmlhttp, url + "&rand=" + uniqnum_counter);
}
function showHelp() {
  obj = document.getElementById("help"); obj.style.display = "block";
  obj = document.getElementById("show_help"); obj.style.display = "none";
}
function hideHelp(iid) {
  obj = document.getElementById("help"); obj.style.display = "none";
  obj = document.getElementById("show_help"); obj.style.display = "block"; 
}
function postback(operation, args) {
	var i = 0;
	while ( i < args.length ) {
		var arg = document.createElement('INPUT');
		arg.setAttribute('type','hidden');
		arg.setAttribute('name','arg'+i);
		arg.setAttribute('value',args[i]);
		document.getElementById('PostbackArguments').appendChild(arg);
		i++;
	}
	document.forms["f"].PostbackOperation.value = operation;
	document.forms["f"].submit();
}
