exports.handler = async event => {
  /* デプロイ成功時にコマンドリストをDiscordに渡す処理です */
  const interactions = require("discord-slash-commands-client");

  const client = new interactions.Client(
    process.env.TOKEN,
    process.env.ID
  );
  const commands = [
    {
      name: "hello",
      description: "Hello! と返します"
    }
  ]

  for (const command of commands) {
    client.createCommand(command)
      .then(console.log)
      .catch(console.error);
  }
}