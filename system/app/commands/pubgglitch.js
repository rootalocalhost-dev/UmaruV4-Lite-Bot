export const setup = {
  name: "pubgglitch",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create PUBG style glitch video avatar",
  category: "Avatar Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/pubgglitch/screenshot/main.jpg"],
  screenshot: ["/media/pubgglitch/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"pubgglitch": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["pubgglitch"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}