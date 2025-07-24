const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Kanalda yavaş mod ayarlar.')
    .addIntegerOption(option =>
      option.setName('saniye')
        .setDescription('Yavaş mod süresi (saniye)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const saniye = interaction.options.getInteger('saniye');
    if (saniye < 0 || saniye > 21600) {
      return interaction.reply({ content: '0-21600 arasında bir saniye değeri giriniz.', ephemeral: true });
    }
    await interaction.channel.setRateLimitPerUser(saniye);
    await interaction.reply({ content: `Yavaş mod ${saniye} saniye olarak ayarlandı.` });
  },
}; 