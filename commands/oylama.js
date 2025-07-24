const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('oylama')
    .setDescription('Bir oylama başlatır.')
    .addStringOption(option =>
      option.setName('soru')
        .setDescription('Oylama sorusu')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const question = interaction.options.getString('soru');
    const embed = new EmbedBuilder()
      .setTitle('Oylama')
      .setDescription(question)
      .setColor(0x00AE86)
      .setFooter({ text: `Oylamayı başlatan: ${interaction.user.tag}` });
    const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
    await poll.react('👍');
    await poll.react('👎');
  },
}; 