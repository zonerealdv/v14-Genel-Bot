module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`${client.user.tag} olarak giriş yapıldı!`);
    client.user.setActivity('ZoneRealDv', { type: 0 }); // 0 = Playing
  },
}; 