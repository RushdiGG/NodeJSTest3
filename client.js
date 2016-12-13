/**
 * Created by Rushdi on 2016-12-09.
 */
module.exports = function () {

    this.initiate = function (remote, connectionID) {

        var client = this;
        var messagereply = Buffer.allocUnsafe(32);
        messagereply = messagereply.fill(0);
        messagereply.writeUInt16LE(connectionID,0);

        client.socket.send(messagereply, 0, messagereply.length, remote.port, remote.address, function (err, bytes) {
            if (err) throw err;
            console.log('Client Initiation complete sent to ' + remote.address + ':' + remote.port);
        });

    }

    this.login = function (remote, data, connectionID) {
        console.log('Log In Request from Client: ' + connectionID);
        console.log('Processing data: ' + data.toString());
    }
    
    this.joinq = function (remote, data, connectionID) {
        
    }

    this.data = function (remote, data, connectionID) {
        console.log('Processing data: ' + data.toString());
    }

    this.exit = function (remote, connectionID) {

    }
}