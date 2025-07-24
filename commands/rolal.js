const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolal')
    .setDescription('Bir kullanıcıdan rol alır.')
    .addUserOption(option =>
      option.setName('kullanici')
        .setDescription('Rol alınacak kullanıcı')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('rol')
        .setDescription('Alınacak rol')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const user = interaction.options.getUser('kullanici');
    const role = interaction.options.getRole('rol');
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: 'Kullanıcı bulunamadı.', ephemeral: true });
    if (!member.roles.cache.has(role.id)) return interaction.reply({ content: 'Kullanıcıda bu rol yok.', ephemeral: true });
    await member.roles.remove(role);
    await interaction.reply({ content: `${user.tag} kullanıcısından ${role.name} rolü alındı.` });
  },
}; 