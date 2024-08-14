export const setup = {
  name: "thunder",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Thunder text effect generator",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/thunder/screenshot/main.jpg"],
  screenshot: ["/media/thunder/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"thunder": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["thunder"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}