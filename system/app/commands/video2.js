export const setup = {
  name: "video2",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Get a video through youtube",
  category: "media",
  usages: ["[title]"],
  mainScreenshot: ["/media/video2/screenshot/main.jpg"],
  screenshot: ["/media/video2/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"video2": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, context, prefix, usage, translate}) {
    try {
        if(args.length === 0) return usage(this, prefix, event)
  let text = args.join(" ");
  api.sendMessage((await translate("🔍 Searching", event, null, true))+" "+text, event.threadID, event.messageID);
  (event.attachments.length !== 0 && event.attachments[0].type == "share" && event.attachments[0].hasOwnProperty('title')) ? text = event.attachments[0].title: ""; 
  let data = await kernel.read(["video"], {key: key, search: text, defaultLink: true, type:"url"});
          let video;
      if(data && data.success == true) {
        video = await kernel.readStream(["getVideo"], {key: key, ID: data.ID, defaultLink: data.defaultLink}, "mp4");
      } else if(data && data.success == false) {
        video = await kernel.video(data.id);
        video = await kernel.readStream(video, {headers: {'Range': 'bytes=0-'}}, "mp4");
      } else {
        return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID);
      }
      await umaru.createJournal(event);
      return api.sendMessage({body: context+data.title, attachment: video}, event.threadID, async(e) => {
        await umaru.deleteJournal(event);
        if(e) return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
      }, event.messageID)
} catch (e) {
  await umaru.deleteJournal(event);
    return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
}
}