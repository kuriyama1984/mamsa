(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module storage
    **/
    var ns = storage.addNamespace(namespace);

    /**
    * event box with canvas
    *
    * @class eventBox
    */
    var eventBox = function () {};
    var canvasDiv = null;

    eventBox.prototype = {

        /**
        * setType1 is eventBox with moveEvent, clickEvent, clickRightEvent, mouseOutEvent <br /><br />
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
        * @param {object} callback with events.<event name>
        */
        setType1: function (disp, left, top, width, height, events) {

            // set div box
            canvasDiv = document.createElement('div');
            canvasDiv.id = 'canvasDiv';
            canvasDiv.style.position = 'absolute';
            canvasDiv.style.top = top + 'px';
            canvasDiv.style.left = left + 'px';
            canvasDiv.style.width = width + 'px';
            canvasDiv.style.height = height + 'px';
            canvasDiv.style.backgroundColor = 'blue';

            canvasElement = document.createElement('canvas');
            canvasElement.id = 'canvasElement';
            canvasElement.style.width = width + 'px';
            canvasElement.style.height = height + 'px';

            document.getElementById(disp).appendChild(canvasDiv);
            document.getElementById('canvasDiv').appendChild(canvasElement);

            // this
            var me = this;

            // move event
            canvasElement.addEventListener("mousemove", function(e) {

                me._eventsCallBack(e, function () {
                    // leftTop
                    me._mouseOut(canvasElement, e, events, 1);
                    events.mousemoveLeftTop(canvasElement);
                }, function () {
                    // leftBottom
                    me._mouseOut(canvasElement, e, events, 2);
                    events.mousemoveLeftBottom(canvasElement);
                }, function () {
                    // rightTop
                    me._mouseOut(canvasElement, e, events, 3);
                    events.mousemoveRightTop(canvasElement);
                }, function () {
                    // rightBottom
                    me._mouseOut(canvasElement, e, events, 4);
                    events.mousemoveRightBottom(canvasElement);
                }, function () {
                    // middleTop
                    me._mouseOut(canvasElement, e, events, 5);
                    events.mousemoveMiddleTop(canvasElement);
                }, function () {
                    // middleBottom
                    me._mouseOut(canvasElement, e, events, 6);
                    events.mousemoveMiddleBottom(canvasElement);
                }, function () {
                    // elsePosition
                    me._mouseOut(canvasElement, e, events, 7);
                    events.mousemoveElsePosition(canvasElement);
                }, function () {
                    // everyPosition
                    events.mousemoveEveryPosition(canvasElement);
                });
            }, true);

            // click event
            canvasElement.addEventListener("mousedown", function(e) {

                if (e.button === 0) {

                    me._eventsCallBack(e, function () {
                        // leftTop
                        events.clickLeftTop(canvasElement);
                    }, function () {
                        // leftBottom
                        events.clickLeftBottom(canvasElement);
                    }, function () {
                        // rightTop
                        events.clickRightTop(canvasElement);
                    }, function () {
                        // rightBottom
                        events.clickRightBottom(canvasElement);
                    }, function () {
                        // middleTop
                        events.clickMiddleTop(canvasElement);
                    }, function () {
                        // middleBottom
                        events.clickMiddleBottom(canvasElement);
                    }, function () {
                        // elsePosition
                        events.clickElsePosition(canvasElement);
                    }, function () {
                        // everyPosition
                        events.clickEveryPosition(canvasElement);
                    });
                }
            }, true);

            // click right event
            this._clickRight(function (e) {

                me._eventsCallBack(e, function () {
                    // leftTop
                    events.clickRightLeftTop(canvasElement);
                }, function () {
                    // leftBottom
                    events.clickRightLeftBottom(canvasElement);
                }, function () {
                    // rightTop
                    events.clickRightRightTop(canvasElement);
                }, function () {
                    // rightBottom
                    events.clickRightRightBottom(canvasElement);
                }, function () {
                    // middleTop
                    events.clickRightMiddleTop(canvasElement);
                }, function () {
                    // middleBottom
                    events.clickRightMiddleBottom(canvasElement);
                }, function () {
                    // elsePosition
                    events.clickRightElsePosition(canvasElement);
                }, function () {
                    // everyPosition
                    events.clickRightEveryPosition(canvasElement);
                });
            });

            // move out
            canvasElement.addEventListener("mouseout", function(e) {

                me._mouseOut(canvasElement, e, events, 0);
            }, true);
        },

        // mouse out event
        _mouseOut: function (canvasElement, e, events, field) {

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

        _eventsCallBack: function (e, leftTop, leftBottom, rightTop, rightBottom, middleTop, middleBottom, elsePosition, everyPosition) {

            var rect = e.target.getBoundingClientRect();
            var mouseX = e.clientX - rect.left;
            var mouseY = e.clientY - rect.top;

            // left top box
            if (
                (mouseX < 8) &&
                (mouseY < 8)
            ) {
                leftTop();

            // left bottom box
            } else if (
                (mouseX < 8) &&
                (mouseY > parseInt(canvasDiv.style.height) -8)
            ) {
                leftBottom();

            // right bottom box
            } else if (
                (mouseX > parseInt(canvasDiv.style.width) -8) &&
                (mouseY < 8)
            ) {
                rightTop();

            // right bottom box
            } else if (
                (mouseX > parseInt(canvasDiv.style.width) -8) &&
                (mouseY > parseInt(canvasDiv.style.height) -8)
            ) {
                rightBottom();

            // middle top box
            } else if (
                (parseInt(canvasDiv.style.width)/2 -4 < mouseX && mouseX < parseInt(canvasDiv.style.width)/2 +4) &&
                (mouseY < 8)
            ) {
                middleTop();

            // middle bottom box
            } else if (
                (parseInt(canvasDiv.style.width)/2 -4 < mouseX && mouseX < parseInt(canvasDiv.style.width)/2 +4) &&
                (mouseY > parseInt(canvasDiv.style.height) -8)
            ) {
                middleBottom();

            // else position
            } else {
                elsePosition();
            }

            // every position
            everyPosition();
        }
    };

    ns.prototype = eventBox.prototype;

}(this, 'storage.eventBox'));