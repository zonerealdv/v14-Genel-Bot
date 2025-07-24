const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('istatistik')
    .setDescription('Botun istatistiklerini gösterir.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Bot İstatistikleri')
      .addFields(
        { name: 'Sunucu', value: `${interaction.client.guilds.cache.size}`, inline: true },
        { name: 'Kullanıcı', value: `${interaction.client.users.cache.size}`, inline: true },
        { name: 'Kanal', value: `${interaction.client.channels.cache.size}`, inline: true },
        { name: 'Node.js', value: process.version, inline: true },
        { name: 'Bellek', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
        { name: 'İşletim Sistemi', value: `${os.type()} ${os.arch()}`, inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  },
}; 