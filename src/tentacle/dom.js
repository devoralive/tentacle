define('tentacle/dom', function () {
    'use strict';

    var item = undefined,

        dom = {
            insert: function (chain) {
                var block = document.createElement('div');
                block.innerHTML = chain;
                this.item = block;

                return this;
            },

            in: function (selector) {
                var selected = document.querySelector(selector);
                selected.appendChild(this.item);
                this.item = undefined;

                return this;
            },

            before: function (selector) {
                this.item = selector;

                return this;
            },

            after: function (selector) {
                this.item = selector;

                return this;
            }
        };

    return dom;
});
