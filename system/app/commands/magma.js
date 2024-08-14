export const setup = {
  name: "magma",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create a magma hot text effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/magma/screenshot/main.jpg"],
  screenshot: ["/media/magma/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"magma": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["magma"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}