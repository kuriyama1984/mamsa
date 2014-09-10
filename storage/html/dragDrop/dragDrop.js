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
        * @param {string} tagId is for setting
        * @param {dragDrop_type1CB} callback
        * @return {int} status
        */
        setType1: function (tagId, callback) {

            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                return 7; // unsupported browser
            }

            if (typeof(tagId) !== 'string'
                || !storage.dragDrop_type1CB.prototype.isPrototypeOf(callback)
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
                self._handleType1(event, callback);
            }, false);

            return 0; // success OK
        },

        _handleType1: function (e, callback) {

            var files = e.dataTransfer.files;
            var disp = document.getElementById('disp');
            var type1DCs = [];
            var self = this;
            var cnt = 1;

            for (var i = 0; i < files.length; i++) {

                var type1DC = Object.create(storage.dragDrop_type1DC.prototype);

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

                type1DC.name = f.name;
                type1DC.size = f.size;
                type1DC.type = f.type;

                // image file
                if (f.type.match('image.*')) {

                    reader.onload = function (evt) {
                        // set img binary data
                        var imgTag = '<img id="id' + i + '" src="' + evt.target.result + '" /><br />'
                        disp.innerHTML += imgTag;
                        type1DC.image = evt.target.result;
                        type1DCs.push(type1DC);

                        // callback if last
                        if (cnt === files.length) {
                            callback.onUpload(type1DCs);
                        }
                        cnt++;
                    };

                    // get new file data
                    reader.readAsDataURL(f);
                }

                // text file
                if (f.type.match('text.*')) {

                    reader.onload = function (evt) {
                        // set img binary data
                        disp.innerHTML += '<span id="id' + i + '">' + reader.result + '</span>';
                        type1DC.text = reader.result;
                        type1DCs.push(type1DC);

                        // callback if last
                        if (cnt === files.length) {
                            callback.onUpload(type1DCs);
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
