/* Raid Offer Calculator data. Item values are in USD per single item.
 * ideal = what a great pack gives you, ok = an acceptable price, null = not counted.
 * Edit values here; the page (and later the Discord bot) read this file.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.OFFER_DATA = factory();
})(typeof self !== "undefined" ? self : this, function () {
  return {
    sections: ["Regular Purchases","As Needed","Included in Packs","Never Purchased"],
    // How much of the ideal and ok values each mode uses.
    modes: {
      strict: { label: "Strict", ideal: 0.8, ok: 0.2 },
      mid: { label: "Mid", ideal: 0.5, ok: 0.5 },
      ok: { label: "OK", ideal: 0, ok: 1 }
    },
    // Verdict by value ratio (pack value / price), checked top to bottom.
    verdicts: [
      { min: 1, key: "good", title: "Good deal", text: "Meets or beats your value target." },
      { min: 0.8, key: "fair", title: "Fair", text: "A little under your value target." },
      { min: 0, key: "skip", title: "Skip", text: "Well under your value target." }
    ],
    // Used only if live exchange rates can't be loaded. Units per 1 USD.
    fallbackRates: { USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.36, AUD: 1.52 },
    items: [
      { section: "Regular Purchases", item: "Ancient Shard", ideal: 0.9, ok: 1.15, icon: "ancient" },
      { section: "Regular Purchases", item: "Void Shard", ideal: 2, ok: 2.5, icon: "void" },
      { section: "Regular Purchases", item: "Sacred Shard", ideal: 7, ok: 15, icon: "sacred" },
      { section: "Regular Purchases", item: "Primal Shard", ideal: 4, ok: 5, icon: "primal" },
      { section: "Regular Purchases", item: "Energy", ideal: 0.00333, ok: 0.005, icon: "energy" },
      { section: "Regular Purchases", item: "Energy Refills", ideal: 0.43, ok: 0.65, icon: "energyrefill" },
      { section: "Regular Purchases", item: "Gems", ideal: 0.01075, ok: 0.016, icon: "gem" },
      { section: "Regular Purchases", item: "Legendary Books", ideal: 3.5, ok: 5, icon: "legendary" },
      { section: "Regular Purchases", item: "Mythical Books", ideal: 5, ok: 8, icon: "mythical" },
      { section: "Regular Purchases", item: "Mortal Soulstone", ideal: 0.5, ok: 0.8, icon: "mortal" },
      { section: "Regular Purchases", item: "Immortal Soulstone", ideal: 4, ok: 5, icon: "immortal" },
      { section: "Regular Purchases", item: "Eternal Soulstone", ideal: 20, ok: 25, icon: "eternal" },
      { section: "Regular Purchases", item: "2* Basalt", ideal: 0.41, ok: 0.41, icon: "basalt" },
      { section: "Regular Purchases", item: "3* Basalt", ideal: 1.25, ok: 1.25, icon: "basalt" },
      { section: "Regular Purchases", item: "4* Basalt", ideal: 5, ok: 5, icon: "basalt" },
      { section: "Regular Purchases", item: "Starstone", ideal: 0.0055, ok: 0.0066, icon: "starstone" },
      { section: "As Needed", item: "Epic Books", ideal: 2, ok: 3, icon: "epic" },
      { section: "Included in Packs", item: "Silver", ideal: 0.000001, ok: 0.000001, icon: "silver" },
      { section: "As Needed", item: "Brews", ideal: 0.0093, ok: 0.0093, icon: "brew", note: "Based on pricing of barrels" },
      { section: "As Needed", item: "Barrel", ideal: 1, ok: 1, icon: "barrel", note: "Higher value on rank 6 champs. About 200 energy worth of XP from 1-60." },
      { section: "As Needed", item: "XP Boost", ideal: null, ok: null, note: "Shop has them for 140 gems; usually not worth factoring." },
      { section: "As Needed", item: "4* Chickens", ideal: 1, ok: 1.25, icon: "chicken" },
      { section: "As Needed", item: "5* Chickens", ideal: 5, ok: 6, icon: "chicken" },
      { section: "As Needed", item: "Feast", ideal: 25, ok: 30, icon: "feast", note: "Higher value when used on low rank champs." },
      { section: "Included in Packs", item: "Clan Boss Key", ideal: null, ok: null },
      { section: "Included in Packs", item: "Arena Refills", ideal: 0.43, ok: 0.65, icon: "arenarefill" },
      { section: "Included in Packs", item: "2* Chickens", ideal: null, ok: null },
      { section: "Included in Packs", item: "3* Chickens", ideal: null, ok: null },
      { section: "Included in Packs", item: "Tag Arena Refills", ideal: 0.43, ok: 0.65, icon: "tagrefill" },
      { section: "Included in Packs", item: "5* Epic Chaos Ore", ideal: null, ok: null },
      { section: "Included in Packs", item: "6* Epic Chaos Ore", ideal: null, ok: null },
      { section: "Included in Packs", item: "5* Leg Chaos Ore", ideal: null, ok: null },
      { section: "Included in Packs", item: "6* Leg Chaos Ore", ideal: null, ok: null },
      { section: "Included in Packs", item: "Multi-battles", ideal: null, ok: null },
      { section: "Included in Packs", item: "Plarium Play Points", ideal: null, ok: null },
      { section: "As Needed", item: "Rare Books", ideal: null, ok: null },
      { section: "Never Purchased", item: "Lesser Artifact Oil", ideal: null, ok: null },
      { section: "Never Purchased", item: "Greater Artifact Oil", ideal: null, ok: null },
      { section: "Never Purchased", item: "Superior Artifact Oil", ideal: null, ok: null },
      { section: "Never Purchased", item: "Lesser Potions", ideal: null, ok: null },
      { section: "Never Purchased", item: "Greater Potions", ideal: null, ok: null },
      { section: "Never Purchased", item: "Superior Potions", ideal: null, ok: null }
    ]
  };
});
