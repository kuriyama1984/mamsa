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

        eventBox: function (x, y, s, text, textArray, color) {

            var eventBox = Object.create(mamsa.eventBox.prototype);
            eventBox.create(x, y, s, text, textArray, color);









        }











    };

    ns.prototype = maps.prototype;

}(this, 'mamsa.maps'));