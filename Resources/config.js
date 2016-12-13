/**
 * Created by Rushdi on 2016-12-13.
 */
//Import required libs
var args = require('minimist')(process.argv.slice(2));
var extend = require('extend');

//Store the env var
var environment = args.env || "test";

//Common config
var common_conf = {
    name: "jamoGGNodeTestServer",
    version: "0.0.1",
    environment: environment,
    max_player: 1024,
    data_paths: {
        maps: __dirname + "\\GameData\\" + "Maps\\"
    },
    starting_zone: "first_map_start"
};

var conf = {
    production: {
        ip: args.ip || "0.0.0.0",
        port: args.port || 33333,
        database: "mongodb://54.202.228.27/TestDB"
    },
    test: {
        ip: args.ip || "0.0.0.0",
        port: args.port || 33333,
        database: "mongodb://127.0.0.1:27017/TestDB"
    }
};

extend(false, conf.production, common_conf);
extend(false, conf.test, common_conf);

module.exports = config = conf[environment];