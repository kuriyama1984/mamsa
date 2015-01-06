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
    var dragID = {flag: false, id: '', head: '', w: 0, h: 0}; // copy box id just dragging
    var dragCircleID = {flag: false, id: '', head: '', w: 0, h: 0}; // copy box id just dragging
    var startX = 0; // mousedown x
    var startY = 0; // mousedown y
    var startId = ''; // mousedown id
    var globalRatio = 1;
    var eventBoxs = [];
    var databases = [];
    var clientCallbacks = {};
    var lineColor = {
        base: '#0000ff',
        over: '#ffa500'
    };

    var isLine = false; // drow line flag
    // var isMiddleTop = false; // mouse is on middle top


    // -----------------------------------
    //  load util and unit classes
    // -----------------------------------
    var background = Object.create(mamsa.background.prototype);
    var eventCircle = Object.create(mamsa.eventCircle.prototype);

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

    // for avoiding reference
    var allEvents = function (flag) {
        var divs = document.getElementById('mapObj').getElementsByTagName('div');
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.pointerEvents = flag ? 'auto' : 'none';
        }
    };

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
                resetBackground();
                showBack(undefined, undefined, undefined, false);
                drowLine(null, null, x, y, isLine, lineColor.over);
                moveCopy(x, y);
                showCircleLine(x, y);
            },
            mousedown : function (x, y) {

            },
            mouseup : function (x, y) {
                isLine = false; // finish drow line
                resetEventBoxColor();
                // reset drag id when event box moving
                if (dragID.flag) {
                    dragID.flag = false;
                    allEvents(true);
                    removeId(dragID.head + dragID.id);

                    // replace and set data
                    var database = getDatabase(dragID.id);
                    database = replaceDatabase(database, 'x', x - dragID.w);
                    database = replaceDatabase(database, 'y', y - dragID.h);
                    databases = replaceDatabases(dragID.id, database);

                    // callback to client.js
                    clientCallbacks.saveLine(databases);

                    // show new map
                    resetAll();
                    showEventBox();
                    showLineArrow();
                }
                // reset circle
                if (dragCircleID.flag) {
                    dragCircleID.flag = false;

                    // replace and set data
                    var database = getDatabase(dragCircleID.id);
                    database = replaceDatabase(database, 'x', x - dragCircleID.w);
                    database = replaceDatabase(database, 'y', y - dragCircleID.h);
                    databases = replaceDatabases(dragCircleID.id, database);

                    // callback to client.js
                    clientCallbacks.saveLine(databases);

                    // show new map
                    resetAll();
                    showEventBox();
                    showLineArrow();
                }
            },
            dblclick : function (x, y) {
                var eventBox = Object.create(mamsa.eventBox.prototype);
                eventBox.create('mapObj', getNextId(), x, y, function (result) {
                    var newDb = {
                        id: getNextId(),
                        type: 'eventbox',
                        x: x,
                        y: y,
                        title: result.pt_name,
                        titleKana: result.pt_name2,
                        text: result.pt_explain,
                        from: '',
                        to: ''
                    };
                    databases.push(newDb);
                    clientCallbacks.save(databases);

                    // show new map
                    resetAll();
                    showEventBox();
                    showLineArrow();
                });
            },
            clickRight : function (x, y) {

            }
        });
    };

    // reset all elements
    var resetAll = function () {
        // delete obj
        var mapObj = document.getElementById('mapObj');
        while (mapObj.firstChild) {
            // console.log(mapObj.firstChild);
            mapObj.removeChild(mapObj.firstChild);
        }
        // clear map
        resetBackground();
    };

    // reset background canvas view
    var resetBackground = function () {
        background.setType1Basic(canvas);
    };

    // reset event box color
    var resetEventBoxColor = function () {
        for (var i = 0; i < eventBoxs.length; i++) {
            eventBoxs[i].changeColor(false, '#0000ff');
        }
        eventBoxs[0].common.overColor = '#ff0000';
    };

    // remove id
    var removeId = function (id) {
        var mapObj = document.getElementById('mapObj');
        var element = document.getElementById(id);
        mapObj.removeChild(element);
    };

    // remove id
    var moveCopy = function (x, y) {
        if (dragID.flag) {
            var dragEle = document.getElementById(dragID.head + dragID.id);
            dragEle.style.left = (x - dragID.w) + "px";
            dragEle.style.top = (y - dragID.h) + "px";
        }
    };

    // get database form id
    var getDatabase = function (id) {
        for (var i = 0; i < databases.length; i++) {
            if (databases[i].id === id) {
                return clone(databases[i]);
            }
        }
    };

    // get database form id
    var setDatabase = function (id, database) {
        for (var i = 0; i < databases.length; i++) {
            if (databases[i].id === id) {
                databases[i] = database;
            }
        }
    };

    // get next id
    var getNextId = function () {
        var idSplit = databases[databases.length - 1].id.split('_');
        var idNum = parseInt(idSplit[1], 10);
        idNum += 1;
        var newId = idSplit[0] + '_' + idNum;
        return newId;
    };

    // replace key to value
    var replaceDatabase = function (database, _key, value) {
        for (var key in database) {
            if (database.hasOwnProperty(key)) {
                if (key === _key) {
                    database[key] = value;
                }
            }
        }
        return database;
    };

    // replace databases as id
    var replaceDatabases = function (id, _database) {
        for (var i = 0; i < databases.length; i++) {
            if (databases[i].id === id) {
                databases[i] = _database;
            }
        }
        return databases;
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
            clientCallbacks = callbacks;
            showEventBox();
            showLineArrow();
        }
    };

    var showEventBox = function () {
        for (var i = 0; i < databases.length; i++) {
            // set eventBox
            if (databases[i].type === 'eventbox') {
                var db = databases[i];
                setEventBox(db.id, db.x, db.y, db.title, db.titleKana, db.text, 'mod', {
                    saveLine: function (startId, endId) {
                        var newDb = {
                            id: getNextId(),
                            type: 'line',
                            x: 0,
                            y: 0,
                            title: '',
                            titleKana: '',
                            text: '',
                            from: startId,
                            to: endId
                        };
                        clientCallbacks.saveLine(newDb);
                        databases.push(newDb);
                    }
                });
            }
        }
    };

    var showLineArrow = function () {
        showBack(function (database, fromXBC, fromYBC, toXTC, toYTC) {
            setArrow(database, fromXBC, fromYBC, toXTC, toYTC, database.type);
        }, undefined, undefined, true);
    };

    var showBack = function (setArrow, targets, callback, circleFlag) {
        resetBackground();
        showCircle(circleFlag);
        for (var i = 0; i < databases.length; i++) {
            // check target id
            var targetsFlag = false;
            if (typeof(targets) !== 'undefined') {
                for (var j = 0; j < targets.length; j++) {
                    if (databases[i].id === targets[j]) {
                        targetsFlag = true;
                    }
                }
            }
            // change color
            var color = lineColor.base;
            if (targetsFlag) {
                color = '#ffa500';
            }

            // draw line
            if (databases[i].type === 'line' || databases[i].type === 'arrow') {
                var fromXBC = 0;
                var fromYBC = 0;
                var fromXCR = 0;
                var fromYCR = 0;
                var toXTC = 0;
                var toYTC = 0;
                var toXCR = 0;
                var toYCR = 0;
                // select each positions
                for (var k = 0; k < eventBoxs.length; k++) {
                    if (eventBoxs[k].id === databases[i].from) {
                        fromXBC = eventBoxs[k].each.posBC.x;
                        fromYBC = eventBoxs[k].each.posBC.y;
                        fromXCR = eventBoxs[k].each.posCR.x;
                        fromYCR = eventBoxs[k].each.posCR.y;
                        // callback from.id and eventbox
                        if (targetsFlag && typeof(callback) === 'function') {
                            callback(databases[i].from, eventBoxs[k]);
                        }
                    } else if (eventBoxs[k].id === databases[i].to) {
                        toXTC = eventBoxs[k].each.posTC.x;
                        toYTC = eventBoxs[k].each.posTC.y;
                        toXCR = eventBoxs[k].each.posCR.x;
                        toYCR = eventBoxs[k].each.posCR.y;
                        // callback to.id and eventbox
                        if (targetsFlag && typeof(callback) === 'function') {
                            callback(databases[i].to, eventBoxs[k]);
                        }
                    }
                }
                // single line
                if (fromYBC < toYTC) {
                    drowLine(fromXBC, fromYBC, toXTC, toYTC, true, color);
                    if (typeof(setArrow) === 'function') {
                        setArrow(databases[i], fromXBC, fromYBC, toXTC, toYTC, databases[i].type);
                    }
                } else {
                    var posRight = fromXCR + (fromYBC - fromYCR);
                    if (fromXCR < toXCR) {
                        posRight = toXCR + (fromYBC - fromYCR);
                    }
                    drowLine(fromXCR, fromYCR, posRight, fromYCR, true, color);
                    drowLine(posRight, fromYCR, posRight, toYCR, true, color);
                    drowLine(toXCR, toYCR, posRight, toYCR, true, color);
                    if (typeof(setArrow) === 'function') {
                        setArrow(databases[i], posRight, fromYCR, posRight, toYCR, databases[i].type);
                    }
                }
            }
        }
    };

    var showCircleLine = function (x, y) {
        if (dragCircleID.flag) {
            var s = 1;
            for (var i = 0; i < databases.length; i++) {
                if (databases[i].type === 'circle' && databases[i].id === dragCircleID.id) {
                    var database = databases[i];
                    eventCircle.line(context, database, s, x, y, 'rightBottom');
                }
            }
        }
    };

    var showCircle = function (flag) {
        var s = 1;
        for (var i = 0; i < databases.length; i++) {
            if (databases[i].type === 'circle') {
                var database = databases[i];
                eventCircle.set(context, database, s, 'mapObj', 'mod', flag, {
                    mouseoutRightBottom : function () {
                        resetEventBoxColor();
                    },
                    mousedownRightBottom : function (canvasElement, x, y, database) {
                        dragCircleID = eventCircle.copy(context, database, s, 'mapObj', 'rightBottom');
                        allEvents(false);
                    },
                    mousedownMiddleBottom : function (canvasElement, x, y, database) {
                        dragCircleID = eventCircle.copy(context, database, s, 'mapObj', 'middleBottom');
                        allEvents(false);
                    },
                    mousemoveEveryPosition : function (canvasElement, x, y, database) {
                        eventCircle.lineOnly(context, database, s, x, y, 'rightBottom');
                    }
                });
            }
        }
    };

    var searchDatabase = function (id) {
        for (var i = 0; i < databases.length; i++) {
            if (databases[i].id === id) {
                return databases[i];
            }
        }
    };

    var setArrow = function (database, x1, y1, x2, y2, symbol) {
        var eventArrow = Object.create(mamsa.eventArrow.prototype);

        // set event
        eventArrow.set('mapObj', database.id, x1, y1, x2, y2, symbol, 'mod', {
            mouseenter : function (canvasElement, x, y) {
                // lineColor.base = '#ffa500';
                showBack(null, [database.id], function (id, eventBox) {
                    eventBox.changeColor(true, '#ffa500');
                }, false);
            },
            mouseout : function (canvasElement, x, y) {
                // lineColor.base = '#ffa500';
                showBack(null, [database.id], function (id, eventBox) {
                    eventBox.changeColor(false, '#0000ff');
                }, false);
            }
        });
    };

    var setEventBox = function (id, x1, y1, text, titleKana, textPop, type, callbacks) {
        callbacks = clone(callbacks);

        // set clever eventBox type1
        var eventBox = Object.create(mamsa.eventBox.prototype);
        eventBox.set('mapObj', id, x1, y1, text, textPop, type, {

            mousemoveLeftTop : function (canvasElement, x2, y2) {
                console.log('mousemoveLeftTop');
            },
            mousedownLeftTop : function (canvasElement, x2, y2) {
                console.log('mousedownLeftTop');
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
            mousedownLeftBottom : function (canvasElement, x2, y2) {
                console.log('mousedownLeftBottom');
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
            mousedownRightTop : function (canvasElement, x2, y2) {
                console.log('mousedownRightTop');
                eventBox.edit('mapObj', id, x1, y1, text, titleKana, textPop, function (result) {
                    var db = getDatabase(id);
                    // update data
                    if (result.flag) {
                        db.x = result.ps_x;
                        db.y = result.ps_y;
                        db.title = result.pt_name;
                        db.titleKana = result.pt_name2;
                        db.text = result.pt_explain;
                        setDatabase(id, db);

                        // show new map
                        resetAll();
                        showEventBox();
                        showLineArrow();
                    }
                });
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
            mousedownRightBottom : function (canvasElement, x2, y2) {
                console.log('mousedownRightBottom');
                dragID = eventBox.copy('mapObj', id, x1, y1, text);
                allEvents(false);
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
            mousedownMiddleTop : function (canvasElement, x2, y2) {
                console.log('mousedownMiddleTop');
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
            mousedownMiddleBottom : function (canvasElement, x2, y2) {
                console.log('mousedownMiddleBottom');

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
            mousedownElsePosition : function (canvasElement, x2, y2) {
                // console.log('mousedownElsePosition');
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
            mousedownEveryPosition : function (canvasElement, x2, y2) {
                // console.log('mousedownEveryPosition');
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
                // reset background map
                resetBackground();
                showBack(undefined, undefined, undefined, false);
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