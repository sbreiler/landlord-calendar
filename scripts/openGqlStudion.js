const openURL = require( '@stdlib/utils-open-url' );
const config = require('../config');

const endpointUrl = `http://localhost:${config.graphQl.port}`;

openURL('https://studio.apollographql.com/sandbox/explorer?endpoint=' + encodeURIComponent(endpointUrl));
