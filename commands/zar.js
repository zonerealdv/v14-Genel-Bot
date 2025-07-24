const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('zar')
    .setDescription('1-6 arası zar atar.'),
  async execute(interaction) {
    const result = Math.floor(Math.random() * 6) + 1;
    await interaction.reply({ content: `Zar sonucu: **${result}**` });
  },
}; 