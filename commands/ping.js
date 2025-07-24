const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun gecikmesini ve sistem bilgilerini gösterir.'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Ölçülüyor...', fetchReply: true });
    const embed = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Mesaj Gecikmesi', value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`, inline: true },
        { name: 'API Gecikmesi', value: `${interaction.client.ws.ping}ms`, inline: true },
        { name: 'Shard', value: `${interaction.guild?.shardId ?? 0}`, inline: true }
      )
      .setTimestamp();
    await interaction.editReply({ content: null, embeds: [embed] });
  },
}; 