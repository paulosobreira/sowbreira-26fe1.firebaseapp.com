var estadoArvore = new Array();

function gup(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if (results == null)
		return "";
	else
		return results[1];
}
function limpar() {
	for (var i = 0; i < estadoArvore.length; i++) {
		estadoArvore[i] = '1';
	}
	document.getElementById('text').value = "";
}
function capturaTecla(evt) {
	var code = evt.keyCode;
	if (code == 27) {
		limpar();
	}
	if (document.getElementById('text').value == '') {
		limpar();
	}
	geraMenuJson();
}
function mudaEstadoArvore(i) {
	if (estadoArvore[i] == '1') {
		estadoArvore[i] = '2';
	} else if (estadoArvore[i] == '2') {
		estadoArvore[i] = '1';
	}
	document.getElementById('text').value = "";
	geraMenuJson();
	return false;
}

function geraMenuJson() {
	var str = new String();
	str += ('<ul class="ul_menu" id="Root">');
	var idDivNode = 0;
	var proc = document.getElementById('text').value;
	menu_root.data.forEach(function (data, i) {
		if (estadoArvore[i] == null) {
			estadoArvore[i] = '1';
		}
		var strIn = new String();
		var achou_valor = false;
		data.data.forEach(function (data_in, j) {
			
			var achou_valor_in = false;
			if (proc != '' && proc != ' ') {
				achou_valor_in = (data.name.toUpperCase().indexOf(proc.toUpperCase()) != -1 || 
									data_in.value.toUpperCase().indexOf(proc.toUpperCase()) != -1 || 
									data_in.name.toUpperCase().indexOf(proc.toUpperCase()) != -1);
				if (achou_valor_in) {
					estadoArvore[i] = "2";
				} else {
					estadoArvore[i] = "1";
				}
			}

			if (estadoArvore[i] == '2') {
				if (proc != '' && achou_valor_in) {
					strIn += ("<li class='li_menu_in_sel'><div class='div_node' id='nodeClk" + idDivNode + "' title='" + data_in.value + "' >" + data_in.name + "</div></li>");
				} else {
					strIn += ("<li class='li_menu_in'><div class='div_node' id='nodeClk" + idDivNode + "' title='" + data_in.value + "' >" + data_in.name + "</div></li>");
				}
				idDivNode++;
			}
			if(achou_valor_in){
				achou_valor = true;
			}
		})


		if (achou_valor || proc == '') {
			str += ('<li class="li_menu" ><div class=div_node onclick="return mudaEstadoArvore(' + i + ')">' + data.name + '</div>');
			str += ('<ul class="ul_menu" >');
			
			str += strIn;

			str += ('</ul>');
		}
	})
	str += ('</ul>');

	var main = document.getElementById('main');
	main.innerHTML = str;
	for (i = 0; i < idDivNode; i++) {
		var node = document.getElementById('nodeClk' + i);
		node.addEventListener("mouseup", selecionar, true);
	}
}

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str) {
		return this.indexOf(str) === 0;
	};
}

function selecionar(e) {
	var loc = e.target.title;
	if (loc.indexOf("/") == 0) {
		window.open('https://sowbreira-26fe1.firebaseapp.com' + loc);
	} else {
		window.open(loc);
	}
}

