export const setup = {
  name: "shinyblack",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Shiny black 3D text effect generator",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/shinyblack/screenshot/main.jpg"],
  screenshot: ["/media/shinyblack/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"shinyblack": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["shinyblack"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}