require.config({
    'replacement/Worker': 'node_modules/paralleljs/lib/Worker',
    'replacement/MutationObserver': 'tentacle/replacement/MutationObserver'
});
define('tentacle/navigator', {
    load: function (name, req, onLoad) {
        'use strict';

        if (document[name]) {
            onLoad(document[name]);
        } else if (window[name]) {
            onLoad(window[name]);
        } else if (navigator[name]) {
            onLoad(navigator[name]);
        } else {
            req(['replacement/' + name], function (replacement) {
                onLoad(replacement);
            });
        }
    }
});