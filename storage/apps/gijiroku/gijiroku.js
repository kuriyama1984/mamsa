(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module storage
    **/
    var ns = storage.addNamespace(namespace);

    /**
    * gijiroku makes formal document.
    *
    * @class gijiroku
    */
    var gijiroku = function () {};
    var WIDTH = 600;
    var TAG_ID = '';
    var cnt = 0;

    gijiroku.prototype = {

        /**
        * create gijiroku
        *
        * @method create
        */
        create: function (id, width) {

            var divId = document.getElementById(id);
            if (!divId) {return 3;}

            TAG_ID = id;
            WIDTH = width;

            setPanel(divId);
            divId.addEventListener('click', function () {
                wrightText();
            });
            divId.addEventListener('keyup', function () {
                wrightText();
            });
        },

        /**
        * get todays data
        *
        * @method getToday
        * @return {object} object.year, object.month, object.day, object.week, object.weekEnglish
        */
        getToday: function () {

            var date = new Date(); 
            var out = {};

            out.year = date.getFullYear();
            out.month = date.getMonth()+1;
            out.day = date.getDate();
            out.hour = date.getHours();
            out.minute = date.getMinutes();
            out.second = date.getSeconds();

            var week = date.getDay();
            var weekJapanese = new Array('日','月','火','水','木','金','土');
            var weekEnglish = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
            out.week = weekJapanese[week];
            out.weekEnglish = weekEnglish[week];
            return out;
        },

        /**
        * get tomorrows data
        *
        * @method getTomorrow
        * @return {object} object.year, object.month, object.day, object.week, object.weekEnglish
        */
        getTomorrow: function () {

            var today = this.getToday();
            var date = new Date(today.year, today.month, today.day);
            var out = {};

            out.year = date.getFullYear();
            out.month = date.getMonth() + 1;
            out.day = date.getDate();
            out.hour = date.getHours();
            out.minute = date.getMinutes();
            out.second = date.getSeconds();

            var week = date.getDay();
            var weekJapanese = new Array('日','月','火','水','木','金','土');
            var weekEnglish = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
            out.week = weekJapanese[week];
            out.weekEnglish = weekEnglish[week];
            return out;
        },

        /**
        * set formal document
        *
        * @method setFormalDocument
        */
        setFormalDocument: function (doc) {

            var tagId = document.getElementById('gijiroku_down');

            var createDiv = document.createElement("div");
            createDiv.style.width = WIDTH + 'px';
            createDiv.style.float = 'left';
            createDiv.setAttribute('id', 'gijiroku_down_set_' + cnt);
            createDiv.innerHTML = doc;
            tagId.appendChild(createDiv);
            cnt++;
        },

        /**
        * set textarea
        *
        * @method setFormalDocument
        */
        setTextarea: function (text) {

            var tagId = document.getElementById('gijiroku_up');

            var createDiv = document.createElement("div");
            createDiv.style.width = WIDTH + 'px';
            createDiv.style.float = 'left';
            createDiv.innerHTML = text;
            tagId.appendChild(createDiv);

            var createDiv = document.createElement("textarea");
            createDiv.style.width = (WIDTH - 30) + 'px';
            createDiv.style.float = 'left';
            createDiv.setAttribute('id', 'gijiroku_up_set_' + cnt);
            tagId.appendChild(createDiv);
            cnt++;
        }
    };

    var setPanel = function (divId) {

        var strUp = document.createElement("div");
        strUp.style.width = WIDTH + 'px';
        strUp.style.float = 'left';
        strUp.setAttribute('id', 'gijiroku_up');
        strUp.innerHTML = '<div style="float:left;font-weight:bold;margin-bottom:10px;">■ 議事録 作成ツール<div>';

        var strDown = document.createElement("div");
        strDown.style.width = WIDTH + 'px';
        strDown.style.float = 'left';
        strDown.setAttribute('id', 'gijiroku_down');

        divId.appendChild(strUp);
        divId.appendChild(strDown);
    };

    var wrightText = function () {

        var newText = '';
        for (var i = 0; i < cnt; i++) {
            if (document.getElementById('gijiroku_up_set_' + i)) {
                var str = document.getElementById('gijiroku_up_set_' + i).value;
                str = str.replace(/\r\n/g, '\n');
                str = str.replace(/\r/g, '\n');
                var strs = str.split('\n');
                var outTextarea = strs.join('<br />');
                var divElement = '<div style="width:' + WIDTH + 'px;float:left;" id="gijiroku_up_set_' + i + '">';
                divElement += outTextarea;
                divElement += '</div>';
                newText += divElement;
            } else if (document.getElementById('gijiroku_down_set_' + i)) {
                var divElement = '<div id="gijiroku_down_set_' + i + '" style="width:' + WIDTH + 'px;float:left;">';
                divElement += document.getElementById('gijiroku_down_set_' + i).innerHTML;
                divElement += '</div>';
                newText += divElement;
            }
        }
        document.getElementById('gijiroku_down').innerHTML = newText;
    };

    ns.prototype = gijiroku.prototype;

}(this, 'storage.gijiroku'));
