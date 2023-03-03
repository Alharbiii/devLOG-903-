"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "remove-level-role",
    description: "💹 remove a reward from the rewards list.",
    type: 1,
    options: [
        {
            name: "level",
            description: "⚙ the level reward you will delete.",
            required: true,
            type: 3,
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "MANAGE_GUILD", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            let level = args[0]?.value;
            let rewards = await db.get(`LSA_${guild.id}`);
            if (!rewards)
                rewards = [];
            if (isNaN(level))
                return (0, respond_1.respond)(interaction, message, {
                    content: REPLYS.notAlevel,
                }, isSlash);
            let array = [];
            await rewards.forEach(async (V) => {
                if (V.level !== level)
                    await array.push(V);
            });
            await db.set(`LSA_${guild.id}`, array);
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.updateRewards
            }, isSlash);
        }
    },
};
