export const setup = {
  name: "comic",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create 3D comic text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/comic/screenshot/main.jpg"],
  screenshot: ["/media/comic/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"comic": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["comic"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}