(function(global, namespace) {

    /**
    * Mechanism and Approach Maps for Social Activity (MAMSA)
    * 
    * @module storage
    **/
    var ns = storage.addNamespace(namespace);

    /**
    * dragDrop has some type of frag & drop
    * <br /> only for Google Chrome and Chrome for Android
    * <br /> only image and text files
    *
    * @class dragDrop
    */
    var dragDrop = function () {};

    dragDrop.prototype = {

        /**
        * setType1 is drag & drop files
        *
        * @method setType1
        * @param {string} tagId is for setting like div.id
        * @param {function} callback([object])
        * @param {string} dispId is for display like div.id (optional)
        * @return {int} status
        */
        setType1: function (tagId, callback, dispId) {

            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                return 7; // unsupported browser
            }

            if (typeof(tagId) !== 'string' ||
                (typeof(dispId) !== 'string' && typeof(dispId) !== 'undefined') ||
                typeof(callback) !== 'function'
                ) {
                return 3; // illegal arg status
            }

            var self = this;
            var element = window.document.getElementById(tagId);

            element.addEventListener('dragover', function (event) {

                event.preventDefault(); // not to display file image
            }, false);

            element.addEventListener('drop', function (event) {

                event.preventDefault(); // not to display file image
                self._handleType1(event, dispId, callback);
            }, false);

            return 0; // success OK
        },

        _handleType1: function (e, dispId, callback) {

            var files = e.dataTransfer.files;
            var output = [];
            var self = this;
            var cnt = 1;

            for (var i = 0; i < files.length; i++) {

                var data = {};

                // only image or text
                var f = files[i];
                if (!f.type.match('image.*') && !f.type.match('text.*')) {
                    console.log('only for image file and text file.');
                    cnt++;
                    continue;
                }

                // new file reader and error check
                var reader = new FileReader();
                reader.onerror = function (e) {
                    console.log('read error');
                };

                data.name = f.name;
                data.size = f.size;
                data.type = f.type;

                // image file
                if (f.type.match('image.*')) {

                    reader.onload = function (evt) {
                        if (typeof(dispId) === "string") {
                            document.getElementById('disp').innerHTML += '<img id="id' + i + '" src="' + evt.target.result + '" /><br />'
                        }
                        // set img binary data
                        data.image = evt.target.result;
                        output.push(data);

                        // callback if last
                        if (cnt === files.length) {
                            callback(output);
                        }
                        cnt++;
                    };

                    // get new file data
                    reader.readAsDataURL(f);
                }

                // text file
                if (f.type.match('text.*')) {

                    reader.onload = function (evt) {
                        if (typeof(dispId) === "string") {
                            document.getElementById('disp').innerHTML += '<span id="id' + i + '">' + reader.result + '</span>';
                        }
                        // set img binary data
                        data.text = reader.result;
                        output.push(data);

                        // callback if last
                        if (cnt === files.length) {
                            callback(output);
                        }
                        cnt++;
                    };

                    // get new file data
                    reader.readAsText(f, 'shift-jis');
                }
            }
        }
    };

    ns.prototype = dragDrop.prototype;

}(this, 'storage.dragDrop'));
