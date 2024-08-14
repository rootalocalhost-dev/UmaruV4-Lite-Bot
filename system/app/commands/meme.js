export const setup = {
  name: "meme",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Random reddit memes",
  category: "media",
  usages: [""],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"meme": setup.name};
export const execCommand = async function({api, event, kernel, key, umaru}) {
  let data = await kernel.read(["reddit"], {key: key});
  await umaru.createJournal(event);
  return api.sendMessage({body: data.title+"\n"+data.caption, attachment: await kernel.readStream(data.url)}, event.threadID, async () => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}