export const setup = {
  name: "pubgcover",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create Facebook game PUBG cover photo",
  category: "Cover Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/pubgcover/screenshot/main.jpg"],
  screenshot: ["/media/pubgcover/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"pubgcover": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["pubgcover"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}