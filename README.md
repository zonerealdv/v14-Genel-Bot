# Genel Discord Botu

Her komutu olan, gelişmiş ve tamamen slash komutlarıyla çalışan bir Discord botu.

## Özellikler
- Gelişmiş moderasyon komutları (ban, kick, clear, rol ver/al, kanal/rol oluştur/sil, slowmode, duyuru)
- Eğlence ve topluluk komutları (oylama, anket, çekiliş, coin, zar, afk)
- Bilgi komutları (ping, userinfo, serverinfo, kanalbilgi, sunucuresmi, rolbilgi, say, istatistik)
- Gelişmiş yardım menüsü (butonlu ve sayfalı)
- Slash komutları otomatik olarak her bot başlatıldığında yüklenir
- Hata ve bug bildirim sistemi

## Kurulum
1. Gerekli paketleri yükle:
   ```bash
   npm install
   ```
2. `config.json` dosyasını doldur:
   ```json
   {
     "token": "BOT_TOKENİNİZ",
     "clientId": "BOT_CLIENT_ID"
   }
   ```
3. Slash komutlarını Discord API'ya yükle:
   ```bash
   node deploy-commands.js
   ```
4. Botu başlat:
   ```bash
   node .
   ```
