(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module storage
    **/
    var ns = storage.addNamespace(namespace);

    /**
    * selectBox has some type of select boxes.
    *
    * @class selectBox
    */
    var selectBox = function () {};

    selectBox.prototype = {

        /**
        * setType1 is single select box
        *
        * @method setType1
        * @param {optionList} [{name:'str',value:'str'}] : optionList is for select options
        * @param {string} tagId is for setting
        * @param {string} selectId is for select
        * @param {selectBox_type1CB} callback
        * @return {int} status
        */
        setType1: function (optionList, tagId, selectId, callback) {

            try {
                for (var i = 0; i < optionList.length; i++) {
                    if (!(typeof(optionList[i].name) === 'string' && typeof(optionList[i].value) === 'string')) {
                        return 3; // illegal arg status
                    }
                }
            } catch (e) {
                return 3; // illegal arg status
            }

            if (typeof(tagId) !== 'string'
                || typeof(selectId) !== 'string'
                || !storage.selectBox_type1CB.prototype.isPrototypeOf(callback)
                ) {
                return 3; // illegal arg status
            }

            var htmlTag = document.getElementById(tagId);
            var selectTag = '<select id="' + selectId + '" >';
            for (var i = 0, selectData = optionList; i < selectData.length; i++) {
                selectTag += '<option value="' + selectData[i].value + '">' + selectData[i].name + '</option>';
            }
            selectTag += '</select>';
            htmlTag.innerHTML = selectTag;

            document.getElementById(selectId).addEventListener("change", function () {
                var selectedId = document.getElementById(selectId).options[document.getElementById(selectId).selectedIndex].value;
                callback.onChange(selectedId);
            }, false);

            return 0; // success OK
        }
    };

    ns.prototype = selectBox.prototype;

}(this, "storage.selectBox"));
