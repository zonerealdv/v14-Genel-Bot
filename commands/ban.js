const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bir kullanıcıyı sunucudan banlar.')
    .addUserOption(option =>
      option.setName('kullanici')
        .setDescription('Banlanacak kullanıcı')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Ban sebebi')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const user = interaction.options.getUser('kullanici');
    const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: 'Kullanıcı bulunamadı.', ephemeral: true });
    if (!member.bannable) return interaction.reply({ content: 'Bu kullanıcıyı banlayamıyorum.', ephemeral: true });
    await member.ban({ reason });
    await interaction.reply({ content: `${user.tag} sunucudan banlandı. Sebep: ${reason}` });
  },
}; 