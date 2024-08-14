export const setup = {
  name: "metallogo",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Metal Mascots Logo Maker",
  category: "Logo Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/metallogo/screenshot/main.jpg"],
  screenshot: ["/media/metallogo/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"metallogo": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["metallogo"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}