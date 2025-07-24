const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coin')
    .setDescription('Yazı-tura atar.'),
  async execute(interaction) {
    const result = Math.random() < 0.5 ? 'Yazı' : 'Tura';
    await interaction.reply({ content: `Sonuç: **${result}**` });
  },
}; 