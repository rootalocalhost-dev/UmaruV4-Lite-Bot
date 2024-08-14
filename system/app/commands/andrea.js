export const setup = {
  name: "andrea",
  version: "9.7.5",
  permission: "Users",
  creator: "John Lester",
  description: "Comment on the board ( ͡° ͜ʖ ͡°)",
  category: "edit-img",
  usages: ["[text]"],
  mainScreenshot: ["/media/andrea/screenshot/main.jpg"],
  screenshot: ["/media/andrea/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"andrea": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, context, prefix, usage}) {
  let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["andrea"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}