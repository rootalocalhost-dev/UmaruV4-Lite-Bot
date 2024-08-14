export const setup = {
  name: "kanna",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "See pictures of baby dragons",
  category: "Image",
  usages: [""],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"kanna": setup.name};
export const execCommand = async function({api, event, kernel, key, umaru}) {
  await umaru.createJournal(event);
  return api.sendMessage({body: "⚡️ Here's Kanna Photo", attachment: await kernel.readStream(["kanna"], {key: key})}, event.threadID, async () => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}