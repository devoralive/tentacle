define('tentacle/controller', function () {
    'use strict';

    var registry = {};

    return {
        register: function (controllers) {
            var controller;
            for (controller in controllers) {
                if (controllers.hasOwnProperty(controller)) {
                    registry[controller] = controllers[controller];
                }
            }
        },

        resolve: function (namespace, action, event) {
            namespace = namespace.split(':');
            if (registry[namespace] && registry[namespace][action]) {
                registry[namespace][action](event);
            } else {
                throw 'No method registred';
            }
        }
    };
});
