export const setup = {
  name: "pubglogo",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "PUBG logo maker cute character",
  category: "Logo Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/pubglogo/screenshot/main.jpg"],
  screenshot: ["/media/pubglogo/screenshot/main.jpg"],
  cooldown: 5
};
export const domain = {"pubglogo": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["pubglogo"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}