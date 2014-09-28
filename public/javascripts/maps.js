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
    var globalRatio = 1;

    maps.prototype = {

        init: function () {
            var ele = document.getElementById("status");
            // Canvasが使えるか調べる
            if (!window.HTMLCanvasElement) {
                ele.innerHTML = "Canvasが使用できません";
                return 1; // non-supported 
            }
            // Canvasの要素
            var canvas = document.getElementById("myCanvas");
            // 2Dコンテキストの取得
            var context = canvas.getContext("2d");
            if (!context) {
                ele.innerHTML = "2Dコンテキストが取得できません";
                return 1; // non-supported 
            }
            return canvas;
        },

        back: function (canvas) {
            // 背景を描画する
            var context = canvas.getContext("2d");
            var grad  = context.createLinearGradient(0, 0, 0, canvas.width*2/3);
            grad.addColorStop(0,'#FFFFE0');
            grad.addColorStop(0.3,'#FFFFFF');
            grad.addColorStop(0.7,'#FFFFFF');
            grad.addColorStop(1,'#FFFFE0');
            context.fillStyle = grad;
            context.fillRect(0,0, canvas.width, canvas.height);
        },

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

        eventBox2: function (x, y, s, text, textArray, color) {

            var eventBox = Object.create(mamsa.eventBox.prototype);
            eventBox.create(x, y, s, text, textArray, color, {
                mousemoveRightTop : function () {
                    // alert('mousemoveRightTop');
                },
                clickRightTop : function () {
                    // alert('clickRightTop');
                },
                clickRightRightTop : function () {
                    // alert('clickRightRightTop');
                },
                mouseoutRightTop : function () {
                    alert('mouseoutRightTop');
                },

                mousemoveRightBottom : function () {
                    // alert('mousemoveRightBottom');
                },
                clickRightBottom : function () {
                    // alert('clickRightBottom');
                },
                clickRightRightBottom : function () {
                    // alert('clickRightRightBottom');
                },
                mouseoutRightBottom : function () {
                    alert('mouseoutRightBottom');
                },

                mousemoveMiddleTop : function () {
                    // alert('mousemoveMiddleTop');
                },
                clickMiddleTop : function () {
                    // alert('clickMiddleTop');
                },
                clickRightMiddleTop : function () {
                    // alert('clickRightMiddleTop');
                },
                mouseoutMiddleTop : function () {
                    alert('mouseoutMiddleTop');
                },

                mousemoveMiddleBottom : function () {
                    // alert('mousemoveMiddleBottom');
                },
                clickMiddleBottom : function () {
                    // alert('clickMiddleBottom');
                },
                clickRightMiddleBottom : function () {
                    // alert('clickRightMiddleBottom');
                },
                mouseoutMiddleBottom : function () {
                    alert('mouseoutMiddleBottom');
                },

                mousemoveElsePosition : function () {
                    // alert('mousemoveElsePosition');
                },
                clickElsePosition : function () {
                    // alert('clickElsePosition');
                },
                clickRightElsePosition : function () {
                    // alert('clickRightElsePosition');
                },
                mouseoutElsePosition : function () {
                    alert('mouseoutElsePosition');
                },

                mousemoveEveryPosition : function () {
                    // alert('mousemoveEveryPosition');
                },
                clickEveryPosition : function () {
                    // alert('clickEveryPosition');
                },
                clickRightEveryPosition : function () {
                    // alert('clickRightEveryPosition');
                },
                mouseoutEveryPosition : function () {
                    alert('mouseoutEveryPosition');
                }
            });
        },

        eventBox: function (id, x, y, text, type) {

            // set clever eventBox type1
            var eventBox = Object.create(mamsa.eventBox.prototype);
            eventBox.setType2('mapBody', id, x, y, text, type, {

                mousemoveLeftTop : function (canvasElement, x, y) {
                    console.log('mousemoveLeftTop');
                },
                clickLeftTop : function (canvasElement, x, y) {
                    console.log('clickLeftTop');
                },
                clickRightLeftTop : function (canvasElement, x, y) {
                    console.log('clickRightLeftTop');
                },
                mouseoutLeftTop : function (canvasElement, x, y) {
                    console.log('mouseoutLeftTop');
                },

                mousemoveLeftBottom : function (canvasElement, x, y) {
                    console.log('mousemoveLeftBottom');
                },
                clickLeftBottom : function (canvasElement, x, y) {
                    console.log('clickLeftBottom');
                },
                clickRightLeftBottom : function (canvasElement, x, y) {
                    console.log('clickRightLeftBottom');
                },
                mouseoutLeftBottom : function (canvasElement, x, y) {
                    console.log('mouseoutLeftBottom');
                },

                mousemoveRightTop : function (canvasElement, x, y) {
                    console.log('mousemoveRightTop');
                },
                clickRightTop : function (canvasElement, x, y) {
                    console.log('clickRightTop');
                },
                clickRightRightTop : function (canvasElement, x, y) {
                    console.log('clickRightRightTop');
                },
                mouseoutRightTop : function (canvasElement, x, y) {
                    console.log('mouseoutRightTop');
                },

                mousemoveRightBottom : function (canvasElement, x, y) {
                    console.log('mousemoveRightBottom');
                },
                clickRightBottom : function (canvasElement, x, y) {
                    console.log('clickRightBottom');
                },
                clickRightRightBottom : function (canvasElement, x, y) {
                    console.log('clickRightRightBottom');
                },
                mouseoutRightBottom : function (canvasElement, x, y) {
                    console.log('mouseoutRightBottom');
                },

                mousemoveMiddleTop : function (canvasElement, x, y) {
                    console.log('mousemoveMiddleTop');
                },
                clickMiddleTop : function (canvasElement, x, y) {
                    console.log('clickMiddleTop');
                },
                clickRightMiddleTop : function (canvasElement, x, y) {
                    console.log('clickRightMiddleTop');
                },
                mouseoutMiddleTop : function (canvasElement, x, y) {
                    console.log('mouseoutMiddleTop');
                },

                mousemoveMiddleBottom : function (canvasElement, x, y) {
                    console.log('mousemoveMiddleBottom');
                },
                clickMiddleBottom : function (canvasElement, x, y) {
                    console.log('clickMiddleBottom');
                },
                clickRightMiddleBottom : function (canvasElement, x, y) {
                    console.log('clickRightMiddleBottom');
                },
                mouseoutMiddleBottom : function (canvasElement, x, y) {
                    console.log('mouseoutMiddleBottom');
                },

                mousemoveElsePosition : function (canvasElement, x, y) {
                    // console.log('mousemoveElsePosition');
                },
                clickElsePosition : function (canvasElement, x, y) {
                    // console.log('clickElsePosition');
                },
                clickRightElsePosition : function (canvasElement, x, y) {
                    // console.log('clickRightElsePosition');
                },
                mouseoutElsePosition : function (canvasElement, x, y) {
                    // console.log('mouseoutElsePosition');
                },

                mousemoveEveryPosition : function (canvasElement, x, y) {
                    // console.log('mousemoveEveryPosition');
                },
                clickEveryPosition : function (canvasElement, x, y) {
                    // console.log('clickEveryPosition');
                },
                clickRightEveryPosition : function (canvasElement, x, y) {
                    // console.log('clickRightEveryPosition');
                },
                mouseoutEveryPosition : function (canvasElement, x, y) {
                    // console.log('mouseoutEveryPosition');
                }
            });
        },


        eventBox2: function (id, x, y, text, textPop, type) {

            // set clever eventBox type1
            var eventBox = Object.create(mamsa.eventBox.prototype);
            eventBox.setType3('mapBody', id, x, y, text, textPop, type, {

                mousemoveLeftTop : function (canvasElement, x, y) {
                    console.log('mousemoveLeftTop');
                },
                clickLeftTop : function (canvasElement, x, y) {
                    console.log('clickLeftTop');
                },
                clickRightLeftTop : function (canvasElement, x, y) {
                    console.log('clickRightLeftTop');
                },
                mouseoutLeftTop : function (canvasElement, x, y) {
                    console.log('mouseoutLeftTop');
                },

                mousemoveLeftBottom : function (canvasElement, x, y) {
                    console.log('mousemoveLeftBottom');
                },
                clickLeftBottom : function (canvasElement, x, y) {
                    console.log('clickLeftBottom');
                },
                clickRightLeftBottom : function (canvasElement, x, y) {
                    console.log('clickRightLeftBottom');
                },
                mouseoutLeftBottom : function (canvasElement, x, y) {
                    console.log('mouseoutLeftBottom');
                },

                mousemoveRightTop : function (canvasElement, x, y) {
                    console.log('mousemoveRightTop');
                },
                clickRightTop : function (canvasElement, x, y) {
                    console.log('clickRightTop');
                },
                clickRightRightTop : function (canvasElement, x, y) {
                    console.log('clickRightRightTop');
                },
                mouseoutRightTop : function (canvasElement, x, y) {
                    console.log('mouseoutRightTop');
                },

                mousemoveRightBottom : function (canvasElement, x, y) {
                    console.log('mousemoveRightBottom');
                },
                clickRightBottom : function (canvasElement, x, y) {
                    console.log('clickRightBottom');
                },
                clickRightRightBottom : function (canvasElement, x, y) {
                    console.log('clickRightRightBottom');
                },
                mouseoutRightBottom : function (canvasElement, x, y) {
                    console.log('mouseoutRightBottom');
                },

                mousemoveMiddleTop : function (canvasElement, x, y) {
                    console.log('mousemoveMiddleTop');
                },
                clickMiddleTop : function (canvasElement, x, y) {
                    console.log('clickMiddleTop');
                },
                clickRightMiddleTop : function (canvasElement, x, y) {
                    console.log('clickRightMiddleTop');
                },
                mouseoutMiddleTop : function (canvasElement, x, y) {
                    console.log('mouseoutMiddleTop');
                },

                mousemoveMiddleBottom : function (canvasElement, x, y) {
                    console.log('mousemoveMiddleBottom');
                },
                clickMiddleBottom : function (canvasElement, x, y) {
                    console.log('clickMiddleBottom');
                },
                clickRightMiddleBottom : function (canvasElement, x, y) {
                    console.log('clickRightMiddleBottom');
                },
                mouseoutMiddleBottom : function (canvasElement, x, y) {
                    console.log('mouseoutMiddleBottom');
                },

                mousemoveElsePosition : function (canvasElement, x, y) {
                    // console.log('mousemoveElsePosition');
                },
                clickElsePosition : function (canvasElement, x, y) {
                    // console.log('clickElsePosition');
                },
                clickRightElsePosition : function (canvasElement, x, y) {
                    // console.log('clickRightElsePosition');
                },
                mouseoutElsePosition : function (canvasElement, x, y) {
                    // console.log('mouseoutElsePosition');
                },

                mousemoveEveryPosition : function (canvasElement, x, y) {
                    // console.log('mousemoveEveryPosition');
                },
                clickEveryPosition : function (canvasElement, x, y) {
                    // console.log('clickEveryPosition');
                },
                clickRightEveryPosition : function (canvasElement, x, y) {
                    // console.log('clickRightEveryPosition');
                },
                mouseoutEveryPosition : function (canvasElement, x, y) {
                    // console.log('mouseoutEveryPosition');
                }
            });
        }





    };

    ns.prototype = maps.prototype;

}(this, 'mamsa.maps'));