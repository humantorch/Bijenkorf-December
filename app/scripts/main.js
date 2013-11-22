/*jslint browser: true, devel: true */
/*global imagesLoaded, Swiper, $, $$, log, PathAnimator, forEach*/

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
		sounds = document.getElementById('soundsprite'),
        soundData = {
            silence: {
                start: 0,
                length: 1.5
            },
            toot: {
                start: 3,
                length: 2
            },
            birdL: {
                start: 7,
                length: 0.9
            },
            birdM: {
                start: 9,
                length: 0.9
            },
            birdR: {
                start: 11,
                length: 0.9
            }
        };

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
				progress: false,
				noSwiping : true,
				onSlideChangeStart: function() {
					log($('.swiper-slide-active'));
				},
				onSlideChangeEnd: function() {
					[].forEach.call( $$('.supernova'), function(el) {
						el.classList.remove('nova');
					});
					setTimeout(function() {
						$('.swiper-slide-active .supernova').classList.add('nova');
					},1000);
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

            

            // hax to load sound file
            

            function soundkick() {
				console.log('soundkick');
                sounds.play();
                sounds.pause();
                document.removeEventListener(DOWN, soundkick);
            }


            document.addEventListener(DOWN, soundkick);



            /* BIRD ANIMATION */

			forEach.call($$('.bird-l, .bird-m, .bird-r'), function(v) {
				v.addEventListener(UP, function(e) {
					if (!sounds.paused) {
						sounds.pause();
					}
					setTimeout(function() {
						var birdsong = e.target.dataset.birdsong;
						e.target.classList.add('birdhop');
						setTimeout(function() {
							e.target.classList.remove('birdhop');
						},600);

						log(soundData[birdsong].start);
						sounds.currentTime = soundData[birdsong].start;
						sounds.play();

					
						sounds.addEventListener('timeupdate', function() {
							self.handler(birdsong);
						}, false);
					},1);
			    });
			});

			/* FLOWER ANIMATION */
			document.addEventListener(UP, function(e) {
				if (e.target.webkitMatchesSelector('.f-trigger') && !e.target.parentNode.classList.contains('sway')) {
					// e.target.parentNode.classList.remove('sway');
					[].forEach.call( $$('.flower'), function(flower) {
						flower.classList.add('sway');
					});
	                setTimeout(function() {
						[].forEach.call( $$('.flower'), function(flower) {
							flower.classList.remove('sway');
						});
	                },13050);
				}
            });

            /* TRAIN ANIMATION */

            document.addEventListener(UP, function(e) {
				if (e.target.webkitMatchesSelector('.toytrain')) {
	                self.toot(e.target);
	                sounds.currentTime = soundData.toot.start;
	                sounds.play();

					sounds.addEventListener('timeupdate', function() {
						self.handler('toot');
					}, false);
				}
            });


            /* NIJNTJE ANIMATION */
            $('.dome').addEventListener(UP, function() {
				$('.dome').classList.add('nijntjehop');
				// $('.nijnte').classList.add('nijntjehop');
				setTimeout(self.nijntjehop,750);
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

		handler: function(snd) {
		    if (sounds.currentTime >= soundData[snd].start + soundData[snd].length) {
		        sounds.pause();
		        sounds.removeEventListener('timeupdate', self.handler, false);
		    }
		},

        toot: function(e) {
			console.log(e);
			[].forEach.call($$('.toytrain, .backtrain'), function(el) {
				el.classList.add('toot');
			});
            console.log('tootstart');
            setTimeout(function() {
                [].forEach.call($$('.toytrain, .backtrain'), function(el) {
					el.classList.remove('toot');
				});
                console.log('tootend');
            }, 16250); //250ms longer than frontTrain animation sequence
        },

        birdhop: function() {
			console.log(this);
        },

        nijntjehop: function() {
			console.log('nijnthehop start');

			var path = 'M494.725,43.482c0,0-16.55-121.96-140.518-132.759 C106.793-110.828,93.863,468.482,93.863,468.482S82.656,296.069,1.621,296.069s-180.172,155.172-180.172,155.172',
			    pathAnimator = new PathAnimator( path ),    // initiate a new pathAnimator object
			    objToAnimate = document.getElementById('nijnte'),    // The object that will move along the path
			    speed = 1.9,          // seconds that will take going through the whole path
			    reverse = false,    // go back of forward along the path
			    startOffset = 0;    // between 0% to 100%
			    // easing = function(t){ t*(2-t); };    // optional easing function
			    
			

			function step( point, angle ){
			    // do something every "frame" with: point.x, point.y & angle
			    console.log(angle);
			    objToAnimate.style.cssText = 'top:' + point.y + 'px;' +
			                                'left:' + point.x + 'px;' +'';
			                                // 'transform:rotate('+ angle +'deg);' +
			                                // '-webkit-transform:rotate('+ angle +'deg);';
			}

			function finish(){
				// do something when animation is done
				console.log('nijntjehop complete');
			}

			pathAnimator.start( speed, step, reverse, startOffset, finish, function(t){  return Math.pow(t,1.5); });
        }
	};

    return self;
} (this, this.document));

