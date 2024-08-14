export const setup = {
  name: "slap",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Slap someone using mention",
  category: "Image Generation",
  usages: ["[userID]","[@mention]"],
  mainScreenshot: ["/media/slap/screenshot/main.jpg"],
  screenshot: ["/media/slap/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"slap": setup.name}
export const execCommand = async function({api, event, key, kernel, args, Users, prefix, context, usage, translate}) {
  let mentions = Object.keys(event.mentions);
  if(mentions.length === 0 && /^[0-9]+$/.test(args[0])) {mentions[0] = args[0]}
  if(event.isGroup == false) mentions[1] = api.getCurrentUserID();
  if(event.isGroup == true && args.length === 0) return usage(this, prefix, event);
  let name = await Users.getName(mentions[0]);
  let text = ["Slapped! {{1}} 😾","Oops, Slapped! 😾 {{1}}","You got slapped, {{1}} 😾","In your face, {{1}}! Slapped! 😾","Slapped! 😾 {{1}}, take that!"];
  let msg = (await translate(text[Math.floor(Math.random() * text.length)], event, null, true)).replace("{{1}}", name);
  return api.sendMessage({body: (context != "") ? context : msg, attachment: await kernel.readStream(["slap"], {key: key}), mentions: [{ tag: name, id: mentions[0]}]}, event.threadID, event.messageID)
}