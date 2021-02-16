exports.handler = async event => {
  /* デプロイ成功時にコマンドリストをDiscordに渡す処理です */
  const interactions = require("discord-slash-commands-client");

  const client = new interactions.Client(
    process.env.TOKEN,
    process.env.CLIENT_ID,
    //"798835844572119070"
  );
  console.log("769408235731157024" == process.env.GUILD_ID)
  console.log("798835844572119070" == process.env.CLIENT_ID)
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

  Promise.all(commands.map(commandData => {
    return client.createCommand(commandData, process.env.GUILD_ID)
  })).then(console.log).catch(console.error);

  return {
    headers: {},
    statusCode: 200
  };
}