function getProtocol(req) {
    let proto = req.connection.encrypted || process.env.SSL === 'true' ? 'https' : 'http';
    // only do this if you trust the proxy
    proto = req.headers['x-forwarded-proto'] || proto;
    return proto.split(/\s*,\s*/)[0];
}

module.exports = getProtocol;
