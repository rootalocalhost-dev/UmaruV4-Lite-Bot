export const setup = {
  name: "pubglogo4",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "PUBG logo maker",
  category: "Logo Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/pubglogo4/screenshot/main.jpg"],
  screenshot: ["/media/pubglogo4/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"pubglogo4": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["pubglogo4"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}