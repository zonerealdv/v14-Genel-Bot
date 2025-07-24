const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolver')
    .setDescription('Bir kullanıcıya rol verir.')
    .addUserOption(option =>
      option.setName('kullanici')
        .setDescription('Rol verilecek kullanıcı')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('rol')
        .setDescription('Verilecek rol')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const user = interaction.options.getUser('kullanici');
    const role = interaction.options.getRole('rol');
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: 'Kullanıcı bulunamadı.', ephemeral: true });
    if (member.roles.cache.has(role.id)) return interaction.reply({ content: 'Kullanıcıda bu rol zaten var.', ephemeral: true });
    await member.roles.add(role);
    await interaction.reply({ content: `${user.tag} kullanıcısına ${role.name} rolü verildi.` });
  },
}; 