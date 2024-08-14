export const setup = {
  name: "typography",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create typography art effects with multiple layers",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/typography/screenshot/main.jpg"],
  screenshot: ["/media/typography/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"typography": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["typography"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}