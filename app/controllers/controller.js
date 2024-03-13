const jwt = require('jsonwebtoken');
const promClient = require('prom-client');

exports.verifyToken = (req, res) => {
    const token = req.body.token;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).send({ isValid: false , "message": 'Invalid token' });
    }

    const { Name, Role, Seed, iat, ...otherClaims } = decoded;

    // Verificar as regrass
    if (Object.keys(otherClaims).length > 0) {
        return res.status(400).json({ isValid: false, "message": 'Invalid claims' });
    }

    if (Name === undefined || Role === undefined || Seed === undefined) {
        return res.status(400).json({ isValid: false , "message": 'Invalid key claims' });
    }

    if (typeof Name !== 'string' || /\d/.test(Name) || Name.length > 256) {
        return res.status(400).send({ isValid: false, "message": 'Invalid Name claim' });
    }

    if (!['Admin', 'Member', 'External'].includes(Role)) {
        return res.status(400).send({ isValid: false, "message": 'Invalid Role claim' });
    }

    if (!this.isPrime(Seed)) {
        return res.status(400).send({ isValid: false, "message": 'Invalid Seed claim' });
    }

    res.status(200).send({ isValid: true });
};

// Função para verificar se um número é primo
exports.isPrime = (num) => {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
        if (num % i === 0) return false;
    return num > 1;
}

exports.metrics = async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    const metrics = await promClient.register.metrics();
    res.end(metrics);
};