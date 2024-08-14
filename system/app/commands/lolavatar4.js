export const setup = {
  name: "lolavatar4",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create league of legends avatar",
  category: "Avatar Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/lolavatar4/screenshot/main.jpg"],
  screenshot: ["/media/lolavatar4/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"lolavatar4": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["lolavatar4"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}