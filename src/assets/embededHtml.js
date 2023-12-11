export default `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
        <script src="file:///android_asset/dist/epub.js"></script>
        <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/detect_swipe/2.1.1/jquery.detect_swipe.min.js"></script>


</head>

<style>
body {
    margin: 0;

  }
    
  #viewer.spreads {
	width: 100vw;
	height: 100vh;
	/* background: white url('ajax-loader.gif') center center no-repeat; */
  }
  
  #viewer.spreads .epub-view > iframe {
      /* background: white; */
  }

  * {
  -webkit-user-select: none;
  -webkit-touch-callout: none; 
}

  

</style>
<body>
	<div id="viewer" class="spreads"></div>
</body>
<script>

	//alert('dddddddddd'+window.BOOK_PATH);
	window.book = ePub(window.BOOK_PATH);
	
	window.rendition = window.book.renderTo(document.getElementById('viewer'), {
		width: '100%',
		height: '100%',
		manager: "continuous",
		flow: "paginated",
		snap: true,
		minSpreadWidth: 3999
	});

	window.rendition.on('started', (e) => {
		
		window.ReactNativeWebView.postMessage(
			JSON.stringify({ type: 'isLoading', isLoading: true })
		);
		//window.rendition.display(window.BOOK_LOCATION);

		
		window.rendition.themes.register({ theme: window.THEME });
		window.rendition.themes.select('theme');
	});

	window.rendition.on('displayed', (e) => {
		if (window.LOCATIONS) {
			window.book.locations.load(window.LOCATIONS);
		} else {
			window.book.ready.then(() => {
				window.book.locations.generate(800).then(() => {
					window.ReactNativeWebView.postMessage(
						JSON.stringify({
							type: 'locations',
							locations: window.book.locations.save(),
							totalPages: window.book.locations.length(),
							isLoading: false
						})
					);
				});
			});
			window.ReactNativeWebView.postMessage(JSON.stringify({
				type: 'flag',
				flag: "Calculou de novo",
			}));
		}
        
	});
	window.rendition.display(window.BOOK_LOCATION);
    

	window.rendition.on('relocated', function (e) {
		window.ReactNativeWebView.postMessage(JSON.stringify({
			type: 'loc',
			cfi: e.start.cfi,
			progress: e.start.location,
			teste: e,
			currentLocation:rendition.currentLocation().end.cfi,
			cur:rendition.currentLocation()
		}));
	});

   	window.rendition.on("selected", function (cfiRange, contents) {

        //alert("select")

		window.book.getRange(cfiRange).then((range) => {
			let text = range.toString();

			window.ReactNativeWebView.postMessage(
				JSON.stringify({ type: 'highlight', data: { cfi: cfiRange, text, data: "" } })
			);
			contents.window.getSelection().removeAllRanges();
		});
	});   


	window.rendition.on("markClicked", function (cfiRange, data, contents) {
        preventTap = true;
		window.book.getRange(cfiRange).then((range) => {
			//window.book.getRange("epubcfi(/6/10[ch5]!/4/4,/1:3,/1:466)").then((range) => {
			let text = range.toString();
			//alert(text);
			let newData = Object.assign({}, data, { text });

			window.ReactNativeWebView.postMessage(
				JSON.stringify({ type: 'highlightClicked', data: newData, cfiRange:cfiRange})
			);
		});
	});


	$("a").on("click", function (e) {
		alert("INFERNO");
		e.preventDefault();
		window.ReactNativeWebView.postMessage(JSON.stringify({
			type: 'flag',
			flag: "Fora bolsonaro",
		}));
	});

	$("#viewer").on('click',function(e){
		e.preventDefault();
		//alert("viewer click");
		window.ReactNativeWebView.postMessage(
			JSON.stringify({ type: 'bodyClick' })
		);

		
	});

/*     this.rendition.hooks.register('beforeChapterDisplay').pageAnimation = function (callback, renderer) {
        alert("diallll");
        window.setTimeout(function () {
            var style = renderer.doc.createElement("style");
            style.innerHTML = "*{-webkit-transition: transform {t} ease;-moz-transition: tranform {t} ease;-o-transition: transform {t} ease;-ms-transition: transform {t} ease;transition: transform {t} ease;}";
            style.innerHTML = style.innerHTML.split("{t}").join("0.5s");
            renderer.doc.body.appendChild(style);
        }, 100)
        if (callback) {
            callback();
        }
    }; */



    this.rendition.hooks.content.register(async (contents, view) => {
		

        const doc = contents.document;

        const body = doc.getElementsByTagName("body");

        const c = this.rendition.currentLocation();

        const section = await this.book.spine.get(c.start.cfi);


        for (let i = 0; i < body.length; i++) {
            body[i].addEventListener("click", (e) => {
                //alert('CLICK: '+ e);
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({ type: 'bodyClicked' })
                );

            }, false);
        }


    }); 


	this.rendition.hooks.content.register(function(contents, rendition) {


		var contents;
		var targetOrigin = "*";

		var preventTap = false;
		var q = [];
		var _isReady = false;

		var book;
		var rendition;

		var minSpreadWidth = 800;
		var axis = "horizontal";

		var isChrome = /Chrome/.test(navigator.userAgent);
		var isWebkit = !isChrome && /AppleWebKit/.test(navigator.userAgent);

		var snapWidth = window.innerWidth;
		var last_known_scroll_position = 0;
		var ticking = false;
		var touchCanceler = false;
		var resizeCanceler = false;
		var animating = false;

		var doc = contents.document;
		var startPosition = { x: -1, y: -1 };
		var currentPosition = { x: -1, y: -1 };
		var isLongPress = false;
		var longPressTimer;
		var touchduration = 1000;
		var $body = doc.getElementsByTagName('body')[0];

		function touchStartHandler(e) {
			
			var f, target;
			startPosition.x = e.targetTouches[0].pageX;
			startPosition.y = e.targetTouches[0].pageY;
			currentPosition.x = e.targetTouches[0].pageX;
			currentPosition.y = e.targetTouches[0].pageY;
			isLongPress = false;

			if (isWebkit) {
				alert("dzz");
				for (var i=0; i < e.targetTouches.length; i++) {
					f = e.changedTouches[i].force;
					if (f >= 0.8 && !preventTap) {
						target = e.changedTouches[i].target;

						if (target.getAttribute("ref") === "epubjs-mk") {
							return;
						}

						clearTimeout(longPressTimer);

						cfi = contents.cfiFromNode(target).toString();

						sendMessage({method:"longpress", position: currentPosition, cfi: cfi});
						isLongPress = false;
						preventTap = true;
					}
				}
			}


			longPressTimer = setTimeout(function() {
				//alert("long press");
				target = e.targetTouches[0].target;

				if (target.getAttribute("ref") === "epubjs-mk") {
					return;
				}

				cfi = contents.cfiFromNode(target).toString();
				//alert(cfi);

				sendMessage({method:"longpress", position: currentPosition, cfi: cfi});
				preventTap = true;
			}, 1000);
		}

		function touchMoveHandler(e) {
			//alert("long press move");
			currentPosition.x = e.targetTouches[0].pageX;
			currentPosition.y = e.targetTouches[0].pageY;
			clearTimeout(longPressTimer);
		}

		function touchEndHandler(e) {
			var cfi;
			clearTimeout(longPressTimer);

			if(preventTap) {
				preventTap = false;
				return;
			}

			if(Math.abs(startPosition.x - currentPosition.x) < 2 &&
				Math.abs(startPosition.y - currentPosition.y) < 2) {

				var target = e.changedTouches[0].target;

				if (target.getAttribute("ref") === "epubjs-mk" ||
					target.getAttribute("ref") === "epubjs-hl" ||
					target.getAttribute("ref") === "epubjs-ul") {
					return;
				}

				cfi = contents.cfiFromNode(target).toString();

				if(isLongPress) {
					//alert("longPress")
					sendMessage({method:"longpress", position: currentPosition, cfi: cfi});
					isLongPress = false;
				} else {
					setTimeout(function() {
						if(preventTap) {
							preventTap = false;
							isLongPress = false;
							return;
						}
						sendMessage({method:"press", position: currentPosition, cfi: cfi});
					}, 10);
				}
			}
		}

		function touchForceHandler(e) {

			//alert("long press hander touch");
			var f = e.changedTouches[0].force;
			if (f >= 0.8 && !preventTap) {
				var target = e.changedTouches[0].target;

				if (target.getAttribute("ref") === "epubjs-mk") {
					return;
				}

				clearTimeout(longPressTimer);

				cfi = contents.cfiFromNode(target).toString();

				sendMessage({method:"longpress", position: currentPosition, cfi: cfi});
				isLongPress = false;
				preventTap = true;
			}
		}

		if(!isWebkit) {
			//alert("chrome");
			var prevX;
			var flick = 0;
			var pan = false;

			doc.addEventListener('touchmove', function(e) {
				var screenX = e.touches[0].screenX;
				var delta = prevX - screenX;

				touchMoveHandler(e);

				if (axis !== "horizontal") {
					return;
				}

				if (Math.abs(delta) > 0.5) {
					pan = true;
				}

				if (delta > 20) {
					flick = 1;
				}

				if (delta < -20) {
					flick = -1;
				}

				// if (!animating) {
				//   if (delta) {
				//     window.scrollBy(delta, 0);
				//   }
				// }

				prevX = screenX;

				e.prevenatDefault();
			}, { capture: true, passive: false });

			doc.addEventListener('touchstart', function(e) {

				touchStartHandler(e);

				resizeCanceler = false;

			}, { capture: false, passive: true });

			doc.addEventListener('touchend', function(e) {

				touchEndHandler(e);

				if (axis !== "horizontal") {
					return;
				}

				if(!animating) {

					if (flick === 1) {
						snap(last_known_scroll_position + snapWidth + 10);
					}
					else if (flick === -1) {
						snap(last_known_scroll_position - snapWidth + 10);
					}
					else if (pan) {
						snap(last_known_scroll_position);
					}

				}

				prevX = undefined;
				flick = 0;
				pan = false;
			}, { capture: true, passive: false });

		} else {
			doc.addEventListener("touchstart", touchStartHandler, false);

			doc.addEventListener("touchmove", touchMoveHandler, false);

			doc.addEventListener("touchend", touchEndHandler, false);

			doc.addEventListener('touchforcechange', touchForceHandler, false);
		}

	});


</script>

</html>
`