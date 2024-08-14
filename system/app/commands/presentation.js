export const setup = {
  name: "presentation",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Presentation text",
  category: "Image Generation",
  usages: [
    "[text]"
  ],
  mainScreenshot: ["/media/presentation/screenshot/main.jpg"],
  screenshot: ["/media/presentation/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"presentation": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, prefix, context, usage}) {
  if(args.length === 0) return usage(this, prefix, event);
  await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["presentation"], {key: key, text: args.join(" ")})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}