window.onload = function() {
	
	var myInt;
	document.getElementById("nastere2").onclick = function() {
		clearInterval(myInt);
		var datan = document.getElementById("nastere").value;
		if (/\d{2}#\d{2}#\d{4}/.test(datan)) {
			var datan2 = datan.split("#").map(Number);
			var d = new Date();
			var bd = new Date(datan2[2],datan2[1] - 1, datan2[0],0,0,0,0);
			if (bd < d) {
				myInt = setInterval(function(){
					var an = d.getFullYear() - bd.getFullYear();
					var luna = d.getMonth() - bd.getMonth();
					var zi = d.getDate() - bd.getDate();
					if (zi < 0) {
						var temp = new Date(d.getFullYear(),d.getMonth() + 1, 1 , 0, 0,-1);
						luna = luna -1;
						zi = zi + temp.getDate();
					}
					if (luna < 0) {
						an = an - 1;
						luna = luna + 12;
						
					}
					var date = new Date();
					var str = [an, "ani,", luna, "luni,", zi, "zile,", date.getHours(), "ore,", date.getMinutes(), "minute," , date.getSeconds(), "secunde."];
					document.getElementById("rez").innerHTML = str.join(' ');
					
				}, 1000);
				
			}
			else document.getElementById("rez").innerHTML = "DATA INVALIDA!";
		}
		else document.getElementById("rez").innerHTML = "INPUT GRESIT!";


	}

	//10#01#2020
	//TITLU FADE
	setTimeout(function Fade() {
		var titlu = document.title;
		var titlu2 = '';
		var lungime = 1;
		var interval;
		interval = setInterval(function() {
			if (titlu.length <= titlu2.length + 1) {
				document.title = titlu;
				clearInterval(interval);
			}
			else {
				document.title = titlu2;
				titlu2 = titlu.substr(0,lungime) + titlu.substr(titlu.length - lungime, titlu.length);
				lungime ++;
			}
			
		},300);
		
	}, 0);
	
	
	marcaj();
	timer();
	cuvinte();
}



/*			if (datan2[2] > d.getFullYear()) ok = 0;
			else if (datan2[2] == d.getFullYear() && datan2[1] > (d.getMonth()+1)) ok = 0;
			else if (datan2[2] == d.getFullYear() && datan2[1] == (d.getMonth()+1) && datan2[0] > d.getDate()) ok = 0;
			
			if (ok == 0) document.getElementById("rez").innerHTML = "DATA INVALIDA!";
*/