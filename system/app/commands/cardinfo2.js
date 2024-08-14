export const setup = {
  name: "cardinfo2",
  version: "40.0.3",
  permission: "Users",
  creator: "Binee, John Lester",
  description: "Create a facebook user information card",
  category: "Info",
  usages: ["", "[@mention]", "[userID]", "[fburl]"],
  mainScreenshot: ["/media/cardinfo2/screenshot/main.jpg"],
  screenshot: ["/media/cardinfo2/screenshot/1.jpg", "/media/cardinfo2/screenshot/2.jpg", "/media/cardinfo2/screenshot/3.jpg"],
  cooldown: 30,
  isPrefix: true
};
export const domain = {"cardinfo2": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  let mentions = Object.keys(event.mentions);
  (event.attachments.length !== 0 && event.attachments[0].type == "share" &&  event.attachments[0].hasOwnProperty("target") && event.attachments[0].target.__typename == 'User' && event.attachments[0].target.hasOwnProperty("id")) ? mentions[0] = event.attachments[0].target.id:(mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions[0] = args[0]: (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID:mentions[0] = mentions[0];
  await umaru.createJournal(event);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["cardinfo2"], { key: key, uid: mentions[0], info: await Users.getInfoV2(mentions[0]), av1: await Users.getImage(mentions[0])})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}