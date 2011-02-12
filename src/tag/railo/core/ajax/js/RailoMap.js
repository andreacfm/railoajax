Railo.Map = (function() {


    var adapter = new Railo.adapters.Map();

    Railo.Message.map = {
        missingRelatedArgument : 'Attributes {0} or {1} are required.'
    }

    /**
     * getAdapter
     * @return  {Object} adaptere
     *
     */
    function getAdapter() {
        return adapter;
    }

    return {

        /**
         *
         * @param {String} name
         * @param {Object} options
         */
        init : function(name, options) {

            var adapter = getAdapter();
            if ((options.centeraddress.length == 0) && (options.centerlatitude.length == 0 || options.centerlongitude.length == 0)) {
                Railo.globalErrorHandler('map.missingRelatedArgument', ['centeraddress','centerlatitude,centerlongitude']);
            }
            options.address = options.centeraddress;
            options.latitude = options.centerlatitude;
            options.longitude = options.centerlongitude;
            adapter.init(name, options);

        },

        /**
         * Return the js map object.
         * @param {Object} name
         */
        getMapObject : function(name) {
            var adapter = getAdapter();
            return adapter.getMapObject(name);
        },

        /**
         * Add a marker
         * @param {String} name
         * @param {Object} markerObj Javascripot literal object support all the attributes supported by the cfmap tag.
         */
        addMarker : function(name, markerObj) {
            var adapter = getAdapter();
            var options = markerObj;
            // validate
            if ((options.address.length == 0) && (options.latitude.length == 0 || options.longitude.length == 0)) {
                Railo.globalErrorHandler('map.missingRelatedArgument', ['centeraddress','centerlatitude,centerlongitude']);
            }
            //call adapter
            adapter.addMarker(name, options);
        },

        /**
         *
         * @param name - map name
         * @param event - event to listen to http://code.google.com/apis/maps/documentation/javascript/events.html#EventListeners
         * @param listener  function to be fired
         */
        addEvent :function(name, event, listener) {
            var adapter = getAdapter();
            adapter.addEvent(name, event, listener);
        }
    }

})();

