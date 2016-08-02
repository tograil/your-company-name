(function () {

    "use strict";

    angular
        .module("uvsensor.utils")
        .service("uvUtils.localDBService", localDBService);

    /**
     * Declare localDB service to work with cookies with CRUD functionality.
     */
    function localDBService() {

        this.delete = remove;
        this.deleteAll = removeAll;
        this.get = getValue;
        this.getAll = getAll;
        this.set = specify;

        function getValue(i) {
            return localStorage.getItem(localStorage.key(i));
        }

        function getAll() {
            var result = [];
            for (var i = 0, len = localStorage.length; i < len; ++i) {
                result.push(localStorage.key(i) + "=" + localStorage.getItem(localStorage.key(i)));
            }
            return result;
        }

        function remove(key) {
            localStorage.removeItem(key);
        }

        function removeAll() {
            localStorage.clear();
        }

        function specify(key, value) {
            localStorage.setItem(key, value);
        }

    }

})();