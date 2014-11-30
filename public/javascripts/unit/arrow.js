(function(global, namespace) {

    /**
    * Mechanism and Approach arrow for Social Activity (MAMSA)
    * 
    * @module mamsa
    **/
    var ns = mamsa.addNamespace(namespace);

    /**
    * event box
    *
    * @class arrow
    */
    var arrow = function () {};

    arrow.prototype = {

        /**
        * setType1 is basic arrow with moveEvent, clickEvent, clickRightEvent, mouseOutEvent <br /><br />
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

        // mouse out event
        _setCanvas: function (disp, id, top, left, width, height) {

            // set div box
            var canvasDiv = document.createElement('div');
            canvasDiv.id = 'arr' + id;
            canvasDiv.style.position = 'absolute';
            canvasDiv.style.top = top + 'px';
            canvasDiv.style.left = left + 'px';
            canvasDiv.style.width = '300px'; // initial length
            canvasDiv.style.height = '40px'; // initial length

            var canvasElement = document.createElement('canvas');
            canvasElement.id = 'arrEle' + id;
            canvasElement.style.width = width;
            canvasElement.style.height = height;

            document.getElementById(disp).appendChild(canvasDiv);
            document.getElementById('arr' + id).appendChild(canvasElement);

            var ctx = canvasElement.getContext('2d');
            ctx.font = "normal bold " + 10 + "pt 'ＭＳ Ｐ明朝'";
            ctx.textWidth = ctx.measureText(text).width + 20;











            // this
            var me = this;

        }



    };







    ns.prototype = arrow.prototype;

}(this, 'mamsa.arrow'));