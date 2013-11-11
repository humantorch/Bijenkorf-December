/*jslint browser: true, devel: true */
/*global imagesLoaded, Swiper, $, $$, log*/

var BKF = BKF || {};

BKF.Global = (function (window, document, undefined) {

	'use strict';
    function touch() {
        return ('ontouchstart' in window) ? true : false;
    }

    var DOWN = touch() === false ? 'mousedown' : 'touchstart',
		UP = touch() === false ? 'mouseup' : 'touchend',
		$body = $('body'),
		self;

	self = {

        kickit: function() {
			log('can i kick it');
			/* NON-IPAD WARNING*/

			// if (navigator.userAgent.match(/iPad/i) === null) {
			// 	alert('Please view this experience on an iPad or iOS Simulator.');
			// }

			/*INITIAL SETUP*/

			document.ontouchmove = function(e){ e.preventDefault(); }; // fix for swiping going all bendy-wendy

			var bodyswiper;

			// self.randomizeList('randTarget');

			bodyswiper = new Swiper(document.body,{
				mode: 'horizontal',
				speed: 500,
				slideVisibleClass: 'active',
				loop: true,
				progress: false,
				onSlideChangeStart: function() {
					log('bodyswipestart');
				},
				onSlideChangeEnd: function() {
					/* KEEP THESE, THEY MAY BE USEFUL LATER */
					$('.storefront iframe').src = $('.active').dataset.shopurl;
					// $('.shop').classList.remove('fadeIn');
					// setTimeout(function() {
					// 	$('.shop').classList.remove('visuallyhidden');
					// },500);
					log('bodyswipeend');
					$('body').scrollLeft = 0;
				}
				// },
				// onProgressChange: function(swiper){
				// 	for (var i = 0; i < swiper.slides.length; i++){
				// 		var slide = swiper.slides[i];
				// 		var progress = slide.progress;
				// 		swiper.setTransform(slide,'translate3d(0px,0,'+(-Math.abs(progress*1500))+'px)');
				// 	}
				// },
				// onTouchStart:function(swiper){
				// 	for (var i = 0; i < swiper.slides.length; i++){
				// 		swiper.setTransition(swiper.slides[i], 0);
				// 	}
				// },
				// onSetWrapperTransition: function(swiper) {
				// 	for (var i = 0; i < swiper.slides.length; i++){
				// 		swiper.setTransition(swiper.slides[i], swiper.params.speed);
				// 	}
				// }
			});

			/*EVENT LISTENERS*/

			// show & hide shop iframe
			$('.shop').addEventListener(UP ,function() {
				$('.storefront').classList.add('fadeIn');
				$('.storefront').classList.add('shown');
			});

			$('.closebtn').addEventListener(UP, function() {
				$('.storefront').classList.remove('fadeIn');
				setTimeout(function() {
					$('.storefront').classList.remove('shown');
				},500);
			});



			/*KICK OUT THE JAMS*/
			imagesLoaded($('.imagesloaded'), function() {
				self.contshow();
			});

        },

        contshow: function() {
			$body.classList.add('loaded');
			$('.storefront iframe').src = $('.active').dataset.shopurl;
        },

        randomizeList: function(target) {
		    var list = document.getElementById(target),
		        nodes = list.children,
		        i = 0;

		    nodes = Array.prototype.slice.call(nodes);
		    // nodes = randomizeItems(nodes);

		    var cached = nodes.slice(0),
		        temp,
		        ii = cached.length,
		        rand;
		        
		    while(--ii) {
		        rand = Math.floor(ii * Math.random());
		        temp = cached[rand];
		        cached[rand] = cached[ii];
		        cached[ii] = temp;
		    }


		    nodes = cached;



		    while(i < nodes.length) {
		        list.appendChild(nodes[i]);
		        ++i;
		    }
		    list.style.display='block';
		}
	};

    return self;
} (this, this.document));

