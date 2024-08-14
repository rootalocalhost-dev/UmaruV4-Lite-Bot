export const setup = {
  name: "text2image",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Generate image using your own words.",
  category: "AI",
  usages: ["[prompt]"],
  cooldown: 10,
  isPrefix: true
}
export const execCommand = async function({api, event, args, umaru, usage, prefix, kernel, keyGenerator, key}) {
  if(args.length === 0) return usage(this, prefix, event);
  await umaru.createJournal(event);
  return api.sendMessage({attachment: await kernel.readStream(["text2image"], {key: key, prompt: args.join(" ")})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}
