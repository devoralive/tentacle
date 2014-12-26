define('tentacle/event/tag', function () {
    'use strict';

    return {
        accept: function (action) {
            return 'click' === action;
        },

        attach: function (element, controller, action) {
            element.addEventListener(action, function (event) {
                event.preventDefault();
                console.log(controller, event);
            });
        }
    };
});
