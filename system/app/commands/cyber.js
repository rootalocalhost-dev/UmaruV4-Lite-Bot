export const setup = {
  name: "cyber",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create a glowing 3D Neon light text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/cyber/screenshot/main.jpg"],
  screenshot: ["/media/cyber/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"cyber": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["cyber"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}