const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anket')
    .setDescription('Çoktan seçmeli anket başlatır.')
    .addStringOption(option =>
      option.setName('soru')
        .setDescription('Anket sorusu')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('secenekler')
        .setDescription('Seçenekleri virgül ile ayır (örn: Evet,Hayır,Kararsız)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const soru = interaction.options.getString('soru');
    const secenekler = interaction.options.getString('secenekler').split(',').map(s => s.trim()).filter(Boolean);
    if (secenekler.length < 2 || secenekler.length > 10) {
      return interaction.reply({ content: '2-10 arasında seçenek belirtmelisin.', ephemeral: true });
    }
    const emojis = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
    const embed = new EmbedBuilder()
      .setTitle('Anket')
      .setDescription(`**${soru}**\n\n${secenekler.map((s, i) => `${emojis[i]} ${s}`).join('\n')}`)
      .setFooter({ text: `Anketi başlatan: ${interaction.user.tag}` });
    const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
    for (let i = 0; i < secenekler.length; i++) {
      await poll.react(emojis[i]);
    }
  },
}; 