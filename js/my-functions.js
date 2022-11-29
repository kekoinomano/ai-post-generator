
const MAX = 100
var gpt3_text = ""
document.getElementById("wpfooter").style.display="none";
const cp = new CircleProgress('.gpt3-progress-circle', {
	max: MAX,
	value: 0,
	animationDuration: 400,
	textFormat: (val) => val + '%',
});

function loading(time){
	document.getElementById("gpt3-loading").style.display="flex";
	var intervalId = window.setInterval(function(){
		if(cp.value==100){
			cp.value=0
		}
	  cp.value++;
		cp.el.style.setProperty('--progress-value', cp.value / MAX);
	}, time*10);
	return intervalId;
}

function check_inputs(){
	var all = $(".gpt3-input")
	var ret = true
	if(document.getElementById("title").value==""){
		ret = false;
		document.getElementById("title").classList.add("required");
	}else{
		document.getElementById("title").classList.remove("required");
	}
	for(var i = 0; i < all.length; i++){
			if(all[i].value==""){
					all[i].classList.add("required");
					ret = false
			}else{
				all[i].classList.remove("required");
			}
	}
	return ret;
}
function tag(number, type){
	if(type=="open"){
		return "<h" + number.split(".").length + ">";
	}else{
		return "</h" + number.split(".").length + ">";
	}
}
function generate_table(table){
	var arr = table.split('\n');
	document.getElementById("ul-gpt3").innerHTML="";
	var title = ""
	for(var i = 0; i < arr.length; i++){
			title = arr[i].replace(i+1 + ". ", "");
			let ulElm = document.getElementById("ul-gpt3");
      let new_li = document.createElement("li");
			new_li.innerHTML=$("#levelMarksame").html();
      new_li.getElementsByClassName("level-title")[0].innerHTML = i+1 + "."
      new_li.getElementsByClassName("gpt3-input")[0].value = title
      new_li.firstChild.nextSibling.setAttribute("data-level", "A");
      ulElm.append(new_li);
		}
}
function table_of_content(x){
	document.getElementById("gpt3-text").innerHTML='';
	document.getElementById("response-gpt3").style.display= "none";
	document.getElementById("gpt3-button").style.display="inline-block";
	var title = document.getElementById("title");
	if(title.value==""){
		title.classList.add("required");
		return ;
	}else{
		title.classList.remove("required");
	}
	var prompt1 = 'Write a table of contents for the following blog title:\n';
	prompt1 += title.value + '\n\n';
	prompt1 += 'Instructions: The table of contents may not contain the following sentence: 1. ' + title.value + '\n\n';
	prompt1 += 'Table of contents:\n';
	var prompt2 = '1.';
	var table = "";
	console.log(prompt1 + prompt2)
	x.classList.add("loading");
	document.getElementById("form-errors").style.display="none";
	
	var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const consulta = JSON.parse(this.responseText);
			console.log(consulta);
			x.classList.remove("loading");
			if(consulta.id){
				table = "1. " + consulta.choices[0].text;
				generate_table(table);
				get_info()

				
			}else{
				document.getElementById("form-errors").innerHTML=consulta.error;
				document.getElementById("form-errors").style.display="block";
			}
		}else if (this.readyState == 4 && this.status != 200){
			document.getElementById("form-errors").innerHTML="Algo salió mal";
			document.getElementById("form-errors").style.display="block";
		}
	}
	xmlhttp.open("POST","https://webator.es/gpt3_api/gpt3.py",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("prompt1=" + prompt1 + "&prompt2=" + prompt2 + "&table=1"+ "&idiom=" + title.value);
}
function gpt3(){
	if(!check_inputs()){
		return ;
	}
	var title = document.getElementById("title").value;
	var prompt1 = 'Write a blog with the following title:\n';
	prompt1 += title + '\n';
	prompt1 += 'TABLE OF CONTENT\n';
	var all = $(".gpt3-input")
	var number = 1;
	for(var i = 0; i < all.length; i++){
		prompt1+= tag(all[i].previousElementSibling.innerHTML, "open") + all[i].value + tag(all[i].previousElementSibling.innerHTML, "close") + '\n';
		if(all[i].previousElementSibling.innerHTML.split('.').length==2){
			number = parseInt(all[i].previousElementSibling.innerHTML.slice(0,-1));
		}
	}

	number++;
	//prompt1+= number + ". <end>" + all[i-1].value + '</end>\n';
	prompt1+= "<end>" + all[i-1].value + '</end>\n';

	prompt1+='\nUse <b> for some phrases\n';
	var prompt2 ='<h2>' + all[0].value + '</h2>\n';
	prompt2+='<b';
	console.log(prompt1);
	
	document.getElementById("gpt3-button").style.display="none";
	//document.getElementById("loader").style.display="inline-block";
	document.getElementById("form-errors").style.display="none";
	cp.value = 0;
	var id_time = loading(40);
	document.getElementById("gpt3-text").innerHTML='';
	document.getElementById("response-gpt3").style.display= "none";
	var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const consulta = JSON.parse(this.responseText);
			get_info();
			clearInterval(id_time);
			document.getElementById("gpt3-loading").style.display="none";
			if(!consulta.error && consulta.id){
				document.getElementById("gpt3-text").innerHTML='<h2>' + $(".gpt3-input")[0].value + '</h2>\n<b' + consulta.choices[0].text;
				document.getElementById("response-gpt3").style.display= "block";
				gpt3_text = consulta.choices[0].text;
				//create_post(consulta.choices[0].text);

				
			}else{
				//document.getElementById("loader").style.display="none";
				document.getElementById("form-errors").innerHTML=consulta.error;
				document.getElementById("form-errors").style.display="block";
			}
		}else if (this.readyState == 4 && this.status != 200){
			//document.getElementById("loader").style.display="none";
			document.getElementById("gpt3-loading").style.display="none";
			document.getElementById("form-errors").innerHTML="Algo salió mal";
			document.getElementById("form-errors").style.display="block";
		}
	}
	xmlhttp.open("POST","https://webator.es/gpt3_api/gpt3.py",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("prompt1=" + prompt1 + "&prompt2=" + prompt2 + "&stop=" + number+ "&idiom=" + title);
}
function create_post(type){
	text = '<h2>' + $(".gpt3-input")[0].value + '</h2>\n<b' + gpt3_text;
	var title = document.getElementById("title").value;
	$.ajax({
    url : 'admin-ajax.php',
    type: 'post',
    dataType: 'json',
    data: { 
      action: 'ai_post_generator_data_Publish', title: title, text: text, type : type 
    },
    success: function(data) {
    	console.log(data)
      if(data.exito){
      	if(type=="publish"){
					window.location.href = "/" + data.url;
      	}else{
      		window.location.href = "/wp-admin/post.php?post=" + data.id + "&action=edit";
      	}
				
			}else{
				document.getElementById("form-errors").innerHTML="Algo salió mal";
			}
    }
  });
}


