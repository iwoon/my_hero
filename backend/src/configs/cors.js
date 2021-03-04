exports.policy = {
    origin: [
        'http://localhost:4200',
        'http://example.com',
    ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}