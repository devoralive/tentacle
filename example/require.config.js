require.config({
    baseUrl: './..',
    urlArgs: 'cb=' + Math.random(),
    paths: {
        tentacle: 'dist/tentacle',
        doa: 'bower_components/doa/dist/doa'
    },
    shim: {},
    tentacle: {
        events: [
            'tentacle/event/mouse'
        ]
    }
});