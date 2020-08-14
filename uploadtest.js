const request = require('request-promise-native');
const sha256 = require('js-sha256').sha256;

function createHash(key, requester, operation) {
    function pad2(n) { return n < 10 ? '0' + n : n }
    const now = new Date();
    // yyyyMMddHHmmss
    const dateStr = (now.getFullYear().toString() + pad2(now.getMonth() + 1) + pad2(now.getDate())
        + pad2(now.getHours()) + pad2(now.getMinutes()) + pad2(now.getSeconds()));
    const raw = requester.toUpperCase() + operation.toUpperCase() + dateStr.slice(-3) + key;
    const hash = sha256.create();
    hash.update(raw)

    return {
        requester: requester,
        timeStamp: dateStr,
        hashKey: hash.hex()
    }
}

var hash = createHash('b7e5f191-7893-04d0-7547-b2F31591e', 'BRS', 'filenetAddDocument')

const base64data = 'dGVzdAo=';
request({
    uri: 'http://localhost:9080/EDMS_FN_REST/operations/v1/uploadFile',
    method: 'POST',
    headers: {
        ... hash,
        DocumentClass: 'AccountOpening'
    },
    formData: {
        DocumentTitle: 'uploadtest',
        file: {
            value: Buffer.from(base64data, 'base64'),
            options: {
                filename: 'myfile.txt',
                contentType: 'text/plain'
            }
        }
    },
    json: true
}).then(resp => console.log(resp));

