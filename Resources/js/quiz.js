window.onload = function(){
	var timeout;
	var ok = 1;
	document.getElementById("rasp").onclick = function(){
		
		timeout = setTimeout(function(){
			alert("Timpul a expirat!");
			document.getElementById("rasp").disabled = true;
			ok = 0;
		},3000);
		

		document.getElementById("trimite").onclick = function() {
			if (ok == 1){
				ok = 0;
				clearTimeout(timeout);
				var ans = document.getElementById("rasp").value;
				document.getElementById("rasp").disabled = true;
				var prg = document.createElement('p');
				prg.id = "creat";
				document.getElementById("quiz").appendChild(prg);
				if(ans == "comedie") {
					prg.innerHTML = "Felicitari!";
				}
				else prg.innerHTML = "Ai gresit!";
				
				document.getElementById("intrebare").innerHTML = "";
				//document.getElementById("intrebare").style.visibility = "hidden";
			}
		}
	}
}