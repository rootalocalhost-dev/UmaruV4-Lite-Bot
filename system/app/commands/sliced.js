export const setup = {
  name: "sliced",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create light glow sliced text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/sliced/screenshot/main.jpg"],
  screenshot: ["/media/sliced/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"sliced": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["sliced"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}