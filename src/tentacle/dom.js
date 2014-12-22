define('tentacle/dom', ['doa/class'], function (DoaClass) {
    'use strict';

    var dom = {
        item: undefined,

        insert: function (chain) {
            var docfrag = document.createDocumentFragment();
            if (!this.item) {
                this.item = chain;

                return this;
            }
        },

        in: function (selector) {
            this.item = chain;

            return this;
        },

        before: function (selector) {
            this.item = chain;

            return this;
        },

        after: function (selector) {
            this.item = chain;

            return this;
        }
    }

    return dom;
});