define('tentacle', function () {
    'use strict';

    var register = {
        tentacles: []
    };

    return {
        load: function (name, req, onLoad) {
            req(['tentacle/controller'], function (controller) {
                onLoad(controller);

                req(['doa!class:tentacle/tentacle'], function (Tentacle) {
                    register.tentacles.push(new Tentacle(name));
                });
            });
        }
    };
});