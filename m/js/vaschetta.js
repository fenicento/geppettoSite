var vaschetta;
var currentPage = 0;
var totPage;

var startX = null;
var startY = null;

function initVaschetta(){

	window.addEventListener('resize', resetVaschetta, false);
	
	//Resetta le coordinate iniziali dello swipe
	document.addEventListener('touchend', function(e){startX = null;startY = null;}, false);
	
	var totalwidth = 0;
	
	//Calcolo la larghezza totale occupata dagl'item della vaschetta
	var items = document.getElementsByClassName("vaschetta_item");
	totPage = items.length - 1;
	var itemSize = (100 / items.length) + "%";
	
	//Applico la dimensione all'item
	for(var i=0; i < items.length; i++){
		items[i].style.width = itemSize;
	}
	
	//Applico la dimensione del wrapper
	var size = (items.length * 100) + "%";
	var scroller_content = document.getElementsByClassName("scroller-content")[0];
	var scroller_wrapper = document.getElementsByClassName("scroller-wrapper")[0];
	
	if(scroller_content != null){

		scroller_content.style.width = size;
		
		//Calcolo l'altezza occupata dagl'item della vaschetta e la applico al contenitore
		
		
		var maxRealWidth = window.innerWidth;
		var wrapperWidth = scroller_wrapper.offsetWidth;
		

		scroller_wrapper.style.height = height + "px";
		
		var maxRealheight = 0;
		var index = 0;
		for(var i=0; i < items.length; i++){
			var temp = items[i].getElementsByTagName("img")[0].attributes["height"].value;
			if(maxRealheight < temp){
				maxRealheight = temp;
				index = i;
			}
		}
		
		var height = maxRealheight/maxRealWidth * wrapperWidth;
		
		//Applico lo scroller
		var elem = document.getElementsByClassName('scroller-wrapper')[0];
			
			vaschetta = new iScroll(elem, { 
				snap:true,
				momentum: true,
				hScroll: true, 
				vScroll: false, 
				hScrollbar: false, 
				vScrollbar: false,
				onBeforeScrollStart: null,
				onScrollEnd: function () { handleIndicator(this); }  
			});			
		

		
		var wrapper = document.getElementsByClassName("vaschetta_wrapper")[0];
		wrapper.style.visibility = "visible";
		
	
		//Aggancio gli eventi alle freccie
		var freccia_sx = document.getElementsByClassName("vaschetta_freccia_sx")[0];
		var freccia_dx = document.getElementsByClassName("vaschetta_freccia_dx")[0];
		if(freccia_sx){
			freccia_sx.addEventListener('click', scrollBack, false);
			freccia_sx.style.display = 'none';
		}
		if(freccia_dx){
			freccia_dx.addEventListener('click', scrollForward, false);
		}
		
	}
}


/*
 * Resetta la vaschetta quando il device cambia orientamento
 */
function resetVaschetta(){
	
	//Reinizializzo iscroll
	vaschetta.destroy();
	initVaschetta();
	vaschetta.scrollToPage(currentPage, 0, -1);
}

function handleIndicator(iscroll){
	
	var freccia_sx = document.getElementsByClassName("vaschetta_freccia_sx")[0];
	var freccia_dx = document.getElementsByClassName("vaschetta_freccia_dx")[0];	
	
	3
//	//Cambio lo stato dell'indicator
//	document.querySelector('.indicator > span.active').className = '';
//	document.querySelector('.indicator > span:nth-child(' + (iscroll.currPageX+1) + ')').className = 'active';
//	
	//Aggiorno la pagina corrente
	currentPage = iscroll.currPageX;
	
	//Toggle della visibilita'� sulle freccie (se sono sul primo o ultimo elemento)
	if(currentPage == 0){
		if(freccia_sx){
			freccia_sx.style.display = "none";
		}
	}
	else{
		if(freccia_sx){
			freccia_sx.style.display = "block";
		}
	}
	
	if(currentPage == totPage){
		if(freccia_dx){
			freccia_dx.style.display = "none";
		}
	}
	else{
		if(freccia_dx){
			freccia_dx.style.display = "block";
		}
	}
	
}

function scrollForward(){
	
	currentPage = currentPage + 1;
	if(currentPage > totPage){
		currentPage = totPage;
	}
	
	vaschetta.scrollToPage(currentPage, 0, 200);
}

function scrollBack(){
	
	currentPage = currentPage - 1;
	if(currentPage < 0){
		currentPage = 0;
	}
	
	vaschetta.scrollToPage(currentPage, 0, 200);
}