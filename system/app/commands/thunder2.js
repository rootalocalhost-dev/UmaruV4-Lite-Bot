export const setup = {
  name: "thunder2",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create Thunder Text Effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/thunder2/screenshot/main.jpg"],
  screenshot: ["/media/thunder2/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"thunder2": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["thunder2"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}