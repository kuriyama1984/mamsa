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

        create: function (x, y, s, text, textArray, color) {

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
            context.font = "normal bold " + 10 * "pt 'ＭＳ Ｐ明朝'";
            context.fillText(text,  10 , 18);
            context.translate(0 , 5);

            // this
            var me = this;

            // move event
            canvasElement.addEventListener("mousemove", function(e) {

                var rect = e.target.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;



                me.showPopUp(mouseX, mouseY, s, textArray);


                // get mouse position
                // var mousePosition = me.getMousePosition(e);
                me.showBox(x, y, s, text, textArray, '#FF0000');


            }, true);

            // move out
            canvasElement.addEventListener("mouseout", function(e) {
                var rect = e.target.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;

                me.hidePopUp();

                // get mouse position
                // var mousePosition = me.getMousePosition(e);
                me.showBox(x, y, s, text, textArray, '#0000FF');
            }, true);

            callbackCR = {

                click : function () {
                    me.popUpFlag = false;
                }
            };
            this.clickRight(callbackCR);

            // mousedown
            canvasElement.addEventListener("mousedown", function(e) {
                var rect = e.target.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;

                me.moveBox(x, y, s);
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
                            callback.click();
                        }
                        e.preventDefault();
                    }, false);
                } else {
                    // Firefox, Safari
                    document.addEventListener("contextmenu", function(e) {
                        callback.click();
                        e.preventDefault();
                    }, false);
                }
            } else {
                // IE
                document.attachEvent("oncontextmenu", function(e) {  
                    callback.click();
                    e.returnValue = false;
                });
            }
        }










    };

    ns.prototype = eventBox.prototype;

}(this, 'mamsa.eventBox'));