define('tentacle/event', ['doa!class:tentacle/event/tag'], function (Tag) {
    'use strict';

    return {
        events: [
            new Tag()
        ],

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
                        controller = elems.shift(),
                        action = elems.pop();

                    this.getEventManager(action).attach(nodes[key], controller, action);
                    console.log(nodes[key]);
                }
            }
        }
    };
});
