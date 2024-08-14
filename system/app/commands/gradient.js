export const setup = {
  name: "gradient",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create gradient neon light text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/gradient/screenshot/main.jpg"],
  screenshot: ["/media/gradient/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"gradient": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["gradient"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}