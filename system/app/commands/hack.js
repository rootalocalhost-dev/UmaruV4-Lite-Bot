export const setup = {
  name: "hack",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Hack edit profile picture",
  category: "Image Generation",
  usages: ["", "[@mention]", "[userID]", "[fburl]"],
  mainScreenshot: ["/media/hack/screenshot/main.jpg"],
  screenshot: ["/media/hack/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"hack": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let mentions = Object.keys(event.mentions);
  (event.attachments.length !== 0 && event.attachments[0].type == "share" &&  event.attachments[0].hasOwnProperty("target") && event.attachments[0].target.__typename == 'User' && event.attachments[0].target.hasOwnProperty("id")) ? mentions[0] = event.attachments[0].target.id:(mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions[0] = args[0]: (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID:mentions[0] = mentions[0];
  return api.sendMessage({body: context, attachment: await kernel.readStream(["hack"], {key: key, targetID:await Users.getImage(mentions[0]), name: await Users.getName(mentions[0])})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}