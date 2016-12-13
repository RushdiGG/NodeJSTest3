/**
 * Created by Rushdi on 2016-11-28.
 */
require(__dirname + '/Resources/config.js');
var fs = require('fs');
var dgram = require('dgram');

console.log(config.database);

//Server properties, default IP address 0.0.0.0
var PORT = 33333;
var server = dgram.createSocket('udp4');
var maxConnections = 1024;

var init_files = fs.readdirSync(__dirname + "/Initializers");
init_files.forEach(function(initFile){
    console.log('Loading Initializer: ' + initFile);
    require(__dirname + "/Initializers/" + initFile);
});

var model_files = fs.readdirSync(__dirname + "/Models");
model_files.forEach(function(modelFile){
    console.log('Loading Models: ' + modelFile);
    require(__dirname + "/Models/" + modelFile);
});

maps = {};
var map_files = fs.readdirSync(config.data_paths.maps);
map_files.forEach(function(mapFile){
    console.log('Loading Map: ' + mapFile);
    var map = require(config.data_paths + mapFile);
    maps[map.room] = map;
});

//Buffers
var numConnections = 0;
var clientHolder = {};
var messagereply = Buffer.allocUnsafe(32);

//Server startup flag
server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

//Server to Client communication
server.on('message', function (message, remote) {

    //Clear reply Buffer
    messagereply = messagereply.fill(0);

    //Check if client has connectionID, assign one if necessary and initiate client instance
    if(message.readUInt16LE(0) == 0)
    {
        numConnections++;
        console.log(numConnections);
        var c_inst = new require('./client.js');
        clientHolder[numConnections] = new c_inst();
        clientHolder[numConnections].socket = this;
        clientHolder[numConnections].initiate(remote, numConnections);
    }

    //Client has connectionID, check request in message Buffer[2]
    else {
        var connectionID = message.readUInt16LE(0);
        //0 = Log in request
        if (message.readUInt16LE(2) == 0) {
            clientHolder[connectionID].login(remote, message, connectionID);
        }

        //1 = Join queue request
        else if (message.readUInt16LE(2) == 1){
            console.log('Join Queue Request from Client: ' + connectionID);
            clientHolder[connectionID].joinq(remote, message, connectionID);
        }

        //None of the above = Unknown request
        else {
                console.log('Unknown request');
        }
    }
});

//Initiate server
server.bind(PORT);