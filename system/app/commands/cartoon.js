export const setup = {
  name: "cartoon",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create 3D cartoon text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/cartoon/screenshot/main.jpg"],
  screenshot: ["/media/cartoon/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"cartoon": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["cartoon"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}