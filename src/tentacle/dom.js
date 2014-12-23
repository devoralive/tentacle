define('tentacle/dom', function () {
    'use strict';

    var dom = function (selector) {
        this.querSelectorAll(selector);

    };

    dom.prototype.item = undefined;

    dom.prototype.insert = function (chain) {
        var block = document.createElement('div');
        block.innerHTML = chain;
        this.item = block;

        return this;
    };

    dom.prototype.in = function (selector) {
        var selected = document.querSelector(selector);
        selected.appendChild(this.item);
        this.item = undefined;

        return this;
    };

    dom.prototype.before = function (selector) {
        this.item = selector;

        return this;
    };

    dom.prototype.after = function (selector) {
        this.item = selector;

        return this;
    };

    return dom;
});
