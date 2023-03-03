"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "prefix",
    description: "change the bot prefix.",
    type: 1,
    options: [
        {
            name: "prefix",
            required: true,
            type: 3,
            description: "🔧 the new prefix of the bot .",
        },
    ],
    run: async (client, interaction, message, args, isSlash, author, guild, channel, db) => {
        let settingsTable = await db.table("settings");
        let lang = (await settingsTable.get(`Lang_${guild.id}`)) || "en";
        let REPLYS = __1.default.replys[lang];
        let perms = await (0, checkPerms_1.default)(guild.members.cache.get(author.id), "ADMINISTRATOR", {
            base1: interaction,
            base2: message,
            isSlash,
        }, REPLYS);
        if (perms == true) {
            await settingsTable.set(`Prefix_${guild.id}`, args[0]?.value);
            (0, respond_1.respond)(interaction, message, {
                content: REPLYS.prefixChange.replace("{pref}", args[0]?.value),
            }, isSlash);
        }
    },
};
