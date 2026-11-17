/* Champion Training calculator data. Edit numbers here, nothing else needs to change.
 *
 * xp[rank][i] is the XP to go from level i+1 to level i+2 for a champion of that rank.
 * Totals per rank (1★ 22,761 / 2★ 81,326 / 3★ 200,681 / 4★ 449,082 / 5★ 963,806 / 6★ 2,010,669)
 * match the game's published XP requirements.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.TRAINING_DATA = factory();
})(typeof self !== "undefined" ? self : this, function () {
  return {
    xp: {
    1: [897, 1118, 1393, 1736, 2163, 2695, 3359, 4185, 5215],
    2: [1110, 1258, 1426, 1616, 1831, 2075, 2351, 2664, 3019, 3421, 3876, 4392, 4977, 5640, 6390, 7241, 8205, 9298, 10536],
    3: [1279, 1411, 1556, 1717, 1893, 2088, 2303, 2541, 2802, 3091, 3409, 3760, 4147, 4574, 5045, 5565, 6138, 6769, 7466, 8235, 9083, 10018, 11050, 12188, 13442, 14827, 16353, 18037, 19894],
    4: [1460, 1591, 1734, 1890, 2060, 2245, 2447, 2666, 2906, 3167, 3451, 3761, 4099, 4467, 4868, 5305, 5782, 6301, 6867, 7483, 8155, 8888, 9686, 10556, 11504, 12537, 13663, 14890, 16227, 17684, 19272, 21003, 22889, 24945, 27185, 29627, 32287, 35187, 38347],
    5: [1625, 1760, 1907, 2066, 2238, 2424, 2626, 2845, 3082, 3338, 3616, 3918, 4244, 4597, 4980, 5395, 5844, 6331, 6858, 7430, 8048, 8719, 9445, 10231, 11084, 12007, 13007, 14090, 15264, 16535, 17912, 19404, 21020, 22770, 24667, 26721, 28947, 31358, 33970, 36799, 39864, 43184, 46780, 50677, 54897, 59470, 64423, 69788, 75601],
    6: [1813, 1956, 2110, 2277, 2457, 2651, 2860, 3086, 3329, 3592, 3876, 4182, 4512, 4869, 5253, 5668, 6115, 6598, 7119, 7681, 8288, 8942, 9648, 10410, 11232, 12119, 13076, 14109, 15223, 16425, 17722, 19121, 20631, 22260, 24018, 25914, 27961, 30168, 32551, 35121, 37894, 40886, 44115, 47598, 51357, 55412, 59787, 64508, 69602, 75098, 81028, 87426, 94329, 101778, 109815, 118486, 127842, 137937, 148828]
    },
    // Champion Training tournament points. Check the event's rules screen when it runs.
    points: {
      perLevel: { 1: 1, 2: 1, 3: 2, 4: 3, 5: 6, 6: 8 },
      // points for ranking a champion UP TO this rank
      rankUp: { 2: 5, 3: 15, 4: 50, 5: 100, 6: 300 }
    },
    // Starting values for the "How you level them" inputs. Players can change them on the page.
    farming: {
      campaign: { name: "Campaign 12-3 Brutal", xpPerChamp: 25956, champsPerRun: 3, energyPerRun: 8, secondsPerRun: 10,
                  note: "25,956 XP per champion with the 2x XP boost on, one max-level farmer and three champions leveling." },
      brew: { xpPerBrew: 18750, note: "18,750 XP per brew when the brew matches the champion's affinity." }
    }
  };
});
