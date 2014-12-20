define('tentacle/tentacle', ['tentacle/navigator!MutationObserver'], function (MutationObserver) {
    'use strict';

    return {
        base: {},

        observer: {},

        construct: function (selector) {
            if ('string' !== typeof selector) {
                throw 'tentacle need a dom identifier to work.';
            }
            this.base = document.querySelector(selector);
            this.observer = new MutationObserver(this.onMutated.bind(this));
        },

        grabNode: function (element) {
            var selector = '[data-tentacle]:not([data-grabed="true"])';
            if (element) {
                return element.querySelectorAll(selector);
            }
            return this.base.querySelectorAll(selector);
        },

        onMutated: function (mutations) {
            var self = this;
            mutations.forEach(function (mutation) {
                var nodes = self.grabNode(mutation.target);
                console.log(nodes);
            });
        }
    };
});