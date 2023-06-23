import { Animated } from "react-native"

export const SalonData = [
    {
       image:require("../../assets/assasin.png"),
       background:"#ff000061",
       title:"Friends",
       jobTitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat non in modi." 
       ,key:1,
       subcats:[
               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                  "Lorem", "ipsum", "dolor"
               ]},
               {heading:"Executive",animation:new Animated.Value(0), lists:[
                  "sit", "amet", "consectetur.",
               ]},
               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                   "adipisicing", "elit.", "Eius!",
               ]},
            ]
    },
    {
       image:require("../../assets/girl.png"),
       background:"#ffa50080",
       title:"Be your own",
       jobTitle: "Rerum sed quas magni id at voluptatum neque modi, porro possimus delectus adipisci cumque.",
       key:2,
       subcats:[
               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                  "Lorem", "ipsum", "dolor"
               ]},
               {heading:"Executive",animation:new Animated.Value(0), lists:[
                  "sit", "amet", "consectetur.",
               ]},
               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                   "adipisicing", "elit.", "Eius!",
               ]},
            ]
    },
    {
       image:require("../../assets/robin-hood.png"),
       title:"Underestimated",
       background:"#ffff009c",
       jobTitle: "iusto nesciunt, fugiat unde accusantium ut earum adipisci temporibus quas dicta recusandae .",
       key:3,
       subcats:[

               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                  "Lorem", "ipsum", "dolor"
               ]},
               {heading:"Executive",animation:new Animated.Value(0), lists:[
                  "sit", "amet", "consectetur.",
               ]},
               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                   "adipisicing", "elit.", "Eius!",
               ]},
            ]
    },
    {
       image:require("../../assets/witch.png"),
       title:"Believe your",
       background:"#0080007d",
       jobTitle: "tempore officiis maiores facere deserunt neque vitae. Eaque consequuntur nostrum non atque? ",
       key:4,
       subcats:[
               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                  "Lorem", "ipsum", "dolor"
               ]},
               {heading:"Executive",animation:new Animated.Value(0), lists:[
                  "sit", "amet", "consectetur.",
               ]},
               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                   "adipisicing", "elit.", "Eius!",
               ]},
            ]
    },
    {
       image:require("../../assets/wizard.png"),
       title:"Be Cool",
       background:"#8080806b",
       jobTitle: "quae ratione excepturi magni velit? Voluptas tempore aliquam maxime, quam tenetur dolorum obcaecati? ",
       key:5,
       subcats:[
               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                  "Lorem", "ipsum", "dolor"
               ]},
               {heading:"Executive",animation:new Animated.Value(0), lists:[
                  "sit", "amet", "consectetur.",
               ]},
               {heading:"Supervisor",animation:new Animated.Value(0), lists:[
                   "adipisicing", "elit.", "Eius!",
               ]},
            ]
    },
]

export const Balls = [
   {bacgkround:"#97D7F1",name:"isv",animation:new Animated.Value(0)},
   {bacgkround:"#F3B000",name:"Trophy",animation:new Animated.Value(0)},
   {bacgkround:"#F2988F",name:"edit",animation:new Animated.Value(0)}
]