function n_posts(tokens){
	return Math.ceil(tokens/1000);
}
function get_info(){

	
	var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const consulta = JSON.parse(this.responseText);
			console.log(consulta);
			let progress_token = document.getElementById("progress-token");
			if(consulta.response.token>200000){
				progress_token.style.width="100%";
			}else{
				progress_token.style.width= consulta.response.token/200000*100 + "%";
			}
			document.getElementById("progress-n-tokens").innerHTML = numberWithCommas(consulta.response.token) + " tokens (" + n_posts(consulta.response.token) + " posts aprox)";
			
		}else if (this.readyState == 4 && this.status != 200){
			document.getElementById("form-errors").innerHTML="Algo salió mal";
			document.getElementById("form-errors").style.display="block";
		}
	}
	xmlhttp.open("POST","https://webator.es/gpt3_api/get-info.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}
get_info();

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
var range = document.querySelector('#n_tokens');
range.addEventListener('input', function() {

  document.getElementById("n_tokens_text").innerHTML = numberWithCommas(this.value) + " tokens";
  document.getElementById("n_tokens_posts").innerHTML = n_posts(this.value) + " posts aprox";
  document.getElementById("price_text").innerHTML = this.value*(0.5/1000) + "€";
}, false);
function update_token(n_tokens, id){
	

	
	var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const consulta = JSON.parse(this.responseText);
			console.log(consulta);
			
		}else if (this.readyState == 4 && this.status != 200){
		}
	}
	xmlhttp.open("POST","https://webator.es/gpt3_api/update_token.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("n_tokens=" + n_tokens + "&id=" + id);
}
function show_pay(x, txt){
	const div = document.createElement("div");
	div.setAttribute("class", "popup-container");
	div.setAttribute("id", "mail-pop");
	const price = document.querySelector('#n_tokens').value*(0.5/1000);

	div.innerHTML = `
	<div class="popup" id="boxpop">
		<form id="payment-form" class="bg-white">
      <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->
      </div>
      <button id="submit">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay <strong>` + price + `€</strong></span>
      </button>
    </form>
  </div>`;
	document.getElementById("pop-cont").appendChild(div);
  initialize(price);
  document.querySelector("#payment-form").addEventListener("submit", handleSubmit);
	document.getElementById('mail-pop').onclick = function(e) {
		container=document.getElementById('boxpop')
		if (container !== e.target && !container.contains(e.target)) {    
			document.getElementById("mail-pop").remove();
		}
	}
}


