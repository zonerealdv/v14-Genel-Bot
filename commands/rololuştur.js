const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rololuştur')
    .setDescription('Yeni bir rol oluşturur.')
    .addStringOption(option =>
      option.setName('isim')
        .setDescription('Rol ismi')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('renk')
        .setDescription('Rol rengi (hex)')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const isim = interaction.options.getString('isim');
    const renk = interaction.options.getString('renk') || '#ffffff';
    await interaction.guild.roles.create({ name: isim, color: renk });
    await interaction.reply({ content: `${isim} adında yeni bir rol oluşturuldu!` });
  },
}; 