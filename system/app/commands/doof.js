export const setup = {
  name: "doof",
  version: "1.0.0",
  permission: "Users",
  creator: "Rip05, John Lester",
  description: "Comment on the board ( ͡° ͜ʖ ͡°)",
  category: "edit-img",
  usages: ["[text]"],
  mainScreenshot: ["/media/doof/screenshot/main.jpg"],
  screenshot: ["/media/doof/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"doof": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, context, prefix, usage}) {
  let text = args.join(" ");
  if (!text) return usage(this, prefix, event);
  await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["doof"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}