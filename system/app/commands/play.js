export const setup = {
    name: "play",
    version: "40.0.3",
    permission: "Users",
    creator: "John Lester",
    description: "Get a music through youtube",
    category: "media",
    usages: ["[title]"],
    mainScreenshot: ["/media/play/screenshot/1.jpg", "/media/play/screenshot/2.jpg"],
    screenshot: ["/media/play/screenshot/1.jpg", "/media/play/screenshot/2.jpg"],
    cooldown: 30,
    isPrefix: true
};
export const domain = {"play": setup.name}
export const execCommand = async function({api, args, event, prefix, kernel, key, reply, usage, keyGenerator,   umaru, translate}) {
    if(args.length === 0) return usage(this, prefix, event);
    let { ID } = await reply.read({
        name: this.setup.name,
        author: event.senderID
    });
    if(typeof ID === "string") api.unsendMessage(ID);
    await umaru.createJournal(event);
    let data = await kernel.read(["videometa"], {key: key, search: args.join(" ")});
    let text = (await translate("🔎 There are {{1}} search results here:", event, null, true)).replace("{{1}}", data.length)+"\n";
    let format = {"1": "⓵","2":"⓶","3":"⓷","4":"⓸","5":"⓹","6":"⓺","7":"⓻","8":"⓼","9":"⓽","10":"⓾"};
    for(let i = 0; i < data.length; i++) {
        let path = umaru.sdcard+"/Pictures/"+keyGenerator()+".jpg";
        let order = (i+1).toString();
        text += order.replace(order, format[order])+" "+"《 "+data[i].duration+" 》"+data[i].title+"\n\n";
    }
    text += await translate("» Reply with the order number that you want to choose.", event, null, true);
   return api.sendMessage({body: text}, event.threadID, async (err, info) => {
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
export const execReply = async function({api, args, kernel, key, event, reply,   umaru, keyGenerator, translate}) {
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
              let dat = await kernel.read(["music"], {key: key, search: data[i].url, defaultLink: true});
                  let music;
              if(dat && dat.success == true) {
                music = await kernel.readStream(["getMusic"], {key: key, ID: dat.ID, defaultLink: dat.defaultLink}, "mp3");
              } else if(dat && dat.success == false) {
                music = await kernel.music(dat.id);
                music = await kernel.readStream(music, {headers: {'Range': 'bytes=0-'}}, "mp3");
              } else {
                return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID);
              }
              api.sendMessage({body: data[i].title, attachment: music}, event.threadID, async (e) => {
                if(e) return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)), event.threadID, event.messageID)
              },event.messageID);
        } catch (e) {
              console.log(e)
            await umaru.deleteJournal(event);
            return api.sendMessage((await translate("⚠️ An error occurred", event, null, true)),  event.threadID, event.messageID)
        }
            break;

        }
    }
}