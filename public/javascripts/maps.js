(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module mamsa
    **/
    var ns = mamsa.addNamespace(namespace);

    /**
    * callback of selectBox.type1
    *
    * @class maps
    */
    var maps = function () {};

    // -----------------------------------
    //  basic local data
    // -----------------------------------
    var canvas = null; // canvas div element
    var context = null; // canvas context
    var startX = 0; // mousedown x
    var startY = 0; // mousedown y
    var startId = ''; // mousedown id
    var globalRatio = 1;
    var eventBoxs = [];
    var databases = [];

    var isLine = false; // drow line flag
    // var isMiddleTop = false; // mouse is on middle top


    // -----------------------------------
    //  load util and unit classes
    // -----------------------------------
    var background = Object.create(mamsa.background.prototype);


    // for avoiding reference
    var clone = function (obj) {
        var object = {};
        for (var i in obj) {
            object[i] = obj[i];
        }
        return object;
    }

    // drow line view
    var drowLine = function (_startX, _startY, endX, endY, flag, color) {
        if (flag) {
            var x = _startX !== null ? _startX : startX;
            var y = _startY !== null ? _startY : startY;
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = color;
            context.moveTo(x, y);
            context.lineTo(endX, endY);
            context.stroke();
        }
    };

    // set background view
    var setBackground = function () {
        background.setType1(canvas, {

            mousemove : function (x, y) {
                reset();
                showLines();
                drowLine(null, null, x, y, isLine, '#ffa500');
            },
            mousedown : function (x, y) {

            },
            mouseup : function (x, y) {
                isLine = false; // finish drow line
                for (var i = 0; i < eventBoxs.length; i++) {
                    eventBoxs[i].changeColor(false, '#0000ff');
                }
                eventBoxs[0].common.overColor = '#ff0000';
            },
            dblclick : function (x, y) {

            },
            clickRight : function (x, y) {

            }
        });
    };

    // reset canvas view
    var reset = function () {
        background.setType1Basic(canvas);
    };



    maps.prototype = {

        init: function () {
            var ele = document.getElementById("status");
            // Canvasが使えるか調べる
            if (!window.HTMLCanvasElement) {
                ele.innerHTML = "Canvasが使用できません";
                return 1; // non-supported
            }
            // Canvasの要素
            canvas = document.getElementById("myCanvas");
            // 2Dコンテキストの取得
            context = canvas.getContext("2d");
            if (!context) {
                ele.innerHTML = "2Dコンテキストが取得できません";
                return 1; // non-supported
            }
            setBackground(); // set background
            return 0; // success OK
        },

        show: function (_databases, callbacks) {
            databases = _databases;
            for (var i = 0; i < databases.length; i++) {
                // set eventBox
                if (databases[i].type === 'eventbox') {
                    setEventBox(databases[i].id, databases[i].x, databases[i].y, databases[i].title, databases[i].text, 'mod', {
                        saveLine: function (startId, endId) {
                            var newDatabase = {id: '0008', type: 'line', x: 0, y: 0, title: '', text: '', from: startId, to: endId};
                            callbacks.saveLine(newDatabase);
                            databases.push(newDatabase);
                        }
                    });
                }
            }
            showLines();
        }
    };

    var showLines = function () {
        for (var i = 0; i < databases.length; i++) {
            // set eventBox
            if (databases[i].type === 'line') {
                var fromXBC = 0;
                var fromYBC = 0;
                var fromXCR = 0;
                var fromYCR = 0;
                var toXTC = 0;
                var toYTC = 0;
                var toXCR = 0;
                var toYCR = 0;
                // select each positions
                for (var j = 0; j < eventBoxs.length; j++) {
                    if (eventBoxs[j].id === databases[i].from) {
                        fromXBC = eventBoxs[j].each.posBC.x;
                        fromYBC = eventBoxs[j].each.posBC.y;
                        fromXCR = eventBoxs[j].each.posCR.x;
                        fromYCR = eventBoxs[j].each.posCR.y;
                    } else if (eventBoxs[j].id === databases[i].to) {
                        toXTC = eventBoxs[j].each.posTC.x;
                        toYTC = eventBoxs[j].each.posTC.y;
                        toXCR = eventBoxs[j].each.posCR.x;
                        toYCR = eventBoxs[j].each.posCR.y;
                    }
                }
                // single line
                if (fromYBC < toYTC) {
                    drowLine(fromXBC, fromYBC, toXTC, toYTC, true, '#0000ff');
                } else {
                    var posRight = fromXCR + (fromYBC - fromYCR);
                    if (fromXCR < toXCR) {
                        posRight = toXCR + (fromYBC - fromYCR);
                    }
                    drowLine(fromXCR, fromYCR, posRight, fromYCR, true, '#0000ff');
                    drowLine(posRight, fromYCR, posRight, toYCR, true, '#0000ff');
                    drowLine(toXCR, toYCR, posRight, toYCR, true, '#0000ff');
                }
            }
        }
    };

    var setEventBox = function (id, x1, y1, text, textPop, type, callbacks) {
        callbacks = clone(callbacks);

        // set clever eventBox type1
        var eventBox = Object.create(mamsa.eventBox.prototype);
        eventBox.setType1('mapBody', id, x1, y1, text, textPop, type, {

            mousemoveLeftTop : function (canvasElement, x2, y2) {
                console.log('mousemoveLeftTop');
            },
            clickLeftTop : function (canvasElement, x2, y2) {
                console.log('clickLeftTop');
            },
            clickRightLeftTop : function (canvasElement, x2, y2) {
                console.log('clickRightLeftTop');
            },
            mouseupLeftTop : function (canvasElement, x2, y2) {
                console.log('mouseupLeftTop');
            },
            mouseoutLeftTop : function (canvasElement, x2, y2) {
                console.log('mouseoutLeftTop');
            },

            mousemoveLeftBottom : function (canvasElement, x2, y2) {
                console.log('mousemoveLeftBottom');
            },
            clickLeftBottom : function (canvasElement, x2, y2) {
                console.log('clickLeftBottom');
            },
            clickRightLeftBottom : function (canvasElement, x2, y2) {
                console.log('clickRightLeftBottom');
            },
            mouseupLeftBottom : function (canvasElement, x2, y2) {
                console.log('mouseupLeftBottom');
            },
            mouseoutLeftBottom : function (canvasElement, x2, y2) {
                console.log('mouseoutLeftBottom');
            },

            mousemoveRightTop : function (canvasElement, x2, y2) {
                console.log('mousemoveRightTop');
            },
            clickRightTop : function (canvasElement, x2, y2) {
                console.log('clickRightTop');
            },
            clickRightRightTop : function (canvasElement, x2, y2) {
                console.log('clickRightRightTop');
            },
            mouseupRightTop : function (canvasElement, x2, y2) {
                console.log('mouseupRightTop');
            },
            mouseoutRightTop : function (canvasElement, x2, y2) {
                console.log('mouseoutRightTop');
            },

            mousemoveRightBottom : function (canvasElement, x2, y2) {
                console.log('mousemoveRightBottom');
            },
            clickRightBottom : function (canvasElement, x2, y2) {
                console.log('clickRightBottom');
            },
            clickRightRightBottom : function (canvasElement, x2, y2) {
                console.log('clickRightRightBottom');
            },
            mouseupRightBottom : function (canvasElement, x2, y2) {
                console.log('mouseupRightBottom');
            },
            mouseoutRightBottom : function (canvasElement, x2, y2) {
                console.log('mouseoutRightBottom');
            },

            mousemoveMiddleTop : function (canvasElement, x2, y2) {
                console.log('mousemoveMiddleTop');
                // isMiddleTop = true; // mouse is on middle Top
            },
            clickMiddleTop : function (canvasElement, x2, y2) {
                console.log('clickMiddleTop');
            },
            clickRightMiddleTop : function (canvasElement, x2, y2) {
                console.log('clickRightMiddleTop');
            },
            mouseupMiddleTop : function (canvasElement, x2, y2) {
                console.log('mouseupMiddleTop');
            },
            mouseoutMiddleTop : function (canvasElement, x2, y2) {
                console.log('mouseoutMiddleTop');
                // isMiddleTop = false;
            },

            mousemoveMiddleBottom : function (canvasElement, x2, y2) {
                console.log('mousemoveMiddleBottom');
                // eventBox.common.overColor = '#0000ff';
            },
            clickMiddleBottom : function (canvasElement, x2, y2) {
                console.log('clickMiddleBottom');

                startX = x1 + x2; // mousedown x
                startY = y1 + y2 + 2; // mousedown y
                startId = id;
                isLine = true; // start drow line

                eventBox.changeColor(true, '#FFA500');
                eventBox.common.overColor = '#ffa500';
            },
            clickRightMiddleBottom : function (canvasElement, x2, y2) {
                console.log('clickRightMiddleBottom');
            },
            mouseupMiddleBottom : function (canvasElement, x2, y2) {
                console.log('mouseupMiddleBottom');
            },
            mouseoutMiddleBottom : function (canvasElement, x2, y2) {
                console.log('mouseoutMiddleBottom');
            },

            mousemoveElsePosition : function (canvasElement, x2, y2) {
                // console.log('mousemoveElsePosition');
            },
            clickElsePosition : function (canvasElement, x2, y2) {
                // console.log('clickElsePosition');
            },
            clickRightElsePosition : function (canvasElement, x2, y2) {
                // console.log('clickRightElsePosition');
            },
            mouseupElsePosition : function (canvasElement, x2, y2) {
                console.log('mouseupRightElsePosition');
            },
            mouseoutElsePosition : function (canvasElement, x2, y2) {
                // console.log('mouseoutElsePosition');
            },

            mousemoveEveryPosition : function (canvasElement, x2, y2) {
                // console.log('mousemoveEveryPosition');
                // eventBox.changeColor(true, '#FFA500');
            },
            clickEveryPosition : function (canvasElement, x2, y2) {
                // console.log('clickEveryPosition');
            },
            clickRightEveryPosition : function (canvasElement, x2, y2) {
                // console.log('clickRightEveryPosition');
            },
            mouseupEveryPosition : function (canvasElement, x2, y2) {
                console.log('mouseupRightEveryPosition');
                for (var i = 0; i < eventBoxs.length; i++) {
                    eventBoxs[i].changeColor(false, '#0000ff');
                }
                eventBox.common.overColor = '#ff0000';
                // callback when line is finished
                if (isLine) {
                    callbacks.saveLine(startId, id);
                }
                isLine = false; // finish drow line
                // reset map
                reset();
                showLines();
            },
            mouseoutEveryPosition : function (canvasElement, x2, y2) {
                // console.log('mouseoutEveryPosition');
                // eventBox.changeColor(true, '#0000ff');
            }
        });
        eventBoxs.push(eventBox);
    };







    ns.prototype = maps.prototype;

}(this, 'mamsa.maps'));