/*TREE*/
$(function() {
  let treeview = {
    resetBtnToggle: function() {
      $(".js-treeview")
        .find(".level-add")
        .siblings()
        .removeClass("in");
    },
    addSameLevel: function(target) {
      let ulElm = target.closest("ul");
      let liElm = target.closest("li")[0];
      let sameLevelCodeASCII = target
        .closest("[data-level]")
        .attr("data-level")
        .charCodeAt(0);
        console.log(liElm);
        var new_li = document.createElement("li");
        new_li.innerHTML=$("#levelMarksame").html();
        new_li.firstChild.nextSibling.setAttribute("data-level", String.fromCharCode(sameLevelCodeASCII));
      liElm.parentNode.insertBefore(new_li, liElm.nextSibling);
      /*
      ulElm
        .children("li:last-child")
        .find("[data-level]")
        .attr("data-level", String.fromCharCode(sameLevelCodeASCII));
    	*/
    },
    addSubLevel: function(target) {
      let liElm = target.closest("li");
      let nextLevelCodeASCII = liElm.find("[data-level]").attr("data-level").charCodeAt(0) + 1;
      liElm.children("ul").append($("#levelMarkup").html());
      liElm.children("ul").find("[data-level]")
        .attr("data-level", String.fromCharCode(nextLevelCodeASCII));
    },
    removeLevel: function(target) {
      target.closest("li").remove();
      
    }
  };

  // Treeview Functions
  $(".js-treeview").on("click", ".level-add", function() {
    //$(this).find("span").toggleClass("fa-plus").toggleClass("fa-times text-danger");
	$(this).find("div").siblings().toggleClass("in");
  });

  // Add same level
  $(".js-treeview").on("click", ".level-same", function() {
    treeview.addSameLevel($(this));
    treeview.resetBtnToggle();
	renumber()
  });

  // Add sub level
  $(".js-treeview").on("click", ".level-sub", function() {
    treeview.addSubLevel($(this));
    treeview.resetBtnToggle();
	renumber()
  });
    // Remove Level
  $(".js-treeview").on("click", ".level-remove", function() {
    treeview.removeLevel($(this));
	renumber()
  }); 

  // Selected Level
  $(".js-treeview").on("click", ".level-title", function() {
    let isSelected = $(this).closest("[data-level]").hasClass("selected");
    !isSelected && $(this).closest(".js-treeview").find("[data-level]").removeClass("selected");
    $(this).closest("[data-level]").toggleClass("selected");
  }); 
});
function create_matrix(){
	//Create array
	var all = $(".treeview__level")
	var max_index="A"
	for(var i = 1; i < all.length; i++){
		if(all[i].getAttribute("data-level")>max_index){
			max_index=all[i].getAttribute("data-level")
		}
	}
	//var matrix = []
	max_index = max_index.charCodeAt(0) - "A".charCodeAt(0) + 1
	const matrix = new Array(i).fill(0).map(() => new Array(max_index).fill(0));
	for(var i = 0; i < all.length; i++){
		for(var j = 0; j < max_index; j++){
			if(j == all[i].getAttribute("data-level").charCodeAt(0) - "A".charCodeAt(0)){
				matrix[i][j]=1
			}else{
				matrix[i][j]=0
			}
		}
	}
	return matrix
}
function put_value(matrix){
	var all = $(".treeview__level")
	for(var i = 0; i < matrix.length; i++){
		all[i].removeAttribute("data-value")
		for(var j = 0; j < matrix[0].length; j++){
			if(matrix[i][j]!=0){
				all[i].setAttribute("data-value", all[i].getAttribute("data-value") + matrix[i][j] + ".");
			}
		}
		all[i].getElementsByClassName("level-title")[0].innerHTML = all[i].getAttribute("data-value");
		//all[i].childNodes[0].nextSibling.nextSibling.innerHTML = all[i].getAttribute("data-value");
	}
}
function renumber(){
	const matrix = create_matrix();
	for(var j = 0; j < matrix[0].length; j++){
		for(var i = 1; i < matrix.length; i++){
			//Recorro columna por columna en vertical, empezando por la fila 1
			if(matrix[i][j]==0){
				matrix[i][j]=matrix[i-1][j]
				if(j>0 && matrix[i-1][j-1]<matrix[i][j-1]){
					matrix[i][j]=0
				}
				
			}
			else{
				matrix[i][j]=matrix[i-1][j]+1
				if(j>0 && matrix[i-1][j-1]<matrix[i][j-1]){
					matrix[i][j]=0
				}
			}
			//Compruebo, si el numero que miro es distinto de 0, si ha habido algún cero en su fila, para reset
			if(matrix[i][j]!=0){
				for(var col = 1; col < matrix[0].length; col++){
					if(matrix[i][col]==0 && col < j){
						matrix[i][j]=0
					}
				}
			}
		}
		
	}
	put_value(matrix)
}
/*END TREE*/