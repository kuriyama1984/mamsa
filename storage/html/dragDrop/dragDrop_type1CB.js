(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module storage
    **/
    var ns = storage.addNamespace(namespace);

    /**
    * callback of dragDrop.type1
    *
    * @class dragDrop_type1CB
    */
    var dragDrop_type1CB = function () {};

    dragDrop_type1CB.prototype = {

        /**
        * event after onUpload
        *
        * @event onUpload
        * @param {dragDrop_type1DC-array} storage.dragDrop_type1DC
        */
        onUpload: function(type1DCs) {}
    };

   ns.prototype = dragDrop_type1CB.prototype;

}(this, 'storage.dragDrop_type1CB'));
