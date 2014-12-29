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

        bindEvents: function (nodes) {
            var key;
            for (key in nodes) {
                if (nodes.hasOwnProperty(key)) {
                    var elems = nodes[key].dataset.tentacle.split(':'),
                        namespace = elems.shift(),
                        action = elems.pop();

                    this.getEventManager(action).attach(nodes[key], controller, namespace, action);
                    console.log(nodes[key]);
                }
            }
        }
    };
});
