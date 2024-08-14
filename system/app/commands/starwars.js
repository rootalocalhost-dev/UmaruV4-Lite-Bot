export const setup = {
  name: "starwars",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create a Star Wars character mascot logo",
  category: "Logo Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/starwars/screenshot/main.jpg"],
  screenshot: ["/media/starwars/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"starwars": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["starwars"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}