export const setup = {
  name: "futuristic",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Light text effect futuristic technology style",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/futuristic/screenshot/main.jpg"],
  screenshot: ["/media/futuristic/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"futuristic": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["futuristic"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}