/*
    # Credits By aNdri store
  https://wa.me/6281371379077 (whatsapp) 
  https://t.me/@Androstore022 (Telegram) 
  https://whatsapp.com/channel/0029VbBBPQvD8SDsMDyM8V0v (ch wa) 
  
 NO HAPUS CREDITS!!! HARGAI PEMBUATNYA
*/
import fs from "fs";
import chalk from "chalk";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);

//settings custom pairing kode 
global.pairingKode = "PPPPPPPP" //max 8 huruf boleh huruf atau angka atau kombinasi keduanya 
//settings akses bot
global.owner = ["6285803412962"] // jangan di ubah nanti eror, cukup Lu ubah aja di owner.json

//settings info bot
global.versi = "2.0.0"
global.url = "https://lynk.id/adshopdigital"
global.namaOwner = "BARON"
global.namaBot = "𝗧𝗜𝗧𝗔-𝗠𝗗"
global.idCh = "120363420593019978@newsletter"
global.packname = "Create by 𝗧𝗜𝗧𝗔-𝗠𝗗"
global.author = "faris"

//settings tuhubnail bot
global.thumb = "https://i.ibb.co.com/hxncXhs8/Elemen-Baru-27-F36-D566.png"
global.foto = "https://i.ibb.co.com/hxncXhs8/Elemen-Baru-27-F36-D566.png"

//settings cpanel 
global.loc = "1" // Isi id location
global.egg = "15" // Isi id egg
global.nestid = "5" // Isi id nest
global.domain = "https://com.welperoffcial.my.id" //domain 
global.apikey = "ptla_Yc3otIpPc3MHeTKvnpqzQnyrud7ovawvcLs7G6dZs3Q" //plta
global.capikey = "ptlc_yGddQVX5hahF6g3NYjKYYGdbeFqmRNVRVXaLsbdLSjS" //pltc

//settings cpanelv2
global.locV2 = "1" // Isi id location
global.eggV2 = "15" // Isi id egg
global.nestidV2 = "5" // Isi id nest
global.domainV2 = "https:" //domain 
global.apikeyV2 = "ptla_" //plta
global.capikeyV2 = "ptlc_" //pltc

//=======teksPanel==========//
global.teksPanel = 
"* Expired panel 1 bulan\n* Simpan data ini sebaik mungkin\n* Garansi pembelian 20 hari (5x replace)\n* Claim garansi wajib membawa bukti chat pembelian\n* No sebar Data panel\n* No DDOS Server\n> Jika ada masalah silahkan lapor owner"


global.mess = {
 owner: "*[AKSES DITOLAK]*\nKHUSUS OWNER BOT",
 admin: "*[REJECT]* - ONLY ADMINS GROUPS",
 botAdmin: "*[REJECT]* - BOT HARUS ADMIN",
 group: "*[REJECT]* - ONLY IN THE GROUP",
 sewa: "*[REJECT]* - ONLY USER PREMIUM",
 vip: "*[REJECT]* - ONLY ONWER & PREMIUM USERS",
 private: "*[REJECT]* - ONLY IN THE PRIVATE CHAT",
 prem: "*[ Akses Ditolak ]*\nFitur ini hanya untuk user premium"
}

fs.watchFile(__filename, () => {
    fs.unwatchFile(__filename);
    console.log(chalk.white.bold("~> Update File :"), chalk.green.bold(__filename));
    import(`${pathToFileURL(__filename).href}?update=${Date.now()}`);
});