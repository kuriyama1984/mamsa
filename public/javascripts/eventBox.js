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
        canvasDiv : null,
        canvasPopUp : null,
        canvasElement : null,
        context : null,
        textWidth : 0,
        popUpFlag : true,
        widthText : function (textArray, context) {

            var widthMax = 0;
            for (var i = 0; i < textArray.length; i++) {

                // select longger width
                var textWidth = context.measureText(textArray[i]).width;
                if (widthMax < textWidth) {
                    widthMax = textWidth;
                }
            }
            return widthMax;
        },

        create: function (x, y, s, text, textArray, color, events) {

            // 描画用タグ
            canvasDiv = document.createElement('div');
            canvasDiv.id = "canvasDiv";
            canvasDiv.style.position = 'absolute';
            canvasDiv.style.top = y + 'px';
            canvasDiv.style.left = x + 'px';

            canvasElement = document.createElement('canvas');
            canvasElement.id = "canvasElement";

            // add pop up element
            canvasPopUp = document.createElement('div');
            canvasPopUp.id = "canvasPopUp";
            canvasPopUp.className = "popUpStyle";
            canvasPopUp.style.position = 'absolute';
            canvasPopUp.style.top = '-10000px';
            canvasPopUp.style.left = '-10000px';

            document.getElementById("mapBody").appendChild(canvasDiv);
            document.getElementById("canvasDiv").appendChild(canvasElement);
            document.getElementById("canvasDiv").appendChild(canvasPopUp);

            // 描画要素
            context = canvasElement.getContext("2d");
            context.fillStyle = "#000000";
            context.font = "normal bold " + 10 * "pt 'ＭＳ Ｐ明朝'";
            textWidth = context.measureText(text).width + 20;
            canvasDiv.style.width = textWidth + 'px';
            canvasDiv.style.height = 20 + 'px';
            canvasElement.style.width = textWidth + 'px';
            canvasElement.style.height = 20 + 'px';

            // 大きさ調整
            context.scale(300/textWidth, 150/20);

            // 四角形を描画する
            context.strokeStyle = '#0000FF'; // 色変更
            context.lineWidth = 2;
            context.strokeRect(0, 0, textWidth, 20);

            // 文字の描画
            context.translate(0 , -5);
            context.fillStyle = "#000000";
            context.font = "normal bold " + 8 + "pt 'ＭＳ Ｐ明朝'";
            context.fillText(text,  10 , 18);
            context.translate(0 , 5);

            // mouse field (0:outside, 1:rightTop, 2:rightBottom, 3:middleTop, 4:middleBottom, 5:elsePosition)
            var mouseField = 0;

            // this
            var me = this;

            // move event
            canvasElement.addEventListener("mousemove", function(e) {

                me.eventsCallBack(e, canvasDiv, function () {
                    // rightTop
                    me.mouseOut(e, events, 1);
                    events.mousemoveRightTop();
                }, function () {
                    // rightBottom
                    me.mouseOut(e, events, 2);
                    events.mousemoveRightBottom();
                }, function () {
                    // middleTop
                    me.mouseOut(e, events, 3);
                    events.mousemoveMiddleTop();
                }, function () {
                    // middleBottom
                    me.mouseOut(e, events, 4);
                    events.mousemoveMiddleBottom();
                }, function () {
                    // elsePosition
                    me.mouseOut(e, events, 5);
                    events.mousemoveElsePosition();
                }, function () {
                    // everyPosition
                    events.mousemoveEveryPosition();
                });

                me.showPopUp(mouseX, mouseY, s, textArray);

                // get mouse position
                // var mousePosition = me.getMousePosition(e);
                me.showBox(x, y, s, text, textArray, '#FF0000');

            }, true);

            // mousedown
            canvasElement.addEventListener("mousedown", function(e) {

                if (e.button === 0) {

                    me.eventsCallBack(e, canvasDiv, function () {
                        // rightTop
                        events.clickRightTop();
                    }, function () {
                        // rightBottom
                        events.clickRightBottom();
                    }, function () {
                        // middleTop
                        events.clickMiddleTop();
                    }, function () {
                        // middleBottom
                        events.clickMiddleBottom();
                    }, function () {
                        // elsePosition
                        events.clickElsePosition();
                    }, function () {
                        // everyPosition
                        events.clickEveryPosition();
                    });

                    me.moveBox(x, y, s);

                }
            }, true);

            this.clickRight(function (e) {

                me.eventsCallBack(e, canvasDiv, function () {
                    // rightTop
                    events.clickRightRightTop();
                }, function () {
                    // rightBottom
                    events.clickRightRightBottom();
                }, function () {
                    // middleTop
                    events.clickRightMiddleTop();
                }, function () {
                    // middleBottom
                    events.clickRightMiddleBottom();
                }, function () {
                    // elsePosition
                    events.clickRightElsePosition();
                }, function () {
                    // everyPosition
                    events.clickRightEveryPosition();
                });

                me.popUpFlag = false;
            });

            // move out
            canvasElement.addEventListener("mouseout", function(e) {

                me.mouseOut(e, events, 0);

                me.hidePopUp();

                // get mouse position
                // var mousePosition = me.getMousePosition(e);
                me.showBox(x, y, s, text, textArray, '#0000FF');
            }, true);










        },

        showBox: function (x, y, s, text, textArray, color) {
            // 四角形を描画する
            context.strokeStyle = color; // 色変更
            context.lineWidth = 2;
            context.strokeRect(0, 0, textWidth, 20);

            // 四角形を描画する
            context.fillStyle = color;
            context.fillRect(parseInt(canvasDiv.style.width)/2 -3, 0, 6, 6);

            // 四角形を描画する
            context.fillStyle = color;
            context.fillRect(parseInt(canvasDiv.style.width)/2 -3, parseInt(canvasDiv.style.height) -6, 6, 6);

            // 四角形を描画する
            context.fillStyle = color;
            context.fillRect(parseInt(canvasDiv.style.width) -8, 0, 8, 8);

            // 四角形を描画する
            context.fillStyle = color;
            context.fillRect(parseInt(canvasDiv.style.width) -8, parseInt(canvasDiv.style.height) -8, 8, 8);

            // 文字の描画
            context.translate(0 , -5);
            context.fillStyle = "#000000";
            context.font = "normal bold " + 10 * "pt 'ＭＳ Ｐ明朝'";
            context.fillText(text,  10 , 18);
            context.translate(0 , 5);
        },

        moveBox: function (mouseX, mouseY, s ) {

            document.onmousemove = function (e)　{

                // InternetExplorer 用
                if (!e) e = window.event;

                var mouse_x = e.clientX;
                var mouse_y = e.clientY;

                // 出力テスト
                console.log("x:" + mouse_x);
                console.log("y:" + mouse_y);
                moveX = mouse_x;
                moveY = mouse_y;
            };
        },






        showPopUp: function (mouseX, mouseY, s, textArray) {

            if (this.popUpFlag) {
                canvasPopUp.style.left = mouseX + 10 + 'px';
                canvasPopUp.style.top = mouseY - canvasPopUp.clientHeight + 'px';
                canvasPopUp.style.width = '300px';
                canvasPopUp.style.backgroundColor = 'red';
                canvasPopUp.innerHTML = '説明内容　　　　　　　　　　　　　　　 [X]<br />' + textArray;
                var me = this;

                canvasPopUp.addEventListener("click", function(e) {

                    var rect = e.target.getBoundingClientRect();
                    mouseX = e.clientX - rect.left;
                    mouseY = e.clientY - rect.top;

                    if (mouseX > 270 && mouseY < 20) {
                        me.closePopUp();
                    }
                }, true);

                canvasPopUp.addEventListener("mousemove", function(e) {

                    var rect = e.target.getBoundingClientRect();
                    mouseX = e.clientX - rect.left;
                    mouseY = e.clientY - rect.top;

                    if (mouseX > 270 && mouseY < 20) {
                        document.body.style.cursor = "pointer";
                    } else {
                        document.body.style.cursor = "default";
                    }
                }, true);

                canvasPopUp.addEventListener("mouseout", function(e) {

                    var rect = e.target.getBoundingClientRect();
                    mouseX = e.clientX - rect.left;
                    mouseY = e.clientY - rect.top;

                    document.body.style.cursor = "default";
                }, true);
            }
        },

        hidePopUp: function () {

            if (this.popUpFlag) {
                canvasPopUp.style.left = '-10000px';
                canvasPopUp.style.top = '-10000px';
                canvasPopUp.style.backgroundColor = 'red';
                canvasPopUp.innerHTML = '';
            }
        },

        closePopUp: function () {

            this.popUpFlag = true;
            this.hidePopUp();
        },

        clickRight: function (callback) {

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

        mouseOut: function (e, events, field) {

            if (this.mouseField !== field) {

                switch (this.mouseField) {
                    case 1:
                        events.mouseoutRightTop();
                        break;
                    case 2:
                        events.mouseoutRightBottom();
                        break;
                    case 3:
                        events.mouseoutMiddleTop();
                        break;
                    case 4:
                        events.mouseoutMiddleBottom();
                        break;
                    case 5:
                        events.mouseoutElsePosition();
                        break;
                }

                this.mouseField = field;

                switch (field) {
                    case 0:
                        events.mouseoutEveryPosition();
                        break;
                }
            }
        },

        eventsCallBack: function (e, canvasDiv, rightTop, rightBottom, middleTop, middleBottom, elsePosition, everyPosition) {

            var rect = e.target.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            // right top box
            if (
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

}(this, 'mamsa.eventBox'));