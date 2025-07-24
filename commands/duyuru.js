const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('duyuru')
    .setDescription('Belirli bir kanala duyuru gönderir.')
    .addChannelOption(option =>
      option.setName('kanal')
        .setDescription('Duyurunun gönderileceği kanal')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('mesaj')
        .setDescription('Duyuru mesajı')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const channel = interaction.options.getChannel('kanal');
    const mesaj = interaction.options.getString('mesaj');
    if (!channel.isTextBased()) return interaction.reply({ content: 'Seçilen kanal metin kanalı değil.', ephemeral: true });
    const embed = new EmbedBuilder()
      .setTitle('Duyuru')
      .setDescription(mesaj)
      .setColor(0xFFD700)
      .setFooter({ text: `Duyuruyu yapan: ${interaction.user.tag}` });
    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: 'Duyuru gönderildi!', ephemeral: true });
  },
}; 