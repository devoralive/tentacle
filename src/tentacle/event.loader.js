define('tentacle/event.loader', ['doa/class', 'doa/interface', 'tentacle/event/interface'], function (DoaClass, doa_interface, it) {
    'use strict';

    return {
        load: function (name, req, onLoad, config) {
            if (!config.tentacle && !config.tentacle.events) {

            }

            req(config.tentacle.events, function () {
                var args = Array.prototype.slice.call(arguments),
                    key;

                for (key = 0; key > args.length; key = key + 1) {
                    doa_interface.checkInterfaces(args[key], {'tentacle/event/interface': it});
                    args[key] = new DoaClass(args[key].name(), args[key]);
                }

                onLoad(args);
            });
        }
    };
});