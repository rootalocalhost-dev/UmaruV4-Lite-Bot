export const setup = {
  name: "warfacecover",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create a cover of Warface",
  category: "Cover Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/warfacecover/screenshot/main.jpg"],
  screenshot: ["/media/warfacecover/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"warfacecover": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["warfacecover"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}