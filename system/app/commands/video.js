export const setup = {
    name: "video",
    version: "40.0.3",
    permission: "Users",
    creator: "John Lester",
    description: "Get a video through youtube",
    category: "media",
    usages: ["[title]"],
    mainScreenshot: ["/media/video/screenshot/1.jpg", "/media/video/screenshot/2.jpg"],
    screenshot: ["/media/video/screenshot/1.jpg", "/media/video/screenshot/2.jpg"],
    cooldown: 30,
    isPrefix: true
};
export const domain = {"video": setup.name}
export const execCommand = async function({api, args, event, prefix, kernel, key, reply, usage, umaru, translate}) {
    if(args.length === 0) return usage(this, prefix, event);
    let { ID } = await reply.read({
        name: this.setup.name,
        author: event.senderID
    });
    if(typeof ID === "string") api.unsendMessage(ID);
    await umaru.createJournal(event);
    let data = await kernel.read(["videometa"], {key: key, search: args.join(" ")});
    let text = (await translate("🔎 There are {{1}} search results here:", event, null, true)).replace("{{1}}", data.length)+"\n";
    let read = [];
    let format = {"1": "⓵","2":"⓶","3":"⓷","4":"⓸","5":"⓹","6":"⓺","7":"⓻","8":"⓼","9":"⓽","10":"⓾"};
    for(let i = 0; i < data.length; i++) {
        let order = (i+1).toString();
        text += order.replace(order, format[order])+" "+"《 "+data[i].duration+" 》"+data[i].title+"\n\n";
        read.push(await kernel.readStream(data[i].thumbnail,"jpg"));
    }
    text += await translate("» Reply with the order number that you want to choose.", event, null, true);
   return api.sendMessage({body: text, attachment: read}, event.threadID, async (err, info) => {
        let ctx = {
            name: this.setup.name,
            author: event.senderID,
            ID: info.messageID,
            data: data
        }
        await reply.create(ctx);
        await umaru.deleteJournal(event);
    }, event.messageID)
}
export const execReply = async function({api, args, kernel, key, event, reply, umaru, translate}) {
    let ctx = {
        name: this.setup.name,
        author: event.senderID
    }
    let { data } = await reply.read(ctx);
    let { ID } = await reply.read(ctx);
    let choose = parseInt(args.join(" "));
    if(isNaN(choose) || !(data.length >= choose)) return;
    api.unsendMessage(ID);
    for(let i = 0; i < data.length; i++) {
        if((i+1) === choose) {
            try {
              let dat = await kernel.read(["video"], {key: key, search: data[i].url, defaultLink: true});
                  let video;
              if(dat && dat.success == true) {
                video = await kernel.readStream(["getVideo"], {key: key, ID: dat.ID, defaultLink: dat.defaultLink}, "mp4");
              } else if(dat && dat.success == false) {
                video = await kernel.video(dat.id);
                video = await kernel.readStream(video, {headers: {'Range': 'bytes=0-'}}, "mp4");
              } else {
                return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID);
              }
            api.sendMessage({body: data[i].title, attachment: video}, event.threadID, async (e) => {
               await umaru.deleteJournal(event);
              if(e) return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
            },event.messageID);
        } catch (e) {
            await umaru.deleteJournal(event);
            return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)),  event.threadID, event.messageID)
        }
            break;
            
        }
    }
}