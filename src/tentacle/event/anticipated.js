define('tentacle/event/anticipated', function () {
    'use strict';

    return {
        event_list: [
            'click'
        ],

        namespace: '',

        controller: {},

        action:'',

        name: function () {
            return 'tentacle/event/anticipated';
        },

        accept: function (action) {
            return (this.event_list.indexOf(action) === -1 ? false : true);
        },

        executeAction: function (event) {
            event.preventDefault();
            this.controller.resolve(this.namespace, this.action, event);
        },

        attach: function (element, controller, namespace, action) {
            this.namespace = namespace;
            this.controller = controller;
            this.action = action;

            element.addEventListener('mouseover', this.executeAction);

            element.addEventListener('mouseout', function (event) {
                event.preventDefault();
                controller.resolve(mouseout, action, event);
            });
        }
    };
});
