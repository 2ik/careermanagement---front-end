/****************************************************************************************
 Design - Oleg Emshanov
 Developer - Ilya Kotlyakov
 Copyright 2017 Web-electron.com
 ***************************************************************************************/

 (function($){

 	"use strict";

 	$(window).resize(function () {
 		autoHeightFooter();
 	});

 	$(document).ready(function () {
 		multiLevelMenu();
 		mainSlider();
 		servicesSlider();
 		consultantSlider();
 		newsSlider();
 		reviewsSlider();
 		partnersSlider();
 		newsSectionSlider();
 		linkOpen();
 		autoHeightFooter();
 		teachHideShow();
 		practiceHideShow();
 		partnersHideShow();
 		otherCursSlider();
 		fancyboxGallery();
 		changeSpanModal();
 		ajaxPartner();
 		clickUp();
 	});

	/*--------------------------------------------------
 	Function fancybox gallery
 	---------------------------------------------------*/    	
 	function fancyboxGallery() {
 		$("[data-fancybox]").fancybox({
 			buttons : [
 		        //'slideShow',
 		        //'fullScreen',
 		        'thumbs',
 		        //'share',
 		        'download',
 		        //'zoom',
 		        'close'
 		        ]
 		    });
 	}

 	function changeSpanModal() {
 		$('[data-span]').on('click', function () {
 			var text = $(this).data('span');
 			$('#modal_1 .js-change--span').text(text);
 		});
 		$('#modal_1').on('hidden.bs.modal', function () {
 			$('#modal_1 .js-change--span').text('');
 		});

 	}

	/*--------------------------------------------------
 	Function ajax filter Partner
 	---------------------------------------------------*/ 
 	function ajaxPartner() {		
 		$('.submit_partner').on('click', function() {
 			$('html, body').animate({scrollTop: $('.search-result').offset().top -10}, 1000);
 			var form = '.'+$(this).data('form'),
 			result = '.'+$(this).data('result');

 			$.ajax({
 				data: $(form).serialize()
 			}).done(function(response) {
 				var response = $(response);
 				$(result).fadeOut(200);
 				setTimeout(function() {
 					$(result).html(response.find(result).html()).fadeIn(200);
 				}, 200);
 			});
 		});
 	}

 	/*--------------------------------------------------
 	Function click up
 	---------------------------------------------------*/ 
 	function clickUp() {
 		$(document).scroll(function () {
 			if ($(document).scrollTop() > 500)
 				$('.up').fadeIn();
 			else 
 				$('.up').fadeOut();
 		});
 		$(document).on('click', '.scroll', function(e){
 			e.preventDefault();
 			var id  = $(this).attr('href'),
 			top = $(id).offset().top;
 			$('body,html').animate({scrollTop: top}, 1000);
 		});
 	}

 	/*--------------------------------------------------
 	Function hide or show teacher
 	---------------------------------------------------*/    	
 	function teachHideShow() {
 		$('.teachers .teachers__section.corporate').hide();
 		$('[data-teacher]').on('click', function () {
 			$('.teachers .teachers__item').removeClass('active');
 			$(this).addClass('active');
 			var sectionOpen = $(this).data('teacher');
 			$('.teachers .teachers__section').hide();
 			$('.teachers .teachers__section.' + sectionOpen).fadeIn(900);
 		})
 	}

 	/*--------------------------------------------------
 	Function hide or show practice
 	---------------------------------------------------*/    	
 	function practiceHideShow() {
 		$('.practice .practice__section.corporate').hide();
 		$('[data-practice]').on('click', function () {
 			$('.practice .practice__item').removeClass('active');
 			$(this).addClass('active');
 			var sectionOpen = $(this).data('practice');
 			$('.practice .practice__section').hide();
 			$('.practice .practice__section.' + sectionOpen).fadeIn(900);
 		})
 	}

 	/*--------------------------------------------------
 	Function hide or show partners
 	---------------------------------------------------*/    	
 	function partnersHideShow() {
 		changePartnerTabsOnLoad();
 		$('[data-partners]').on('click', function () {
 			changePartnerTabs($(this).data('partners'));
 		});
 		
 	}
 	function changePartnerTabsOnLoad() {
 		let url = getURLParam(location.search, 'url');
 		if (url == 'consult' || url == 'company') {
 			changePartnerTabs(url);
 		}
 	}
 	function changePartnerTabs(id) {
 		history.pushState(null, null, '/partners/?url=' + id);
 		$('.partners .partners__item').removeClass('active');
 		$('[data-partners="' + id + '"]').addClass('active');
 		$('.partners .partners__section').hide();
 		$('.partners .partners__section.' + id).fadeIn(900);
 	}
 	function getURLParam(oTarget, sVar) {
 		return decodeURI(oTarget.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
 	}

	/*--------------------------------------------------
	Function height footer = mb body
	---------------------------------------------------*/   
	function autoHeightFooter() {
		var width=document.body.clientWidth;
		
		if (width>=992) {
			var footerHeight = $('footer').height()+100;
			if(!$('footer').hasClass('parall'))
				$('footer').addClass('parall');
			$('body').css('margin-bottom', footerHeight); 
		} else {
			$('footer').removeClass('parall');
			$('body').css('margin-bottom', 0);
		}
		
	}

	/*--------------------------------------------------
	Function multy level menu
	---------------------------------------------------*/   
	function multiLevelMenu() {
		$('#navbar ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			$(this).parent().siblings().removeClass('open');
			$(this).parent().toggleClass('open');
		});
	}

	/*--------------------------------------------------
	Function main slider
	---------------------------------------------------*/ 
	function mainSlider() {
		$('.slider').owlCarousel({
			loop:true,
			margin:10,
			//autoHeight:true,
			nav:true,
			dots:true,
			items:1,
			autoHeight: true,
			onInitialized: changeNavImage,
			onChanged: changeNavImage,
			navContainerClass: 'owl-nav nav-slit',
			navText: ['<a class="prev" href="javascript:void(0)"><span class="icon-wrap"><svg class="iconArr" width="22" height="22" viewBox="0 0 64 64"><path id="arrow-left-1" d="M46.077 55.738c0.858 0.867 0.858 2.266 0 3.133s-2.243 0.867-3.101 0l-25.056-25.302c-0.858-0.867-0.858-2.269 0-3.133l25.056-25.306c0.858-0.867 2.243-0.867 3.101 0s0.858 2.266 0 3.133l-22.848 23.738 22.848 23.738z" /></svg></span><div><h3></h3><img src="" alt=""/></div></a>','<a class="next" href="javascript:void(0)"><span class="icon-wrap"><svg class="iconArr" width="22" height="22" viewBox="0 0 64 64"><path id="arrow-right-1" d="M17.919 55.738c-0.858 0.867-0.858 2.266 0 3.133s2.243 0.867 3.101 0l25.056-25.302c0.858-0.867 0.858-2.269 0-3.133l-25.056-25.306c-0.858-0.867-2.243-0.867-3.101 0s-0.858 2.266 0 3.133l22.848 23.738-22.848 23.738z" /></svg></span><div><h3></h3><img src="" alt=""/></div></a>'],
		});
		function changeNavImage(e) {
			var current = e.item.index,
			sliderItem = $(e.target).find(".owl-item").eq(current).find('.slider__item'),
			prevImg = sliderItem.data('previmg'),
			nextImg = sliderItem.data('nextimg'),
			prevText = sliderItem.data('prevtext'),
			nextText = sliderItem.data('nexttext');

			$('.nav-slit .prev img').attr("src", prevImg);
			$('.nav-slit .next img').attr("src", nextImg);
			$('.nav-slit .prev h3').text(prevText);
			$('.nav-slit .next h3').text(nextText);
		}
		
	}

	/*--------------------------------------------------
	Function services Slider
	---------------------------------------------------*/ 
	function servicesSlider() {
		$('.services__carousel').owlCarousel({
			loop:true,
			margin:30,
			autoHeight:true,
			nav:true,
			dots:false,
			responsive:{
				0:{
					items:1
				},
				500:{
					items:2
				},
				992:{
					items:4
				}
			},
			navText: ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"><path fill-rule="evenodd"  stroke="rgb(153, 153, 153)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M13.319,25.993 L1.006,13.500 L13.319,1.006 "/></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"> <path fill-rule="evenodd" stroke="rgb(153, 153, 153)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M2.680,1.006 L14.993,13.500 L2.680,25.993 "/> </svg>'],
		});
	}

	/*--------------------------------------------------
	Function consultant Slider
	---------------------------------------------------*/ 
	function consultantSlider() {
		$('.consultant__carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:false,
			dots:true,
			items:1
		});
	}

	/*--------------------------------------------------
	Function news Slider
	---------------------------------------------------*/ 
	function newsSlider() {
		$('.news__carousel').owlCarousel({
			loop:true,
			margin:30,
			autoHeight:true,
			nav:true,
			dots:false,
			responsive:{
				0:{
					items:1
				},
				500:{
					items:2
				},
				992:{
					items:3
				}
			},
			navText: ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"><path fill-rule="evenodd"  stroke="rgb(153, 153, 153)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M13.319,25.993 L1.006,13.500 L13.319,1.006 "/></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"> <path fill-rule="evenodd" stroke="rgb(153, 153, 153)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M2.680,1.006 L14.993,13.500 L2.680,25.993 "/> </svg>'],
		});
	}

	/*--------------------------------------------------
	Function news Section Slider on practica
	---------------------------------------------------*/ 
	function newsSectionSlider() {
		$('.news__section--slider').owlCarousel({
			loop:true,
			margin:30,
			autoHeight:true,
			nav:true,
			dots:false,
			items:1,
			navText: ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"><path fill-rule="evenodd"  stroke="rgb(23, 62, 143)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M13.319,25.993 L1.006,13.500 L13.319,1.006 "/></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"> <path fill-rule="evenodd" stroke="rgb(23, 62, 143)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M2.680,1.006 L14.993,13.500 L2.680,25.993 "/> </svg>'],
		});
	}

	/*--------------------------------------------------
	Function to open a link without href
	---------------------------------------------------*/ 
	function linkOpen() {
		$('[data-url],[data-urlb]').on('mousedown', function(e){
			if ($(this).data('url') && e.which == 1) 
				window.open($(this).data('url'), '_self');
			else if ($(this).data('url') && e.which != 1)
				window.open($(this).data('url'));
			else
				window.open($(this).data('urlb'));
			return false;
		});
	}

	/*--------------------------------------------------
	Function reviews Slider
	---------------------------------------------------*/ 
	function reviewsSlider() {
		$('.reviews__carousel').owlCarousel({
			loop:true,
			margin:30,
			autoHeight:true,
			nav:true,
			dots:false,
			responsive:{
				0:{
					items:1
				},
				500:{
					items:2
				},
				992:{
					items:3
				}
			},
			navText: ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"> <path fill-rule="evenodd" stroke="rgb(255, 255, 255)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M13.319,25.993 L1.006,13.500 L13.319,1.006 "/> </svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"> <path fill-rule="evenodd" stroke="rgb(255, 255, 255)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M2.680,1.006 L14.993,13.500 L2.680,25.993 "/> </svg>'],
		});
	}

	/*--------------------------------------------------
	Function partners Slider
	---------------------------------------------------*/ 
	function partnersSlider() {
		$('.partners__carousel').owlCarousel({
			loop:true,
			margin:30,
			autoHeight:true,
			nav:true,
			dots:false,
			responsive:{
				0:{
					items:1
				},
				500:{
					items:2
				},
				992:{
					items:4
				}
			},
			navText: ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"><path fill-rule="evenodd"  stroke="rgb(153, 153, 153)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M13.319,25.993 L1.006,13.500 L13.319,1.006 "/></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"> <path fill-rule="evenodd" stroke="rgb(153, 153, 153)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M2.680,1.006 L14.993,13.500 L2.680,25.993 "/> </svg>'],
		});
	}

	/*--------------------------------------------------
	Function partners Slider
	---------------------------------------------------*/ 
	function otherCursSlider() {
		$('.other-curs__carousel').owlCarousel({
			loop:false,
			margin:30,
			autoHeight:true,
			nav:true,
			dots:false,
			responsive:{
				0:{
					items:1
				},
				500:{
					items:2
				},
				992:{
					items:4
				}
			},
			navText: ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"><path fill-rule="evenodd"  stroke="rgb(153, 153, 153)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M13.319,25.993 L1.006,13.500 L13.319,1.006 "/></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="28px"> <path fill-rule="evenodd" stroke="rgb(153, 153, 153)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none" d="M2.680,1.006 L14.993,13.500 L2.680,25.993 "/> </svg>'],
		});
	}


})(jQuery);

