export const setup = {
  name: "mark",
  version: "40.0.3",
  permission: "Users",
  creator: "MewMew, hungdz30cm, John Lester",
  description: "Comment on the board ( ͡° ͜ʖ ͡°)",
  category: "edit-img",
  usages: ["[text]"],
  mainScreenshot: ["/media/mark/screenshot/main.jpg"],
  screenshot: ["/media/mark/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"mark": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, context, prefix, usage}) {
  let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["mark"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}