const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sunucuresmi')
    .setDescription('Sunucunun resmini gösterir.'),
  async execute(interaction) {
    const guild = interaction.guild;
    if (!guild.iconURL()) return interaction.reply({ content: 'Sunucunun resmi yok.', ephemeral: true });
    await interaction.reply({ content: guild.iconURL({ dynamic: true, size: 4096 }) });
  },
}; 