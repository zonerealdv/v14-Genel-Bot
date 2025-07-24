const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('çekiliş')
    .setDescription('Bir çekiliş başlatır.')
    .addIntegerOption(option =>
      option.setName('kazanan')
        .setDescription('Kazanan sayısı')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('ödül')
        .setDescription('Çekiliş ödülü')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const kazanan = interaction.options.getInteger('kazanan');
    const ödül = interaction.options.getString('ödül');
    const embed = new EmbedBuilder()
      .setTitle('Çekiliş!')
      .setDescription(`Ödül: **${ödül}**\nKatılmak için 🎉 tepkisine tıklayın!`)
      .setFooter({ text: `Çekilişi başlatan: ${interaction.user.tag}` });
    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    await msg.react('🎉');
    // Kazanan seçme işlemi event ile yapılabilir.
  },
}; 