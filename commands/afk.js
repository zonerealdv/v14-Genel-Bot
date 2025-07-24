const { SlashCommandBuilder } = require('discord.js');
const afkMap = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('AFK moduna geçer ve sebep belirtir.')
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('AFK sebebiniz')
        .setRequired(false)),
  async execute(interaction) {
    const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';
    afkMap.set(interaction.user.id, reason);
    await interaction.reply({ content: `Artık AFK'sın! Sebep: ${reason}`, ephemeral: true });
  },
  afkMap
}; 