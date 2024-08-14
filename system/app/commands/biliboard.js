export const setup = {
  name: "biliboard",
  version: "9.7.5",
  permission: "Users",
  creator: "John Lester",
  description: "Comment on the board ( ͡° ͜ʖ ͡°)",
  category: "edit-img",
  usages: ["[text]"],
  mainScreenshot: ["/media/biliboard/screenshot/main.jpg"],
  screenshot: ["/media/biliboard/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"biliboard": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, context, prefix, usage}) {
  let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["biliboard"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}