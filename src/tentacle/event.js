define('tentacle/event', ['tentacle/controller', 'tentacle/event.loader!'], function (controller, event_managers) {
    'use strict';

    return {
        events: event_managers,

        getEventManager: function (event_name) {
            var manager;
            for (manager in this.events) {
                if (this.events.hasOwnProperty(manager)) {
                    if (this.events[manager].accept(event_name)) {
                        return this.events[manager];
                    }
                    throw 'no event manager found for the event type: ' + event_name;
                }
            }
        },

        parseEvents: function (nodes) {
            var key,
                events;
            for (key in nodes) {
                if (nodes.hasOwnProperty(key)) {
                    events = nodes[key].dataset.tentacle.split(' ');

                    this.bindEvents(nodes[key], events);
                }
            }
        },

        bindEvents: function (node, events) {
            var key,
                elems,
                event_name,
                namespace,
                action;

            for (key in events) {
                if (events.hasOwnProperty(key)) {
                    elems = events[key].split(':');
                    event_name = elems.shift();
                    namespace = elems.shift();
                    action = elems.pop();
                    node.setAttribute('data-grabed', true);
                    this.getEventManager(event_name).attach(node, event_name, controller, namespace, action);
                }
            }
        }
    };
});
