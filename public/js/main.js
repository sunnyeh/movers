"use strict";
jQuery(document).on('ready', function() {
	/* -------------------------------------
			TITL EFFECT
	-------------------------------------- */
	var _tg_bannercontent = jQuery(".tg-homebanner .tg-bannercontent")
	_tg_bannercontent.tilt({
		perspective: 1000,
	});
	/* -------------------------------------
			SCROLL NAV
	-------------------------------------- */
	var body = jQuery('body');
	if(body.hasClass('tg-home')){
		body.addClass("home");
		jQuery(window).on('scroll', function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll >= 10) {
				jQuery("#tg-header").addClass("single-page-nav");
			}else {
				jQuery("#tg-header").removeClass("single-page-nav");
			}
		});
	}
	// var _tg_navigation = jQuery('.tg-navigation');
	// _tg_navigation.singlePageNav({
	// 	updateHash: false,
	// 	offset: 90,
	// 	filter: ':not(.external)',
	// });
	var _tg_btnscrolltop = jQuery("#tg-btnscrolltop");
	_tg_btnscrolltop.on('click', function(){
		var _scrollUp = jQuery('html, body');
		_scrollUp.animate({ scrollTop: 0 }, 'slow');
	})
	/* -------------------------------------
			HOME BANNER SLIDER
	-------------------------------------- */
	var _tg_homeslider = jQuery("#tg-homeslider")
	_tg_homeslider.owlCarousel({
		items:1,
		loop:true,
		nav:true,
		autoplay:false,
		navText: [
			'<i class="icon-chevron-left"></i><span>prev</span>',
			'<i class="icon-chevron-right"></i><span>next</span>',
			],
			navClass: [
				'tg-btnprev',
				'tg-btnnext'
			],
	});
	/*------------------------------------------
			SIDE NAVIGATION
	------------------------------------------*/
	var _tg_btnopenclose = jQuery('.tg-btnopenclose');
	_tg_btnopenclose.on('click', function () {
		jQuery('#tg-wrapper').toggleClass('tg-sidenavshow');
		if( jQuery('#tg-wrapper').hasClass('tg-sidenavshow') ){
			jQuery('body').addClass('spread-overlay');
			return true;
		}
		jQuery('body').removeClass('spread-overlay');
	});
	var _tg_close = jQuery('.tg-close');
	_tg_close.on('click', function () {
		jQuery('#tg-wrapper').toggleClass('tg-sidenavshow');
		if( jQuery('#tg-wrapper').hasClass('tg-sidenavshow') ){
			jQuery('body').addClass('spread-overlay');
			return true;
		}
		jQuery('body').removeClass('spread-overlay');
	});
	/* -------------------------------------
			TESTIMONIAL SLIDER
	-------------------------------------- */
	var _tg_testimonialslider = jQuery("#tg-testimonialslider")
	_tg_testimonialslider.owlCarousel({
		items:1,
		loop:true,
		nav:false,
		animateIn: "fadeIn",
		autoplay:false
	});
	var _tg_bannerslider = jQuery(".banner-slider.owl-carousel")
	_tg_bannerslider.owlCarousel({
		items:1,
		loop:true,
		nav:false,
		animateIn: "fadeIn",
		autoplay:false
	});
	/* -------------------------------------
			TESTIMONIAL SLIDER
	-------------------------------------- */
	var _tg_eventspeakerslider = jQuery("#tg-eventspeakerslider")
	_tg_eventspeakerslider.owlCarousel({
		loop:true,
		nav:false,
		animateIn: "fadeIn",
		autoplay:true,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
			},
			480:{
				items:2,
			},
			768:{
				items:3,
			},
			992:{
				items:4,
			}
		}
	});
	/* -------------------------------------
			THEME ACCORDION
	-------------------------------------- */
	function themeAccordion() {
		jQuery('.tg-panelcontent').hide();
		jQuery('.tg-accordion h4:first').addClass('active').next().slideDown('slow');
		jQuery('.tg-accordion h4').on('click',function() {
			if(jQuery(this).next().is(':hidden')) {
				jQuery('.tg-accordion h4').removeClass('active').next().slideUp('slow');
				jQuery(this).toggleClass('active').next().slideDown('slow');
			}
		});
	}
	themeAccordion();
	/* -------------------------------------
			Google Map
	-------------------------------------- */
	// var _tg_locationmap = jQuery("#tg-locationmap");
	// _tg_locationmap.gmap3({
	// 	marker: {
	// 		address: "1600 Elizabeth St, Melbourne, Victoria, Australia",
	// 		options: {
	// 			title: "Event Orgnizer",
	// 			icon: "images/map-marker.png",
	// 		}
	// 	},
	// 	map: {
	// 		options: {
	// 			zoom: 16,
	// 			scrollwheel: false,
	// 			disableDoubleClickZoom: true,
	// 		}
	// 	}
	// });
	/* -------------------------------------
			TESTIMONIALS SLIDER
	-------------------------------------- */
	function testimonialSlider(){
		var sync1 = jQuery('.tg-galleryslider');
		var sync2 = jQuery('.tg-gallerthumbslider');
		var slidesPerPage = 1;
		var syncedSecondary = true;
		sync1.owlCarousel({
			items : 1,
			loop: true,
			nav: false,
			dots: false,
			autoplay: false,
			slideSpeed : 2000,
			responsiveRefreshRate : 200,
		}).on('changed.owl.carousel', syncPosition);
		sync2.on('initialized.owl.carousel', function () {
			sync2.find(".owl-item").eq(0).addClass("current");
		})
		.owlCarousel({
			items : slidesPerPage,
			dots: false,
			nav: true,
			smartSpeed: 200,
			slideSpeed : 500,
			slideBy: slidesPerPage,
			responsiveRefreshRate : 100,
			navText: [
			'<i class="icon-chevron-left"></i><span>prev</span>',
			'<i class="icon-chevron-right"></i><span>next</span>',
			],
			navClass: [
				'tg-btnprev',
				'tg-btnnext'
			],
		}).on('changed.owl.carousel', syncPosition2);
		function syncPosition(el) {
			var count = el.item.count-1;
			var current = Math.round(el.item.index - (el.item.count/2) - .5);
			if(current < 0) {
				current = count;
			}
			if(current > count) {
				current = 0;
			}
			sync2
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current")
			var onscreen = sync2.find('.owl-item.active').length - 1;
			var start = sync2.find('.owl-item.active').first().index();
			var end = sync2.find('.owl-item.active').last().index();
			if (current > end) {
				sync2.data('owl.carousel').to(current, 100, true);
			}
			if (current < start) {
				sync2.data('owl.carousel').to(current - onscreen, 100, true);
			}
		}
		function syncPosition2(el) {
			if(syncedSecondary) {
				var number = el.item.index;
				sync1.data('owl.carousel').to(number, 100, true);
			}
		}
		sync2.on("click", ".owl-item", function(e){
			e.preventDefault();
			var number = jQuery(this).index();
			sync1.data('owl.carousel').to(number, 300, true);
		});
	}
	testimonialSlider();
	/* -------------------------------------
			PHOTO SWIPE
	-------------------------------------- */
	var initPhotoSwipeFromDOM = function(gallerySelector) {
		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes, numNodes = thumbElements.length, items = [], figureEl, linkEl, size, item;
			for(var i = 0; i < numNodes; i++) {
				figureEl = thumbElements[i];
				if(figureEl.nodeType !== 1) {
					continue;
				}
				linkEl = figureEl.children[0]; // <a> element
				size = linkEl.getAttribute('data-size').split('x');
				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};
				if(figureEl.children.length > 1) {
					item.title = figureEl.children[1].innerHTML; 
				}
				if(linkEl.children.length > 0) {
					item.msrc = linkEl.children[0].getAttribute('src');
				}
				item.el = figureEl;
				items.push(item);
			}
			return items;
		};
		var closest = function closest(el, fn) {
			return el && ( fn(el) ? el : closest(el.parentNode, fn) );
		};
		var onThumbnailsClick = function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			var eTarget = e.target || e.srcElement;
			var clickedListItem = closest(eTarget, function(el) {
				return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
			});
			if(!clickedListItem) {
				return;
			}
			var clickedGallery = clickedListItem.parentNode, childNodes = clickedListItem.parentNode.childNodes, numChildNodes = childNodes.length, nodeIndex = 0, index;
			for (var i = 0; i < numChildNodes; i++) {
				if(childNodes[i].nodeType !== 1) { 
					continue; 
				}
				if(childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}
			if(index >= 0) {
				openPhotoSwipe( index, clickedGallery );
			}
			return false;
		};
		var photoswipeParseHash = function() {
			var hash = window.location.hash.substring(1),
			params = {};
			if(hash.length < 5) {
				return params;
			}
			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if(!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');
				if(pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}
			if(params.gid) {
				params.gid = parseInt(params.gid, 10);
			}
			return params;
		};
		var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
			var pswpElement = document.querySelectorAll('.pswp')[0], gallery, options, items;
			items = parseThumbnailElements(galleryElement);
			options = {
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),
				getThumbBoundsFn: function(index) {
					var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect(); 
					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
				}
			};
			if(fromURL) {
				if(options.galleryPIDs) {
					for(var j = 0; j < items.length; j++) {
						if(items[j].pid == index) {
							options.index = j;
							break;
						}
					}
				} else {
					options.index = parseInt(index, 10) - 1;
				}
			} else {
				options.index = parseInt(index, 10);
			}
			if( isNaN(options.index) ) {
				return;
			}
			if(disableAnimation) {
				options.showAnimationDuration = 0;
			}
			gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};
		var galleryElements = document.querySelectorAll( gallerySelector );
		for(var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i+1);
			galleryElements[i].onclick = onThumbnailsClick;
		}
		var hashData = photoswipeParseHash();
		if(hashData.pid && hashData.gid) {
			openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
		}
	};
	initPhotoSwipeFromDOM('.my-gallery');
	/* -------------------------------------
			STICKY HEADER
	-------------------------------------- */
	jQuery(window).on('scroll', function() {
		var scroll = jQuery(window).scrollTop();
		if (scroll >= 900) {
			jQuery('.tg-header.tg-headervthree').addClass('tg-showheader');
		} else {
			jQuery('.tg-header.tg-headervthree').removeClass('tg-showheader');
		}
	});
	/* -------------------------------------
			PRETTY PHOTO GALLERY
	-------------------------------------- */
	jQuery("a[data-rel]").each(function () {
		jQuery(this).attr("rel", jQuery(this).data("rel"));
	});
	jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
		animation_speed: 'normal',
		theme: 'dark_square',
		slideshow: 3000,
		autoplay_slideshow: false,
		social_tools: false
	});
	/* -------------------------------------
			THEME TOOLTIP
	-------------------------------------- */
	jQuery('[data-toggle="tooltip"]').tooltip()
});

