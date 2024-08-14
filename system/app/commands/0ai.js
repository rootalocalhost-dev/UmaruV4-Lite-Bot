let context = {};
export const setup = {
    name: "ai",
    version: "40.0.3",
    permission: "Users",
    creator: "John Lester",
    description: "Question and answering",
    category: "AI",
    usages: "[prompt]",
    isPrefix: "both"
};
export const domain = {"ai": setup.name};
export const execCommand = async function({api, event, args, key, kernel, Users, timeZone, usage, prefix, umaru, reply}) {
  if(args.length === 0) return usage(this, prefix, event);
  try {
  let text = args.join(" ");
  let botname = await Users.getName(api.getCurrentUserID());
  let username = await Users.getName(event.senderID);
  if(!context.hasOwnProperty(event.senderID)) {
    context[event.senderID] = [];
  }
  if(event.type == "message_reply" && event.messageReply.senderID === api.getCurrentUserID() && !context[event.senderID].some(a => a.content === event.messageReply.body)) {
    context[event.senderID].push({ role: 'assistant', content: event.messageReply.body});
  }
  context[event.senderID].push({ role: 'user', content: text});
  await umaru.createJournal(event);
    let ai = await kernel.read(["ai2"], { key: key, completions: context[event.senderID], username: username, botname: botname, timezone: timeZone, senderID: event.senderID, url:(event.type == "message_reply")?event.messageReply.attachments.filter(a => a.type == "photo").map(a => a.url): 0});
   await umaru.deleteJournal(event);
    context[event.senderID].push(ai);
    return api.sendMessage(ai.content, event.threadID, async (err, info) => {
                               let ctx = {
                                   name: this.setup.name,
                                   author: event.senderID,
                                   ID: info.messageID
                               }
                               await reply.create(ctx);
                           }, event.messageID);
  } catch {
    if(!context.hasOwnProperty(event.senderID)) {
      context[event.senderID] = [];
    }
    await umaru.deleteJournal(event);
  }
}
export const execReply = async function({umaruv4, prefix, event}) {
  umaruv4({payload:prefix+this.setup.name+" "+event.body});
}