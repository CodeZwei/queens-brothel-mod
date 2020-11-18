(() => {
  const mod = new Mod("nid-skin");
  mod.name = "Nidalee Skin Mod";

  mod.loadImage('Queen-Clothes-NidaleeQueen', 'assets/Queen-Clothes-NidaleeQueen.png');
  mod.loadImage('Queen-Clothes-NidaleeQueen-Exposed', 'assets/Queen-Clothes-NidaleeQueen-Exposed.png');
  mod.loadImage('Queen-Clothes-NidaleeQueen-Naked', 'assets/Queen-Clothes-NidaleeQueen-Naked.png');
  mod.loadImage('NidaleeQueen', 'assets/NidaleeQueen.png');

  mod.init = () => {
    // Add setup code here
    let clothes = new Clothes('NidaleeQueen', 'Queen', false)
        .setName('Nidalee Outit')
        .setDescription("Tribal costume inspired by Nidalee from League of Legends")
        .setShop(true)
        .setCost(100)
        .setVisible(true)
        .setLevel(0)
        .setStat({Throat: 2, Tits: 2, Pussy: 3})
        .addStyle(new ClothesStyle('Exposed', 'Exposed', true))
        .addStyle(new ClothesStyle('Naked', 'Naked', true));
    mod.clothes.add(clothes);
  };

  mod.boot = () => {
    // Add on reload code here
  }
})();
