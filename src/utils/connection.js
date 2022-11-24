module.exports = function(req) {
    const isConnectionEncrypted = req.connection.encrypted;
    const isSslEnvSet = process.env.SSL === 'true';
    const isHeaderSsl = req.header('x-forwarded-proto') === 'https';

    const proto = isConnectionEncrypted || isSslEnvSet || isHeaderSsl ? 'https' : 'http';

    return proto.split(/\s*,\s*/)[0];
};
