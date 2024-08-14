export const setup = {
  name: "screenshot",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Screenshot",
  category: "media",
  usages: ["[url]"],
  cooldown: 5,
  isPrefix: true
}
export const domain = {"screenshot": setup.name};
export const execCommand = async function({api, args, event, umaru, kernel, key}) {
  if(args.length === 0) return usage(this, prefix, event);
  let url = args[0];
  const ss = async function(url) {
    try {
    await umaru.createJournal(event);
    return api.sendMessage({attachment: await kernel.readStream(['screenshot'], {key: key, url: url})}, event.threadID, async() =>{
      await umaru.deleteJournal(event);
    }, event.messageID)
    } catch {
      await umaru.deleteJournal(event);
    }
  }
  if(url.startsWith("http://") || url.startsWith("https://")) {
    ss(url);
  } else {
    ss("https://"+url);
  }
}
