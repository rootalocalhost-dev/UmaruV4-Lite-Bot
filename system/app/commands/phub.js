export const setup = {
  name: "phub",
  version: "1.0.1",
  permission: "Users",
  creator: "MewMew, John Lester",
  description: "Comment on the board ( ͡° ͜ʖ ͡°)",
  category: "edit-img",
  usages: ["[text]"],
  mainScreenshot: ["/media/phub/screenshot/main.jpg"],
  screenshot: ["/media/phub/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"phub": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, context, Users, prefix, usage}) {
  let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["phub"], {key: key, text: text, name: await Users.getName(event.senderID), avt: await Users.getImage(event.senderID)})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}