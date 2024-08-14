export const setup = {
  name: "crystal",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create luxury 3D crystal text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/crystal/screenshot/main.jpg"],
  screenshot: ["/media/crystal/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"crystal": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["crystal"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}