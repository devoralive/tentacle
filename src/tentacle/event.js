define('tentacle/event', ['tentacle/controller', 'tentacle/event.loader!'], function (controller, events) {
    'use strict';

    return {
        events: events,

        getEventManager: function (action) {
            var manager;
            for (manager in this.events) {
                if (this.events[manager].accept(action)) {
                    return this.events[manager];
                }
            }
        },

        parseEvents: function (nodes) {
            var key;
            for (key in nodes) {
                if (nodes.hasOwnProperty(key)) {
                    var events = nodes[key].dataset.tentacle.split(' ');

                    this.bindEvents(nodes[key], events);
                }
            }
        },

        bindEvents: function (node, events) {
            var key;

            for (key in events) {
                if (events.hasOwnProperty(key)) {
                    var elems = events[key].split(':'),
                        event_name = elems.shift(),
                        namespace = elems.shift(),
                        action = elems.pop();

                    this.getEventManager(action).attach(node, event_name, controller, namespace, action);
                }
            }
        }
    };
});
