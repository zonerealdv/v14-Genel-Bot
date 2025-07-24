const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kanaloluştur')
    .setDescription('Yeni bir kanal oluşturur.')
    .addStringOption(option =>
      option.setName('isim')
        .setDescription('Kanal ismi')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('tur')
        .setDescription('Kanal türü (text/voice)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const isim = interaction.options.getString('isim');
    const tur = interaction.options.getString('tur');
    if (!['text','voice'].includes(tur)) {
      return interaction.reply({ content: 'Kanal türü text veya voice olmalı.', ephemeral: true });
    }
    await interaction.guild.channels.create({ name: isim, type: tur === 'text' ? 0 : 2 });
    await interaction.reply({ content: `#${isim} kanalı oluşturuldu!` });
  },
}; 