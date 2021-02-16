exports.handler = async event => {
  /* デプロイ成功時にコマンドリストをDiscordに渡す処理です */
  const interactions = require("discord-slash-commands-client");

  const client = new interactions.Client(
    process.env.TOKEN,
    process.env.ID,
    //"798835844572119070"
  );
  const commands = [
    {
      name: "hello",
      description: "Hello! と返します",
    },
    {
      name: "two",
      description: "two"
    }
  ]

  for (const command of commands) {
    client.createCommand(command, process.env.GUILD_ID)
      .then(console.log)
      .catch(console.error);
  }
  
  client.getCommands({guildID: process.env.GUILD_ID}).then(console.log).catch(console.error);

  return;
}