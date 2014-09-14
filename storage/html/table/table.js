(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module storage
    **/
    var ns = storage.addNamespace(namespace);

    /**
    * table has some type of select boxes.
    *
    * @class table
    */
    var table = function () {};
    var totalHeight = 0;

    table.prototype = {

        /**
        * setType1 is single select box
        *
        * @method setType1
        * @param {optionList} [{name:'str',value:'str'}] : optionList is for select options
        * @return {int} status
        */
        setType1: function (tagId, data) {

            var flame = document.createElement('div');
                flame.id = tagId + "_body";
            var tagId_flame = document.getElementById(tagId);
                tagId_flame.appendChild(flame);

            // css change
            $('#' + tagId + '_body').css('position', 'relative');

            this._setFlame(tagId, data);
            this._setTable(tagId, data);
        },

        _setTable: function (tagId, data) {

            var top = 0;
            var left = 0;

            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[0].length; j++) {
                    this._setCell(tagId, data, top, left, data[i][j][1], data[i][j][2], i, j);
                    left += data[i][j][1];
                    if (j === data[0].length -1) {
                        top += data[i][j][2];
                    }
                }
                left = 0;
            }
            totalHeight = top;
        },

        _setCell: function (tagId, data, top, left, width, height, line, row) {

            var cell = document.createElement('div');
                cell.id = tagId + "_cell_" + line + "_" + row;
                cell.innerHTML = data[line][row][0];
            var tagId_body = document.getElementById(tagId + "_body");
                tagId_body.appendChild(cell);

            // css change
            $('#' + tagId + "_cell_" + line + "_" + row).css('position', 'absolute');
            $('#' + tagId + "_cell_" + line + "_" + row).css('top', top + 'px');
            $('#' + tagId + "_cell_" + line + "_" + row).css('left', left + 'px');
            $('#' + tagId + "_cell_" + line + "_" + row).css('width', width + 'px');
            $('#' + tagId + "_cell_" + line + "_" + row).css('height', height + 'px');
            $('#' + tagId + "_cell_" + line + "_" + row).css('borderTop', 'solid 0px white');
            $('#' + tagId + "_cell_" + line + "_" + row).css('borderRight', 'solid 1px black');
            $('#' + tagId + "_cell_" + line + "_" + row).css('borderBottom', 'solid 1px black');
            $('#' + tagId + "_cell_" + line + "_" + row).css('borderLeft', 'solid 0px white');
            $('#' + tagId + "_cell_" + line + "_" + row).css('overflow', 'hidden');

            var timerId = [];
            var me = this;

            // event listener
            cell.addEventListener('click', function () {
                cell.style.height = '';
                me._changeHeight(tagId, data, line, row);
            }, false);

            cell.addEventListener('mouseout', function () {
                // mouseout event is sometimes called when mouse is on cell.
                timerId.push(setTimeout(function () {
                    me._resetHeight(tagId, data, line, row);
                },100));
            }, false);

            cell.addEventListener('mousemove', function () {
                // clear timerId when mouse is on cell.
                for (var i = 0; i < timerId.length; i++) {
                    clearTimeout(timerId[i]);
                    delete timerId[i];
                    timerId = [];
                }
            }, false);
        },

        // change height
        _changeHeight: function (tagId, data, line, row) {

            var cells = [];
            var mainHeight = 0;
            var elseHeight = 0;
            var elseCnt = 0;
            var flag = false; // not to change height of cell

            for (var i = 0; i < data.length; i++) {
                if (i === line) {
                    // div height which is clicked.
                    mainHeight = $("#" + tagId + "_cell_" + i + "_" + row).height();
                    if (mainHeight < data[i][row][2]) {
                        mainHeight = data[i][row][2];
                        flag = true;
                    }
                } else {
                    // div height which is not clicked.
                    elseCnt++;
                    elseHeight += $("#" + tagId + "_cell_" + i + "_" + row).height();
                }
            }

            var remainHeight = totalHeight - mainHeight;
            var setTop = 0;

            for (var i = 0; i < data.length; i++) {
                if (i === line) {   
                    // div height which is clicked.
                    $("#" + tagId + "_cell_" + i + "_" + row).css("top", setTop +"px");
                    if (flag) {
                        $("#" + tagId + "_cell_" + i + "_" + row).css("height", data[i][row][2] +"px");
                    }
                    setTop += mainHeight;
                } else {
                    // div height which is not clicked.
                    $("#" + tagId + "_cell_" + i + "_" + row).height(remainHeight/elseCnt);
                    $("#" + tagId + "_cell_" + i + "_" + row).css("top", setTop +"px");
                    setTop += remainHeight/elseCnt;
                }
            }
        },

        // reset height
        _resetHeight: function (tagId, data, line, row) {

            var top = 0;

            for (var i = 0; i < data.length; i++) {
                $("#" + tagId + "_cell_" + i + "_" + row).height(data[i][row][2]);
                $("#" + tagId + "_cell_" + i + "_" + row).css("top", top +"px");
                top += data[i][row][2];
            }
        },

        // outside flame
        _setFlame: function (tagId, data) {

            var width = 0;
            var height = 0;

            for (var i = 0; i < data[0].length; i++) {
                width += data[0][i][1];
            }
            for (var j = 0; j < data.length; j++) {
                height += data[j][0][2];
            }

            var flame = document.createElement('div');
                flame.id = tagId + "_flame";
            var tagId_flame = document.getElementById(tagId + "_body");
                tagId_flame.appendChild(flame);

            $('#' + tagId + '_flame').css('width', width + 'px');
            $('#' + tagId + '_flame').css('height', height + 'px');
            $('#' + tagId + '_flame').css('borderTop', 'solid 1px black');
            $('#' + tagId + '_flame').css('borderRight', 'solid 0px white');
            $('#' + tagId + '_flame').css('borderBottom', 'solid 0px white');
            $('#' + tagId + '_flame').css('borderLeft', 'solid 1px black');
        }
    };

    ns.prototype = table.prototype;

}(this, "storage.table"));
