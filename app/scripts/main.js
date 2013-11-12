/*jslint browser: true, devel: true */
/*global imagesLoaded, Swiper, $, $$, log, PathAnimator*/

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
			// log('can i kick it');
			/* NON-IPAD WARNING*/

			// if (navigator.userAgent.match(/iPad/i) === null) {
			// 	alert('Please view this experience on an iPad or iOS Simulator.');
			// }

			/*INITIAL SETUP*/

			document.ontouchmove = function(e){ e.preventDefault(); }; // fix for swiping going all bendy-wendy

			var bodyswiper,
                $toytrain = document.getElementById('toytrain'),
                $backtrain = document.getElementById('backtrain');

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







            /* SOUND SETUP */
            var sounds = document.getElementById('soundsprite'),
                soundData = {
                    silence: {
                        start: 0,
                        length: 1.5
                    },
                    toot: {
                        start: 3,
                        length: 2
                    }
                };

            // hax to load sound file
            

            function soundkick() {
                sounds.play();
                sounds.pause();
                $('.womenswear1').removeEventListener(DOWN, soundkick);
            }


            $('.womenswear1').addEventListener(DOWN, soundkick);



            /* TRAIN ANIMATION */
            var imgs;

            $('#toytrain').addEventListener(UP, function() {
                self.toot();
                sounds.currentTime = soundData.toot.start;
                sounds.play();
                imgs = $$('.toot');

                for ( var i = 0; i < imgs.length; i++ ) {
                    imgs[i].onclick = toggleAnimation;
                    // imgs[i].style.webkitAnimationPlayState = 'running';
                }
            });


            /* NIJNTJE ANIMATION */
            $('.dome').addEventListener(UP, function() {
				$('.dome').classList.add('nijntjehop');
				// $('.nijnte').classList.add('nijntjehop');
				setTimeout(self.nijntjehop,750);
            });
            

            



            function toggleAnimation() {
                console.log('toggleAnimation');
                var style;
                for ( var i = 0; i < imgs.length; i++ ) {
                    style = imgs[i].style;
                    console.log(style.webkitAnimationPlayState, i);
                    if ( style.webkitAnimationPlayState === 'running' ) {
                        style.webkitAnimationPlayState = 'paused';
                        // document.body.className = 'paused';
                    } else {
                        style.webkitAnimationPlayState = 'running';
                        // document.body.className = '';       
                    }
                }
            }

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
		},

        toot: function() {
            $('#toytrain').classList.add('toot');
            $('#backtrain').classList.add('toot');
            setTimeout(function() {
                $('#toytrain').classList.remove('toot');
                $('#backtrain').classList.remove('toot');
            }, 11000);
        },

        nijntjehop: function() {
			console.log('nijnthehop start');

			var path = 'M491.725,42.482c0,0-16.55-121.96-140.518-132.759 C103.793-111.828,90.863,467.482,90.863,467.482S79.656,295.069-1.379,295.069s-180.172,155.172-180.172,155.172',
			    pathAnimator = new PathAnimator( path ),    // initiate a new pathAnimator object
			    objToAnimate = document.getElementById('nijnte'),    // The object that will move along the path
			    speed = 3,          // seconds that will take going through the whole path
			    reverse = false,    // go back of forward along the path
			    startOffset = 0;    // between 0% to 100%
			    
			

			function step( point, angle ){
			    // do something every "frame" with: point.x, point.y & angle
			    objToAnimate.style.cssText = 'top:' + point.y + 'px;' +
			                                'left:' + point.x + 'px;';
			}

			function finish(){
				// do something when animation is done
				console.log('nijntjehop complete');
			}

			pathAnimator.start( speed, step, reverse, startOffset, finish);
        }
	};

    return self;
} (this, this.document));

