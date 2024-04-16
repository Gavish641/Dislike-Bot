const { ButtonBuilder, ActionRowBuilder , Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, messageLink, UserSelectMenuBuilder, userMention, ActivityFlagsBitField } = require(`discord.js`);
const fs = require('fs');
const internal = require('stream');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)  
})();


client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isModalSubmit()) return;
    if(interaction.customId === 'modal1')
    {
        await interaction.reply({content : '**הטופס הוגש ויבדק , תקבל תשובה בהקדם האפשרי - המשך יום טוב !**', ephemeral:true})
    }

    const nameB = interaction.fields.getTextInputValue('name');
    const ageB = interaction.fields.getTextInputValue('age');
    const expB = interaction.fields.getTextInputValue('exp');
    const actB = interaction.fields.getTextInputValue('act');
    const whyB = interaction.fields.getTextInputValue('why');
    const userMention = interaction.user;
    const button = new  ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("Yes").setLabel('Yes').setStyle('Success'))
    if(interaction.customId === 'Yes')
    {
        client.channels.cache.get('1113566457868062901').send('You GOOD')
    }
    const StaffEmbed = new EmbedBuilder()
    .setColor('White')
    .setAuthor({name: 'Crazy Party - Staff System', iconURL: 'https://cdn.discordapp.com/avatars/917742777129926686/509a3d9ff043911f9f8d4b3ec869b96d.png?size=1024'})
    .setDescription(`**שם:** \n ${nameB} - ${userMention} \n **גיל:** \n ${ageB} \n **ניסיון כצוות בשרתים אחרים - V/X** \n  ${expB} \n **כמה שעות תוכל לבצע ביום כצוות** \n ${actB} \n **למה אנחנו צריכים לבחור בך** \n ${whyB} `)
    client.channels.cache.get('1106252619070050384').send({embeds: [StaffEmbed], components: [button], content: '@here'})


})
