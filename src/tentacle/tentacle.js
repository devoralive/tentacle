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
        },
    };
});
