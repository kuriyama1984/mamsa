(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module storage
    **/
    var ns = storage.addNamespace(namespace);

    /**
    * webStrage has some type of select boxes.
    *
    * @class webStrage
    */
    var webStrage = function () {};

    var session = undefined;
    var local = undefined;

    webStrage.prototype = {

        /**
        * create webStrage class.
        *
        * @method create
        * @return {object} 
        */
        create: function () {

            if (typeof(sessionStorage) === 'undefined' ||
                typeof(localStorage) === 'undefined') {
                alert('out of Web Storage');
                return;
            }

            session = sessionStorage;
            local = localStorage;
        },

        /**
        * set local webStrage.
        *
        * @method setLocal
        * @param {string} key
        * @param {anything} value
        */
        setLocal: function (key, value) {

            checkString(key);

            // select target object from local
            var replaced = this._replaceObj(local, key, value);
            this._fixObj(local, replaced);
        },

        /**
        * get local webStrage.
        *
        * @method getLocal
        * @param {string} key
        */
        getLocal: function (key) {

            checkString(key);

            try {
                return this._selectObj(local, key);
            } catch (e) {
                return;
            }
        },

        /**
        * delete local webStrage.
        *
        * @method deleteLocal
        * @param {string} key
        */
        deleteLocal: function (key) {

            this._deleteObj(local, key);
        },

        /**
        * delete all local webStrage.
        *
        * @method deleteLocalAll
        */
        deleteLocalAll: function () {

            local.clear();
        },

        /**
        * set session webStrage.
        *
        * @method setSession
        * @param {string} key
        * @param {anything} value
        */
        setSession: function (key, value) {

            checkString(key);

            // select target object from session
            var replaced = this._replaceObj(session, key, value);
            this._fixObj(session, replaced);
        },

        /**
        * get session webStrage.
        *
        * @method getSession
        * @param {string} key
        */
        getSession: function (key) {

            checkString(key);

            try {
                return this._selectObj(session, key);
            } catch (e) {
                return;
            }
        },

        /**
        * delete session webStrage.
        *
        * @method deleteSession
        * @param {string} key
        */
        deleteSession: function (key) {

            this._deleteObj(session, key);
        },

        /**
        * delete all session webStrage.
        *
        * @method deleteSessionAll
        */
        deleteSessionAll: function () {

            session.clear();
        },

        // create webStorage object
        _createObj: function (webStorage) {
            var out = {};
            for (localKey in webStorage) {
                try {
                    out[localKey] = JSON.parse(webStorage[localKey]);
                } catch (e) {
                    out[localKey] = webStorage[localKey];
                }
            }
            return out;
        },

        // select webStorage object
        _selectObj: function (webStorage, key) {
            var data = this._createObj(webStorage);
            try {
                eval('var out = data.' + key + ';');
                return out;
            } catch (e) {
                throw "no data";
            }
        },

        // replace webStorage object
        _replaceObj: function (webStorage, key, value) {
            var storage = this._createObj(webStorage);
            var keys = key.split('.');
            var target = {};
            var pre = {};
            for (var i = keys.length -1; i >= 0; i--) {
                if (i !== keys.length -1) {
                    target[keys[i]] = pre;
                    pre = target;
                } else {
                    target[keys[i]] = value;
                    pre = target;
                }
                if (i !== 0) {
                    target = {};
                }
            }
            $.extend(true, storage, target);
            return storage;
        },

        // fix for webStorage object
        _fixObj: function (webStorage, obj) {
            for (objKey in obj) {
                if (typeof(obj[objKey]) === 'object') {
                    webStorage.setItem(objKey, JSON.stringify(obj[objKey]));
                } else {
                    webStorage.setItem(objKey, obj[objKey]);
                }
            }
            return webStorage;
        },

        // delete webStorage object
        _deleteObj: function (webStorage, key) {
            var keys = key.split('.');
            var data = this._createObj(webStorage);

            try {
                eval('delete data.' + key + ';');
            } catch (e) {
                return;
            }

            if (keys.length === 1) {
                // remove key if there is no dot [.]
                webStorage.removeItem(key);
            } else {
                this._fixObj(webStorage, data);
            }
        },
    };

    var checkString =  function (str) {
        if (typeof(str) !== 'string') {
            alert('type of [ ' + str + ' ] is not string');
            return;
        }
        var strs = str.split('.');
        for (var i = 0; i < strs.length; i++) {
            if (strs[i] === '') {
                alert(str + ' must contain string between [.] ');
                return;
            }
        }
    };

    ns.prototype = webStrage.prototype;

}(this, "storage.webStrage"));
