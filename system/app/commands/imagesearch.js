export const setup = {
  name: "imagesearch",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Search an Image",
  category: "image",
  usages: [""],
  cooldown: 60,
  isPrefix: true
};
export const domain = {"imagesearch": setup.name};
export const execCommand = async function({api, event, args, kernel, key}) {
  if(args.length === 0) return usage(this, prefix, event);
  let attachment = [];
  let search = args.join(" ");
  api.sendMessage(`🔎 Searching for ${search}...`, event.threadID, event.messageID);
  let data = await kernel.read(["imagesearch"], {key: key, search: search, count: 10});
  if(data.length === 0) {
    return api.sendMessage(`⚠️ Your image search did not return any result.`, event.threadID, event.messageID)
  } 
  for(const item of data) {
    try {
    attachment.push(await kernel.readStream(item.url));
    } catch {}
  }
  return api.sendMessage({body: `--------------------\nImage Search Result\n"${search}"\n\nFound: ${data.length} image${data.length > 1 ? 's' : ''}\nOnly showing: ${attachment.length} images\n\n--------------------`, attachment: attachment}, event.threadID, event.messageID)
}
