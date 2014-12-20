require.config({
    baseUrl: './..',
    urlArgs: 'cb=' + Math.random(),
    paths: {
        tentacle: 'src/tentacle',
        doa: 'bower_components/doa/dist/doa'
    },
    shim: {}
});