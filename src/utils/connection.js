function getProtocol(req) {
    let proto = req.connection.encrypted || process.env.SSL === 'true' ? 'https' : 'http';
    return proto.split(/\s*,\s*/)[0];
}

module.exports = getProtocol;
