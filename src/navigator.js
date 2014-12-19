require.config({
    'replacement/Worker': 'node_modules/paralleljs/lib/Worker'
});
define('navigator', {
    onLooad: function (name, req) {
        if (document[name]) {
            onload(document[name]);
        } else if (window[name]) {
            onload(window[name]);
        } else if (navigator[name]) {
            onload(navigator[name]);
        } else {
            req(['replaement/' + name], function (replacement) {
                onload(replacement);
            });
        }
    }
});