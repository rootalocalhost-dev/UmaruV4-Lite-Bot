export const setup = {
  name: "aovcover",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create cover Arena of valor (AOV) by mastering",
  category: "Cover Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/aovcover/screenshot/main.jpg"],
  screenshot: ["/media/aovcover/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"aovcover": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["aovcover"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}