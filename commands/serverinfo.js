const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Sunucu hakkında bilgi gösterir.'),
  async execute(interaction) {
    const { guild } = interaction;
    const embed = new EmbedBuilder()
      .setTitle(`${guild.name} Sunucu Bilgisi`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: 'ID', value: guild.id, inline: true },
        { name: 'Üye Sayısı', value: `${guild.memberCount}`, inline: true },
        { name: 'Oluşturulma', value: `<t:${Math.floor(guild.createdTimestamp/1000)}:F>`, inline: true },
        { name: 'Sahip', value: `<@${guild.ownerId}>`, inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  },
}; 