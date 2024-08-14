export const setup = {
  name: "music",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Get a music through youtube",
  category: "media",
  usages: ["[title]"],
  mainScreenshot: ["/media/music/screenshot/main.jpg"],
  screenshot: ["/media/music/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"music": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, context,   prefix, usage, translate}) {
    try {
        if(args.length === 0) return usage(this, prefix, event)
  let text = args.join(" ");
  api.sendMessage((await translate("🔍 Searching", event, null, true))+" "+text, event.threadID, event.messageID);
  (event.attachments.length !== 0 && event.attachments[0].type == "share" && event.attachments[0].hasOwnProperty('title')) ? text = event.attachments[0].title: ""; 
  let data = await kernel.read(["music"], {key: key, search: text, defaultLink: true});
      let music;
  if(data && data.success == true) {
    music = await kernel.readStream(["getMusic"], {key: key, ID: data.ID, defaultLink: data.defaultLink}, "mp3");
  } else if(data && data.success == false) {
    music = await kernel.music(data.id);
    music = await kernel.readStream(music, {headers: {'Range': 'bytes=0-'}}, "mp3");
  } else {
    return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID);
  }
    await umaru.createJournal(event);
  return api.sendMessage({body: context+data.title, attachment: music}, event.threadID, async(e) => {
    await umaru.deleteJournal(event);
    if(e) return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
  }, event.messageID)
} catch (e) {
  await umaru.deleteJournal(event);
    return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
}
}