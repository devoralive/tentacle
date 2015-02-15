define('tentacle/mutation', function () {
    'use strict';
    var MutationObserver = window.MutationObserver;

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

    return MutationObserver;
});