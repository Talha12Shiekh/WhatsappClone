const emojis = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"]

let randomNumber = Math.floor(Math.random() * 2);

var message = [
  "Thou shalt have no other gods before Me.",
  "Thou shalt not make idols.",
  "Thou shalt not take the name of the LORD thy God in vain.",
  "Remember the Sabbath day, to keep it holy.",
  "Honor thy father and thy mother.",
  "Thou shalt not murder.",
  "Thou shalt not commit adultery.",
  "Thou shalt not steal.",
  "Thou shalt not bear false witness against thy neighbor.",
  "Thou shalt not covet thy neighbour’s wife, thou shalt not covet thy neighbour’s house ."
  ];

const messagesArray = Array(20).fill({
  message: message[Math.floor(Math.random() * message.length)],
  key: Date.now().toString(),
  time: Date.now(),
  messageStatus:  "single",
  selected: false,
  deleteForEveryone: false,
  starred: false,
  readedTime: Date.now(),
  delivered: Date.now(),
  repliedMessage:"",
  reactions: Array(Math.floor(Math.random() * 10)).fill(emojis[Math.floor(Math.random() * emojis.length)]),
  direction: randomNumber == 1 ? "column" : "row",
  backgroundColor:"transparent",
  fontSize:15,
});

const photo = "https://source.unsplash.com/random/900%C3%97700/?human";



export const DummyChats = [
  {
    "name": "Chat 1",
    "number": 1234567890,
    "about": "Group chat for friends",
    "key": "1",
    "time": "1623456789",
    "photo": photo,
    "selected": false,
    "pinned": false,
    "muted": false,
    "readed": false,
    "blocked": false,
    "time": Date.now(),
    "type": "chat",
    "messages": messagesArray,
    "mutedNotifications": "",
    "disappearingMessages": ""
  },
  {
    "name": "Chat 2",
    "number": 987654321,
    "about": "Family chat",
    "key": "2",
    "time": "1623456790",
    "photo": photo,
    "selected": false,
    "pinned": false,
    "muted": false,
    "readed": false,
    "blocked": false,
    "time": Date.now(),
    "type": "chat",
    "messages": messagesArray,
    "mutedNotifications": "",
    "disappearingMessages": ""
  },
  {
    "name": "Chat 3",
    "number": 9876543210,
    "about": "Work chat",
    "key": "3",
    "time": "1623456791",
    "photo": photo,
    "selected": false,
    "pinned": false,
    "muted": false,
    "readed": false,
    "blocked": false,
    "time": Date.now(),
    "type": "chat",
    "messages": messagesArray,
    "mutedNotifications": "",
    "disappearingMessages": ""
  },
  {
    "name": "Chat 4",
    "number": 123456789,
    "about": "Chat for school project",
    "key": "4",
    "time": "1623456792",
    "photo": photo,
    "selected": false,
    "pinned": false,
    "muted": false,
    "readed": false,
    "blocked": false,
    "time": Date.now(),
    "type": "chat",
    "messages": messagesArray,
    "mutedNotifications": "",
    "disappearingMessages": ""
  },
  {
    "name": "Chat 5",
    "number": 5678901234,
    "about": "Group chat for gaming",
    "key": "5",
    "time": "1623456793",
    "photo": photo,
    "selected": false,
    "pinned": false,
    "muted": false,
    "readed": false,
    "blocked": false,
    "time": Date.now(),
    "type": "chat",
    "messages": messagesArray,
    "mutedNotifications": "",
    "disappearingMessages": ""
  }
]

