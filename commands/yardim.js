const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

const kategoriler = {
  moderasyon: {
    isim: 'Moderasyon',
    emoji: '🛡️',
    komutlar: [
      'ban', 'kick', 'clear', 'rolver', 'rolal', 'duyuru', 'slowmode', 'kanaloluştur', 'kanalsil', 'rololuştur'
    ],
    aciklama: 'Sunucu yönetimi ve moderasyon işlemleri için komutlar.'
  },
  eglence: {
    isim: 'Eğlence',
    emoji: '🎉',
    komutlar: [
      'oylama', 'anket', 'çekiliş', 'coin', 'zar', 'afk'
    ],
    aciklama: 'Topluluk ve eğlence amaçlı komutlar.'
  },
  sunucu: {
    isim: 'Sunucu',
    emoji: '🏠',
    komutlar: [
      'userinfo', 'serverinfo', 'kanalbilgi', 'sunucuresmi', 'rolbilgi', 'say'
    ],
    aciklama: 'Sunucu ve kullanıcı bilgisi için komutlar.'
  },
  bot: {
    isim: 'Bot',
    emoji: '🤖',
    komutlar: [
      'ping', 'istatistik', 'yardim', 'bugbildir'
    ],
    aciklama: 'Bot ile ilgili komutlar.'
  }
};

function anaEmbed() {
  return new EmbedBuilder()
    .setTitle('Yardım Menüsü')
    .setDescription('Aşağıda botun komut kategorilerini bulabilirsin. Bir kategoriye tıklayarak detaylı komut listesini görebilirsin.')
    .addFields(Object.entries(kategoriler).map(([key, kat]) => ({
      name: `${kat.emoji}  ${kat.isim}`,
      value: kat.aciklama,
      inline: false
    })))
    .setFooter({ text: 'Bir kategori seçmek için aşağıdaki butonları kullan.' });
}

function kategoriEmbed(kategori, commands, page = 0, pageSize = 5) {
  const kat = kategoriler[kategori];
  const komutlar = commands.filter(cmd => kat.komutlar.includes(cmd.data.name));
  const totalPages = Math.ceil(komutlar.length / pageSize) || 1;
  return new EmbedBuilder()
    .setTitle(`${kat.emoji}  ${kat.isim} Komutları`)
    .setDescription(`${kat.aciklama}

Aşağıda bu kategoriye ait komutlar listelenmiştir:`)
    .addFields(
      komutlar.slice(page * pageSize, (page + 1) * pageSize).map(cmd => ({
        name: `/${cmd.data.name}`,
        value: cmd.data.description,
        inline: false
      }))
    )
    .setFooter({ text: `Sayfa ${page + 1} / ${totalPages}` });
}

function kategoriButonlari(aktifKategori) {
  return new ActionRowBuilder().addComponents(
    Object.entries(kategoriler).map(([key, kat]) =>
      new ButtonBuilder()
        .setCustomId(`kategori_${key}`)
        .setLabel(`${kat.emoji} ${kat.isim}`)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(key === aktifKategori)
    )
  );
}

function sayfaButonlari(page, totalPages, kategori) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`sayfa_prev_${kategori}`).setLabel('Önceki').setStyle(ButtonStyle.Primary).setDisabled(page === 0),
    new ButtonBuilder().setCustomId(`sayfa_next_${kategori}`).setLabel('Sonraki').setStyle(ButtonStyle.Primary).setDisabled(page + 1 >= totalPages)
  );
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yardim')
    .setDescription('Gelişmiş butonlu ve kategorili yardım menüsü.'),
  async execute(interaction) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    const commands = commandFiles.map(file => require(`./${file}`)).filter(cmd => cmd && cmd.data && cmd.data.name);

    await interaction.reply({ embeds: [anaEmbed()], components: [kategoriButonlari(null)], ephemeral: true });

    let aktifKategori = null;
    let page = 0;

    const collector = interaction.channel.createMessageComponentCollector({
      filter: i => i.user.id === interaction.user.id,
      time: 120000
    });

    collector.on('collect', async i => {
      if (i.customId.startsWith('kategori_')) {
        aktifKategori = i.customId.replace('kategori_', '');
        page = 0;
        const kat = kategoriler[aktifKategori];
        const komutlar = commands.filter(cmd => kat.komutlar.includes(cmd.data.name));
        const totalPages = Math.ceil(komutlar.length / 5) || 1;
        const components = [kategoriButonlari(aktifKategori)];
        if (totalPages > 1) components.push(sayfaButonlari(page, totalPages, aktifKategori));
        await i.update({ embeds: [kategoriEmbed(aktifKategori, commands, page)], components, ephemeral: true });
      } else if (i.customId.startsWith('sayfa_')) {
        const [, direction, kategori] = i.customId.split('_');
        const kat = kategoriler[kategori];
        const komutlar = commands.filter(cmd => kat.komutlar.includes(cmd.data.name));
        const totalPages = Math.ceil(komutlar.length / 5) || 1;
        if (direction === 'prev' && page > 0) page--;
        if (direction === 'next' && page + 1 < totalPages) page++;
        const components = [kategoriButonlari(kategori)];
        if (totalPages > 1) components.push(sayfaButonlari(page, totalPages, kategori));
        await i.update({ embeds: [kategoriEmbed(kategori, commands, page)], components, ephemeral: true });
      }
    });

    collector.on('end', async () => {
      try {
        await interaction.editReply({ components: [] });
      } catch {}
    });
  },
}; 