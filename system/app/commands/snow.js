export const setup = {
  name: "snow",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create beautiful 3D snow text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/snow/screenshot/main.jpg"],
  screenshot: ["/media/snow/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"snow": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["snow"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}