define('tentacle/event/interface', function () {
    'use strict';

    return {
        name: function () {
            return;
        },

        accept: function (action) {
            return action;
        },

        attach: function (element, event_name, controller, namespace, action) {
            return element || event_name || controller || namespace || action;
        }
    };
});
