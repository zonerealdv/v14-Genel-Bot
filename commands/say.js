const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Sunucudaki toplam üye, bot, insan ve çevrimiçi sayısını gösterir.'),
  async execute(interaction) {
    const guild = interaction.guild;
    const members = await guild.members.fetch();
    const total = members.size;
    const bots = members.filter(m => m.user.bot).size;
    const users = total - bots;
    const online = members.filter(m => m.presence && m.presence.status !== 'offline').size;
    const embed = new EmbedBuilder()
      .setTitle('Sunucu İstatistikleri')
      .addFields(
        { name: 'Toplam Üye', value: `${total}`, inline: true },
        { name: 'İnsan', value: `${users}`, inline: true },
        { name: 'Bot', value: `${bots}`, inline: true },
        { name: 'Çevrimiçi', value: `${online}`, inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  },
}; 