const express = require('express');
const router = require('./routes');
const { expressjwt } = require('express-jwt');
const morgan = require('morgan');
const opentracing = require('opentracing');
const promClient = require('prom-client');

const app = express();
const port = 3000;

require('dotenv').config();

// Logging com Morgan
app.use(morgan('combined'));

// Middleware para verificar o JWT
app.use(expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/verify', '/metrics'] }));
app.use(express.json());
app.use('/', router);


// Tracing com OpenTracing e Jaeger
const tracer = new opentracing.Tracer();
opentracing.initGlobalTracer(tracer);

app.use((req, res, next) => {
    const span = opentracing.globalTracer().startSpan('http_request');
    req.span = span;
    next();
    span.finish();
});

// Monitoring com prom-client
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


module.exports = { server };
