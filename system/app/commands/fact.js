export const setup = {
  name: "fact",
  version: "1.0.1",
  permission: "Users",
  creator: "Phan Duy, John Lester",
  description: "Comment on Fact's page",
  category: "edit-img",
  usages: ["[text]"],
  mainScreenshot: ["/media/fact/screenshot/main.jpg"],
  screenshot: ["/media/fact/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"fact": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, context, prefix, usage}) {
  let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["fact"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}