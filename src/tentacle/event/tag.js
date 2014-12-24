define('tentacle/event/tag', ['doa!interface:tentacle/event/intreface'], function () {
    'use strict';

    return {
        accept: function (name) {
            return 'click' === name;
        },

        attach: function (cotroller, element, name) {
            element.addEventListener(name, function (event) {
                controller.resolve(element, event);
            });
        }
    };
});