/*--------------------------------------------------
Function maps view
---------------------------------------------------*/    

function mapsView(zoom, id, arCity){

	let map, 
	geocoder, 
	infowindow, 
	markers = [],
	styledMapType = new google.maps.StyledMapType(
		[{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"on"},{"color":"#ff0000"},{"weight":2.22},{"hue":"#800c80"},{"saturation":56},{"lightness":-17},{"gamma":0.28}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"on"},{"color":"#ff0000"},{"weight":2.22},{"hue":"#800c80"},{"saturation":56},{"lightness":-17},{"gamma":0.28}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"color":"#f2e9f2"},{"weight":0.53},{"hue":"#9e959e"},{"saturation":40},{"lightness":29},{"gamma":1.82}]}],
		{name: 'Стилизованная карта'});

	runMap(zoom, id, arCity);

	setTimeout(function() {
		eventClickMarker();
	}, 2000);

	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');
	$('[data-partners]').on('click', function () {
		google.maps.event.trigger(map, "resize");
	});
	function runMap(zoom, id, arCity) {
		map = new google.maps.Map(document.getElementById(id), {
			zoom: zoom,
			center: {lat: 55, lng: 37},
			mapTypeControlOptions: {
				mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
			}
		});
		geocoder = new google.maps.Geocoder;
		infowindow = new google.maps.InfoWindow; 
		for (let i = 0; i < arCity.length; i++) {
			let city = arCity[i];
			geocode(city, i)
		}
	}
	function geocode(city, timeout) {
		geocoder.geocode({'address': city}, function(results, status) {
			if (status == 'OK') {
				map.setCenter(results[0].geometry.location);
				createMarker(results, timeout);
			} else {
				window.alert('Ошибка: ' + status);
			}
		});
	}
	function createMarker(results, timeout){
		setTimeout(function() {
			markers.push(new google.maps.Marker({
				position: results[0].geometry.location,
				map: map,
				icon: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwwQzE1My43NTUsMCw3MC41NzMsODMuMTgyLDcwLjU3MywxODUuNDI2YzAsMTI2Ljg4OCwxNjUuOTM5LDMxMy4xNjcsMTczLjAwNCwzMjEuMDM1ICAgIGM2LjYzNiw3LjM5MSwxOC4yMjIsNy4zNzgsMjQuODQ2LDBjNy4wNjUtNy44NjgsMTczLjAwNC0xOTQuMTQ3LDE3My4wMDQtMzIxLjAzNUM0NDEuNDI1LDgzLjE4MiwzNTguMjQ0LDAsMjU2LDB6IE0yNTYsMjc4LjcxOSAgICBjLTUxLjQ0MiwwLTkzLjI5Mi00MS44NTEtOTMuMjkyLTkzLjI5M1MyMDQuNTU5LDkyLjEzNCwyNTYsOTIuMTM0czkzLjI5MSw0MS44NTEsOTMuMjkxLDkzLjI5M1MzMDcuNDQxLDI3OC43MTksMjU2LDI3OC43MTl6IiBmaWxsPSIjMTczZThmIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==',
				animation: google.maps.Animation.DROP,
				title: results[0].formatted_address
			}));
		}, timeout * 200); 
	}
	function eventClickMarker(){
		if(markers.length > 0){
			let infowindow = [];
			for(let i=0; i < markers.length; i++){
				infowindow.push(new google.maps.InfoWindow({
					content: markers[i].title
				}));
				markers[i].addListener('click', function() {
					for(let i=0; i < infowindow.length; i++){
						infowindow[i].close();
					}
					map.panTo(markers[i].getPosition());
					infowindow[i].open(map, markers[i]);
				});
			}
		}
	}
}