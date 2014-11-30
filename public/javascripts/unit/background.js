(function(global, namespace) {

    /**
    * Mechanism and Approach background for Social Activity (MAMSA)
    * 
    * @module mamsa
    **/
    var ns = mamsa.addNamespace(namespace);

    /**
    * event box
    *
    * @class background
    */
    var background = function () {};

    background.prototype = {

        /**
        * @method setType1
        * @param {object} canvas object
        */
        setType1: function (canvas, events) {
            this._setCanvas(canvas, events);
        },

        /**
        * @method setType1Basic
        * @param {object} canvas object
        */
        setType1Basic: function (canvas) {
            var context = canvas.getContext("2d");
            var grad  = context.createLinearGradient(0, 0, 0, canvas.width*2/3);
            var mouseX = 0;
            var mouseY = 0;
            grad.addColorStop(0,'#FFFFE0');
            grad.addColorStop(0.3,'#FFFFFF');
            grad.addColorStop(0.7,'#FFFFFF');
            grad.addColorStop(1,'#FFFFE0');
            context.fillStyle = grad;
            context.fillRect(0,0, canvas.width, canvas.height);
        },







        // set canvas
        _setCanvas: function (canvas, events) {
            this.setType1Basic(canvas);

            canvas.addEventListener('mousemove', function(e) {
                var rect = e.target.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
                events.mousemove(mouseX,mouseY);
            }, true);
            canvas.addEventListener('mousedown', function(e) {
                if (e.button === 0) {
                    events.mousedown(mouseX,mouseY);
                }
            }, true);
            canvas.addEventListener('mouseup', function(e) {
                events.mouseup(mouseX,mouseY);
            }, true);
            canvas.addEventListener('dblclick', function(e) {
                events.dblclick(mouseX,mouseY);
            }, true);
            clickRight(function () {
                events.clickRight(mouseX,mouseY);
            });
        }


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



    ns.prototype = background.prototype;

}(this, 'mamsa.background'));