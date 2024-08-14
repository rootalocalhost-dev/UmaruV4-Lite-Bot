export const setup = {
  name: "blur",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Blur profile picture",
  category: "Image Generation",
  usages: ["","[number]", "[userID] | [number]", "[@mention]","[@mention]","[@mention] | [number]"],
  mainScreenshot: ["/media/blur/screenshot/main.jpg", "/media/blur/screenshot/main2.jpg"],
  screenshot: ["/media/blur/screenshot/1.jpg","/media/blur/screenshot/2.jpg","/media/blur/screenshot/3.jpg","/media/blur/screenshot/4.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"blur": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, keyGenerator, Users, context}) {
  await umaru.createJournal(event);
  let mentions = Object.keys(event.mentions);
  let text = args.join(" ");
  let number = (args.length !== 0 && text.includes("|")) ? parseInt(text.trim().split("|")[1]): (args.length !== 0 && /^[0-9]+$/.test(args[0])) ? parseInt(args[0]) : 1;
  (text.includes("|") && mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions[0] = args[0]: (event.type == "message_reply" && event.messageReply.attachments.length !== 0 && event.messageReply.attachments[0].type == "photo") ? "" : (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID: mentions[0] = mentions[0];
  return api.sendMessage({body: context, attachment: await kernel.readStream(["blur"], {key: key, targetID: (event.type == "message_reply" && event.messageReply.attachments.length !== 0 && event.messageReply.attachments[0].type == "photo") ? await kernel.readImageFromURL(event.messageReply.attachments[0].url) :await Users.getImage(mentions[0]), number: number})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}