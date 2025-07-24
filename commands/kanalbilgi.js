const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kanalbilgi')
    .setDescription('Bulunduğun kanalla ilgili bilgi gösterir.'),
  async execute(interaction) {
    const channel = interaction.channel;
    const embed = new EmbedBuilder()
      .setTitle('Kanal Bilgisi')
      .addFields(
        { name: 'ID', value: channel.id, inline: true },
        { name: 'İsim', value: channel.name, inline: true },
        { name: 'Tür', value: channel.type, inline: true },
        { name: 'NSFW', value: channel.nsfw ? 'Evet' : 'Hayır', inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  },
}; 