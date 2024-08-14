export const setup = {
  name: "aovavatar2",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create avatar ROV new",
  category: "Avatar Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/aovavatar2/screenshot/main.jpg"],
  screenshot: ["/media/aovavatar2/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"aovavatar2": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["aovavatar2"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}