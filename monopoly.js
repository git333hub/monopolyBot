const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const myGroupName = "tt";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

var adminsObj = [];
let gifts = [
  "تضاف لكم 100 نقطة 😁",
  "تضاف لكم 50 نقطة 😁",
  "😔 تخصم منكم 100 نقطة",
  "😔 تخصم منكم 200 نقطة",
  "اذهب الى خانة رقم 2",
  "اذهب الى خانة رقم 19",
  "هدد!! بسبب التطوير في بعض المناطق، يجب عليك ازالة اقل قيمة أرض لديك مع جميع محتوياتها",
  "مبرووك، تدفع لك جميع المجموعات 50 نقطة",
  "اذهب الى السجن",
  "ضريبة البيوت! تدفع 50 نقطة لكل بيت أخضر تمتلكه",
  "ضريبة الفنادق! تدفع 200 نقطة لكل فندق تمتلكه",
  "تبادل أراضي! اختر أي أرض من المجموعات الاخرى لتبادلها مع أرض من أراضيك باختيارك، بمحتوياتهما",
];

client.on("message", async (message) => {
  // if (message.body === ("a")) {
  // console.log(message);
  // console.log("======================================================");

  try {
    ///////////////////////////////////////////////////////
    if (message.body == "مفاجأة") {
      const chat = await message.getChat();

      adminsNumbers(chat);
      console.log(adminsObj);
      console.log("message author:"+message.author);
      if (adminsObj.includes(message.author)) {
        message.reply(randomGift());
      } else {
        message.reply("فقط المشرف يمكنه استخدام هذا الامر");
      }
    }
    ///////////////////////////////////////////////////////
    else if (message.body === "رقم عشوائي") {
      // Reply to a message
      message.reply(randomInteger(1, 6).toString());
    }
  } catch (error) {
    console.log(error);
  }
});

function adminsNumbers(a) {
  a.groupMetadata.participants.forEach((element) => {
    // console.log(element.isAdmin);
    if (element.isAdmin && !adminsObj.includes(element.id._serialized)) {
      adminsObj.push(element.id._serialized);
    }
  });
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomGift() {
  return gifts[Math.floor(Math.random() * gifts.length)];
}

client.initialize();
