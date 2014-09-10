(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module storage
    **/
    var ns = storage.addNamespace(namespace);

    /**
    * callback of selectBox.type1
    *
    * @class selectBox_type1CB
    */
    var selectBox_type1CB = function () {};

    selectBox_type1CB.prototype = {

        /**
        * event after onChange
        *
        * @event onChange
        * @param {String} selectedId
        */
        onChange: function(selectedId) {}
    };

   ns.prototype = selectBox_type1CB.prototype;

}(this, 'storage.selectBox_type1CB'));
