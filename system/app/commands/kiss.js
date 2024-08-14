export const setup = {
  name: "kiss",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Kiss someone using mention",
  category: "Image Generation",
  usages: [
    "[userID]",
    "[@mention]",
    "[userID] [userID]",
    "[@mention] [@mention]"
  ],
  mainScreenshot: ["/media/kiss/screenshot/main.jpg"],
  screenshot: ["/media/kiss/screenshot/uid.jpg", "/media/kiss/screenshot/mention.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"kiss": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, prefix, context, usage}) {
  let mentions = Object.keys(event.mentions);
  if(mentions.length === 1) {mentions[1] = mentions[0]; mentions[0] = event.senderID;}
  if(args.length === 1 && /^[0-9]+$/.test(args[0])) {mentions[0] = event.senderID;mentions[1] = args[0];}
  if(args.length === 2 && /^[0-9]+$/.test(args[0]) && /^[0-9]+$/.test(args[1])) {mentions[0] = args[0]; mentions[1] = args[1];}
  if(event.isGroup == false) {mentions[0] = event.senderID;mentions[1] = api.getCurrentUserID();}
  if(event.isGroup == true && mentions.length === 0) return usage(this, prefix, event);
  await umaru.createJournal(event);
  let gender = await Users.getGender(mentions[0]);
  let gender2 = await Users.getGender(mentions[1]);
  let female = "";
  let male = "";
  if(gender == "MALE") {male = mentions[0]; female = mentions[1]} else if(gender == "FEMALE") {female = mentions[0]; male = mentions[1]} else if(gender2 == "MALE") {male = mentions[1]; female = mentions[0]} else if(gender2 == "FEMALE") {male = mentions[0]; female = mentions[1]} else { male = mentions[1]; female = mentions[0]}
  return api.sendMessage({body: context, attachment: await kernel.readStream(["kiss"], {key: key, senderID: await Users.getImage(female), targetID: await Users.getImage(male)})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}