const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Belirli sayıda mesajı siler.')
    .addIntegerOption(option =>
      option.setName('miktar')
        .setDescription('Silinecek mesaj sayısı (1-100)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger('miktar');
    if (amount < 1 || amount > 100) {
      return interaction.reply({ content: '1 ile 100 arasında bir sayı giriniz.', ephemeral: true });
    }
    await interaction.channel.bulkDelete(amount, true).catch(() => {});
    await interaction.reply({ content: `${amount} mesaj silindi.`, ephemeral: true });
  },
}; 