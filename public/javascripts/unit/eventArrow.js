(function(global, namespace) {

    /**
    * Mechanism and Approach eventArrow for Social Activity (MAMSA)
    * 
    * @module mamsa
    **/
    var ns = mamsa.addNamespace(namespace);

    /**
    * event box
    *
    * @class eventArrow
    */
    var eventArrow = function () {};
    var globalRatio = 1;
    var moveX = 0;
    var moveY = 0;
    var ratio = 1;
    var divWidth = 30 * ratio;
    var divHeight = 30 * ratio;
    var arrowImage = {
        red: null,
        yellow: null,
        blue: null
    };

    var changeCursor = function (cursor) {
        document.body.style.cursor = cursor;
    };

    // for avoiding reference
    var clone = function (obj) {
        var object = {};
        for (var i in obj) {
            object[i] = obj[i];
        }
        return object;
    };

    // for avoiding reference
    var cloneRecurcive = function (obj) {
        var object = {};
        for (var i in obj) {
            if (typeof(obj[i]) === 'object') {
                object[i] = cloneRecurcive(obj[i]);
            } else {
                object[i] = obj[i];
            }
        }
        return object;
    };

    eventArrow.prototype = {

        // colorFlag: true,
        fixColor: {
            flag: false,
            color: '#0000ff'
        },
        // common option (use reference)
        common: {
            overColor: '#ff0000'
        },
        each: {
            id: '',
            posTL: {x: 0, y: 0}, // position top & left
            posTC: {x: 0, y: 0}, // position top & center
            posTR: {x: 0, y: 0}, // position top & right
            posCL: {x: 0, y: 0}, // position center & left
            posCC: {x: 0, y: 0}, // position center & center
            posCR: {x: 0, y: 0}, // position center & right
            posBL: {x: 0, y: 0}, // position bottom & left
            posBC: {x: 0, y: 0}, // position bottom & center
            posBR: {x: 0, y: 0}  // position bottom & right
        },
        ele: null,
        modType: '', // mod
        id: '',

        /**
        * set array
        *
        * @method set
        * @param {string} tag name
        * @param {string} tag id
        * @param {number} position x
        * @param {number} position y
        * @param {string} modType: view or mod
        * @param {object} callback with events
        */
        set: function (disp, id, x1, y1, x2, y2, symbol, modType, events) {
            var posX = (x1 + x2) / 2 - divWidth / 2;
            var posY = (y1 + y2) / 2 - divHeight / 2;
            var rotate = Math.atan2(x2 - x1, y2 - y1) * -1;
            var canvas = createCanvas(disp, id, posX, posY, rotate, symbol, modType, events);
            this.each = culcPosition(id, posX, posY);
        }
    };

    // mouse out event
    var createCanvas = function (disp, id, left, top, rotate, symbol, modType, events) {
        var imgObj = clone(arrowImage);
        var out = {};
        var mouseEnterFlag = true;

        // set div box
        var canvasDiv = document.createElement('div');
        canvasDiv.id = 'arrow' + id;
        canvasDiv.style.position = 'absolute';
        canvasDiv.style.top = top + 'px';
        canvasDiv.style.left = left + 'px';
        canvasDiv.style.width = divWidth + 'px';
        canvasDiv.style.height = divHeight + 'px';

        var canvasElement = document.createElement('canvas');
        canvasElement.id = 'ele' + id;
        canvasElement.className = 'eventArrow';
        canvasElement.style.width = divWidth + 'px';
        canvasElement.style.height = divHeight + 'px';

        document.getElementById(disp).appendChild(canvasDiv);
        document.getElementById('arrow' + id).appendChild(canvasElement);

        var context = canvasElement.getContext('2d');

        // this
        var me = this;

        // move event
        canvasElement.addEventListener('mousemove', function(e) {

            eventsCallBack(e, canvasDiv, function (x, y) {

                // mouse move event
                // setArrow(context, imgObj.yellow, rotate);
                console.log('mouse move arrow');
                // event callback
                if (typeof(events.mousemove) === 'function') {
                    events.mousemove(canvasElement, x, y);
                }

                // mouse enter event
                if (mouseEnterFlag) {
                    mouseEnterFlag = false;
                    setArrow(context, imgObj.yellow, (symbol === 'arrow' ? rotate : 0));
                    console.log('mouse enter arrow');
                    // event callback
                    if (typeof(events.mouseenter) === 'function') {
                        events.mouseenter(canvasElement, x, y);
                    }
                }
            });
        }, true);

        // click event
        canvasElement.addEventListener("mousedown", function(e) {

            if (e.button === 0) {

                eventsCallBack(e, canvasDiv, function (x, y) {

                    console.log('mouse down arrow');
                    // event callback
                    if (typeof(events.mousedown) === 'function') {
                        events.mousedown(canvasElement, x, y);
                    }
                });
            }
        }, true);

        // mouseup event
        canvasElement.addEventListener("mouseup", function(e) {

            eventsCallBack(e, canvasDiv, function (x, y) {
                console.log('mouse up arrow');
                // event callback
                if (typeof(events.mouseup) === 'function') {
                    events.mouseup(canvasElement, x, y);
                }
            });
        }, true);

        // click right event
        clickRight(function (e) {

            eventsCallBack(e, canvasDiv, function (x, y) {
                console.log('click right arrow');
                // event callback
                if (typeof(events.clickRight) === 'function') {
                    events.clickRight(canvasElement, x, y);
                }
            });
        });

        // move out
        canvasElement.addEventListener("mouseout", function(e) {

            eventsCallBack(e, canvasDiv, function (x, y) {
                mouseEnterFlag = true;
                setArrow(context, imgObj.blue, (symbol === 'arrow' ? rotate : 0));
                console.log('mouse out arrow');
                // event callback
                if (typeof(events.mouseout) === 'function') {
                    events.mouseout(canvasElement, x, y);
                }
            });
        }, true);

        // fix picture
        imgObj.red = symbol === 'arrow' ? getImageArrow(canvasElement, '#ff0000') : getImageCircle(canvasElement, '#ff0000');
        imgObj.yellow = symbol === 'arrow' ? getImageArrow(canvasElement, '#ffa500') : getImageCircle(canvasElement, '#ffa500');
        imgObj.blue = symbol === 'arrow' ? getImageArrow(canvasElement, '#0000ff') : getImageCircle(canvasElement, '#0000ff');

        // view arrow
        setArrow(context, imgObj.blue, (symbol === 'arrow' ? rotate : 0));

        out.ctx = context;
        out.div = canvasDiv;
        out.canvas = canvasElement;
        return out;
    };

    var getImageArrow = function (canvasElement, color) {
        var context = canvasElement.getContext('2d');
        context.translate(150, 75);
        context.beginPath();
        context.strokeStyle = color;
        context.fillStyle = '#ffffff';
        context.lineWidth = 10;

        context.moveTo(0, 60);
        context.lineTo(80, 0);
        context.lineTo(40, 0);
        context.lineTo(40, -60);
        context.lineTo(-40, -60);
        context.lineTo(-40, 0);
        context.lineTo(-80, 0);
        context.lineTo(0, 60);
        context.closePath();
        context.fill();
        context.stroke();
        context.translate(-150, -75);

        return canvasElement.toDataURL();
    };

    var getImageCircle = function (canvasElement, color) {
        var context = canvasElement.getContext('2d');
        context.translate(150, 75);
        context.scale(1, 1 / 2);

        context.beginPath();
        context.fillStyle = color;
        context.arc(0, 0, 40, 0, 2 * Math.PI, false);
        context.fill();

        context.scale(1, 2);
        context.translate(-150, -75);
        return canvasElement.toDataURL();
    };

    var setArrow = function (context, png, rotate) {
        var img = new Image();
        img.src = png;
        imgWidth  = img.width;
        imgHeight = img.height;

        context.clearRect(-300,-150, 600, 300); // clear png
        context.translate(imgWidth / 2, imgHeight / 2);
        context.rotate(rotate);
        context.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
        context.rotate(-rotate);
        context.translate(-imgWidth / 2, -imgHeight / 2);
    };

    var eventsCallBack = function (e, canvasDiv, everyPosition) {
        var rect = e.target.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        // every position
        everyPosition(mouseX, mouseY);
    };

    // culcation eventArrow position
    var culcPosition = function (id, left, top) {

        var canvasDiv = document.getElementById('arrow' + id);
        var width = parseInt(canvasDiv.style.width, 10);
        var height = parseInt(canvasDiv.style.height, 10);

        var each = eventArrow.prototype.each;
        each = cloneRecurcive(each); // for avoiding reference

        // set position
        each.id = id;
        each.posTL.x = left;
        each.posTL.y = top;

        each.posTC.x = left + width / 2;
        each.posTC.y = top;

        each.posTR.x = left + width;
        each.posTR.y = top;

        each.posCL.x = left;
        each.posCL.y = top + height / 2;

        each.posCC.x = left + width / 2;
        each.posCC.y = top + height / 2;

        each.posCR.x = left + width;
        each.posCR.y = top + height / 2;

        each.posBL.x = left;
        each.posBL.y = top + height;

        each.posBC.x = left + width / 2;
        each.posBC.y = top + height;

        each.posBR.x = left + width;
        each.posBR.y = top + height;

        return each;
    };

    var clickRight = function (callback) {
        if (document.addEventListener) {
            if (window.opera) {
                // Opera
                document.addEventListener('mousedown', function(e) {
                    // Operaの場合はcontextmenuをサポートしていないので、buttonから判定する
                    if(e.button == 2) {
                        callback(e);
                    }
                    e.preventDefault();
                }, false);
            } else {
                // Firefox, Safari
                document.addEventListener("contextmenu", function(e) {
                    callback(e);
                    e.preventDefault();
                }, false);
            }
        } else {
            // IE
            document.attachEvent("oncontextmenu", function(e) {
                callback(e);
                e.returnValue = false;
            });
        }
    };

    ns.prototype = eventArrow.prototype;

}(this, 'mamsa.eventArrow'));