define('tentacle/application', ['domReady!'], function () {

    return {
        load: function (name, req) {
            req(['doa!class:' + name, 'doa/interface', 'farmer/application'], function (App, doa_interface, ApplicationIntreface) {
                doa_interface.checkInterfaces(App, {'farmer/ApplicationIntreface': ApplicationIntreface});
                onLoad(App);
            });
        }
    }
});