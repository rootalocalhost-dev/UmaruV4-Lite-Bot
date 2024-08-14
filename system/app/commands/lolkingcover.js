export const setup = {
  name: "lolkingcover",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Make Cover League of King",
  category: "Cover Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/lolkingcover/screenshot/main.jpg"],
  screenshot: ["/media/lolkingcover/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"lolkingcover": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["lolkingcover"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}