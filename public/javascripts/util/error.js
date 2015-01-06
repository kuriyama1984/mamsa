(function(global, namespace) {

    /**
    * Mechanism and Approach error for Social Activity (MAMSA)
    * 
    * @module mamsa
    **/
    var ns = mamsa.addNamespace(namespace);

    /**
    * error check
    *
    * @class error
    */
    var error = function () {};

    error.prototype = {

        message: {
            1: '',
            100: '必須事項が入力されていません。',
            101: 'カタカナを正しく入力してください。'
        },

        /**
        * convert tag like HTMLChars on php <br />
        * passing　when without string
        *
        * @method convertHTMLChars
        * @param {string} check target
        * @return {string} return string
        */
        convertHTMLChars: function (str) {
            if (typeof(str) === 'string') {
                return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            } else {
                return str;
            }
        },

        /**
        * check data exist
        *
        * @method isData
        * @param {string} check target
        * @return {boolean} return ture or false
        */
        isData: function (data) {
            if (typeof(data) !== 'undefined' && data !== '') {
                return true;
            } else {
                return false;
            }
        },

        /**
        * check data exist return message
        *
        * @method checkKana
        * @param {string} check target
        * @return {string} return message
        */
        checkData: function (data, msg, title) {
            if (!this.isData(data)) {
                msg += title + 'の' + this.message[100] + '<br />';
            }
            return msg;
        },

        /**
        * check katakana
        *
        * @method isKana
        * @param {string} check target
        * @return {boolean} return ture or false
        */
        isKana: function (str) {
            if (typeof(str) === 'string' && str.match(/^[\u30A0-\u30FF]+$/)) {
                return true;
            } else {
                return false;
            }
        },

        /**
        * check katakana return message
        *
        * @method checkKana
        * @param {string} check target
        * @return {string} return message
        */
        checkKana: function (str, msg, title) {
            if (!this.isData(str)) {
                msg += title + 'の' + this.message[100] + '<br />';
            } else if (!this.isKana(str)) {
                msg += title + 'の' + this.message[101] + '<br />';
            }
            return msg;
        }
    };

    ns.prototype = error.prototype;

}(this, 'mamsa.error'));