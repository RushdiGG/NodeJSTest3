/**
 * Created by Rushdi on 2016-11-28.
 */
var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    if(message == 'Test Package') {
        var messagereply = new Buffer('Test Reply');
        server.send(messagereply, 0, message.length, remote.port, remote.address, function (err, bytes) {
            if (err) throw err;
            console.log('UDP message sent to ' + remote.address + ':' + remote.port);
        });
    }
    else {
        return;
    }
});

server.bind(PORT, HOST);