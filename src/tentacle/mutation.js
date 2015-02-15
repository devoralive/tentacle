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