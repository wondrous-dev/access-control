# Wondrous Access Control Service

This service uses LIT to power token-gated access control facilities to rest of the application.


## Development

To start the server locally run

```
npm run build
npm run start
```

## Test

To test the two endpoints, use the following example requests:


```bash
# Provision Access
curl --location --request POST 'localhost:4005/access/provision' \
--header 'Content-Type: application/json' \
--data-raw '{"chain": "ethereum", "resourceId": {
    "baseUrl": "app.wonderverse.xyz",
    "path": "/test/feb-28/9",
    "orgId": "",
    "role": "",
    "extraData": ""
},
"authSig": {
  "sig": "0x39a3d6f2bedb5ef51442069d3c721596328ef50f81a3a0c0339c2acaade8bd721fea5cce0dc4acb6958cd40fddd680fb35c1fbd07fa95c7e657f5e6f154ed7fc1b",
  "derivedVia": "web3.eth.personal.sign",
  "signedMessage":
    "I am creating an account to use Lit Protocol at 2022-01-10T20:47:35.692Z",
  "address": "0xfff175c14a299ef7027da0d348f438e154880ccd"
},
"accessControlConditions": [
  {
    "contractAddress": "",
    "standardContractType": "",
    "chain": "ethereum",
    "method": "eth_getBalance",
    "parameters": [":userAddress", "latest"],
    "returnValueTest": {
      "comparator": ">=",
      "value": "10000000000000"
    }
  }
]}'

# Check Access 
curl --location --request POST 'localhost:4005/access/request' \
--header 'Content-Type: application/json' \
--data-raw '{"chain": "ethereum", "resourceId": {
    "baseUrl": "app.wonderverse.xyz",
    "path": "/test/feb-28/9",
    "orgId": "",
    "role": "",
    "extraData": ""
},
"authSig": {
  "sig": "0x39a3d6f2bedb5ef51442069d3c721596328ef50f81a3a0c0339c2acaade8bd721fea5cce0dc4acb6958cd40fddd680fb35c1fbd07fa95c7e657f5e6f154ed7fc1b",
  "derivedVia": "web3.eth.personal.sign",
  "signedMessage":
    "I am creating an account to use Lit Protocol at 2022-01-10T20:47:35.692Z",
  "address": "0xfff175c14a299ef7027da0d348f438e154880ccd"
},
"accessControlConditions": [
  {
    "contractAddress": "",
    "standardContractType": "",
    "chain": "ethereum",
    "method": "eth_getBalance",
    "parameters": [":userAddress", "latest"],
    "returnValueTest": {
      "comparator": ">=",
      "value": "10000000000000"
    }
  }
]}'
```

## Testing via API Server
Use the following example requests to test the access control service indirectly through the Wonder web API server:

```bash
# Provision Access
curl --location --request POST 'localhost:5000/v1/org/access/provision' \
--header 'Content-Type: application/json' \
--data-raw '{"org_id": "49465769274114049", "method": "eth_getBalance",
    "minimum": "10000000000000", "chain": "ethereum",
    "auth_sig":{
  "sig": "0x39a3d6f2bedb5ef51442069d3c721596328ef50f81a3a0c0339c2acaade8bd721fea5cce0dc4acb6958cd40fddd680fb35c1fbd07fa95c7e657f5e6f154ed7fc1b",
  "derivedVia": "web3.eth.personal.sign",
  "signedMessage":
    "I am creating an account to use Lit Protocol at 2022-01-10T20:47:35.692Z",
  "address": "0xfff175c14a299ef7027da0d348f438e154880ccd"
}}'

# Check Access
curl --location --request GET 'localhost:5000/v1/org/access/check' \
--header 'Content-Type: application/json' \
--data-raw '{"org_id": "49465769274114049", "method": "eth_getBalance", "user_id": "49465769222733825",
    "minimum": "10000000000000", "chain": "ethereum",
    "auth_sig":{
  "sig": "0x39a3d6f2bedb5ef51442069d3c721596328ef50f81a3a0c0339c2acaade8bd721fea5cce0dc4acb6958cd40fddd680fb35c1fbd07fa95c7e657f5e6f154ed7fc1b",
  "derivedVia": "web3.eth.personal.sign",
  "signedMessage":
    "I am creating an account to use Lit Protocol at 2022-01-10T20:47:35.692Z",
  "address": "0xfff175c14a299ef7027da0d348f438e154880ccd"
}}'
```
