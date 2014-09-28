(function(global, namespace) {

    /**
    * Mechanism and Approach eventBox for Social Activity (MAMSA)
    * 
    * @module mamsa
    **/
    var ns = mamsa.addNamespace(namespace);

    /**
    * event box
    *
    * @class eventBox
    */
    var eventBox = function () {};
    var globalRatio = 1;
    var moveX = 0;
    var moveY = 0;

    eventBox.prototype = {

        _popUpFlags: {}, 

        /**
        * setType1 is basic eventBox with moveEvent, clickEvent, clickRightEvent, mouseOutEvent <br /><br />
        * events callbacks are bellow <br />
        * events.mousemoveLeftTop events.clickLeftTop events.clickRightLeftTop events.mouseoutLeftTop <br />
        * events.mousemoveLeftBottom events.clickLeftBottom events.clickRightLeftBottom events.mouseoutLeftBottom <br />
        * events.mousemoveRightTop events.clickRightTop events.clickRightRightTop events.mouseoutRightTop <br />
        * events.mousemoveRightBottom events.clickRightBottom events.clickRightRightBottom events.mouseoutRightBottom <br />
        * events.mousemoveMiddleTop events.clickMiddleTop events.clickRightMiddleTop events.mouseoutMiddleTop <br />
        * events.mousemoveMiddleBottom events.clickMiddleBottom events.clickRightMiddleBottom events.mouseoutMiddleBottom <br />
        * events.mousemoveElsePosition events.clickElsePosition events.clickRightElsePosition events.mouseoutElsePosition <br />
        * events.mousemoveEveryPosition events.clickEveryPosition events.clickRightEveryPosition events.mouseoutEveryPosition 
        *
        * @method setType1
        * @param {string} tag name
        * @param {number} position x
        * @param {number} position y
        * @param {number} width
        * @param {number} height
        * @param {object} callback with events.<event name>
        */
        setType1: function (disp, left, top, width, height, events) {

            var element = this._setCanvas(disp, left, top, width, height, events);
        },


        /**
        * setType2 is text eventBox with moveEvent, clickEvent, clickRightEvent, mouseOutEvent <br /><br />
        * events callbacks are bellow <br />
        * events.mousemoveLeftTop events.clickLeftTop events.clickRightLeftTop events.mouseoutLeftTop <br />
        * events.mousemoveLeftBottom events.clickLeftBottom events.clickRightLeftBottom events.mouseoutLeftBottom <br />
        * events.mousemoveRightTop events.clickRightTop events.clickRightRightTop events.mouseoutRightTop <br />
        * events.mousemoveRightBottom events.clickRightBottom events.clickRightRightBottom events.mouseoutRightBottom <br />
        * events.mousemoveMiddleTop events.clickMiddleTop events.clickRightMiddleTop events.mouseoutMiddleTop <br />
        * events.mousemoveMiddleBottom events.clickMiddleBottom events.clickRightMiddleBottom events.mouseoutMiddleBottom <br />
        * events.mousemoveElsePosition events.clickElsePosition events.clickRightElsePosition events.mouseoutElsePosition <br />
        * events.mousemoveEveryPosition events.clickEveryPosition events.clickRightEveryPosition events.mouseoutEveryPosition 
        *
        * @method setType2
        * @param {string} tag name
        * @param {number} position x
        * @param {number} position y
        * @param {number} width
        * @param {number} height
        * @param {object} callback with events.<event name>
        */
        setType2: function (disp, id, left, top, text, type, events) {

            var me = this;
            var ele = this._setCanvas(disp, id, left, top, text, events, {

                mousemoveLeftTop : function (x, y) {
                    me._setFrame(ele, 3, type, '#ff0000');
                    me._setText(text, ele);
                },
                mousemoveLeftBottom : function (x, y) {
                    me._setFrame(ele, 3, type, '#ff0000');
                    me._setText(text, ele);
                },
                mousemoveMiddleTop : function (x, y) {
                    me._setFrame(ele, 3, type, '#ff0000');
                    me._setText(text, ele);
                },
                mousemoveMiddleBottom : function (x, y) {
                    me._setFrame(ele, 'middleBottom', type, '#FFA500');
                    me._setText(text, ele);
                },
                mousemoveRightTop : function (x, y) {
                    me._setFrame(ele, 'rightTop', type, '#FFA500');
                    me._setText(text, ele);
                },
                mousemoveRightBottom : function (x, y) {
                    me._setFrame(ele, 'rightBottom', type, '#FFA500');
                    me._setText(text, ele);
                },
                mousemoveElsePosition : function (x, y) {
                    me._setFrame(ele, 3, type, '#ff0000');
                    me._setText(text, ele);
                },
                mouseoutEveryPosition : function (x, y) {
                    me._setFrame(ele, null, type, '#0000ff');
                    me._setText(text, ele);
                },
                clickRightEveryPosition : function (x, y) {
                }
            });
 
            this._changePosition(ele, left, top, ele.textWidth, 40);

            me._setFrame(ele, null, type, '#0000ff');
            this._setText(text, ele);
        },



        /**
        * setType3 is text-popup eventBox with moveEvent, clickEvent, clickRightEvent, mouseOutEvent <br /><br />
        * events callbacks are bellow <br />
        * events.mousemoveLeftTop events.clickLeftTop events.clickRightLeftTop events.mouseoutLeftTop <br />
        * events.mousemoveLeftBottom events.clickLeftBottom events.clickRightLeftBottom events.mouseoutLeftBottom <br />
        * events.mousemoveRightTop events.clickRightTop events.clickRightRightTop events.mouseoutRightTop <br />
        * events.mousemoveRightBottom events.clickRightBottom events.clickRightRightBottom events.mouseoutRightBottom <br />
        * events.mousemoveMiddleTop events.clickMiddleTop events.clickRightMiddleTop events.mouseoutMiddleTop <br />
        * events.mousemoveMiddleBottom events.clickMiddleBottom events.clickRightMiddleBottom events.mouseoutMiddleBottom <br />
        * events.mousemoveElsePosition events.clickElsePosition events.clickRightElsePosition events.mouseoutElsePosition <br />
        * events.mousemoveEveryPosition events.clickEveryPosition events.clickRightEveryPosition events.mouseoutEveryPosition 
        *
        * @method setType3
        * @param {string} tag name
        * @param {number} position x
        * @param {number} position y
        * @param {number} width
        * @param {number} height
        * @param {object} callback with events.<event name>
        */
        setType3: function (disp, id, left, top, text, textPop, type, events) {

            var me = this;
            var ele = this._setCanvas(disp, id, left, top, text, events, {

                mousemoveLeftTop : function (x, y) {
                    me._setFrame(ele, 3, type, '#ff0000');
                    me._setText(text, ele);
                },
                mousemoveLeftBottom : function (x, y) {
                    me._setFrame(ele, 3, type, '#ff0000');
                    me._setText(text, ele);
                },
                mousemoveMiddleTop : function (x, y) {
                    me._setFrame(ele, 3, type, '#ff0000');
                    me._setText(text, ele);
                },
                mousemoveMiddleBottom : function (x, y) {
                    me._setFrame(ele, 'middleBottom', type, '#FFA500');
                    me._setText(text, ele);
                },
                mousemoveRightTop : function (x, y) {
                    me._setFrame(ele, 'rightTop', type, '#FFA500');
                    me._setText(text, ele);
                },
                mousemoveRightBottom : function (x, y) {
                    me._setFrame(ele, 'rightBottom', type, '#FFA500');
                    me._setText(text, ele);
                },
                mousemoveElsePosition : function (x, y) {
                    me._setFrame(ele, 3, type, '#ff0000');
                    me._setText(text, ele);
                },
                mousemoveElsePosition : function (x, y) {
                    me._setFrame(ele, 3, type, '#ff0000');
                    me._setText(text, ele);
                    me._movePopUp(x + left + 10, y + top - 10, elePop, true, me._popUpFlags.id);
                },
                mouseoutEveryPosition : function (x, y) {
                    me._setFrame(ele, null, type, '#0000ff');
                    me._setText(text, ele);
                    me._movePopUp(x, y, elePop, false);
                },
                mouseoutEveryPosition : function (x, y) {
                    me._setFrame(ele, null, type, '#0000ff');
                    me._setText(text, ele);
                    me._movePopUp(x, y, elePop, false, me._popUpFlags.id);
                },
                clickRightEveryPosition : function (x, y) {
                    me._popUpFlags.id = false;
                }
            });

            var elePop = this._setPopUp(disp, id, textPop, events, {

                mousemoveLeftTop : function (x, y) {
                },
                mousemoveLeftBottom : function (x, y) {
                },
                mousemoveMiddleTop : function (x, y) {
                },
                mousemoveMiddleBottom : function (x, y) {
                },
                mousemoveRightTop : function (x, y) {
                },
                mousemoveRightBottom : function (x, y) {
                },
                mousemoveElsePosition : function (x, y) {
                },
                mouseoutEveryPosition : function (x, y) {
                }
            });

            this._changePosition(ele, left, top, ele.textWidth, 40);

            me._setFrame(ele, null, type, '#0000ff');
            this._setText(text, ele);
        },



        _movePopUp: function (mouseX, mouseY, elePop, flag, popUpFlag) {

            if (popUpFlag) {
                if (flag) {
                    elePop.div.style.left = mouseX + 'px';
                    elePop.div.style.top = mouseY + 'px';
                } else {
                    elePop.div.style.left = '-10000px';
                    elePop.div.style.top = '-10000px';
                }
            }
        },

        // mouse out event
        _setPopUpFrame: function (ele, position, type, color) {

            var textWidth = ele.textWidth;
            var context = ele.ctx;
            var canvasElement = ele.canvas;
            var range = 8 * 300/textWidth;

            var height = canvasElement.height;
            var width = canvasElement.width;

            // drow square
            context.clearRect(0, 0, width, height);
            context.strokeStyle = color;
            context.lineWidth = 14;
            context.strokeRect(0, 0, width, height);

            if (type === 'mod') {

                switch (position) {
                    case 'leftTop':
                        
                        break;
                    case 'leftBottom':
                        
                        break;
                    case 'rightTop':
                        alert('rightTop');
                        break;
                    case 'rightBottom':
                        
                        break;
                    case 'middleTop':
                        
                        break;
                    case 'middleBottom':
                        
                        break;
                    default:
                        break;
                }
            }
        },

        // mouse out event
        _setPopUp: function (disp, id, textPop, events, callback) {

            var out = {};

            // set div box
            var canvasDiv = document.createElement('div');
            canvasDiv.id = 'pop' + id;
            canvasDiv.style.position = 'absolute';
            canvasDiv.style.top = '-10000px';
            canvasDiv.style.left = '-10000px';
            canvasDiv.style.width = '300px'; // initial length

            var canvasElement = document.createElement('canvas');
            canvasElement.id = 'popEle' + id;
            canvasElement.style.position = 'absolute';
            canvasElement.style.top = '0px';
            canvasElement.style.left = '0px';
            canvasElement.style.width = '300px';

            // set popUp text box
            var popTxt = document.createElement('div');
            popTxt.id = 'popTxt' + id;
            popTxt.style.position = 'absolute';
            popTxt.style.top = '0px';
            popTxt.style.left = '0px';
            popTxt.style.width = '300px'; // initial length
            // popTxt.style.backgroundColor = 'green';
            popTxt.innerHTML = '説明内容　　　　　　　　　　　　　　　 [X]<br />' + textPop;

            // append Child elements
            document.getElementById(disp).appendChild(canvasDiv);
            document.getElementById('pop' + id).appendChild(canvasElement);
            document.getElementById('pop' + id).appendChild(popTxt);

            // get popTxt height, then reset popUp height.
            var popTxtHeight = popTxt.clientHeight;
            canvasDiv.style.height = popTxtHeight + 'px';
            canvasElement.style.height = popTxtHeight + 'px';

            this._popUpFlags.id = true;

            var ctx = canvasElement.getContext('2d');
            ctx.font = "normal bold " + 10 + "pt 'ＭＳ Ｐ明朝'";
            var textWidth = ctx.measureText(textPop).width + 20;

            // set popUp view
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
            ctx.fillRect(0, 0, 300, 150);

            // this
            var me = this;

            // move event
            canvasElement.addEventListener('mousemove', function(e) {

                me._eventsCallBack(e, canvasDiv, function (x, y) {
                    // leftTop
                    me._mouseOut(canvasElement, e, events, callback, 1);
                    // events.mousemoveLeftTop(canvasElement, x, y);
                    // callback.mousemoveLeftTop(x, y);
                }, function (x, y) {
                    // leftBottom
                    me._mouseOut(canvasElement, e, events, callback, 2);
                    // events.mousemoveLeftBottom(canvasElement, x, y);
                    // callback.mousemoveLeftBottom(x, y);
                }, function (x, y) {
                    // rightTop
                    me._mouseOut(canvasElement, e, events, callback, 3);
                    // events.mousemoveRightTop(canvasElement, x, y);
                    // callback.mousemoveRightTop(x, y);
                }, function (x, y) {
                    // rightBottom
                    me._mouseOut(canvasElement, e, events, callback, 4);
                    // events.mousemoveRightBottom(canvasElement, x, y);
                    // callback.mousemoveRightBottom(x, y);
                }, function (x, y) {
                    // middleTop
                    me._mouseOut(canvasElement, e, events, callback, 5);
                    // events.mousemoveMiddleTop(canvasElement, x, y);
                    // callback.mousemoveMiddleTop(x, y);
                }, function (x, y) {
                    // middleBottom
                    me._mouseOut(canvasElement, e, events, callback, 6);
                    // events.mousemoveMiddleBottom(canvasElement, x, y);
                    // callback.mousemoveMiddleBottom(x, y);
                }, function (x, y) {
                    // elsePosition
                    me._mouseOut(canvasElement, e, events, callback, 7);
                    // events.mousemoveElsePosition(canvasElement, x, y);
                    // callback.mousemoveElsePosition(x, y);
                }, function (x, y) {
                    // everyPosition
                    // events.mousemoveEveryPosition(canvasElement, x, y);
                });
            }, true);

            // click event
            canvasElement.addEventListener("mousedown", function(e) {

                if (e.button === 0) {

                    me._eventsCallBack(e, canvasDiv, function (x, y) {
                        // leftTop
                        events.clickLeftTop(canvasElement, x, y);
                    }, function (x, y) {
                        // leftBottom
                        events.clickLeftBottom(canvasElement, x, y);
                    }, function (x, y) {
                        // rightTop
                        events.clickRightTop(canvasElement, x, y);
                    }, function (x, y) {
                        // rightBottom
                        events.clickRightBottom(canvasElement, x, y);
                    }, function (x, y) {
                        // middleTop
                        events.clickMiddleTop(canvasElement, x, y);
                    }, function (x, y) {
                        // middleBottom
                        events.clickMiddleBottom(canvasElement, x, y);
                    }, function (x, y) {
                        // elsePosition
                        events.clickElsePosition(canvasElement, x, y);
                    }, function (x, y) {
                        // everyPosition
                        events.clickEveryPosition(canvasElement, x, y);
                    });
                }
            }, true);

            // click right event
            this._clickRight(function (e) {

                me._eventsCallBack(e, canvasDiv, function (x, y) {
                    // leftTop
                    events.clickRightLeftTop(canvasElement, x, y);
                }, function (x, y) {
                    // leftBottom
                    events.clickRightLeftBottom(canvasElement, x, y);
                }, function (x, y) {
                    // rightTop
                    events.clickRightRightTop(canvasElement, x, y);
                }, function (x, y) {
                    // rightBottom
                    events.clickRightRightBottom(canvasElement, x, y);
                }, function (x, y) {
                    // middleTop
                    events.clickRightMiddleTop(canvasElement, x, y);
                }, function (x, y) {
                    // middleBottom
                    events.clickRightMiddleBottom(canvasElement, x, y);
                }, function (x, y) {
                    // elsePosition
                    events.clickRightElsePosition(canvasElement, x, y);
                }, function (x, y) {
                    // everyPosition
                    events.clickRightEveryPosition(canvasElement, x, y);
                });
            });

            // move out
            canvasElement.addEventListener("mouseout", function(e) {

                me._mouseOut(canvasElement, e, events, callback, 0);
            }, true);

            out.ctx = ctx;
            out.textWidth = textWidth;
            out.div = canvasDiv;
            out.canvas = canvasElement;
            return out;
        },

        // mouse out event
        _setFrame: function (ele, position, type, color) {

            var textWidth = ele.textWidth;
            var context = ele.ctx;
            var canvasElement = ele.canvas;
            var range = 8 * 300/textWidth;

            var height = canvasElement.height;
            var width = canvasElement.width;

            // drow square
            context.clearRect(0, 0, width, height);
            context.strokeStyle = color;
            context.lineWidth = 14;
            context.strokeRect(0, 0, width, height);

            if (type === 'mod') {

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
        },

        // mouse out event
        _setText: function (text, ele) {

            var textWidth = ele.textWidth;
            var context = ele.ctx;
            var canvasElement = ele.canvas;

            context.scale(300/textWidth, 150/20);
            context.translate(0 , -2);
            context.fillStyle = '#000000';
            context.fillText(text,  10 , 18);
            context.translate(0 , 2);
            context.scale(textWidth/300, 20/150);
        },

        // mouse out event
        _setCanvas: function (disp, id, left, top, text, events, callback) {

            var out = {};

            // set div box
            var canvasDiv = document.createElement('div');
            canvasDiv.id = 'box' + id;
            canvasDiv.style.position = 'absolute';
            canvasDiv.style.top = top + 'px';
            canvasDiv.style.left = left + 'px';
            canvasDiv.style.width = '300px'; // initial length
            canvasDiv.style.height = '40px'; // initial length
            // canvasDiv.style.backgroundColor = 'blue';

            var canvasElement = document.createElement('canvas');
            canvasElement.id = 'ele' + id;
            canvasElement.style.width = '300px';
            canvasElement.style.height = '40px';

            document.getElementById(disp).appendChild(canvasDiv);
            document.getElementById('box' + id).appendChild(canvasElement);

            var ctx = canvasElement.getContext('2d');
            ctx.font = "normal bold " + 10 + "pt 'ＭＳ Ｐ明朝'";
            var textWidth = ctx.measureText(text).width + 20;

            // this
            var me = this;

            // move event
            canvasElement.addEventListener('mousemove', function(e) {

                me._eventsCallBack(e, canvasDiv, function (x, y) {
                    // leftTop
                    me._mouseOut(canvasElement, e, events, callback, 1);
                    events.mousemoveLeftTop(canvasElement, x, y);
                    callback.mousemoveLeftTop(x, y);
                }, function (x, y) {
                    // leftBottom
                    me._mouseOut(canvasElement, e, events, callback, 2);
                    events.mousemoveLeftBottom(canvasElement, x, y);
                    callback.mousemoveLeftBottom(x, y);
                }, function (x, y) {
                    // rightTop
                    me._mouseOut(canvasElement, e, events, callback, 3);
                    events.mousemoveRightTop(canvasElement, x, y);
                    callback.mousemoveRightTop(x, y);
                }, function (x, y) {
                    // rightBottom
                    me._mouseOut(canvasElement, e, events, callback, 4);
                    events.mousemoveRightBottom(canvasElement, x, y);
                    callback.mousemoveRightBottom(x, y);
                }, function (x, y) {
                    // middleTop
                    me._mouseOut(canvasElement, e, events, callback, 5);
                    events.mousemoveMiddleTop(canvasElement, x, y);
                    callback.mousemoveMiddleTop(x, y);
                }, function (x, y) {
                    // middleBottom
                    me._mouseOut(canvasElement, e, events, callback, 6);
                    events.mousemoveMiddleBottom(canvasElement, x, y);
                    callback.mousemoveMiddleBottom(x, y);
                }, function (x, y) {
                    // elsePosition
                    me._mouseOut(canvasElement, e, events, callback, 7);
                    events.mousemoveElsePosition(canvasElement, x, y);
                    callback.mousemoveElsePosition(x, y);
                }, function (x, y) {
                    // everyPosition
                    events.mousemoveEveryPosition(canvasElement, x, y);
                });
            }, true);

            // click event
            canvasElement.addEventListener("mousedown", function(e) {

                if (e.button === 0) {

                    me._eventsCallBack(e, canvasDiv, function (x, y) {
                        // leftTop
                        events.clickLeftTop(canvasElement, x, y);
                    }, function (x, y) {
                        // leftBottom
                        events.clickLeftBottom(canvasElement, x, y);
                    }, function (x, y) {
                        // rightTop
                        events.clickRightTop(canvasElement, x, y);
                    }, function (x, y) {
                        // rightBottom
                        events.clickRightBottom(canvasElement, x, y);
                    }, function (x, y) {
                        // middleTop
                        events.clickMiddleTop(canvasElement, x, y);
                    }, function (x, y) {
                        // middleBottom
                        events.clickMiddleBottom(canvasElement, x, y);
                    }, function (x, y) {
                        // elsePosition
                        events.clickElsePosition(canvasElement, x, y);
                    }, function (x, y) {
                        // everyPosition
                        events.clickEveryPosition(canvasElement, x, y);
                    });
                }
            }, true);

            // click right event
            this._clickRight(function (e) {

                me._eventsCallBack(e, canvasDiv, function (x, y) {
                    // leftTop
                    events.clickRightLeftTop(canvasElement, x, y);
                }, function (x, y) {
                    // leftBottom
                    events.clickRightLeftBottom(canvasElement, x, y);
                }, function (x, y) {
                    // rightTop
                    events.clickRightRightTop(canvasElement, x, y);
                }, function (x, y) {
                    // rightBottom
                    events.clickRightRightBottom(canvasElement, x, y);
                }, function (x, y) {
                    // middleTop
                    events.clickRightMiddleTop(canvasElement, x, y);
                }, function (x, y) {
                    // middleBottom
                    events.clickRightMiddleBottom(canvasElement, x, y);
                }, function (x, y) {
                    // elsePosition
                    events.clickRightElsePosition(canvasElement, x, y);
                }, function (x, y) {
                    // everyPosition
                    events.clickRightEveryPosition(canvasElement, x, y);
                    callback.clickRightEveryPosition(x, y);
                });
            });

            // move out
            canvasElement.addEventListener("mouseout", function(e) {

                me._mouseOut(canvasElement, e, events, callback, 0);
            }, true);

            out.ctx = ctx;
            out.textWidth = textWidth;
            out.div = canvasDiv;
            out.canvas = canvasElement;
            return out;
        },

        // mouse out event
        _changePosition: function (ele, left, top, width, height) {

            var canvasDiv = ele.div;
            var canvasElement = ele.canvas;
            canvasDiv.style.top = top + 'px';
            canvasDiv.style.left = left + 'px';
            canvasDiv.style.width = width + 'px';
            canvasDiv.style.height = height + 'px';
            canvasElement.style.width = width + 'px';
            canvasElement.style.height = height + 'px';
        },

        // mouse out event
        _mouseOut: function (canvasElement, e, events, callback, field) {

            if (this.mouseField !== field) {

                switch (this.mouseField) {
                    case 1:
                        events.mouseoutLeftTop(canvasElement);
                        break;
                    case 2:
                        events.mouseoutLeftBottom(canvasElement);
                        break;
                    case 3:
                        events.mouseoutRightTop(canvasElement);
                        break;
                    case 4:
                        events.mouseoutRightBottom(canvasElement);
                        break;
                    case 5:
                        events.mouseoutMiddleTop(canvasElement);
                        break;
                    case 6:
                        events.mouseoutMiddleBottom(canvasElement);
                        break;
                    case 7:
                        events.mouseoutElsePosition(canvasElement);
                        break;
                }

                this.mouseField = field;

                switch (field) {
                    case 0:
                        events.mouseoutEveryPosition(canvasElement);
                        callback.mouseoutEveryPosition();
                        break;
                }
            }
        },

        _clickRight: function (callback) {

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
        },

        _eventsCallBack: function (e, canvasDiv, leftTop, leftBottom, rightTop, rightBottom, middleTop, middleBottom, elsePosition, everyPosition) {

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
                (parseInt(canvasDiv.style.width)/2 - 4 < mouseX && mouseX < parseInt(canvasDiv.style.width)/2 + 4) &&
                (mouseY < 8)
            ) {
                middleTop(mouseX, mouseY);

            // middle bottom box
            } else if (
                (parseInt(canvasDiv.style.width)/2 - 4 < mouseX && mouseX < parseInt(canvasDiv.style.width)/2 + 4) &&
                (mouseY > parseInt(canvasDiv.style.height) - 8)
            ) {
                middleBottom(mouseX, mouseY);

            // else position
            } else {
                elsePosition(mouseX, mouseY);
            }

            // every position
            everyPosition(mouseX, mouseY);
        }
    };

    ns.prototype = eventBox.prototype;

}(this, 'mamsa.eventBox'));