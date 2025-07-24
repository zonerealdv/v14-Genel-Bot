const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bugbildir')
    .setDescription('Bir bug bildirimi gönderir.')
    .addStringOption(option =>
      option.setName('mesaj')
        .setDescription('Bildirilecek bug')
        .setRequired(true)),
  async execute(interaction) {
    const mesaj = interaction.options.getString('mesaj');
    fs.appendFileSync('buglog.txt', `[${new Date().toLocaleString()}] ${interaction.user.tag}: ${mesaj}\n`);
    await interaction.reply({ content: 'Bug bildiriminiz alındı, teşekkürler!', ephemeral: true });
  },
}; 