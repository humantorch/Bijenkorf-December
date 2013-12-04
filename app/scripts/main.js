/*jslint browser: true, devel: true */
/*global imagesLoaded, Swiper, $, $$, log, PathAnimator, Howl */

var BKF = BKF || {};

BKF.Global = (function (window, document, undefined) {

	'use strict';
    function touch() {
        return ('ontouchstart' in window) ? true : false;
    }

    var DOWN = touch() === false ? 'mousedown' : 'touchstart',
		UP = touch() === false ? 'mouseup' : 'touchend',
		$body = $('body'),
		self,
		howl = new Howl({
			urls: ['audio/bkf.dec.track.mp3'],
			sprite: {
				toot: [0,11500],
				birdL: [15000,2000],
				birdM: [30000,2000],
				birdR: [45000,2000],
				chimes: [60000,10000],
				boing: [75000, 3000]
			}
		}),
		miffytimer, flowertimer;

	self = {

        kickit: function() {
			// log('can i kick it');
			/* NON-IPAD WARNING*/

			// if (navigator.userAgent.match(/iPad/i) === null) {
			// 	alert('Please view this experience on an iPad or iOS Simulator.');
			// }

			/*INITIAL SETUP*/

			document.ontouchmove = function(e){ e.preventDefault(); }; // fix for swiping going all bendy-wendy

			var bodyswiper;

			bodyswiper = new Swiper(document.body,{
				mode: 'horizontal',
				speed: 500,
				slideVisibleClass: 'active',
				loop: true,
				noSwiping : true,
				onSlideChangeEnd: function() {

					[].forEach.call( $$('.supernova'), function(el) {
						el.classList.remove('nova');
						el.classList.remove('fadeOut');
					});
					[].forEach.call( $$('.dome-anim'), function(el) {
						el.classList.remove('nijntjehop');
						el.removeAttribute('style');
					});

					setTimeout(function() {
						$('.swiper-slide-active .supernova').classList.add('nova');
					},100);
					
					$('.storefront iframe').src = $('.active').dataset.shopurl;

					[].forEach.call( $$('.flower'), function(flower) {
						flower.classList.remove('sway');
						$('.active .supernova').classList.remove('fadeOut');
					});

					clearTimeout(flowertimer);
					clearTimeout(miffytimer);

					$('.nijnte').classList.remove('backinplace');
					$('.nijnte').classList.remove('offsettop');
					$('.dome').classList.remove('nijntjehop');

					$('body').scrollLeft = 0;
				}
			});

			/*EVENT LISTENERS*/

			// show & hide shop iframe

			[].forEach.call( document.querySelectorAll('button'), function(el) {
				el.addEventListener(UP, function() {
					$('.storefront').classList.add('fadeIn');
					$('.storefront').classList.add('shown');
				}, false);
			});

			$('.closebtn').addEventListener(UP, function() {
				$('.storefront').classList.remove('fadeIn');
				setTimeout(function() {
					$('.storefront').classList.remove('shown');
				},500);
			});

			/* BIRD ANIMATION */
			document.addEventListener(DOWN, function(e) {
				if (e.target.webkitMatchesSelector('.bird')) {
					var birdsong = e.target.dataset.birdsong;
					// console.log(birdsong);
					e.target.classList.add('birdhop');
					howl.play(birdsong);
					setTimeout(function() {
						e.target.classList.remove('birdhop');
					},600);
				}
			});

			/* FLOWER ANIMATION */
			document.addEventListener(DOWN, function(e) {
				if (e.target.webkitMatchesSelector('.f-trigger') && !e.target.parentNode.classList.contains('sway')) {
					// e.target.parentNode.classList.remove('sway');
					$('.active .supernova').classList.add('fadeOut');
					[].forEach.call( $$('.flower'), function(flower) {
						flower.classList.add('sway');
					});
					howl.play('chimes');
	                flowertimer = setTimeout(function() {
						[].forEach.call( $$('.flower'), function(flower) {
							flower.classList.remove('sway');
							$('.active .supernova').classList.remove('fadeOut');
						});
	                },13050);
				}
            });

            /* TRAIN ANIMATION */
            document.addEventListener(DOWN, function(e) {
				if (e.target.webkitMatchesSelector('.toytrain') && !e.target.classList.contains('toot')) {
					$('.active .supernova').classList.add('fadeOut');
	                self.toot(e.target);
	                howl.play('toot');
				}
            });


            /* NIJNTJE ANIMATION */
            $('.dome').addEventListener(DOWN, function() {
				// sounds.removeEventListener('timeupdate', self.handler, false);
				$('.dome').classList.add('nijntjehop');
				
				// $('.nijnte').classList.add('nijntjehop');
				setTimeout(function() {
					self.nijntjehop();
					howl.play('boing');
				},750);
            });

			/*KICK OUT THE JAMS*/
			imagesLoaded($('.imagesloaded'), function() {
				self.contshow();
			});

            

        },

        contshow: function() {
			$body.classList.add('loaded');
			$('.storefront iframe').src = $('.active').dataset.shopurl;
			setTimeout(function() {
				$('.swiper-slide-active .supernova').classList.add('nova');
			},400);
        },

        toot: function(e) {
			// console.log(e.nextSibling);
			[].forEach.call($$('.toytrain, .backtrain'), function(el) {
				el.classList.add('toot');
			});
            // console.log('tootstart');
            setTimeout(function() {
                [].forEach.call($$('.toytrain, .backtrain'), function(el) {
					el.classList.remove('toot');
				});
                $('.active .supernova').classList.remove('fadeOut');
            }, 16250); //250ms longer than frontTrain animation sequence
        },

        birdhop: function() {
			// console.log(this);
        },

        nijntjehop: function() {
			// console.log('nijnthehop start');
			$('.active .supernova').classList.add('fadeOut');

			var path = 'M494.725,43.482c0,0-16.55-121.96-140.518-132.759 C106.793-110.828,93.863,468.482,93.863,468.482S82.656,296.069,1.621,296.069s-180.172,155.172-180.172,155.172',
			    pathAnimator = new PathAnimator( path ),    // initiate a new pathAnimator object
			    objToAnimate = document.getElementById('nijnte'),    // The object that will move along the path
			    speed = 1.9,          // seconds that will take going through the whole path
			    reverse = false,    // go back of forward along the path
			    startOffset = 0;    // between 0% to 100%
			    // easing = function(t){ t*(2-t); };    // optional easing function
			    
			function step(point){
			    // do something every "frame" with: point.x, point.y & angle
			    objToAnimate.style.cssText = 'top:' + point.y + 'px;' +
			                                'left:' + point.x + 'px;' +'';
			                                // 'transform:rotate('+ angle +'deg);' +
			                                // '-webkit-transform:rotate('+ angle +'deg);';
			}

			function finish(){
				$('.nijnte').removeAttribute('style');
				$('.nijnte').classList.add('offsettop');
				miffytimer = setTimeout(function() {
					// pathAnimator.start( speed, step, true, 100, self.fixmiffy, function(t){  return Math.pow(t,1.5); });
					self.fixmiffy();
				},5000);
				
				// console.log('nijntjehop complete');
			}

			pathAnimator.start( speed, step, reverse, startOffset, finish, function(t){  return Math.pow(t,1.5); });
        },

        fixmiffy: function() {
			$('.nijnte').classList.add('backinplace');
			setTimeout(function() {
				$('.nijnte').classList.remove('backinplace');
				$('.nijnte').classList.remove('offsettop');
				$('.dome').classList.remove('nijntjehop');
				$('.active .supernova').classList.remove('fadeOut');
			},1000);
		}
	};

    return self;
} (this, this.document));

