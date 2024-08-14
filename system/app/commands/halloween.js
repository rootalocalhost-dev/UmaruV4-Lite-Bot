export const setup = {
  name: "halloween",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Create halloween text effects",
  category: "Text Generation",
  usages: ["[text]"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"halloween": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["halloween"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}