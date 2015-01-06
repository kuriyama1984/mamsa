(function(global, namespace) {

    /**
    * Mechanism and Approach eventCircle for Social Activity (MAMSA)
    * 
    * @module mamsa
    **/
    var ns = mamsa.addNamespace(namespace);

    /**
    * event box
    *
    * @class eventCircle
    */
    var eventCircle = function () {};

    // -----------------------------------
    //  load util and unit classes
    // -----------------------------------
    var error = Object.create(mamsa.error.prototype);

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

    eventCircle.prototype = {

        fixColor: {
            flag: false,
            color: '#0000ff'
        },
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


        /**
        * set is text-popup eventCircle with moveEvent, clickEvent, clickRightEvent, mouseOutEvent <br /><br />
        *
        * @method set
        * @param {string} tag name
        * @param {string} tag id
        * @param {number} position x
        * @param {number} position y
        * @param {string} text
        * @param {string} pop up text
        * @param {string} base or mod
        * @param {object} callback with events.<event name>
        */
        set: function (context, database, size, disp, modType, flag, events) {

            this.fixColor = clone(this.fixColor); // for avoiding reference
            showCircle(context, database, size);

            var me = this;

            if (flag) {
                var ele = createCanvas(database, disp, modType, size, events, {

                    mousemoveLeftTop : function (x, y) {
                        setFrame(ele, 3, modType, (me.fixColor.flag ? me.fixColor.color : me.common.overColor));
                        // setText(boxText, ele);
                    },
                    mousemoveLeftBottom : function (x, y) {
                        setFrame(ele, 3, modType, (me.fixColor.flag ? me.fixColor.color : me.common.overColor));
                        // setText(boxText, ele);
                    },
                    mousemoveMiddleTop : function (x, y) {
                        // usual
                        setFrame(ele, 3, modType, (me.fixColor.flag ? me.fixColor.color : me.common.overColor));
                        // setText(boxText, ele);
                    },
                    mousemoveMiddleBottom : function (x, y) {
                        setFrame(ele, 'middleBottom', modType, (me.fixColor.flag ? me.fixColor.color : '#ffa500'));
                        // setText(boxText, ele);
                        changeCursor('pointer');
                    },
                    mousemoveRightTop : function (x, y) {
                        setFrame(ele, 'rightTop', modType, (me.fixColor.flag ? me.fixColor.color : '#ffa500'));
                        // setText(boxText, ele);
                        changeCursor('pointer');
                    },
                    mousemoveRightBottom : function (x, y) {
                        setFrame(ele, 'rightBottom', modType, (me.fixColor.flag ? me.fixColor.color : '#ffa500'));
                        // setText(boxText, ele);
                        changeCursor('pointer');
                    },
                    mousemoveElsePosition : function (x, y) {
                        setFrame(ele, 3, modType, (me.fixColor.flag ? me.fixColor.color : me.common.overColor));
                        // setText(boxText, ele);
                    },
                    mousemoveEveryPosition : function (x, y) {
                        // movePopUp(x + left + 10, y + top - 10, elePop, true, me._popUpFlags.id);
                        showCircleLine(context, database, size);
                    },
                    mousedownRightBottom : function (x, y) {
                        // setBox(disp, id, left, top, boxText);
                    },
                    mouseoutRightTop : function (x, y) {
                        changeCursor('default');
                    },
                    mouseoutRightBottom : function (x, y) {
                        changeCursor('default');
                    },
                    mouseoutMiddleBottom : function (x, y) {
                        changeCursor('default');
                    },
                    mouseoutElsePosition : function (x, y) {
                        changeCursor('default');
                    },
                    mouseoutEveryPosition : function (x, y) {
                        setFrame(ele, null, modType, (me.fixColor.flag ? me.fixColor.color : null));
                        // setText(boxText, ele);
                        // movePopUp(x, y, elePop, false, me._popUpFlags.id);
                        // changeCursor('default');
                    },
                    clickRightEveryPosition : function (x, y) {
                        me._popUpFlags.id = false;
                    }
                });
            }
        },

        /**
        * copy don't contain events <br /><br /> 
        *
        * @method copy
        * @param {string} tag name
        * @param {number} position x
        * @param {number} position y
        * @param {string} text
        */
        copy: function (context, database, size, disp, pos) {

            showCircleLine(context, database, size, pos);
            var ele = createCanvasCopy(database, disp, size, {}, {});
            setFrame(ele, 3, 'mod', '#ffa500');

            var box = document.getElementById('ringCopy_' + database.id);
            var boxW = parseInt(box.style.width, 10);
            var boxH = parseInt(box.style.height, 10);

            var posW = 0;
            var posH = 0;
            if (pos === 'rightBottom') {
                posW = ele.textWidth / 2;
                posH = 125 + 40;
            } else {
                posW = 0;
                posH = 125 + 40;
            }

            return {
                flag: true,
                id: database.id,
                head: 'ringCopy_',
                w: posW,
                h: posH
            };
        },

        /**
        * copy don't contain events <br /><br /> 
        *
        * @method copy
        * @param {string} tag name
        * @param {number} position x
        * @param {number} position y
        * @param {string} text
        */
        line: function (context, database, size, x, y, pos) { // context, databases[i], s, 'mapObj'

            showCircleLine(context, database, size, x, y, pos);
            moveCopy(database, size, x, y);
        },

        /**
        * copy don't contain events <br /><br /> 
        *
        * @method copy
        * @param {string} tag name
        * @param {number} position x
        * @param {number} position y
        * @param {string} text
        */
        lineOnly: function (context, database, size, x, y, pos) { // context, databases[i], s, 'mapObj'

            showCircleLine(context, database, size, x, y, pos);
        }
    };

    // mouse out event
    var moveCopy = function (database, size, x, y) {
        var ringCopy = document.getElementById('ringCopy_' + database.id);
        console.log(ringCopy);
        console.log(x +'__'+ y);
        ringCopy.style.width = x + 'px';
        ringCopy.style.height = y + 'px';
    };

    // mouse out event
    var createCanvasCopy = function (database, disp, size, events, callback) {
        var s = size;
        var id = database.id;
        var left = database.x;
        var top = database.y;
        var rotate = database.rotate;
        var boxText = database.title;
        var out = {};
        var mouseEnterFlag = true;

        // set div box
        var canvasDiv = document.createElement('div');
        canvasDiv.id = 'ringCopy_' + id;
        canvasDiv.style.position = 'absolute';
        canvasDiv.style.width = '300px';
        canvasDiv.style.height = '40px';

        var canvasElement = document.createElement('canvas');
        canvasElement.id = 'ele' + id;
        canvasElement.className = 'eventArrow';
        canvasElement.style.width = '300px';
        canvasElement.style.height = '40px';

        document.getElementById(disp).appendChild(canvasDiv);
        document.getElementById('ringCopy_' + id).appendChild(canvasElement);

        var context = canvasElement.getContext('2d');
        context.fillStyle = "#000000";
        var fontsize = 20;
        var metrics = context.measureText(boxText);
        context.font = "normal bold " + fontsize * s + "pt 'ＭＳ Ｐ明朝'";

        var textWidth = parseInt(context.measureText(boxText).width, 10) + 20;
        canvasDiv.style.width = textWidth + 'px';
        canvasDiv.style.top = (top * s + fontsize * s + 2 + 100) + 'px';
        canvasDiv.style.left = (left * s - textWidth / 2 * s) + 'px';
        canvasElement.style.width = textWidth + 'px';

        // 文字を描画する
        context.scale(300 / textWidth, 150 / 40);
        context.fillText(boxText, 0, 30);
        context.scale(textWidth / 300, 40 / 150);

        out.ctx = context;
        out.div = canvasDiv;
        out.text = boxText;
        out.textWidth = textWidth;
        out.canvas = canvasElement;
        return out;
    };

    // mouse out event
    var createCanvas = function (database, disp, modType, size, events, callback) {
        var s = size;
        var id = database.id;
        var left = database.x;
        var top = database.y;
        var rotate = database.rotate;
        var boxText = database.title;
        var out = {};
        var mouseEnterFlag = true;

        // set div box
        var canvasDiv = document.createElement('div');
        canvasDiv.id = 'ring_' + id;
        canvasDiv.style.position = 'absolute';
        canvasDiv.style.width = '300px';
        canvasDiv.style.height = '40px';

        var canvasElement = document.createElement('canvas');
        canvasElement.id = 'ele' + id;
        canvasElement.className = 'eventArrow';
        canvasElement.style.width = '300px';
        canvasElement.style.height = '40px';

        document.getElementById(disp).appendChild(canvasDiv);
        document.getElementById('ring_' + id).appendChild(canvasElement);

        var context = canvasElement.getContext('2d');
        context.fillStyle = "#000000";
        var fontsize = 20;
        var metrics = context.measureText(boxText);
        context.font = "normal bold " + fontsize * s + "pt 'ＭＳ Ｐ明朝'";

        var textWidth = parseInt(context.measureText(boxText).width, 10) + 20;
        canvasDiv.style.width = textWidth + 'px';
        canvasDiv.style.top = (top * s + fontsize * s + 2 + 100) + 'px';
        canvasDiv.style.left = (left * s - textWidth / 2 * s) + 'px';
        canvasElement.style.width = textWidth + 'px';

        // 文字を描画する
        context.scale(300 / textWidth, 150 / 40);
        context.fillText(boxText, 0, 30);
        context.scale(textWidth / 300, 40 / 150);

        // this
        var me = this;

        // move event
        canvasElement.addEventListener('mousemove', function(e) {

            eventsCallBack(e, canvasDiv, function (x, y) {
                // leftTop
                mouseOut(canvasElement, e, events, callback, 1);
                if (typeof(events.mousemoveLeftTop) === 'function') {
                    events.mousemoveLeftTop(canvasElement, x, y);
                }
                callback.mousemoveLeftTop(x, y);
            }, function (x, y) {
                // leftBottom
                mouseOut(canvasElement, e, events, callback, 2);
                if (typeof(events.mousemoveLeftBottom) === 'function') {
                    events.mousemoveLeftBottom(canvasElement, x, y);
                }
                callback.mousemoveLeftBottom(x, y);
            }, function (x, y) {
                // rightTop
                mouseOut(canvasElement, e, events, callback, 3);
                if (typeof(events.mousemoveRightTop) === 'function') {
                    events.mousemoveRightTop(canvasElement, x, y);
                }
                callback.mousemoveRightTop(x, y);
            }, function (x, y) {
                // rightBottom
                mouseOut(canvasElement, e, events, callback, 4);
                if (typeof(events.mousemoveRightBottom) === 'function') {
                    events.mousemoveRightBottom(canvasElement, x, y);
                }
                callback.mousemoveRightBottom(x, y);
            }, function (x, y) {
                // middleTop
                mouseOut(canvasElement, e, events, callback, 5);
                if (typeof(events.mousemoveMiddleTop) === 'function') {
                    events.mousemoveMiddleTop(canvasElement, x, y);
                }
                callback.mousemoveMiddleTop(x, y);
            }, function (x, y) {
                // middleBottom
                mouseOut(canvasElement, e, events, callback, 6);
                if (typeof(events.mousemoveMiddleBottom) === 'function') {
                    events.mousemoveMiddleBottom(canvasElement, x, y);
                }
                callback.mousemoveMiddleBottom(x, y);
            }, function (x, y) {
                // elsePosition
                mouseOut(canvasElement, e, events, callback, 7);
                if (typeof(events.mousemoveElsePosition) === 'function') {
                    events.mousemoveElsePosition(canvasElement, x, y);
                }
                callback.mousemoveElsePosition(x, y);
            }, function (x, y) {
                // everyPosition
                if (typeof(events.mousemoveEveryPosition) === 'function') {
                    events.mousemoveEveryPosition(canvasElement, x, y, database);
                }
                callback.mousemoveEveryPosition(x, y);
            });
        }, true);

        // mousedown event
        canvasElement.addEventListener("mousedown", function(e) {

            if (e.button === 0) {

                eventsCallBack(e, canvasDiv, function (x, y) {
                    // leftTop
                    if (typeof(events.mousedownLeftTop) === 'function') {
                        events.mousedownLeftTop(canvasElement, x, y);
                    }
                }, function (x, y) {
                    // leftBottom
                    if (typeof(events.mousedownLeftBottom) === 'function') {
                        events.mousedownLeftBottom(canvasElement, x, y);
                    }
                }, function (x, y) {
                    // rightTop
                    if (typeof(events.mousedownRightTop) === 'function') {
                        events.mousedownRightTop(canvasElement, x, y);
                    }
                }, function (x, y) {
                    // rightBottom
                    if (typeof(events.mousedownRightBottom) === 'function') {
                        events.mousedownRightBottom(canvasElement, x, y, database);
                    }
                    callback.mousedownRightBottom(x, y);
                }, function (x, y) {
                    // middleTop
                    if (typeof(events.mousedownMiddleTop) === 'function') {
                        events.mousedownMiddleTop(canvasElement, x, y);
                    }
                }, function (x, y) {
                    // middleBottom
                    if (typeof(events.mousedownMiddleBottom) === 'function') {
                        events.mousedownMiddleBottom(canvasElement, x, y, database);
                    }
                }, function (x, y) {
                    // elsePosition
                    if (typeof(events.mousedownElsePosition) === 'function') {
                        events.mousedownElsePosition(canvasElement, x, y);
                    }
                }, function (x, y) {
                    // everyPosition
                    if (typeof(events.mousedownEveryPosition) === 'function') {
                        events.mousedownEveryPosition(canvasElement, x, y);
                    }
                });
            }
        }, true);

        // mouseup event
        canvasElement.addEventListener("mouseup", function(e) {

            eventsCallBack(e, canvasDiv, function (x, y) {
                // leftTop
                if (typeof(events.mouseupLeftTop) === 'function') {
                    events.mouseupLeftTop(canvasElement, x, y);
                }
            }, function (x, y) {
                // leftBottom
                if (typeof(events.mouseupLeftBottom) === 'function') {
                    events.mouseupLeftBottom(canvasElement, x, y);
                }
            }, function (x, y) {
                // rightTop
                if (typeof(events.mouseupRightTop) === 'function') {
                    events.mouseupRightTop(canvasElement, x, y);
                }
            }, function (x, y) {
                // rightBottom
                if (typeof(events.mouseupRightBottom) === 'function') {
                    events.mouseupRightBottom(canvasElement, x, y);
                }
            }, function (x, y) {
                // middleTop
                if (typeof(events.mouseupMiddleTop) === 'function') {
                    events.mouseupMiddleTop(canvasElement, x, y);
                }
            }, function (x, y) {
                // middleBottom
                if (typeof(events.mouseupMiddleBottom) === 'function') {
                    events.mouseupMiddleBottom(canvasElement, x, y);
                }
            }, function (x, y) {
                // elsePosition
                if (typeof(events.mouseupElsePosition) === 'function') {
                    events.mouseupElsePosition(canvasElement, x, y);
                }
            }, function (x, y) {
                // everyPosition
                if (typeof(events.mouseupEveryPosition) === 'function') {
                    events.mouseupEveryPosition(canvasElement, x, y);
                }
            });
        }, true);

        // click right event
        clickRight(function (e) {

            eventsCallBack(e, canvasDiv, function (x, y) {
                // leftTop
                if (typeof(events.clickRightLeftTop) === 'function') {
                    events.clickRightLeftTop(canvasElement, x, y);
                }
            }, function (x, y) {
                // leftBottom
                if (typeof(events.clickRightLeftBottom) === 'function') {
                    events.clickRightLeftBottom(canvasElement, x, y);
                }
            }, function (x, y) {
                // rightTop
                if (typeof(events.clickRightRightTop) === 'function') {
                    events.clickRightRightTop(canvasElement, x, y);
                }
            }, function (x, y) {
                // rightBottom
                if (typeof(events.clickRightRightBottom) === 'function') {
                    events.clickRightRightBottom(canvasElement, x, y);
                }
            }, function (x, y) {
                // middleTop
                if (typeof(events.clickRightMiddleTop) === 'function') {
                    events.clickRightMiddleTop(canvasElement, x, y);
                }
            }, function (x, y) {
                // middleBottom
                if (typeof(events.clickRightMiddleBottom) === 'function') {
                    events.clickRightMiddleBottom(canvasElement, x, y);
                }
            }, function (x, y) {
                // elsePosition
                if (typeof(events.clickRightElsePosition) === 'function') {
                    events.clickRightElsePosition(canvasElement, x, y);
                }
            }, function (x, y) {
                // everyPosition
                if (typeof(events.clickRightEveryPosition) === 'function') {
                    events.clickRightEveryPosition(canvasElement, x, y);
                }
                callback.clickRightEveryPosition(x, y);
            });
        });

        // move out
        canvasElement.addEventListener("mouseout", function(e) {

            mouseOut(canvasElement, e, events, callback, 0);
        }, true);

        out.ctx = context;
        out.div = canvasDiv;
        out.text = boxText;
        out.textWidth = textWidth;
        out.canvas = canvasElement;
        return out;
    };

    // mouse out event
    var setFrame = function (ele, position, modType, color) {

        var s = 1;
        var textWidth = ele.textWidth;
        var context = ele.ctx;
        var boxText = ele.text;
        var canvasElement = ele.canvas;
        var range = 8 * 300/textWidth;

        var height = canvasElement.height;
        var width = canvasElement.width;

        // drow square
        context.clearRect(0, 0, width, height);
        if (color) {
            context.strokeStyle = color;
            context.lineWidth = 14;
            context.strokeRect(0, 0, width, height);
        }

        // 文字を描画する
        context.fillStyle = "#000000";
        var fontsize = 20;
        context.font = "normal bold " + fontsize * s + "pt 'ＭＳ Ｐ明朝'";
        context.scale(300 / textWidth, 150 / 40);
        context.fillText(boxText, 0, 30);
        context.scale(textWidth / 300, 40 / 150);


        if (modType === 'mod') {

            context.fillStyle = color;

            switch (position) {
                case 'leftTop':
                    context.fillRect(0, 0, range, range);
                    break;
                case 'leftBottom':
                    context.fillRect(0, height - range, range, range);
                    break;
                case 'rightTop':
                    context.fillRect(width - range, 0, range, range);
                    break;
                case 'rightBottom':
                    context.fillRect(width - range, height - range, range, range);
                    break;
                case 'middleTop':
                    context.fillRect(width/2 - range/2, 0, range, range);
                    break;
                case 'middleBottom':
                    context.fillRect(width/2 - range/2, height - range, range, range);
                    break;
                case 3:
                    context.fillRect(width - range, 0, range, range);
                    context.fillRect(width - range, height - range, range, range);
                    context.fillRect(width/2 - range/2, height - range, range, range);
                    break;
                default:
                    break;
            }
        }
    };

    function box2(x, y, r, stretch, rotate, s){
        // var ratio       = 1;
        // // 四角形を描画する（boxc）
        // context.fillStyle = '#FF8C00';
        // context.fillRect( x*s - 2*s, y*s + 125 - 2*s , 4*s, 4*s);
        // context.strokeStyle = '#CC0000';
        // context.strokeRect( x*s - 3*s, y*s + 125 - 3*s , 6*s, 6*s);
        // // 四角形を描画する（1/2*Math.PI :box12）
        // var radian_x2   = Math.cos(rotate * Math.PI / 180 + 90 * Math.PI / 180);
        // var radian_y2   = Math.sin(rotate * Math.PI / 180 + 90 * Math.PI / 180);
        // context.fillStyle = '#FF8C00';
        // context.fillRect( x*s - 2*r*radian_x2/stretch*s - 2*s, y*s - 2*r*radian_y2/stretch*s + 125 - 2*s , 4*s, 4*s);
        // context.strokeStyle = '#CC0000';
        // context.strokeRect( x*s - 2*r*radian_x2/stretch*s - 3*s, y*s - 2*r*radian_y2/stretch*s + 125 - 3*s , 6*s, 6*s);
        // // 四角形を描画する（0*Math.PI :box0）
        // var radian_r1   = Math.sqrt(r*r/stretch/stretch + r*r);//円柱のx端までの距離を算出（平方根）
        // var radian_x1   = Math.cos(rotate * Math.PI / 180 + Math.atan2(r/stretch, r)/Math.PI*180 * Math.PI / 180);//点（r, r/stretch）をroteto分だけ傾ける
        // var radian_y1   = Math.sin(rotate * Math.PI / 180 + Math.atan2(r/stretch, r)/Math.PI*180 * Math.PI / 180);//点（r, r/stretch）をroteto分だけ傾ける
        // context.fillStyle = '#FF8C00';
        // context.fillRect( x*s - radian_r1*radian_x1*s - 2*s, y*s - radian_r1*radian_y1*s + 125 - 2*s , 4*s, 4*s);
        // context.strokeStyle = '#CC0000';
        // context.strokeRect( x*s - radian_r1*radian_x1*s - 3*s, y*s - radian_r1*radian_y1*s + 125 - 3*s , 6*s, 6*s);
        // // 四角形を描画する（1*Math.PI :box1）
        // var radian_r1 = Math.sqrt(r*r/stretch/stretch + r*r);//円柱のx端までの距離を算出（平方根）
        // var radian_x1   = Math.cos(rotate * Math.PI / 180 + Math.atan2(r/stretch, -1*r)/Math.PI*180 * Math.PI / 180);//点（r, -r/stretch）をroteto分だけ傾ける
        // var radian_y1   = Math.sin(rotate * Math.PI / 180 + Math.atan2(r/stretch, -1*r)/Math.PI*180 * Math.PI / 180);//点（r, -r/stretch）をroteto分だけ傾ける
        // context.fillStyle = '#FF8C00';
        // context.fillRect( x*s - radian_r1*radian_x1*s - 2*s, y*s - radian_r1*radian_y1*s + 125 - 2*s , 4*s, 4*s);
        // context.strokeStyle = '#CC0000';
        // context.strokeRect( x*s - radian_r1*radian_x1*s - 3*s, y*s - radian_r1*radian_y1*s + 125 - 3*s , 6*s, 6*s);
    }


    var showCircleLine = function (context, database, size, x, y, pos) {

        var s = size;
        var fontsize = 20;
        context.font = "normal bold " + fontsize * s + "pt 'ＭＳ Ｐ明朝'";
        var textWidth = parseInt(context.measureText(title).width, 10) + 20;

        var posW = 0;
        var posH = 0;
        if (pos === 'rightBottom') {
            posW = textWidth / 2;
            posH = 125 + 40;
        } else {
            posW = 0;
            posH = 125 + 40;
        }

        x = x - posW;
        y = y - posH;
        var r = database.r;
        var title = database.title;
        var rotate = database.rotate;
        var stretch = database.stretch;
        var ratio = 1;

        // 円弧を描画する
        context.translate(x * s , y * s + 125);
        context.rotate(rotate * Math.PI / 180);
        context.scale(1, 1 / stretch);
        context.beginPath();
        context.arc(0, -1 * r * ratio * s, r * ratio * s, 0, 2 * Math.PI, true);
        context.strokeStyle = '#ffa500';
        context.stroke();
        context.scale(1, stretch);
        context.rotate(-1 * rotate * Math.PI / 180);
        context.translate(-1 * x * s , -1 * y * s -125);









/*
        //データの代入
        var ratio =  1;
        var fontsize = 20;
        var metrics<?php echo $a; ?>    = context.measureText("<?php echo isset($table_search[$a]["ps_title"]) ? $table_search[$a]["ps_title"]: "NO" ; ?>");
        var this_x<?php echo $a; ?>     = <?php echo $table_search[$a]["ps_x"]; ?>;
        var this_y<?php echo $a; ?>     = <?php echo $table_search[$a]["ps_y"]; ?>;
        var before_x<?php echo $a; ?>   = this_x<?php echo $a; ?>*size_change - metrics<?php echo $a; ?>.width/2*size_change - 3*size_change;
        var after_x<?php echo $a; ?>    = this_x<?php echo $a; ?>*size_change + metrics<?php echo $a; ?>.width/2*size_change + 6*size_change;
        var before_y<?php echo $a; ?>   = this_y<?php echo $a; ?>*size_change + 2 + 125 - 3*size_change;
        var after_y<?php echo $a; ?>    = this_y<?php echo $a; ?>*size_change + fontsize*size_change + 2 + 125 + 6*size_change;
        
        //boxc
        var before_boxc_x<?php echo $a; ?>  = this_x<?php echo $a; ?>*size_change - 3*size_change;
        var after_boxc_x<?php echo $a; ?>   = this_x<?php echo $a; ?>*size_change + 3*size_change;
        var before_boxc_y<?php echo $a; ?>  = this_y<?php echo $a; ?>*size_change + 125 - 3*size_change;
        var after_boxc_y<?php echo $a; ?>   = this_y<?php echo $a; ?>*size_change + 125 + 3*size_change;
        
        //box12
        var roteto12<?php echo $a; ?>   = Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180;
        var radian_x12<?php echo $a; ?> = Math.cos(roteto12<?php echo $a; ?> * Math.PI / 180 + 90 * Math.PI / 180);
        var radian_y12<?php echo $a; ?> = Math.sin(roteto12<?php echo $a; ?> * Math.PI / 180 + 90 * Math.PI / 180);
        var before_box12_x<?php echo $a; ?> = this_x<?php echo $a; ?>*size_change - 2*<?php echo $table_search[$a]["ps_r"]; ?>*radian_x12<?php echo $a; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>*size_change - 3*size_change;
        var after_box12_x<?php echo $a; ?>  = this_x<?php echo $a; ?>*size_change - 2*<?php echo $table_search[$a]["ps_r"]; ?>*radian_x12<?php echo $a; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>*size_change + 3*size_change;
        var before_box12_y<?php echo $a; ?> = this_y<?php echo $a; ?>*size_change - 2*<?php echo $table_search[$a]["ps_r"]; ?>*radian_y12<?php echo $a; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>*size_change + 125 - 3*size_change;
        var after_box12_y<?php echo $a; ?>  = this_y<?php echo $a; ?>*size_change - 2*<?php echo $table_search[$a]["ps_r"]; ?>*radian_y12<?php echo $a; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>*size_change + 125 + 3*size_change;
        
        //box0
        var roteto0<?php echo $a; ?>    = Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180;
        var radian_r0<?php echo $a; ?>  = Math.sqrt(<?php echo $table_search[$a]["ps_r"]; ?>*<?php echo $table_search[$a]["ps_r"]; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?> + <?php echo $table_search[$a]["ps_r"]; ?>*<?php echo $table_search[$a]["ps_r"]; ?>);//円柱のx端までの距離を算出（平方根）
        var radian_x0<?php echo $a; ?>  = Math.cos(roteto0<?php echo $a; ?> * Math.PI / 180 + Math.atan2(<?php echo $table_search[$a]["ps_r"]; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>)/Math.PI*180 * Math.PI / 180);//点（r, r/stretch）をroteto分だけ傾ける
        var radian_y0<?php echo $a; ?>  = Math.sin(roteto0<?php echo $a; ?> * Math.PI / 180 + Math.atan2(<?php echo $table_search[$a]["ps_r"]; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>)/Math.PI*180 * Math.PI / 180);//点（r, r/stretch）をroteto分だけ傾ける
        var before_box0_x<?php echo $a; ?>  = this_x<?php echo $a; ?>*size_change - radian_r0<?php echo $a; ?>*radian_x0<?php echo $a; ?>*size_change - 3*size_change;
        var after_box0_x<?php echo $a; ?>   = this_x<?php echo $a; ?>*size_change - radian_r0<?php echo $a; ?>*radian_x0<?php echo $a; ?>*size_change + 3*size_change;
        var before_box0_y<?php echo $a; ?>  = this_y<?php echo $a; ?>*size_change - radian_r0<?php echo $a; ?>*radian_y0<?php echo $a; ?>*size_change + 125 - 3*size_change;
        var after_box0_y<?php echo $a; ?>   = this_y<?php echo $a; ?>*size_change - radian_r0<?php echo $a; ?>*radian_y0<?php echo $a; ?>*size_change + 125 + 3*size_change;
        
        //box1
        var roteto1<?php echo $a; ?>    = Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180;
        var radian_r1<?php echo $a; ?>  = Math.sqrt(<?php echo $table_search[$a]["ps_r"]; ?>*<?php echo $table_search[$a]["ps_r"]; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?> + <?php echo $table_search[$a]["ps_r"]; ?>*<?php echo $table_search[$a]["ps_r"]; ?>);//円柱のx端までの距離を算出（平方根）
        var radian_x1<?php echo $a; ?>  = Math.cos(roteto1<?php echo $a; ?> * Math.PI / 180 + Math.atan2(<?php echo $table_search[$a]["ps_r"]; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>, -1*<?php echo $table_search[$a]["ps_r"]; ?>)/Math.PI*180 * Math.PI / 180);//点（r, r/stretch）をroteto分だけ傾ける
        var radian_y1<?php echo $a; ?>  = Math.sin(roteto1<?php echo $a; ?> * Math.PI / 180 + Math.atan2(<?php echo $table_search[$a]["ps_r"]; ?>/<?php echo $table_search[$a]["ps_stretch"]; ?>, -1*<?php echo $table_search[$a]["ps_r"]; ?>)/Math.PI*180 * Math.PI / 180);//点（r, r/stretch）をroteto分だけ傾ける
        var before_box1_x<?php echo $a; ?>  = this_x<?php echo $a; ?>*size_change - radian_r1<?php echo $a; ?>*radian_x1<?php echo $a; ?>*size_change - 3*size_change;
        var after_box1_x<?php echo $a; ?>   = this_x<?php echo $a; ?>*size_change - radian_r1<?php echo $a; ?>*radian_x1<?php echo $a; ?>*size_change + 3*size_change;
        var before_box1_y<?php echo $a; ?>  = this_y<?php echo $a; ?>*size_change - radian_r1<?php echo $a; ?>*radian_y1<?php echo $a; ?>*size_change + 125 - 3*size_change;
        var after_box1_y<?php echo $a; ?>   = this_y<?php echo $a; ?>*size_change - radian_r1<?php echo $a; ?>*radian_y1<?php echo $a; ?>*size_change + 125 + 3*size_change;
        
        //座標調整
        adjustXY(e);
        
        //boxc
        if( before_boxc_x<?php echo $a; ?> < mouseX && mouseX < after_boxc_x<?php echo $a; ?> && before_boxc_y<?php echo $a; ?> < mouseY && mouseY < after_boxc_y<?php echo $a; ?> ){
            document.body.style.cursor = 'move';
            circle(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change, "<?php echo $table_search[$a]["ps_title"]; ?>", "#FF0000");
            text_background2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, size_change, "<?php echo $table_search[$a]["ps_title"]; ?>");
            box2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change);
            cursor_pointer = 1;
            
        }else if( before_x<?php echo $a; ?> < mouseX && mouseX < after_x<?php echo $a; ?> && before_y<?php echo $a; ?> < mouseY && mouseY < after_y<?php echo $a; ?> ){
            document.body.style.cursor = 'pointer';
            circle(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change, "<?php echo $table_search[$a]["ps_title"]; ?>", "#FFCC00");
            text_background2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, size_change, "<?php echo $table_search[$a]["ps_title"]; ?>");
            box2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change);
            cursor_pointer = 1;
            //説明表示
            explain( "<?php echo str_replace("\xe2\x80\xa8", '\\u2028', $table_search[$a]["ps_explain"]); ?>", mouse_windowX, mouseY, "y" );
        
        }else if( after_x<?php echo $a; ?> < mouseX && mouseX < after_x<?php echo $a; ?> + 8*size_change && before_y<?php echo $a; ?> < mouseY && mouseY < before_y<?php echo $a; ?> + 8*size_change ){
            document.body.style.cursor = 'ne-resize';
            circle(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change, "<?php echo $table_search[$a]["ps_title"]; ?>", "#FF0000");
            text_background2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, size_change, "<?php echo $table_search[$a]["ps_title"]; ?>");
            box2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change);
            cursor_pointer = 1;
            
        
        }else if( after_x<?php echo $a; ?> < mouseX && mouseX < after_x<?php echo $a; ?> + 8*size_change && before_y<?php echo $a; ?> + 16*size_change < mouseY && mouseY < before_y<?php echo $a; ?> + 24*size_change ){
            document.body.style.cursor = 'move';
            circle(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change, "<?php echo $table_search[$a]["ps_title"]; ?>", "#FF0000");
            text_background2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, size_change, "<?php echo $table_search[$a]["ps_title"]; ?>");
            box2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change);
            cursor_pointer = 1;
            
        //box12
        }else if( before_box12_x<?php echo $a; ?> < mouseX && mouseX < after_box12_x<?php echo $a; ?> && before_box12_y<?php echo $a; ?> < mouseY && mouseY < after_box12_y<?php echo $a; ?> ){
            document.body.style.cursor = 'move';
            box2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change);
            cursor_pointer = 1;
            
        }else if( before_box0_x<?php echo $a; ?> < mouseX && mouseX < after_box0_x<?php echo $a; ?> && before_box0_y<?php echo $a; ?> < mouseY && mouseY < after_box0_y<?php echo $a; ?> ){
            document.body.style.cursor = 'move';
            box2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change);
            cursor_pointer = 1;
            
        }else if( before_box1_x<?php echo $a; ?> < mouseX && mouseX < after_box1_x<?php echo $a; ?> && before_box1_y<?php echo $a; ?> < mouseY && mouseY < after_box1_y<?php echo $a; ?> ){
            document.body.style.cursor = 'move';
            box2(<?php echo $table_search[$a]["ps_x"]; ?>, <?php echo $table_search[$a]["ps_y"]; ?>, <?php echo $table_search[$a]["ps_r"]; ?>, <?php echo $table_search[$a]["ps_stretch"]; ?>, Math.atan2(<?php echo $table_search[$a]["ps_radian_y"]; ?>, <?php echo $table_search[$a]["ps_radian_x"]; ?>)/Math.PI*180, size_change);
            cursor_pointer = 1;
            
        }
*/



    };

    var showCircle = function (context, database, size) {
        var s = size;
        var x = database.x;
        var y = database.y;
        var r = database.r;
        var title = database.title;
        var rotate = database.rotate;
        var stretch = database.stretch;
        var ratio = 1;

        // 円弧を描画する
        context.translate(x * s , y * s + 125);
        context.rotate(rotate * Math.PI / 180);
        context.scale(1, 1 / stretch);
        context.beginPath();
        context.arc(0, -1 * r * ratio * s, r * ratio * s, 0, 2 * Math.PI, true);
        var grad = context.createRadialGradient(0, 0, 0, 0, 0, (r * ratio * s) / stretch);

        /* グラデーション終点のオフセットと色をセット */
        grad.addColorStop(0, '#F0FFF5');
        grad.addColorStop(0.5, '#DFFFEA');
        grad.addColorStop(1, '#A6FFC2');

        /* グラデーションをfillStyleプロパティにセット */
        context.fillStyle = grad;
        context.fill();
        context.scale(1, stretch);
        context.rotate(-1 * rotate * Math.PI / 180 );
        context.translate(-1 * x * s , -1 * y * s -125);
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

    var eventsCallBack = function (e, canvasDiv, leftTop, leftBottom, rightTop, rightBottom, middleTop, middleBottom, elsePosition, everyPosition) {

        var rect = e.target.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;

        // left top box
        if (
            (mouseX < 8) &&
            (mouseY < 8)
        ) {
            leftTop(mouseX, mouseY);

        // left bottom box
        } else if (
            (mouseX < 8) &&
            (mouseY > parseInt(canvasDiv.style.height) - 8)
        ) {
            leftBottom(mouseX, mouseY);

        // right bottom box
        } else if (
            (mouseX > parseInt(canvasDiv.style.width) - 8) &&
            (mouseY < 8)
        ) {
            rightTop(mouseX, mouseY);

        // right bottom box
        } else if (
            (mouseX > parseInt(canvasDiv.style.width) - 8) &&
            (mouseY > parseInt(canvasDiv.style.height) - 8)
        ) {
            rightBottom(mouseX, mouseY);

        // middle top box
        } else if (
            (parseInt(canvasDiv.style.width) / 2 - 8 / 2 < mouseX && mouseX < parseInt(canvasDiv.style.width) / 2 + 8 / 2) &&
            (mouseY < 8)
        ) {
            middleTop(mouseX, mouseY);

        // middle bottom box
        } else if (
            (parseInt(canvasDiv.style.width) / 2 - 8 / 2 < mouseX && mouseX < parseInt(canvasDiv.style.width) / 2 + 8 / 2) &&
            (mouseY > parseInt(canvasDiv.style.height) - 8)
        ) {
            middleBottom(mouseX, mouseY);

        // else position
        } else {
            elsePosition(mouseX, mouseY);
        }

        // every position
        everyPosition(mouseX, mouseY);
    };

    // mouse out event
    var mouseOut = function (canvasElement, e, events, callback, field) {

        if (this.mouseField !== field) {

            switch (this.mouseField) {
                case 1:
                    if (typeof(events.mouseoutLeftTop) === 'function') {
                        events.mouseoutLeftTop(canvasElement);
                    }
                    break;
                case 2:
                    if (typeof(events.mouseoutLeftBottom) === 'function') {
                        events.mouseoutLeftBottom(canvasElement);
                    }
                    break;
                case 3:
                    if (typeof(events.mouseoutRightTop) === 'function') {
                        events.mouseoutRightTop(canvasElement);
                    }
                    callback.mouseoutRightTop();
                    break;
                case 4:
                    if (typeof(events.mouseoutRightBottom) === 'function') {
                        events.mouseoutRightBottom(canvasElement);
                    }
                    callback.mouseoutRightBottom();
                    break;
                case 5:
                    if (typeof(events.mouseoutMiddleTop) === 'function') {
                        events.mouseoutMiddleTop(canvasElement);
                    }
                    break;
                case 6:
                    if (typeof(events.mouseoutMiddleBottom) === 'function') {
                        events.mouseoutMiddleBottom(canvasElement);
                    }
                    callback.mouseoutMiddleBottom();
                    break;
                case 7:
                    if (typeof(events.mouseoutElsePosition) === 'function') {
                        events.mouseoutElsePosition(canvasElement);
                    }
                    break;
            }

            this.mouseField = field;

            switch (field) {
                case 0:
                    if (typeof(events.mouseoutEveryPosition) === 'function') {
                        events.mouseoutEveryPosition(canvasElement);
                    }
                    callback.mouseoutEveryPosition();
                    break;
            }
        }
    };

    ns.prototype = eventCircle.prototype;

}(this, 'mamsa.eventCircle'));