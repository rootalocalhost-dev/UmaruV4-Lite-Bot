export const setup = {
  name: "crossfirecover",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create Crossfire Cover",
  category: "Cover Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/crossfirecover/screenshot/main.jpg"],
  screenshot: ["/media/crossfirecover/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"crossfirecover": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["crossfirecover"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}