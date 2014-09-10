(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module storage
    **/
    var ns = storage.addNamespace(namespace);

    /**
    * dataClass of dragDrop.type1
    *
    * @class dragDrop_type1DC
    */
    var dragDrop_type1DC = function () {};

    /**
    * inside data <br />
    * name: 'str' <br />
    * size: 0 <br />
    * type: 'str' <br />
    * image: 'str'
    *
    * @method toJSON
    * @return {object} inside data
    */
    dragDrop_type1DC.prototype.toJSON = function() {
        var replace = {};
        replace.name = this._name;
        replace.size = this._size;
        replace.type = this._type;
        replace.image = this._image;
        return replace;
    };

    Object.defineProperties(dragDrop_type1DC.prototype, {
        _name: {
            value: 'str',
            writable: true,
            enumerable: true,
            configurable: true
        },
        _size: {
            value: 0,
            writable: true,
            enumerable: true,
            configurable: true
        },
        _type: {
            value: 'str',
            writable: true,
            enumerable: true,
            configurable: true
        },
        _image: {
            value: 'str',
            writable: true,
            enumerable: true,
            configurable: true
        },
        name: {
            set: function (arg) {
                if (typeof(arg) !== 'string') {
                    throw new TypeError();
                }

                this._name = arg;
            },
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        },
        size: {
            set: function (arg) {
                if (typeof(arg) !== 'number') {
                    throw new TypeError();
                }

                this._size = arg;
            },
            get: function () {
                return this._size;
            },
            enumerable: true,
            configurable: true
        },
        type: {
            set: function (arg) {
                if (typeof(arg) !== 'string') {
                    throw new TypeError();
                }

                this._type = arg;
            },
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        },
        image: {
            set: function (arg) {
                if (typeof(arg) !== 'string') {
                    throw new TypeError();
                }

                this._image = arg;
            },
            get: function () {
                return this._image;
            },
            enumerable: true,
            configurable: true
        }
    });

   ns.prototype = dragDrop_type1DC.prototype;

}(this, 'storage.dragDrop_type1DC'));
