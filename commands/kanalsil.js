const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kanalsil')
    .setDescription('Bir kanalı siler.')
    .addChannelOption(option =>
      option.setName('kanal')
        .setDescription('Silinecek kanal')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const channel = interaction.options.getChannel('kanal');
    if (!channel.deletable) return interaction.reply({ content: 'Bu kanalı silemiyorum.', ephemeral: true });
    await channel.delete();
    await interaction.reply({ content: `#${channel.name} kanalı silindi!` });
  },
}; 