"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../../utils/modules/respond");
const __1 = __importDefault(require("../../.."));
const checkPerms_1 = __importDefault(require("../../functions/checkPerms"));
exports.default = {
    name: "suggestion-channel",
    description: "➕ set/remove the suggestions channel",
    type: 1,
    options: [],
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
            let channeler = channel.id;
            let value = { channel: channeler };
            let key = "SuggestionsChannel_" + guild?.id;
            let _5ra = await db.get(key);
            if (_5ra && _5ra?.channel == channeler) {
                await db.delete(key);
                (0, respond_1.respond)(interaction, message, {
                    content: "Suggestion channel has been removed.",
                }, isSlash);
            }
            else {
                await db.set(key, value);
                (0, respond_1.respond)(interaction, message, {
                    content: "<#" +
                        channeler +
                        "> has set as suggestion channel on **" +
                        guild?.name +
                        "**.",
                }, isSlash);
            }
        }
    },
};
