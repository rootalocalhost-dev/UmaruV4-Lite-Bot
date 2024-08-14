<br>
<p align="center">
    <a href="https://github.com/rootalocalhost-dev/UmaruV4-Bot">
        <img src="https://i.imgur.com/wgEmjfB.png" alt="Logo">
    </a>

<h2 align="center">UmaruV4 - Facebook Messenger Bot</h2>


<p align="center">
	<img alt="size" src="https://img.shields.io/github/repo-size/rootalocalhost-dev/UmaruV4-Bot?style=flat-square&label=File%20size">
	<img alt="code-version" src="https://img.shields.io/badge/dynamic/json?color=blue&label=code%20version&prefix=v&query=%24.version&url=https%3A%2F%2Fraw.githubusercontent.com%2Frootalocalhost-dev%2FUmaruV4-Bot%2Fmaster%2Fpackage.json&style=flat-square">
    	<img alt="visitors" src="https://visitor-badge.laobi.icu/badge?page_id=rootalocalhost-dev.UmaruV4-Bot">
  <img alt="size" src="https://img.shields.io/badge/license-AGPL%203.0-blue?style=flat-square" style="max-width: 100%;">
</p>
 <p>📖 Table of Contents</p>
    <ul>
        <li><a href="#-what-is-umaruv4">💠 What is UmaruV4?</a></li>
        <li><a href="#-appstate-encryption">🔐 Appstate Encryption</a></li>
        <li><a href="#-support-the-mirai-format">🌐 Support the Mirai/Goatbot format</a></li>
        <li><a href="#-enabling-and-disabling-prefixes">🛠 Enabling and Disabling Prefixes</a></li>
        <li><a href="#-journaling-mechanism">📝 Journaling Mechanism</a></li>
        <li><a href="#-autoleave-inactive">⌛ Autoleave inactive</a></li>
        <li><a href="#-support-130-languages">🌐 Support 130+ languages</a></li>
        <li><a href="#-detect-130-languages-with-timezone">🌐 Detect 130+ languages with timezone</a></li>
        <li><a href="#-dashboard">💻 Dashboard</a></li>
        

## 💠 What is UmaruV4?

<p>John Lester created the UmaruV4 Facebook Messenger bot. It is essentially a project that builds a bot system specifically for Facebook Messenger in order to provide users with a new experience in Messenger.<br><br>Preview:</p>
<img src="https://i.imgur.com/uw2LYZY.jpg" style="width:360px;"></img>

## 🔐 Appstate Encryption

<p>Appstate encryption is a great way to secure your appstate. Turning Appstate to the ugliest format makes it hard to break encryption.<br><br>Preview:</p>

<img src="https://i.imgur.com/uerBqKR.jpg" style="width:360px;"></img>

## 🌐 Support the Mirai/Goatbot Format

<p>module.exports.run/module.exports.onStart, module.exports.handleEvent/module.exports.onChat, module.exports.handleReply/module.exports.onReply, module.exports.handleReaction/module.exports.onReaction, it just works.<br><br>Limitations: Mirai/Goatbot formats in UmaruV4 will not work, such as Mirai/Goatbot global variables, Mirai/Goatbot directories, other CommonJS files that use the .js extension, and other Mirai/Goatbot parameters.<br><br>Preview:</p>
<img src="https://i.imgur.com/WSPZFzl.jpg" style="width:360px;"></img>

## 🛠 Enabling and Disabling Prefixes

<p>You can enable or disable the prefix by just putting true or false in the isPrefix property in the export const setup. You can make this both using isPrefix: "both".<br><br>Preview:</p>

<img src="https://i.imgur.com/ONrYObB.jpg" style="width:360px;"></img>

## 📝 Journaling Mechanism

<p>If the system is restarting, the journaling mechanism allows the system to retrieve the request and send it again. Not all commands have a journaling mechanism. Only commands that include attachments have a journaling mechanism.<br><br>Preview:</p>

<img src="https://i.imgur.com/Ia2v5IK.jpg" style="width:360px;"></img>

## ⌛ Autoleave inactive

<p>Autoleave inactive allows the bot to leave inactive group chats based on schedule.<br><br>Preview:</p>

<img src="https://i.imgur.com/Xl4m7T2.jpg" style="width:360px;"></img>

## 🌐 Support 130+ languages

<p>You don't need to translate each command because the bot will translate it for you.<br><br>Preview:</p>

<img src="https://i.imgur.com/4QlK1re.jpg" style="width:360px;"></img>

## 🌐 Detect 130+ languages with timezone

<p>Detect the languages based on the message and set the timezone based on the country languages.<br><br>Preview:</p>

<img src="https://i.imgur.com/4QlK1re.jpg" style="width:360px;"></img>

