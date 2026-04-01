import jwksClient from "jwks-rsa";
import 'dotenv/config';

const client = jwksClient({
  jwksUri: `https://${process.env.CLIENT_DOMAIN}/.well-known/jwks.json`
});

export const getKey = (header, cb) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}
