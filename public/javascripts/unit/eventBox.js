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

    eventBox.prototype = {

        fixColor: {
            flag: false,
            color: '#0000ff'
        },
        // common option (use reference)
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
        ele: null,
        modType: '', // mod
        boxText: '',
        test: '',
        id: '',
        boxW: 0,
        boxH: 0,

        changeColor: function (flag, color) {
            this.fixColor.flag = flag;
            this.fixColor.color = color;
            setFrame(this.ele, null, this.modType, color);
            setText(this.boxText, this.ele);
        },

        resetColor: function () {
            setFrame(ele, null, modType, '#0000ff');
            setText(boxText, ele);
        },

        _popUpFlags: {},

        /**
        * set is text-popup eventBox with moveEvent, clickEvent, clickRightEvent, mouseOutEvent <br /><br />
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
        set: function (disp, id, left, top, text, textPop, type, events) {

            this.fixColor = clone(this.fixColor); // for avoiding reference

            var me = this;
            var modType = type;
            var boxText = text;

            var ele = setCanvas(disp, id, left, top, boxText, events, {

                mousemoveLeftTop : function (x, y) {
                    setFrame(ele, 3, modType, (me.fixColor.flag ? me.fixColor.color : me.common.overColor));
                    setText(boxText, ele);
                },
                mousemoveLeftBottom : function (x, y) {
                    setFrame(ele, 3, modType, (me.fixColor.flag ? me.fixColor.color : me.common.overColor));
                    setText(boxText, ele);
                },
                mousemoveMiddleTop : function (x, y) {
                    // usual
                    setFrame(ele, 3, modType, (me.fixColor.flag ? me.fixColor.color : me.common.overColor));
                    setText(boxText, ele);
                },
                mousemoveMiddleBottom : function (x, y) {
                    setFrame(ele, 'middleBottom', modType, (me.fixColor.flag ? me.fixColor.color : '#ffa500'));
                    setText(boxText, ele);
                    changeCursor('pointer');
                },
                mousemoveRightTop : function (x, y) {
                    setFrame(ele, 'rightTop', modType, (me.fixColor.flag ? me.fixColor.color : '#ffa500'));
                    setText(boxText, ele);
                    changeCursor('pointer');
                },
                mousemoveRightBottom : function (x, y) {
                    setFrame(ele, 'rightBottom', modType, (me.fixColor.flag ? me.fixColor.color : '#ffa500'));
                    setText(boxText, ele);
                    changeCursor('pointer');
                },
                mousemoveElsePosition : function (x, y) {
                    setFrame(ele, 3, modType, (me.fixColor.flag ? me.fixColor.color : me.common.overColor));
                    setText(boxText, ele);
                },
                mousemoveEveryPosition : function (x, y) {
                    movePopUp(x + left + 10, y + top - 10, elePop, true, me._popUpFlags.id);
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
                    setFrame(ele, null, modType, (me.fixColor.flag ? me.fixColor.color : '#0000ff'));
                    setText(boxText, ele);
                    movePopUp(x, y, elePop, false, me._popUpFlags.id);
                    changeCursor('default');
                },
                clickRightEveryPosition : function (x, y) {
                    me._popUpFlags.id = false;
                }
            });

            var elePop = setPopUp(disp, id, this._popUpFlags, textPop, events, {
                clickRightTop : function (x, y) {
                    me._popUpFlags.id = true;
                    movePopUp(x, y, elePop, false, true);
                },
                mouseoutEveryPosition : function (x, y) {}
            });

            changePosition(ele, left, top, ele.textWidth, 40);

            setFrame(ele, null, modType, '#0000ff');
            me.id = id;
            me.boxW = ele.textWidth;
            me.boxH = 40;
            setText(boxText, ele);
            this.each = culcPosition(id, left, top);

            me.ele = ele;
            me.modType = modType;
            me.boxText = boxText;
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
        copy: function (disp, id, left, top, text) {
            // box position
            var mapObj = document.getElementById(disp);
            var box = document.getElementById('box' + id);
            var boxW = parseInt(box.style.width, 10);
            var boxH = parseInt(box.style.height, 10);

            // set div box
            var canvasDiv = document.createElement('div');
            canvasDiv.id = 'boxCopy' + id;
            canvasDiv.style.position = 'absolute';
            canvasDiv.style.top = '0px'; // top
            canvasDiv.style.left = '0px'; // left
            canvasDiv.style.width = '300px';
            canvasDiv.style.height = '40px';
            canvasDiv.style.zIndex = 100;

            var canvasElement = document.createElement('canvas');
            canvasElement.id = 'eleCopy' + id;
            canvasElement.className = 'eventBox';
            canvasElement.style.width = '300px';
            canvasElement.style.height = '40px';

            mapObj.appendChild(canvasDiv);
            canvasDiv.appendChild(canvasElement);

            var ctx = canvasElement.getContext('2d');
            ctx.font = "normal bold " + 10 + "pt 'ＭＳ Ｐ明朝'";

            canvasDiv.style.width = boxW + 'px';
            canvasDiv.style.height = boxH + 'px';
            canvasElement.style.width = boxW + 'px';
            canvasElement.style.height = boxH + 'px';

            // move event
            canvasElement.addEventListener('mousemove', function(e) {

                var rect = window.event.target.getBoundingClientRect();
                // var rect = e.target.getBoundingClientRect();
                var mouseX = e.clientX - rect.left;
                var mouseY = e.clientY - rect.top;

                // everyPosition
                canvasDiv.style.top = mouseY - boxH + 'px';
                canvasDiv.style.left = mouseX - boxW + 'px';
            }, true);

            // drow square
            ctx.beginPath();
            ctx.clearRect(0, 0, 300, 150);
            ctx.strokeStyle = '#ffa500';
            ctx.lineWidth = 14;
            ctx.strokeRect(0, 0, 300, 150);

            // drow text
            ctx.scale(300 / boxW, 150 / 20);
            ctx.translate(0, -2);
            ctx.fillStyle = '#000000';
            ctx.fillText(text, 10, 18);
            ctx.translate(0, 2);
            ctx.scale(boxW / 300, 20 / 150);

            return {
                flag: true,
                id: id,
                head:'boxCopy',
                w: boxW,
                h: boxH
            };
        },

        /**
        * edit event box <br /><br />
        *
        * @method copy
        * @param {string} tag name
        * @param {number} position x
        * @param {number} position y
        * @param {string} text
        */
        edit: function (disp, id, left, top, text, titleKana, textPop, callback) {
            var editor = document.getElementById('editor');
            if (editor) {
                editor.remove();
            }

            // box position
            var mapObj = document.getElementById(disp);

            // set div box
            var editorDiv = document.createElement('div');
            editorDiv.id = 'editor';
            editorDiv.style.position = 'absolute';
            editorDiv.style.top = (top - 10) + 'px';
            editorDiv.style.left = (left + this.boxW + 10) + 'px';
            editorDiv.style.backgroundColor = 'rgba(255, 255, 0, 0.9)';

            // <tr>
            //     <td colspan=2><span id="editorClose">[×]</span></td>
            // </tr>
            var tr0 = document.createElement('tr');
            var td0 = document.createElement('td');
            var span0 = document.createElement('span');
            span0.id = 'editorClose';
            span0.addEventListener('click', function () {
                editorDiv.remove();
            }, false);
            span0.appendChild(document.createTextNode('[×]'));
            td0.appendChild(span0);
            td0.colSpan = '2';
            tr0.appendChild(td0);

            // <tr>
            //     <td colspan=2 id="insertErr"></td>
            // </tr>
            var tr1 = document.createElement('tr');
            var td1 = document.createElement('td');
            var div1 = document.createElement('div');
            div1.id = 'insertErr';
            td1.colSpan = '2';
            td1.appendChild(div1);
            tr1.appendChild(td1);

            // <tr>
            //     <td>項目</td>
            //     <td><input type="text" id="pt_name" size="50" maxlength="100"></td>
            // </tr>
            var tr2 = document.createElement('tr');
            var td2_1 = document.createElement('td');
            td2_1.appendChild(document.createTextNode('項目'));
            var td2_2 = document.createElement('td');
            var input2 = document.createElement('input');
            input2.type = 'text';
            input2.id = 'pt_name';
            input2.value = text;
            input2.size = 50;
            input2.maxlength = 100;
            td2_2.appendChild(input2);
            tr2.appendChild(td2_1);
            tr2.appendChild(td2_2);

            // <tr>
            //     <td>カタカナ</td>
            //     <td><input type="text" id="pt_name2" size="50" maxlength="100"></td>
            // </tr>
            var tr3 = document.createElement('tr');
            var td3_1 = document.createElement('td');
            td3_1.appendChild(document.createTextNode('カタカナ'));
            var td3_2 = document.createElement('td');
            var input3 = document.createElement('input');
            input3.type = 'text';
            input3.id = 'pt_name2';
            input3.size = 50;
            input3.maxlength = 100;
            input3.value = titleKana;
            td3_2.appendChild(input3);
            tr3.appendChild(td3_1);
            tr3.appendChild(td3_2);

            // <tr>
            //     <td>説明</td>
            //     <td><textarea id="pt_explain" cols=80 rows=12></textarea></td>
            // </tr>
            var tr4 = document.createElement('tr');
            var td4_1 = document.createElement('td');
            td4_1.appendChild(document.createTextNode('説明'));
            var td4_2 = document.createElement('td');
            var textarea4 = document.createElement('textarea');
            textarea4.id = 'pt_explain';
            textarea4.cols = 80;
            textarea4.rows = 12;
            textarea4.value = textPop;
            td4_2.appendChild(textarea4);
            tr4.appendChild(td4_1);
            tr4.appendChild(td4_2);

            // <tr>
            //     <td colspan=2>
            //         <input type="radio" id="ps_type1" value="shikaku" checked>四角枠
            //         <input type="radio" id="ps_type2" value="ring">背景
            //     </td>
            // </tr>
            var tr5 = document.createElement('tr');
            var td5_1 = document.createElement('td');
            td5_1.colSpan = '2';
            tr5.appendChild(td5_1);
            var text5_1 = document.createTextNode('x軸：');
            var input5_1 = document.createElement('input');
            input5_1.type = 'text';
            input5_1.id = 'ps_x';
            input5_1.value = left;
            input5_1.style.width = 40 + 'px';
            var text5_2 = document.createTextNode('　　y軸：');
            var input5_2 = document.createElement('input');
            input5_2.type = 'text';
            input5_2.id = 'ps_y';
            input5_2.value = top;
            input5_2.style.width = 40 + 'px';
            td5_1.appendChild(text5_1);
            td5_1.appendChild(input5_1);
            td5_1.appendChild(text5_2);
            td5_1.appendChild(input5_2);

            // <tr>
            //     <td colspan=2>
            //         <input id="editorAdd" type="button" value="追加する" onclick="submit()">
            //     </td>
            // </tr>
            var tr6 = document.createElement('tr');
            var td6_1 = document.createElement('td');
            td6_1.colSpan = '2';
            var input6_1 = document.createElement('input');
            input6_1.type = 'button';
            input6_1.id = 'editorMod';
            input6_1.value = '編集する';
            input6_1.addEventListener('click', function () {
                var result = submit(input2, input3, textarea4, null, null, input5_1.value, input5_2.value);
                if (result.flag) {
                    callback(result);
                }
                div1.innerHTML = '<font style="color:red;">' + result.msg + '</font>';
            }, false);
            tr6.appendChild(td6_1);
            td6_1.appendChild(input6_1);

            // tbody
            var tbody = document.createElement('tbody');
            tbody.appendChild(tr0);
            tbody.appendChild(tr1);
            tbody.appendChild(tr2);
            tbody.appendChild(tr3);
            tbody.appendChild(tr4);
            tbody.appendChild(tr5);
            tbody.appendChild(tr6);

            // table
            var table = document.createElement('table');
            table.id = 'editor';
            table.appendChild(tbody);

            // form
            var form = document.createElement('form');
            form.id = 'form1';
            form.appendChild(table);

            // editorDiv
            editorDiv.appendChild(form);

            // set
            mapObj.appendChild(editorDiv);
        },

        /**
        * create event box <br /><br />
        *
        * @method copy
        * @param {string} tag name
        * @param {number} position x
        * @param {number} position y
        * @param {string} text
        */
        create: function (disp, id, left, top, callback) {
            var editor = document.getElementById('editor');
            if (editor) {
                editor.remove();
            }

            // box position
            var mapObj = document.getElementById(disp);

            // set div box
            var editorDiv = document.createElement('div');
            editorDiv.id = 'editor';
            editorDiv.style.position = 'absolute';
            editorDiv.style.top = (top - 10) + 'px';
            editorDiv.style.left = (left + this.boxW + 10) + 'px';
            editorDiv.style.backgroundColor = 'rgba(255, 255, 0, 0.9)';

            // <tr>
            //     <td colspan=2><span id="editorClose">[×]</span></td>
            // </tr>
            var tr0 = document.createElement('tr');
            var td0 = document.createElement('td');
            var span0 = document.createElement('span');
            span0.id = 'editorClose';
            span0.addEventListener('click', function () {
                editorDiv.remove();
            }, false);
            span0.appendChild(document.createTextNode('[×]'));
            td0.appendChild(span0);
            td0.colSpan = '2';
            tr0.appendChild(td0);

            // <tr>
            //     <td colspan=2 id="insertErr"></td>
            // </tr>
            var tr1 = document.createElement('tr');
            var td1 = document.createElement('td');
            var div1 = document.createElement('div');
            div1.id = 'insertErr';
            td1.colSpan = '2';
            td1.appendChild(div1);
            tr1.appendChild(td1);

            // <tr>
            //     <td>項目</td>
            //     <td><input type="text" id="pt_name" size="50" maxlength="100"></td>
            // </tr>
            var tr2 = document.createElement('tr');
            var td2_1 = document.createElement('td');
            td2_1.appendChild(document.createTextNode('項目'));
            var td2_2 = document.createElement('td');
            var input2 = document.createElement('input');
            input2.type = 'text';
            input2.id = 'pt_name';
            input2.value = '';
            input2.size = 50;
            input2.maxlength = 100;
            td2_2.appendChild(input2);
            tr2.appendChild(td2_1);
            tr2.appendChild(td2_2);

            // <tr>
            //     <td>カタカナ</td>
            //     <td><input type="text" id="pt_name2" size="50" maxlength="100"></td>
            // </tr>
            var tr3 = document.createElement('tr');
            var td3_1 = document.createElement('td');
            td3_1.appendChild(document.createTextNode('カタカナ'));
            var td3_2 = document.createElement('td');
            var input3 = document.createElement('input');
            input3.type = 'text';
            input3.id = 'pt_name2';
            input3.size = 50;
            input3.maxlength = 100;
            td3_2.appendChild(input3);
            tr3.appendChild(td3_1);
            tr3.appendChild(td3_2);

            // <tr>
            //     <td>説明</td>
            //     <td><textarea id="pt_explain" cols=80 rows=12></textarea></td>
            // </tr>
            var tr4 = document.createElement('tr');
            var td4_1 = document.createElement('td');
            td4_1.appendChild(document.createTextNode('説明'));
            var td4_2 = document.createElement('td');
            var textarea4 = document.createElement('textarea');
            textarea4.id = 'pt_explain';
            textarea4.cols = 80;
            textarea4.rows = 12;
            td4_2.appendChild(textarea4);
            tr4.appendChild(td4_1);
            tr4.appendChild(td4_2);

            // <tr>
            //     <td colspan=2>
            //         <input type="radio" id="ps_type1" value="shikaku" checked>四角枠
            //         <input type="radio" id="ps_type2" value="ring">背景
            //     </td>
            // </tr>
            var tr5 = document.createElement('tr');
            var td5_1 = document.createElement('td');
            td5_1.colSpan = '2';
            tr5.appendChild(td5_1);
            var input5_1 = document.createElement('input');
            input5_1.type = 'radio';
            input5_1.id = 'ps_type1';
            input5_1.name = 'ps_type';
            input5_1.value = 'shikaku';
            input5_1.checked = 'checked';
            var text5_1 = document.createTextNode('四角枠　');
            var input5_2 = document.createElement('input');
            input5_2.type = 'radio';
            input5_2.id = 'ps_type2';
            input5_2.name = 'ps_type';
            input5_2.value = 'ring';
            var text5_2 = document.createTextNode('背景');
            td5_1.appendChild(input5_1);
            td5_1.appendChild(text5_1);
            td5_1.appendChild(input5_2);
            td5_1.appendChild(text5_2);

            // <tr>
            //     <td colspan=2>
            //         <input id="editorAdd" type="button" value="追加する" onclick="submit()">
            //     </td>
            // </tr>
            var tr6 = document.createElement('tr');
            var td6_1 = document.createElement('td');
            td6_1.colSpan = '2';
            var input6_1 = document.createElement('input');
            input6_1.type = 'button';
            input6_1.id = 'editorAdd';
            input6_1.value = '追加する';
            input6_1.addEventListener('click', function () {
                var result = submit(input2, input3, textarea4, input5_1, input5_2, left, top);
                if (result.flag) {
                    callback(result);
                }
                div1.innerHTML = '<font style="color:red;">' + result.msg + '</font>';
            }, false);

            tr6.appendChild(td6_1);
            td6_1.appendChild(input6_1);

            // tbody
            var tbody = document.createElement('tbody');
            tbody.appendChild(tr0);
            tbody.appendChild(tr1);
            tbody.appendChild(tr2);
            tbody.appendChild(tr3);
            tbody.appendChild(tr4);
            tbody.appendChild(tr5);
            tbody.appendChild(tr6);

            // table
            var table = document.createElement('table');
            table.id = 'editor';
            table.appendChild(tbody);

            // form
            var form = document.createElement('form');
            form.id = 'form1';
            form.appendChild(table);

            // editorDiv
            editorDiv.appendChild(form);

            // set
            mapObj.appendChild(editorDiv);
        }
    };

    var submit = function (title, titleKana, explain, radioShikaku, radioRing, x, y) {
        var msg = '';
        var flag = false;
        var pt_name = convertHTMLChars(title.value);
        var pt_name2 = convertHTMLChars(titleKana.value);
        var pt_explain = convertHTMLChars(explain.value);
        var ps_x = parseInt(convertHTMLChars(x), 10);
        var ps_y = parseInt(convertHTMLChars(y), 10);
        var ps_type = '';
        if (radioShikaku !== null && convertHTMLChars(radioShikaku.checked)) {
            ps_type = 'shikaku';
        } else if (radioRing !== null && convertHTMLChars(radioRing.checked)) {
            ps_type = 'ring';
        }

        msg = error.checkData(pt_name, msg, '項目（１番目）');
        msg = error.checkKana(pt_name2, msg, 'カタカナ（２番目）');
        msg = error.checkData(pt_explain, msg, '説明（３番目）');
        if (msg === '') {
            flag = true;
        }

        return {
            flag: flag,
            msg: msg,
            pt_name: pt_name,
            pt_name2: pt_name2,
            pt_explain: pt_explain,
            ps_type: ps_type,
            ps_x: ps_x,
            ps_y: ps_y
        };
    };

    // tag block
    var convertHTMLChars = function (str) {
        if (typeof(str) === 'string') {
            return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        } else {
            return str;
        }
    };

    // kana check
    var isKana = function (str) {
        if (typeof(str) === 'string' && str.match(/^[\u30A0-\u30FF]+$/)) {
            return true;
        } else {
            return false;
        }
    };

    // mouse out event
    var setFrame = function (ele, position, modType, color) {

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


    // mouse out event
    var setCanvas = function (disp, id, left, top, boxText, events, callback) {

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
        canvasElement.className = 'eventBox';
        canvasElement.style.width = '300px';
        canvasElement.style.height = '40px';

        document.getElementById(disp).appendChild(canvasDiv);
        document.getElementById('box' + id).appendChild(canvasElement);

        var ctx = canvasElement.getContext('2d');
        ctx.font = "normal bold " + 10 + "pt 'ＭＳ Ｐ明朝'";
        var textWidth = parseInt(ctx.measureText(boxText).width, 10) + 20;

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
                    events.mousemoveEveryPosition(canvasElement, x, y);
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
                        events.mousedownRightBottom(canvasElement, x, y);
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
                        events.mousedownMiddleBottom(canvasElement, x, y);
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

        out.ctx = ctx;
        out.textWidth = textWidth;
        out.div = canvasDiv;
        out.canvas = canvasElement;
        return out;
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
            (parseInt(canvasDiv.style.width)/2 - 8/2 < mouseX && mouseX < parseInt(canvasDiv.style.width)/2 + 8/2) &&
            (mouseY < 8)
        ) {
            middleTop(mouseX, mouseY);

        // middle bottom box
        } else if (
            (parseInt(canvasDiv.style.width)/2 - 8/2 < mouseX && mouseX < parseInt(canvasDiv.style.width)/2 + 8/2) &&
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

    // culcation eventBox position
    var culcPosition = function (id, left, top) {

        var CanvasDiv = document.getElementById('box' + id);
        var width = parseInt(CanvasDiv.style.width, 10);
        var height = parseInt(CanvasDiv.style.height, 10);

        var each = eventBox.prototype.each;
        each = cloneRecurcive(each); // for avoiding reference

        // set position
        each.id = id;
        each.posTL.x = left;
        each.posTL.y = top;

        each.posTC.x = left + width / 2;
        each.posTC.y = top;

        each.posTR.x = left + width;
        each.posTR.y = top;

        each.posCL.x = left;
        each.posCL.y = top + height / 2;

        each.posCC.x = left + width / 2;
        each.posCC.y = top + height / 2;

        each.posCR.x = left + width;
        each.posCR.y = top + height / 2;

        each.posBL.x = left;
        each.posBL.y = top + height;

        each.posBC.x = left + width / 2;
        each.posBC.y = top + height;

        each.posBR.x = left + width;
        each.posBR.y = top + height;

        return each;
    };





    // mouse out event
    var setText = function (boxText, ele) {

        var textWidth = ele.textWidth;
        var context = ele.ctx;
        var canvasElement = ele.canvas;

        context.scale(300/textWidth, 150/20);
        context.translate(0 , -2);
        context.fillStyle = '#000000';
        context.fillText(boxText,  10 , 18);
        context.translate(0 , 2);
        context.scale(textWidth/300, 20/150);
    };



    // mouse out event
    var changePosition = function (ele, left, top, width, height) {

        var canvasDiv = ele.div;
        var canvasElement = ele.canvas;
        canvasDiv.style.top = top + 'px';
        canvasDiv.style.left = left + 'px';
        canvasDiv.style.width = width + 'px';
        canvasDiv.style.height = height + 'px';
        canvasElement.style.width = width + 'px';
        canvasElement.style.height = height + 'px';
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




    // mouse out event
    var setPopUp = function (disp, id, popUpFlags, textPop, events, callback) {

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

        popUpFlags.id = true;

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
        canvasDiv.addEventListener('mousemove', function(e) {

            popUpCallBack(e, canvasDiv, function (x, y) {
                // leftTop
                mouseOut(canvasElement, e, events, callback, 1);
            }, function (x, y) {
                // rightTop
                mouseOut(canvasElement, e, events, callback, 3);
            }, function (x, y) {
                // elsePosition
                mouseOut(canvasElement, e, events, callback, 7);
            }, function (x, y) {
                // everyPosition
            });
        }, true);

        // mousedown event
        canvasDiv.addEventListener("mousedown", function(e) {

            if (e.button === 0) {

                popUpCallBack(e, canvasDiv, function (x, y) {
                    // leftTop
                }, function (x, y) {
                    // rightTop
                    callback.clickRightTop(x, y);
                }, function (x, y) {
                    // elsePosition
                }, function (x, y) {
                    // everyPosition
                });
            }
        }, true);

        // click right event
        clickRight(function (e) {

            popUpCallBack(e, canvasDiv, function (x, y) {
                // leftTop
            }, function (x, y) {
                // rightTop
            }, function (x, y) {
                // elsePosition
            }, function (x, y) {
                // everyPosition
            });
        });

        // move out
        canvasDiv.addEventListener("mouseout", function(e) {

            mouseOutPopUp(canvasDiv, e, events, callback, 0);
        }, true);

        out.ctx = ctx;
        out.textWidth = textWidth;
        out.div = canvasDiv;
        out.canvas = canvasElement;
        return out;
    };


    var movePopUp = function (mouseX, mouseY, elePop, flag, popUpFlag) {

        if (popUpFlag) {
            if (flag) {
                elePop.div.style.left = mouseX + 'px';
                elePop.div.style.top = mouseY + 'px';
            } else {
                elePop.div.style.left = '-10000px';
                elePop.div.style.top = '-10000px';
            }
        }
    };

    // mouse out event
    var mouseOutPopUp = function (canvasElement, e, events, callback, field) {

        if (this.mouseField !== field) {

            switch (this.mouseField) {
                case 1:
                    break;
                case 3:
                    break;
                case 7:
                    break;
            }

            this.mouseField = field;

            switch (field) {
                case 0:
                    break;
            }
        }
    };

    var popUpCallBack = function (e, canvasDiv, leftTop, rightTop, elsePosition, everyPosition) {

        var rect = e.target.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;

        // left top box
        if (
            (mouseX < 270) &&
            (mouseY < 20)
        ) {
            leftTop(mouseX, mouseY);

        // right top box
        } else if (
            (mouseX >= 270) &&
            (mouseY < 20)
        ) {
            rightTop(mouseX, mouseY);

        // else position
        } else {
            elsePosition(mouseX, mouseY);
        }

        // every position
        everyPosition(mouseX, mouseY);
    };

    ns.prototype = eventBox.prototype;

}(this, 'mamsa.eventBox'));