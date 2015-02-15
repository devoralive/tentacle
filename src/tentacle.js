define('tentacle', function () {
    'use strict';

    return {
        load: function (name, req, onLoad) {
            req(['tentacle/controller'], function (controller) {
                onLoad(controller);

                req(['doa!class:tentacle/mutation', 'doa!class:tentacle/tentacle'], function (mutation, Tentacle) {
                    mutation(name, new Tentacle(name));
                });
            });
        }
    };
});