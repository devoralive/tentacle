define('tentacle/event', ['tentacle/controller', 'tentacle/event.loader!'], function (controller, events) {
    'use strict';

    return {
        events: events,

        getEventManager: function (action) {
            var manager;
            console.log(this.events);
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
            console.log(events);
            for (key in events) {
                if (events.hasOwnProperty(key)) {
                    var elems = events[key].split(':'),
                        namespace = elems.shift(),
                        action = elems.pop();

                    this.getEventManager(action).attach(node, controller, namespace, action);
                }
            }
        }
    };
});
