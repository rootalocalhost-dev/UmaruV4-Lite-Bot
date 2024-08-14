export const setup = {
  name: "freefireavatar",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create Free Fire Avatar",
  category: "Avatar Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/freefireavatar/screenshot/main.jpg"],
  screenshot: ["/media/freefireavatar/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"freefireavatar": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["freefireavatar"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}