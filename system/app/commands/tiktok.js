export const setup = {
  name: "tiktok",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Get a tiktok video and audio",
  category: "media",
  usages: ["video [url]", "audio [url]"],
  mainScreenshot: ["/media/tiktok/screenshot/1.jpg", "/media/tiktok/screenshot/2.jpg"],
  screenshot: ["/media/tiktok/screenshot/1.jpg", "/media/tiktok/screenshot/2.jpg"],
  cooldown: 10,
  isPrefix: true
};
export const domain = {"tiktok": setup.name}
export const execCommand = async function({api, event, kernel, umaru, args, context, key, prefix, usage, translate}) {
    try {
      let choice = (args[0] && args[0].toLowerCase() && typeof args[1] !== "undefined") ? args[0].toLowerCase(): "";

      if(choice == "video") {
        api.sendMessage("⏳ Processing request, please wait...", event.threadID, event.messageID);
        await umaru.createJournal(event);
        let get = await kernel.read(["tikdl"], {key: key, url: args[1]});
        let res = get[0];
        let video = await kernel.readStream(res.hd, "mp4");
        let msg = `❯ Title: ${res.title}\n❯ Author: ${res.author}`;
        let size = await kernel.size(video);
        if(size >= 25) {
          await umaru.deleteJournal(event);
          return api.sendMessage((await translate("⚠️ An error occurred: The file could not be sent because it was larger than 25MB.", event, null, true)), event.threadID, event.messageID);
        }
        return api.sendMessage({body: context+msg, attachment: video}, event.threadID, async() => {
          await umaru.deleteJournal(event);
        })
      } else if(choice == "audio") {
        api.sendMessage("⏳ Processing request, please wait...", event.threadID, event.messageID);
        await umaru.createJournal(event);
        let get = await kernel.read(["tikdl"], {key: key, url: args[1]});
        let res = get[0];
        let audio = await kernel.readStream(res.audio, "mp3");
        let msg = `❯ Title: ${res.title}\n❯ Author: ${res.author}`;
        let size = await kernel.size(audio);
        if(size >= 25) {
          await umaru.deleteJournal(event);
          return api.sendMessage((await translate("⚠️ An error occurred: The file could not be sent because it was larger than 25MB.", event, null, true)), event.threadID, event.messageID)
        }
        return api.sendMessage({body: context+msg, attachment: audio}, event.threadID, async() => {
          await umaru.deleteJournal(event);
        });
      } else {
        return usage(this, prefix, event);
      }
} catch (e) {
    await umaru.deleteJournal(event);
    return api.sendMessage((await translate("⚠️ Error fetching TikTok data.", event, null, true)), event.threadID, event.messageID)
}
}