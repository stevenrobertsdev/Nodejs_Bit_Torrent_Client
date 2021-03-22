'use strict';

const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;

module.exports.getPeers = (torrent, callBack) => {
  const socket = dgram.createSocket('udp4');
  const url = torrent.announce.toString('utf8');

  // send connect request
  updSend(socket, buildConnReq(), url);

  socket.on('message', response => {
      if (respType(response) === 'connect') {
          // receive and parse connect response
          const connResp = parseConnResp(response)
          // send announce request
          const announceReq = buildAnnounceReq(connResp.connectionId)
          updSend(socket, announceReq, url)
      } else if (respType(response) === 'announce') {
          // parse announce response
          const announceResp = parseAnnounceResp(response)
          // pass peers to callback
          callBack(announceResp.peers)
      }
  })
};

function updSend(socket, message, rawUrl, callBack = () => {
    const url = urlParse(rawUrl)
    socket.send(message, 0, message.length, url.port, url.port, callBack)
})

function respType(resp) {
    // ...
}
  
function buildConnReq() {
    // ...
 }
  
function parseConnResp(resp) {
    // ...
}
  
function buildAnnounceReq(connId) {
    // ...
}
  
function parseAnnounceResp(resp) {
    // ...
}