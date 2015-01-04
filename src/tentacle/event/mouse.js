define('tentacle/event/mouse', function () {
    'use strict';

    return {
        event_list: [
            'click',
            'mouseover',
            'mouseout'
        ],

        name: function () {
            return 'tentacle/event/mouse';
        },

        accept: function (action) {
            return (this.event_list.indexOf(action) === -1 ? false : true);
        },

        attach: function (element, controller, namespace, action) {
            element.addEventListener(action, function (event) {
                event.preventDefault();
                controller.resolve(namespace, action, event);
            });
        }
    };
});
