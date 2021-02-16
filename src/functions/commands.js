exports.handler = async event => {
  /* ここからは不適切なAPIの呼び出しでないか確認する処理です */
  const nacl = require('tweetnacl');
  const head = event.headers;

  /* 環境変数「PUBLIC_KEY」にアプリの公開鍵を設定しておき、認証時に呼び出します */
  const PUBLIC_KEY = process.env.PUBLIC_KEY;

  const signature = head['x-signature-ed25519'];
  const timestamp = head['x-signature-timestamp'];
  const rawBody = event.body;

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    /* もし適切な呼び出しであることが証明できなければ、「401」で応答 */
    return {
      statusCode: 401,
      body: 'invalid request signature'
    };
  }
  /* ここまでがAPIの呼び出し元が適切であるかを確認する処理です。以下は実際のコマンド処理になります*/

  const body = JSON.parse(rawBody);
  if (body.type == 1) {
    /* typeが 1 のリクエストはエンドポイントに対するPINGで、同じく「type: 1」で応答 */
    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 1
      })
    };
  } else {
      /* typeが 2 のリクエストは実際のコマンド処理。返信内容などを返します */
      switch (body.data.name) {
        case "hello":
          return {
            statusCode: 200,
            body: JSON.stringify({
              type: 4,
              data: {
                "content": `Hello, ${body.member.user.username}!`
              }
            })
          };
      }
  }
}