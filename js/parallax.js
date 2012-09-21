$(document).ready(function() {
	
	$(".scroll-el").width($(window).width()*0.9);
	$("#contatti").height($(window).height()*0.895);
	$("#map_canvas").width($(".contatti-container").width()*0.50);
	$("#map_canvas").height($(window).height()*0.7);
	$(".video-gep").width($(window).width()*0.4);
	$(".video-gep").height($(window).width()*0.4/1.77);
	$(".prog-container").height($(window).height()*0.9);

	redrawDotNav();
	
	/* Scroll event handler */
    $(window).bind('scroll',function(e){
		redrawDotNav();
    });
    
	/* Next/prev and primary nav btn click handlers */
	$('a.laboratorio').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#laboratorio').offset().top
    	}, 1000, function() {
		});
    	return false;
	});
    $('a.progetti').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#progetti').offset().top
    	}, 1000, function() {
		});
    	return false;
    });
    $('a.geppetti').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#geppetti').offset().top
    	}, 1000, function() {
		});
    	return false;
    });
	$('a.contatti').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#contatti').offset().top
    	}, 1000, function() {
		});
    	return false;
    });
    
    /* Show/hide dot lav labels on hover */
    $('nav#primary a').hover(
    	function () {
			$(this).prev('h4').show();
		},
		function () {
			$(this).prev('h4').hide();
		}
    );
    
});

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =   $('#laboratorio').offset().top - (($('#progetti').offset().top - $('#laboratorio').offset().top) / 2);;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#progetti').offset().top - (($('#geppetti').offset().top - $('#progetti').offset().top) / 2);
	var section3Top =  $('#geppetti').offset().top - (($('#contatti').offset().top - $('#geppetti').offset().top) / 2);
	var section4Top =  $('#contatti').offset().top - (($(document).height() - $('#contatti').offset().top) / 2);;
	$('nav#primary a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.laboratorio').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.progetti').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.geppetti').addClass('active');
	} else if ($(document).scrollTop() >= section4Top){
		$('nav#primary a.contatti').addClass('active');
	}
	
}