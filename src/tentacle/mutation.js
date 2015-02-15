define('tentacle/mutation', function () {
    'use strict';
    var MutationObserver = window.MutationObserver,
        tentacles = {};


    if (undefined === MutationObserver) {
        MutationObserver = function (callback) {
            self = this;
            self.element = {};
            self.callback = callback;

            this.observe = function (Element) {
                self.element = Element;
                self.element.addEventListener('DOMSubtreeModified', self.callback);
            };

            this.disconnect = function () {
                self.element.removeEventListener('DOMSubtreeModified', self.callback);
            };
        };
    }

    return {
        config: {
            childList: true,
            characterData: true
        },

        construct: function(name, tentacle) {
            if (tentacles[name] === undefined) {
                tentacle.base.setAttribute('data-tentacle-identifier', name);
                tentacles[name] = {};
                tentacles[name].tentacle = tentacle;
                tentacles[name].observer = new MutationObserver(this.onMutations);
                tentacles[name].observer.observe(tentacle.base, this.config);
            }
        },

        onMutations: function (mutations) {
            mutations.forEach(function(mutation) {
                tentacles[mutation.target.getAttribute('data-tentacle-identifier')].tentacle.grabNode();
            });
        }
    };
});