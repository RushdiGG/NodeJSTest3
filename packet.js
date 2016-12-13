/**
 * Created by Rushdi on 2016-12-12.
 */
var zeroBuffer = new Buffer('00', 'hex');

module.exports = packet = {

    build: function (params) {

        var packetParts = [];
        var packetSize = 0;

        params.forEach(function (param) {
            var buffer;

            if (typeof param === 'string') {
                buffer = new Buffer(param, 'utf8');
                buffer = Buffer.concat([buffer, zeroBuffer, buffer.length + 1]);
            }

            else if (typeof param === 'number') {
                buffer = new Buffer(2);
                buffer.writeUInt16LE(param, 0);
            }
            else {
                console.log("Error, unknown type of var in packet")
            }

            packetSize += buffer.length;
            packetParts.push(buffer);

        })

        var dataBuffer = Buffer.concat(packetParts, packetSize);



    }
}