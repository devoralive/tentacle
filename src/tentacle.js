define('tentacle/application', ['tentacle/navigator!MutationObserver', 'doa/class', 'domReady!'], function (MutationObserver, DoaClass) {
    var grabReactiveNode = function (base) {
            return
        },

        tentacle = {
            base,

            construct: function (selector) {
                if ('String' !== typeof selector) {
                    throw 'tentacle need a dom identifier to work.';
                }
                this.base = document.querySelector(selector);
            }
        };
});