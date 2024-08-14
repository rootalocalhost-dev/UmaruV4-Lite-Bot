export const setup = {
  name: "lolgalaxycover",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create a beautiful galaxy cover League of Legends",
  category: "Cover Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/lolgalaxycover/screenshot/main.jpg"],
  screenshot: ["/media/lolgalaxycover/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"lolgalaxycover": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["lolgalaxycover"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}