$('.counter-count>b').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 5000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

var mailExp= /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  var phoneExp= /^[0-9]+$/;
  $(".enquiry-form").on('submit',(function(e) {
    e.preventDefault();   
    var flag = 0;
    var formData = new FormData(this);
    var This = this;
    function alartMsg(_this,_msg,_type){
      // console.log($(_this).offset().top-100);
      $('body, html').animate({scrollTop: $(_this).offset().top-150});
      $(_this).parent().find("div.alert").removeClass('alert-success').removeClass('alert-danger');
      $(_this).parent().find("div.alert").html(_msg).addClass((_type=="success")?'alert-success':'alert-danger').removeClass('hidden');
      setTimeout(function(){ $(_this).parent().find("div.alert").addClass('hidden'); }, 5000);
    }
    // alartMsg(This,"hello","danger");

    if(formData.get('name') == '' || formData.get('name') == null || formData.get('name') == 'Type Your Name'){
        alartMsg(This,"Please enter your name.","danger");
        flag=0;
        return false;
    } else {
        flag=1;
    }
    if(formData.get('email') == '' || formData.get('email') == null || formData.get('email') == 'Type Your Email'){
        alartMsg(This,"Please enter your email id.","danger");
        flag=0;
        return false;
    } else {
        if(mailExp.test(formData.get('email')))
        {
            flag=1;
        }
        else{
            alartMsg(This,"Please enter valid email id.","danger");
            flag=0;
            return false;
        }
    }
    if(formData.get('phone') == '' || formData.get('phone') == null || formData.get('phone') == 'Type Your Phone no'){
        alartMsg(This,"Please enter your phone no.","danger");
        flag=0;
        return false;
    } else {
        if(phoneExp.test(formData.get('phone')))
        {
            flag=1;
        }
        else{
            alartMsg(This,"Please enter valid phone no.","danger");
            flag=0;
            return false;
        }
    }
    if(formData.get('message') == '' || formData.get('message') == null || formData.get('message') == 'Type Your Message'){
        alartMsg(This,"Please enter message.","danger");
        flag=0;
        return false;
    } else {
        flag=1;
    }

    if(flag==1){
      $.ajax({
        url: "/enquiry", // Url to which the request is send
        type: "POST",             // Type of request to be send, called as method
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(responce)   // A function to be called if request succeeds
        {
          // console.log(responce);
          if(responce.status){
            alartMsg(This,responce.message,"success");
            $(This).trigger("reset");
          } else {
            alartMsg(This,"There is server error please try again later.","danger");
          }
        }
      });
    }
  }));

  $("#subscribe-form").on('submit',(function(e) {
    e.preventDefault();   
    var flag = 0;
    var formData = new FormData(this);
    var This = this;
    function alartMsg(_this,_msg,_type){
      // console.log($(_this).offset().top-100);
      $('body, html').animate({scrollTop: $(_this).offset().top});
      $(_this).parent().find("div.alert").removeClass('alert-success').removeClass('alert-danger');
      $(_this).parent().find("div.alert").html(_msg).addClass((_type=="success")?'alert-success':'alert-danger').removeClass('hidden');
      setTimeout(function(){ $(_this).parent().find("div.alert").addClass('hidden'); }, 5000);
    }
    if(formData.get('email') == '' || formData.get('email') == null || formData.get('email') == 'Type your email'){
        alartMsg(This,"Please enter your email id.","danger");
        flag=0;
        return false;
    } else {
        if(mailExp.test(formData.get('email')))
        {
            flag=1;
        }
        else{
            alartMsg(This,"Please enter valid email id.","danger");
            flag=0;
            return false;
        }
    }

    if(flag==1){
      $.ajax({
        url: "/subscription", // Url to which the request is send
        type: "POST",             // Type of request to be send, called as method
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(responce)   // A function to be called if request succeeds
        {
          // console.log(responce);
          if(responce.status){
            alartMsg(This,responce.message,"success");
            $(This).trigger("reset");
          } else {
            alartMsg(This,responce.message,"danger");
          }
        }
      });
    }
  }));

  // $("#enquiry-form").on("click",function(e){
  //   var This =this;
  //   $("#enquery-model form input[name='for_e']").val($(This).data("from"));
  //   console.log($(This).data("from"))
  // })

 $(".enquiry-btn").on("click",function(e){
    var This =this;
    $("#enquery-model .modal-title").html($(This).data("from")+" Enquiry");
    $("#enquery-model form input[name='for_e']").val($(This).data("from"));
    $("#enquery-model").modal('show');
    console.log($(This).data("from"))
  })