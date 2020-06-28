window.onload=function(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
					
						var lista = document.getElementById('afisTemplate');
						var divuri = lista.children;
						vectDivs = Array.prototype.slice.call(divuri);	
						for(let divv of vectDivs) {
							divv.onclick = function(e) {
								if (!this.classList.contains("selectat")) {
									this.classList.add("selectat");
								}
								if (e.ctrlKey) {
									this.classList.remove("selectat");
								}
				
							}
			
						
		
	}
					
					
			}
			
			
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/filme.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function afiseajaJsonTemplate(obJson) { 
			//in acets div voi afisa template-urile   
			let container=document.getElementById("afisTemplate");

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de studenti din obJson
			for(let i=0;i<obJson.filme.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//acesta va primi ca parametru un student din vectorul de studenti din json {student: obJson.studenti[i]}
				//practic obJson.studenti[i] e redenumit ca "student" in template si putem sa ii accesam proprietatile: student.id etc
				textTemplate+=ejs.render("<div class='templ_film'>\
				<img class='imag2' src='/Images/<%= film.poza %>.jpg'>\
				<p>Id: <%= film.id %></p>\
				<p>An: <%= film.an %></p>\
				<p>Nume film: <%= film.nume %></p>\
				<p>Regizor: <%= film.regizor %></p>\
				<p>Durata: <%= film.durata %></p>\
				</div>", 
				{film: obJson.filme[i]});
			} 
			//adaug textul cu afisarea studentilor in container
			container.innerHTML=textTemplate;
	}



	
	document.getElementById("ssorteaza").onclick = function() {
		var optiune = document.getElementById("selectare").value;
		setTimeout(function(){ alert("Lista a fost sortata!"); }, 1000);
		if ( optiune == 1) {
			var lista = document.getElementById('afisTemplate');
			var divuri = lista.children;
			vectDivs = Array.prototype.slice.call(divuri);
			vectDivs.sort(function(a, b) {
				if (a.getElementsByTagName("p")[3].innerHTML < b.getElementsByTagName("p")[3].innerHTML) {
					return -1;
				} else {
					return 1;
				}
			});
			
			for(let divv of vectDivs){
				lista.appendChild(divv);
			}
		
		}
		
		
		if ( optiune == 2) {
			//var lista = document.getElementById('afisTemplate');
			var lista = document.getElementsByClassName('afis');
			lista = lista[1];
			var divuri = lista.children;
			vectDivs = Array.prototype.slice.call(divuri);
			vectDivs.sort(function(a, b) {
				if (a.getElementsByTagName("p")[1].innerHTML < b.getElementsByTagName("p")[1].innerHTML) {
					return -1;
				} else {
					return 1;
				}
			});
			
			for(let divv of vectDivs){
				lista.appendChild(divv);
			}
		
		}
		
		
		if ( optiune == 3) {
			//var lista = document.getElementById('afisTemplate');
			var lista = document.getElementById('sec1');
			lista = lista.querySelector(".afis");
			var divuri = lista.children;
			vectDivs = Array.prototype.slice.call(divuri);
			vectDivs.sort(function(a, b) {
				if (a.getElementsByTagName("p")[2].innerHTML < b.getElementsByTagName("p")[2].innerHTML) {
					return -1;
				} else {
					return 1;
				}
			});
			
			for(let divv of vectDivs){
				lista.appendChild(divv);
			}
		
		}	
	}

	
	document.getElementById( "reg" ).value = localStorage.getItem( "txtreg" );
	var par = document.getElementById("eps");
	
	
	document.getElementById("arata").onclick = function() {
		var ok2 = 0;
		var opt = document.getElementById("reg").value;
		var lista = document.getElementById('afisTemplate');
		var divuri = lista.children;
		vectDivs = Array.prototype.slice.call(divuri);
		for(let divv of vectDivs){
			if (divv.getElementsByTagName("p")[3].innerHTML.startsWith("Regizor: ".concat(opt))) {
				divv.style.display = "block";
				ok2 = 1;
			}
			else {
				divv.classList.remove("selectat");
				divv.style.display = "none";
			}
		}
		localStorage.setItem( "txtreg", opt );
		
		if (ok2 == 0 ) {
			par.innerHTML = "Nu a fost gasit nici un film!";
			par.style.color = "orange";
			var color = 0;
			setInterval(function(){
				if (color == 0 ) {
					color = 1;
					par.style.color = "red";
				}
				
				else {
					color = 0;
					par.style.color = "orange";
				}

				}, 1000);
		}
		else {
			par.innerHTML = "";
		}
			
		
	}
	
	document.getElementById("reset").onclick = function() {
		par.innerHTML = "";
		localStorage.clear();
		var lista = document.getElementById('afisTemplate');
		var divuri = lista.children;
		vectDivs = Array.prototype.slice.call(divuri);
		vectDivs.sort(function(a, b) {
			if (a.getElementsByTagName("p")[0].innerHTML < b.getElementsByTagName("p")[0].innerHTML) {
				return -1;
			} else {
				return 1;
			}
		});
		
		for(let divv of vectDivs){
			lista.appendChild(divv);
			divv.style.display = "block";
			divv.classList.remove("selectat");
		}
	}
	
	var ok = 0;
	
	document.getElementById("calcul").onclick = function() {
		if ( ok == 1) {
			var node = document.getElementById("creat")
			document.getElementById("ca").removeChild(node);
		}
		
		ok = 1;
		var cr = document.createElement('div');
		cr.id = "creat";
		cr.className = "afis";
		document.getElementById("ca").appendChild(cr);
		cr.innerHTML = "Durata in minute a filmelor selectate: ";
		let suma = 0;
		for(let divv of vectDivs) {
			if (divv.classList.contains("selectat")) {
				var dur = divv.getElementsByTagName("p")[4].innerHTML;
				suma = suma + parseInt(dur.replace("Durata: ", ''), 10);
			}
		}
		cr.innerHTML += suma;
	}
	
	
	marcaj();
	
	timer();
	
	cuvinte();
	
	
}