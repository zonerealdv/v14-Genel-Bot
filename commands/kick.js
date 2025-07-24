const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Bir kullanıcıyı sunucudan atar.')
    .addUserOption(option =>
      option.setName('kullanici')
        .setDescription('Atılacak kullanıcı')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Atma sebebi')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const user = interaction.options.getUser('kullanici');
    const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: 'Kullanıcı bulunamadı.', ephemeral: true });
    if (!member.kickable) return interaction.reply({ content: 'Bu kullanıcıyı atamıyorum.', ephemeral: true });
    await member.kick(reason);
    await interaction.reply({ content: `${user.tag} sunucudan atıldı. Sebep: ${reason}` });
  },
}; 