define('tentacle/event/tag', function () {
    'use strict';

    return {
        accept: function (action) {
            return 'click' === action;
        },

        attach: function (element, controller, namespace, action) {
            element.addEventListener(action, function (event) {
                event.preventDefault();
                controller.resolve(namespace, action, event);
            });
        }
    };
});
