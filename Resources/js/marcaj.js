function marcaj(){

	setTimeout(function marcaj() {
		var link1 = window.location.href;
		var path = link1.split("/");
		path = path[path.length - 1];
		listLinks = document.getElementsByTagName("nav")[0].getElementsByTagName("a");
		
		for(let unLink of listLinks) {
			var x = unLink.href.split("/");
			x = x[x.length - 1];
			if (x == path)
				unLink.parentNode.classList.add("current");
		}

		
	}, 1);
}


function timer() {
	
	var path = window.location.href;
	setInterval(function(){
		if(!localStorage.getItem(path)) {
			localStorage.setItem(path,0);
		}
		var timp = parseInt(localStorage.getItem(path),10);
		if ( Math.trunc(timp / 60) == 1)
			document.getElementById("timpp").innerHTML = "Timp petrecut pe pagina: un minut, " + (timp % 60) + " secunde.";
		else document.getElementById("timpp").innerHTML = "Timp petrecut pe pagina: " + Math.trunc(timp / 60) + " minute, " + (timp % 60) + " secunde.";
		localStorage.setItem(path, timp + 1);
	
	},1000);
	
	
	
	
}

function cuvinte() {
	continut = document.getElementsByTagName("body");
	continut = continut[0].innerText;
	continut = continut.split(" ");
	document.getElementById("nrcuv").innerHTML = "Numarul de cuvinte de pe aceasta pagina: " + continut.length;

}