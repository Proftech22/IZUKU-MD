/**
██╗███████╗██╗   ██╗██╗  ██╗██╗   ██╗    ███╗   ███╗██████╗ 
██║╚══███╔╝██║   ██║██║ ██╔╝██║   ██║    ████╗ ████║██╔══██╗
██║  ███╔╝ ██║   ██║█████╔╝ ██║   ██║    ██╔████╔██║██║  ██║
██║ ███╔╝  ██║   ██║██╔═██╗ ██║   ██║    ██║╚██╔╝██║██║  ██║
██║███████╗╚██████╔╝██║  ██╗╚██████╔╝    ██║ ╚═╝ ██║██████╔╝
╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝     ╚═╝     ╚═╝╚═════╝ 
                                                            
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

 const { tlang, getAdmin, prefix, Config, sck, fetchJson, runtime,cmd,getBuffer } = require('../lib')
 let { dBinary, eBinary } = require("../lib/binary");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 const fs = require('fs')
 const axios = require('axios')
  //---------------------------------------------------------------------------
 cmd({
    pattern: "setwelcome",
    desc: "sets welcome message in specific group.",
    category: "misc",
},
async(Void, citel, text,{ isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner)
          let Group = await sck.findOne({ id: citel.chat })
            if (!Group) {
                await new sck({ id: citel.chat, welcome: text,events:'true' }).save()
                return citel.reply('Welcome added added for this group.')
            } else {
                await await sck.updateOne({ id: citel.chat }, { welcome:text ,events:'true'})
                return citel.reply('Welcome msg has been updated successfully.')
                
            }      
}
)
 //---------------------------------------------------------------------------
cmd({
    pattern: "setgoodbye",
    desc: "sets goodbye message in specific group.",
    category: "misc",
},
async(Void, citel, text,{ isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner)
          let Group = await sck.findOne({ id: citel.chat })
            if (!Group) {
                await new sck({ id: citel.chat, goodbye: text,events:'true' }).save()
                return citel.reply('Goodbye added for this group.');
            } else {
                await await sck.updateOne({ id: citel.chat }, { goodbye:text,events:'true' })
                return citel.reply('Goodbye msg has been updated successfully.');     
            }      
}
)
 //---------------------------------------------------------------------------
 cmd({
             pattern: "attp",
             desc: "Makes glowing sticker of text.",
             category: "sticker",
             filename: __filename,
         },
         async(Void, citel, text) => {
let a = await getBuffer(`https://vihangayt.me/maker/text2gif?q=${text}`)
 return citel.reply(a,{packname:'IZUKU',author:'ATTP'},"sticker") 
         }
     )
 cmd({
             pattern: "ttp",
             desc: "Makes static sticker of text.",
             category: "sticker",
             filename: __filename,
         },
         async(Void, citel, text) => {
let a = await getBuffer(`https://vihangayt.me/maker/text2img?q=${text}`)
 return citel.reply(a,{packname:'IZUKU',author:'TTP'},"sticker") 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "exec",
             desc: "Evaluates quoted code with given language.",
             category: "misc",
             filename: __filename,
         },
         async(Void, citel, text) => {
             try {
                 const code = {
                     script: citel.quoted.text,
                     language: text[1],
                     versionIndex: "0",
                     stdin: text.slice(2).join(" "),
                     clientId: '694805244d4f825fc02a9d6260a54a99',
                     clientSecret: '741b8b6a57446508285bb5893f106df3e20f1226fa3858a1f2aba813799d4734'
                 };
                 request({
                     url: "https://api.jdoodle.com/v1/execute",
                     method: "POST",
                     json: code
                 }, function(_error, _response, body) {
                    return citel.reply("> " + text[1] + "\n\n" + "```" + body.output + "```");
                 });
             } catch (error) {
                 console.log(error);
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "readmore",
             desc: "Adds *readmore* in given text.",
             category: "misc",
             filename: __filename,
         },
         async(Void, citel, text) => {
            return await citel.reply(text.replace(/\+/g, (String.fromCharCode(8206)).repeat(4001)))
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "steal",
             desc: "Makes sticker of replied image/video.",
             category: "sticker",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!citel.quoted) return citel.reply(`*Mention the Image or video Sir.*`);
             let mime = citel.quoted.mtype
             var pack;
             var author;
             if (text) {
                 anu = text.split("|");
                 pack = anu[0] !== "" ? anu[0] : citel.pushName + '✨';
                 author = anu[1] !== "" ? anu[1] : Config.author;
             } else {
                 pack = citel.pushName;
                 author = "✨";
             }
                 let media = await citel.quoted.download();
                 citel.reply("*Processing Your request*");
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 75, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const buffer = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {sticker: buffer }, {quoted: citel });
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "uptime",
             alias: ["runtime"],
             desc: "Tells runtime/uptime of bot.",
             category: "misc",
             filename: __filename,
         },
         async(Void, citel, text) => {
             const upt = runtime(process.uptime())
             return citel.reply(`Uptime of ${tlang().title}: ${upt}`)
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "wm",
             desc: "Makes wa.me of quoted or mentioned user.",
             category: "misc",
             filename: __filename,
         },
         async(Void, citel, text) => {
             let users = citel.mentionedJid ? citel.mentionedJid[0].split('@')[0] : citel.quoted ? citel.quoted.sender.split('@')[0] : text.replace('@')[0]
            return citel.reply(`https://wa.me/${users}`)
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "pick",
             desc: "Pics random user from Group",
             category: "misc",
             filename: __filename,
         },
         async(Void, citel, match) => {
             if (!match) return citel.reply("*Which type of User you want?*");
             const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
                 .catch((e) => {}) : "";
             const participants = citel.isGroup ? await groupMetadata.participants : "";
             let member = participants.map((u) => u.id);
             let me = citel.sender;
             let pick = member[Math.floor(Math.random() * member.length)];
             Void.sendMessage(citel.chat, {
                 text: `The most ${match} around us is *@${pick.split("@")[0]}*`,
                 mentions: [pick],
             }, {
                 quoted: citel,
             });
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "npm",
             desc: "search  npm packages from their name .",
             category: "search",
             use: '<package name>',
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply('Please give me package name.📦')
             axios.get(`https://api.npms.io/v2/search?q=${text}`).then(({ data }) => {
                 let txt = data.results.map(({ package: pkg }) => `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`).join('\n\n')
                 citel.reply(txt)
             }).catch(e => console.log(e))
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "fliptext",
             desc: "Flips given text.",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`Example : ${prefix}fliptext Back in black`)
             flipe = text.split('').reverse().join('')
             citel.reply(`\`\`\`「  Text Flipper Tool  」\`\`\`\n*IGiven text :*\n${text}\n*Fliped text :*\n${flipe}`)
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "mp4fromurl",
             desc: "download mp4 from url.",
             category: "misc",
             use: '<url>',
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`Where's the link ?`);
             Void.sendMessage(citel.chat, {
                 video: {
                     url: text.split(" ")[0],
                 },
                 caption: "*HERE WE GO*",
                 contextInfo: {
                     externalAdReply: {
                         title: tlang().title,
                         body: `${citel.pushName}`,
                         thumbnail: log0,
                         mediaType: 2,
                         mediaUrl: ``,
                         sourceUrl: ``,
                     },
                 },
             }, {
                 quoted: citel,
             });
 
         }
     )
     //---------------------------------------------------------------------------
 
 cmd({
             pattern: "emix",
             desc: "Mixes two emojies.",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(Void, citel, text,{ isCreator }) => {
             if (!text) return citel.reply(`Example : ${prefix}emix 😅,🤔`);
             let [emoji1, emoji2] = text.split `,`;
             let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1 )}_${encodeURIComponent(emoji2)}`);
             for (let res of anu.results) {
                 let encmedia = await Void.sendImageAsSticker(citel.chat, res.url, citel, {
                     packname: global.packname,
                     author: global.author,
                     categories: res.tags,
                 });
                 await fs.unlinkSync(encmedia);
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "chatbot",
             desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text,{ isCreator }) => {
             if (!isCreator) return citel.reply(tlang().owner)
             const { chatbot } = require('../lib/');
             switch (text.split(" ")[0]) {
                 case "on":
                     {
                      let chatbott= await chatbot.findOne({ id: 'chatbot' })
                     if (!chatbott) {
                         await new chatbot({ id: 'chatbot', worktype: "true" }).save()
                         return citel.reply('Chatbot activated successfully.')
                     } else {
                         if (chatbott.worktype == "true") return citel.reply("Chatbot has already been enabled.")
                         await chatbot.updateOne({ id: 'chatbot' }, { worktype: "true" })
                         citel.reply('Enabled chatbot successfully.')
                         return
                     }      
                     }
                     break
                 case "off":
                     {
                      let chatbott= await chatbot.findOne({ id: 'chatbot' })
                     if (!chatbott) {
                         await new chatbot({ id: 'chatbot', worktype: "false" }).save()
                         return citel.reply('Chatbot deactivated successfully.')
                     } else {
                         if (chatbott.worktype == "false") return citel.reply("Chatbot has  already been disabled.")
                         await chatbot.updateOne({ id: 'chatbot' }, { worktype: "false" })
                         citel.reply('Disabled chatbot successfully.')
                         return
                     }
                     }
                     break
                 default:
                     {
                         let buttons = [{
                                 buttonId: `${prefix}chatbot on`,
                                 buttonText: {
                                     displayText: "Turn On",
                                 },
                                 type: 1,
                             },
                             {
                                 buttonId: `${prefix}chatbot off`,
                                 buttonText: {
                                     displayText: "Turn Off",
                                 },
                                 type: 1,
                             },
                         ];
                         let chatbott= await chatbot.findOne({ id: 'chatbot' })
                         await Void.sendButtonText(citel.chat, buttons, `Chatbot Status: ${chatbott.worktype} `, 'Izuku-Md', citel);
                        citel.reply(`Chatbot Status: ${chatbott.worktype} \n*Use:* ${prefix}chatbot on\n${prefix}chatbot off`)
                        }
             }
 
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "ebinary",
             desc: "encode binary",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(Void, citel, text,{ isCreator }) => {
             try {
                 if (!text) return citel.reply(`Send text to be encoded.`);
 
                 let textt = text || citel.quoted.text
                 let eb = await eBinary(textt);
                 citel.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "dbinary",
             desc: "decode binary",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(Void, citel, text,{ isCreator }) => {
             try {
                 if (!text) return citel.reply(`Send text to be decoded.`);
                 let eb = await dBinary(text);
                 citel.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
cmd({
  pattern: "bot",
  desc: "activates and deactivates bot.\nuse buttons to toggle.",
  category: "misc",
  filename: __filename,
},
async(Void, citel, text,{isCreator}) => {
  if (!citel.isGroup) return citel.reply(tlang().group);
  if(!isCreator) return //citel.reply(tlang().owner)
switch (text.split(" ")[0]) {
 case 'on':{
         let checkgroup = await sck.findOne({ id: citel.chat })
         if (!checkgroup) {
             await new sck({ id: citel.chat, botenable: "true" }).save()
             return citel.reply(`Successfully Enabled *${tlang().title}*`)
         } else {
             if (checkgroup.botenable == "true") return citel.reply("*Bot* was already enabled")
             await sck.updateOne({ id: citel.chat }, { botenable: "true" })
             return citel.reply(`Successfully Enabled *${tlang().title}*`)
         }
     }
  
 break
case 'off':{
            {
             let checkgroup = await sck.findOne({ id: citel.chat })
             if (!checkgroup) {
                 await new sck({ id: citel.chat, botenable: "false" })
                     .save()
                 return citel.reply(`Successfully disabled *${tlang().title}*`)
             } else {
                 if (checkgroup.botenable == "false") return citel.reply("*Bot* was already disabled")
                 await sck.updateOne({ id: citel.chat }, { botenable: "false" })
                 return citel.reply(`Successfully disabled *${tlang().title}*`)
             }
         }
}
break
default:{
let checkgroup = await sck.findOne({ id: citel.chat })
let buttons = [{
          buttonId: `${prefix}bot on`,
          buttonText: {
              displayText: "Turn On",
          },
          type: 1,
      },
      {
          buttonId: `${prefix}bot off`,
          buttonText: {
              displayText: "Turn Off",
          },
          type: 1,
      },
  ];
  await Void.sendButtonText(citel.chat, buttons, `Bot Status in Group: ${checkgroup.botenable}`, Void.user.name, citel);
}
}
})   
//-------------------------------------------------111
cmd({
  pattern: 'tiktok',
  fromMe: true,
  desc: 'Download TikTok video without watermark',
},
async (Void, citel, text) => {
  const url = text.split(' ')[1];

  if (!text) {
    return citel.reply('Please provide a TikTok video URL.');
  }

  const apiUrl = `https://vihangayt.me/download/tiktok?url=${encodeURIComponent(url)}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data && response.data.video_url) {
      // Download the video
      const videoResponse = await axios.get(response.data.video_url, { responseType: 'arraybuffer' });

      // Send the video as a reply
      await Void.sendMessage(citel.chat, { video: videoResponse.data }, MessageType.video, { quoted: citel.data });
    } else {
      citel.reply('Unable to fetch the download . The TikTok link may be invalid or the service is down.');
    }
  } catch (error) {
    citel.reply(`Error: ${error.message}`);
  }
});


     //---------------------------------------------------------------------------
 cmd({
             pattern: "antilink",
             desc: "activates and deactivates antilink.\nuse buttons to toggle.",
             category: "group",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!citel.isGroup) return citel.reply(tlang().group);
             const groupAdmins = await getAdmin(Void, citel)
             const botNumber = await Void.decodeJid(Void.user.id)
             const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
             if (!isAdmins) return citel.reply(tlang().admin)
             if (!isBotAdmins) return citel.reply(tlang().botadmin)
             let buttons = [{
                     buttonId: `${prefix}act antilink`,
                     buttonText: {
                         displayText: "Turn On",
                     },
                     type: 1,
                 },
                 {
                     buttonId: `${prefix}deact antilink`,
                     buttonText: {
                         displayText: "Turn Off",
                     },
                     type: 1,
                 },
             ];
             await Void.sendButtonText(citel.chat, buttons, `Activate antilink:Deletes Link + kick`, Void.user.name, citel);
         }
     )
//-----------------------------------------------------
     cmd({
        pattern: 'ss',
        alias :['webss' , 'fullss'],
        category: "search",
        desc: "Provides screenshot of given url",
        use: '<text>',
        filename: __filename,
    },
    async(Void, citel, text) => {
let limit = 5;
try {
if (!text) return citel.reply("```Uhh Please, Give me Url!```");
let urll = `https://vihangayt.me/tools/ssweb?url=${text.match(/\bhttps?:\/\/\S+/gi)[0]}&width=1280&height=720`
let media  = await getBuffer(urll)
return await Void.sendMessage(citel.chat ,{image : media } , {quoted:citel} )
}
catch (err) { return citel.reply("```Error While Fetching Snapshot```")}
    }
)
cmd({
  pattern: 'calc',
  desc: 'A simple calculator command for basic arithmetic operations.',
  catergory:'watsusi',
}, (Void, citel, text) => {
  const parts = text.split(' ');
  if (parts.length !== 3) {
    return citel.reply('Usage: !calc <num1> <operator> <num2>');
  }
  const num1 = parseFloat(parts[0]);
  const operator = parts[1];
  const num2 = parseFloat(parts[2]);
  if (isNaN(num1) || isNaN(num2)) {
    return citel.reply('Please provide valid numerical values.');
  }

  let result;
  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      return citel.reply('Invalid operator. Supported operators are +, -, *, and /.');
  }

  citel.reply(`Result: ${result}`);
});



     //---------------------------------------------------------------------------
 cmd({ on: "body" }, async(Void, citel) => {
     if (Config.autoreaction === 'true' && citel.text.startsWith(prefix)) {
         const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const emokis = emojis[Math.floor(Math.random() * (emojis.length))]
         Void.sendMessage(citel.chat, {
             react: {
                 text: emokis,
                 key: citel.key
             }
         })
     }
 })
