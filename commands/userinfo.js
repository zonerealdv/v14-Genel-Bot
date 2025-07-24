const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Bir kullanıcı hakkında bilgi gösterir.')
    .addUserOption(option =>
      option.setName('kullanici')
        .setDescription('Bilgisi gösterilecek kullanıcı')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('kullanici') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: 'Kullanıcı bulunamadı.', ephemeral: true });
    const embed = new EmbedBuilder()
      .setTitle(`${user.tag} Kullanıcı Bilgisi`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'ID', value: user.id, inline: true },
        { name: 'Hesap Oluşturulma', value: `<t:${Math.floor(user.createdTimestamp/1000)}:F>`, inline: true },
        { name: 'Sunucuya Katılma', value: `<t:${Math.floor(member.joinedTimestamp/1000)}:F>`, inline: true },
        { name: 'Roller', value: member.roles.cache.map(r => r.name).join(', '), inline: false }
      );
    await interaction.reply({ embeds: [embed] });
  },
}; 