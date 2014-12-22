define('tentacle/controller', ['tentacle/dom'], function (tentacle_dom) {
    'use strict';

    var registry = {}

    return {
        register: function (controllers) {

        },

        resolve: function (namespace, event) {
            namespace = namespace.split(':');
            if (registry[namespace[0]] && registry[namespace[0]][namespace[1]]) {
                registry[namespace[0]][namespace[1]].call(registry[namespace[0]], tentacle_dom, event);
            } else {
                throw 'No method registred';
            }

        }
    }
});
