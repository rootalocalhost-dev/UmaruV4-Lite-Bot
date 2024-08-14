export const setup = {
  name: "hackeravatar",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create anonymous hacker avatars cyan neon",
  category: "Avatar Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/hackeravatar/screenshot/main.jpg"],
  screenshot: ["/media/hackeravatar/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"hackeravatar": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["hackeravatar"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}