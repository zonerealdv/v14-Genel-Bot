const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolbilgi')
    .setDescription('Bir rol hakkında bilgi gösterir.')
    .addRoleOption(option =>
      option.setName('rol')
        .setDescription('Bilgisi gösterilecek rol')
        .setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole('rol');
    const embed = new EmbedBuilder()
      .setTitle(`${role.name} Rol Bilgisi`)
      .addFields(
        { name: 'ID', value: role.id, inline: true },
        { name: 'Renk', value: role.hexColor, inline: true },
        { name: 'Üye Sayısı', value: `${role.members.size}`, inline: true },
        { name: 'Oluşturulma', value: `<t:${Math.floor(role.createdTimestamp/1000)}:F>`, inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  },
}; 