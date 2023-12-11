export default `


window.book = ePub("https://maadsene.s3.amazonaws.com/pg61108.epub");
alert(window.BOOK_PATH);
window.rendition = window.book.renderTo(document.getElementById('viewer'), {
    width: '100%',
    height: '100%',
    manager: "continuous",
    flow: "paginated",
    snap: true,
    minSpreadWidth: 3999
});

window.rendition.on('started', (e) => {
    alert("on start")
    window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'isLoading', isLoading: true })
    );
    window.rendition.display(window.BOOK_LOCATION);

    window.rendition.themes.register({ theme: window.THEME });
    window.rendition.themes.select('theme');
});

alert("window.BOOK_PATH");
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
})

window.rendition.on('relocated', function (e) {
    window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'loc',
        cfi: e.start.cfi,
        progress: e.start.location,
        teste: e,
        locations: window.book.locations.save(),
        currentLocation:rendition.currentLocation().end.cfi,
        cur:rendition.currentLocation()
    }));
});

/* window.rendition.on("selected", function (cfiRange, contents) {
    window.book.getRange(cfiRange).then((range) => {
        let text = range.toString();

        window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: 'highlight', data: { cfi: cfiRange, text, data: "" } })
        );
        contents.window.getSelection().removeAllRanges();
    });
}); */


window.rendition.on("markClicked", function (cfiRange, data, contents) {
    window.book.getRange(cfiRange).then((range) => {
        let text = range.toString();
        let newData = Object.assign({}, data, { text });

        window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: 'highlightClicked', data: newData })
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


this.rendition.hooks.content.register(function(contents, rendition) {
    var doc = contents.document;
    var startPosition = { x: -1, y: -1 };
    var currentPosition = { x: -1, y: -1 };
    var isLongPress = false;
    var longPressTimer;
    var touchduration = 300;
    var $body = doc.getElementsByTagName('body')[0];

    function touchStartHandler(e) {
        var f, target;
        startPosition.x = e.targetTouches[0].pageX;
        startPosition.y = e.targetTouches[0].pageY;
        currentPosition.x = e.targetTouches[0].pageX;
        currentPosition.y = e.targetTouches[0].pageY;
        isLongPress = false;

        if (isWebkit) {
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
            target = e.targetTouches[0].target;

            if (target.getAttribute("ref") === "epubjs-mk") {
                return;
            }

            cfi = contents.cfiFromNode(target).toString();

            sendMessage({method:"longpress", position: currentPosition, cfi: cfi});
            preventTap = true;
        }, touchduration);
    }

    function touchMoveHandler(e) {
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

}.bind(this));


`