export const setup = {
  name: "drake",
  version: "1.0.0",
  permission: "Users",
  creator: "D-Jukie, John Lester",
  description: "drake",
  category: "edit-img",
  usages: ["[text] | [text]"],
  mainScreenshot: ["/media/drake/screenshot/main.jpg"],
  screenshot: ["/media/drake/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"drake": setup.name}
export const execCommand = async function({api, event, key, kernel, args, umaru, context, prefix, usage}) {
  if (args.length === 0) return usage(this, prefix, event);
   const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|");
   await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["drake"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}