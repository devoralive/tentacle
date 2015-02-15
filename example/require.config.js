require.config({
    baseUrl: './..',
    urlArgs: 'cb=' + Math.random(),
    paths: {
        tentacle: 'dist/tentacle.min',
        doa: 'bower_components/doa/dist/doa'
    },
    shim: {},
    tentacle: {
        events: [
            'tentacle/event/mouse'
        ]
    }
});