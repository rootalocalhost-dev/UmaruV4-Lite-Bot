export const setup = {
  name: "zuck",
  version: "1.0.1",
  permission: "Users",
  creator: "Tiadals, John Lester",
  description: "Comment on the board ( ͡° ͜ʖ ͡°)",
  category: "edit-img",
  usages: ["[text]"],
  mainScreenshot: ["/media/zuck/screenshot/main.jpg"],
  screenshot: ["/media/zuck/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"zuck": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, context, prefix, usage}) {
  let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["zuck"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}