## 💻 Dashboard
- <strong>Overview</strong>
    <p>Overview allows you to view bot name, prefix, users, threads, and more.<br><br>Preview:</p> 
<img src="https://i.imgur.com/PGR28ZJ.jpg" style="width:360px;"></img>

- <strong>Light mode and Dark mode</strong>
    <p>You can change the theme on the hamburger menu. Find the sun icon or moon icon.<br><br>Preview:</p> 
<img src="https://i.imgur.com/x0GmaR3.jpg" style="width:360px;"></img>

- <strong>Overview > Console</strong>
    <p>The Overview Console allows you to view the console through the dashboard.<br><br>Preview:</p> 
<img src="https://i.imgur.com/vwjh9ar.jpg" style="width:360px;"></img>

- <strong>Overview > Shell</strong>
    <p>The Overview Shell allows you to use shell commands through the dashboard.<br><br>Preview:</p> 
<img src="https://i.imgur.com/KOw58HW.jpg" style="width:360px;"></img>

- <strong>Users > All users</strong>
    <p>You can manage all users that have been collected in the database.<br><br>Preview:</p> 
<img src="https://i.imgur.com/TWOYhAd.jpg" style="width:360px;"></img>

- <strong>Users > All unbanned users</strong>
    <p>You can ban users through the dashboard.<br><br>Preview:</p> 
<img src="https://i.imgur.com/uHmQgYH.jpg" style="width:360px;"></img>

- <strong>Users > All banned users</strong>
    <p>You can unban users through the dashboard.<br><br>Preview:</p> 
<img src="https://i.imgur.com/o2361nG.jpg" style="width:360px;"></img>

- <strong>Users > Friends remover</strong>
    <p>You can remove friends through the dashboard.<br><br>Preview:</p> 
<img src="https://i.imgur.com/L5PSeR4.jpg" style="width:360px;"></img>

- <strong>Threads > All threads</strong>
    <p>You can manage all threads that have been collected in the database.<br><br>Preview:</p> 
<img src="https://i.imgur.com/nQpomoP.jpg" style="width:360px;"></img>

- <strong>Threads > All unbanned threads</strong>
    <p>You can ban threads through the dashboard.<br><br>Preview:</p> 
<img src="https://i.imgur.com/868d5lg.jpg" style="width:360px;"></img>

- <strong>Threads > All banned threads</strong>
    <p>You can unban threads through the dashboard.<br><br>Preview:</p> 
<img src="https://i.imgur.com/spaRTti.jpg" style="width:360px;"></img>

- <strong>Settings > AppState</strong>
    <p>You can paste the appstate through the dashboard.<br><br>Preview:</p> 
<img src="https://i.imgur.com/eJa2Lbw.jpg" style="width:360px;"></img>
    <p>Also, in Settings > AppState, we have a button named Generate new Appstate<br><br>Preview:</p>
    <img src="https://i.imgur.com/zT7MC5B.jpg" style="width:360px;"></img>

- <strong>Settings > Config</strong>
    <p>Edit and save the config through dashboard without manually editing the config.json.<br><br>Preview:</p> 
<img src="https://i.imgur.com/AZ487lZ.jpg" style="width:360px;"></img>

- <strong>Settings > Commands</strong>
    <p>Turn on and off commands.<br><br>Preview:</p> 
<img src="https://i.imgur.com/dxXRhpj.jpg" style="width:360px;"></img>

- <strong>Settings > Events</strong>
    <p>Turn on and off events.<br><br>Preview:</p> 
<img src="https://i.imgur.com/kN94bp4.jpg" style="width:360px;"></img>

- <strong>Settings > Welcome</strong>
    <p>Edit the message of welcome or upload the attachment.<br><br>Preview:</p> 
<img src="https://i.imgur.com/VOMC0pU.jpg" style="width:360px;"></img>

- <strong>Settings > Leave</strong>
    <p>Edit the message of leave or upload the attachment.<br><br>Preview:</p> 
<img src="https://i.imgur.com/w91ltpH.jpg" style="width:360px;"></img>

- <strong>Settings > Rankup</strong>
    <p>Edit the message of rankup or upload the attachment.<br><br>Preview:</p> 
<img src="https://i.imgur.com/xSX14mW.jpg" style="width:360px;"></img>

- <strong>Settings > BanTemplate</strong>
    <p>Edit the message of BanTemplate or upload the attachment.<br><br>Preview:</p> 
<img src="https://i.imgur.com/CcM4ehB.jpg" style="width:360px;"></img>

- <strong>Settings > Schedule</strong>
    <p>Create custom auto greetings through the dashboard.<br><br>Preview:</p> 
<img src="https://i.imgur.com/xrCYPGz.jpg" style="width:360px;"></img>
