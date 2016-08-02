(function () {

    "use strict";

    angular
        .module("uvsensor.utils")
        .service("uvUtils.storageManager", storageManager);

    /**
     * Declare storage service to manage localDB & cookies.
     * @param {"utils.cookieService"} cookieService
     * @param {"utils.localDBService"} localDBService
     */
    function storageManager(cookieService, localDBService) {

        var _sm = this,
            TYPE = {
                "cookie": cookieService,
                "localDB": localDBService
            };

        // Forcibly assign a new storage type.
        this.specify = function (newType) {
            for (var prop in TYPE[newType]) {
                if (TYPE[newType].hasOwnProperty(prop)) {
                    _sm[prop] = TYPE[newType][prop];
                }
            }
            return _sm;
        };

    }

    // IoC container.
    storageManager.$inject = [
        "uvUtils.cookieService",
        "uvUtils.localDBService"
    ];

})();