/*! tentacle - v0.1.0 */

/* src/tentacle.dist.js */
require.config({
    paths: {
        'tentacle/controller': 'tentacle',
        'tentacle/event': 'tentacle',
        'tentacle/event.loader': 'tentacle',
        'tentacle/mutation': 'tentacle',
        'tentacle/tentacle': 'tentacle',
        'tentacle/event/interface': 'tentacle',
        'tentacle/event/mouse': 'tentacle'
    }
});
/* src/tentacle.js */
define('tentacle', function () {
    'use strict';

    return {
        load: function (name, req, onLoad) {
            req(['tentacle/controller'], function (controller) {
                onLoad(controller);

                req(['doa!class:tentacle/mutation', 'doa!class:tentacle/tentacle'], function (mutation, Tentacle) {
                    mutation(name, new Tentacle(name));
                });
            });
        }
    };
});
/* src/tentacle/controller.js */
define('tentacle/controller', function () {
    'use strict';

    var registry = {};

    return {
        register: function (controllers) {
            var controller;
            for (controller in controllers) {
                if (controllers.hasOwnProperty(controller)) {
                    registry[controller] = controllers[controller];
                }
            }
        },

        resolve: function (namespace, action, event) {
            namespace = namespace.split(':');
            if (registry[namespace] && registry[namespace][action]) {
                registry[namespace][action](event);
            } else {
                throw 'No method registred';
            }
        }
    };
});

/* src/tentacle/event.js */
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

/* src/tentacle/event.loader.js */
define('tentacle/event.loader', ['doa/class', 'doa/interface', 'tentacle/event/interface'], function (DoaClass, doa_interface, it) {
    'use strict';

    return {
        load: function (name, req, onLoad, config) {
            if (!config.tentacle && !config.tentacle.events) {
                throw 'no tentacle events configuration found.';
            }

            req(config.tentacle.events, function () {
                var args = Array.prototype.slice.call(arguments),
                    key;

                for (key = 0; key > args.length; key = key + 1) {
                    doa_interface.checkInterfaces(args[key], {'tentacle/event/interface': it});
                    args[key] = new DoaClass(args[key].name(), args[key]);
                }

                onLoad(args);
                return name;
            });
        }
    };
});
/* src/tentacle/mutation.js */
define('tentacle/mutation', function () {
    'use strict';
    var MutationObserver = window.MutationObserver,
        tentacles = {},
        identifier = 'data-tentacle-identifier';

    return {
        config: {
            childList: true,
            characterData: true
        },

        construct: function (name, tentacle) {
            if (tentacles[name] === undefined) {
                tentacle.base.setAttribute(identifier, name);
                tentacles[name] = {};
                tentacles[name].tentacle = tentacle;
                tentacles[name].observer = new MutationObserver(this.onMutations);
                tentacles[name].observer.observe(tentacle.base, this.config);
            }
        },

        onMutations: function (mutations) {
            mutations.forEach(function (mutation) {
                tentacles[mutation.target.getAttribute(identifier)].tentacle.grabNode();
            });
        }
    };
});
/* src/tentacle/tentacle.js */
define('tentacle/tentacle', ['doa!class:tentacle/event'], function (Event) {
    'use strict';
    var event = new Event();

    return {
        public: {
            base: {}
        },

        construct: function (selector) {
            if ('string' !== typeof selector) {
                throw 'tentacle need a dom identifier to work.';
            }
            this.base = document.querySelector(selector);
            this.grabNode();
        },

        grabNode: function () {
            event.parseEvents(this.findNode(this.base));
        },

        findNode: function (element) {
            var selector = '[data-tentacle]:not([data-grabed="true"])';
            if (element) {
                return element.querySelectorAll(selector);
            }
            return this.base.querySelectorAll(selector);
        }
    };
});

/* src/tentacle/event/interface.js */
define('tentacle/event/interface', function () {
    'use strict';

    return {
        name: function () {
            return;
        },

        accept: function (action) {
            return action;
        },

        attach: function (element, event_name, controller, namespace, action) {
            return element || event_name || controller || namespace || action;
        }
    };
});

/* src/tentacle/event/mouse.js */
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

        attach: function (element, event_name, controller, namespace, action) {
            element.addEventListener(event_name, function (event) {
                event.preventDefault();
                controller.resolve(namespace, action, event);
            });
        }
    };
});
