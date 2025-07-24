const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Bir kullanıcının avatarını gösterir.')
    .addUserOption(option =>
      option.setName('kullanici')
        .setDescription('Avatarı gösterilecek kullanıcı')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('kullanici') || interaction.user;
    await interaction.reply({
      content: `${user.tag} kullanıcısının avatarı: ${user.displayAvatarURL({ dynamic: true, size: 4096 })}`,
      ephemeral: false
    });
  },
}; 