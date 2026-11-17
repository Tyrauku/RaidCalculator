/* Champion Training calculator math. Pure functions, no page code, so the Discord bot
 * can use the same file later and get the same numbers.
 *
 * How a rank-up works in Raid: one max-level champion of rank r plus r champions of the
 * same rank as food gives one champion of rank r+1 (at level 1). Food XP is lost.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.TrainingCalc = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const sum = (a) => a.reduce((s, x) => s + x, 0);

  // XP to take a champion of `rank` from level 1 to `level`.
  function xpToLevel(data, rank, level) {
    return sum(data.xp[rank].slice(0, Math.max(0, level - 1)));
  }

  function maxLevel(rank) {
    return rank * 10;
  }

  // Champions of `rank` that go into one champion of `target` rank.
  function championsPer(rank, target) {
    let n = 1;
    for (let r = rank; r < target; r++) n *= r + 1;
    return n;
  }

  /* The level worth taking food to before feeding it.
   * Maxing a champion and ranking it up earns a certain number of points per XP. Food keeps
   * levelling while each next level earns points at least that cheaply, and stops at the
   * first level that costs more. Returns a level (1 = not worth levelling at all).
   */
  function efficientFoodLevel(data, rank) {
    const per = data.points.perLevel[rank];
    const up = data.points.rankUp[rank + 1] || 0;
    const levels = maxLevel(rank) - 1;
    const benchmark = (levels * per + up) / xpToLevel(data, rank, maxLevel(rank));
    let level = 1;
    while (level < maxLevel(rank) && per / data.xp[rank][level - 1] >= benchmark) level++;
    return level;
  }

  /* opts:
   *   start, target       ranks (start < target, or equal when only levelling)
   *   mode                "want": count = champions of target rank wanted
   *                       "have": count = champions of start rank on hand
   *   count
   *   levelFood           true to level food before feeding it
   *   foodLevels          { rank: level } overrides, otherwise efficientFoodLevel
   *   maxFinished         true to also take the finished champions to max level
   *   method              "campaign" or "brew"
   *   xpPerChamp, champsPerRun, energyPerRun, secondsPerRun, xpPerBrew
   */
  function plan(data, opts) {
    const start = Number(opts.start);
    const target = Number(opts.target);
    const count = Math.max(0, Math.floor(Number(opts.count) || 0));
    const per = championsPer(start, target);

    let builds, leftover, needed;
    if (opts.mode === "have") {
      builds = Math.floor(count / per);
      leftover = count - builds * per;
      needed = builds * per;
    } else {
      builds = count;
      leftover = 0;
      needed = builds * per;
    }

    const stages = [];
    for (let r = start; r < target; r++) {
      // rank-ups done at this rank = champions of rank r+1 needed
      const rankUps = builds * championsPer(r + 1, target);
      const food = rankUps * r;
      const foodLevel = opts.levelFood
        ? Math.min(maxLevel(r), Math.max(1, Math.floor((opts.foodLevels && opts.foodLevels[r]) || efficientFoodLevel(data, r))))
        : 1;
      const pts = data.points.perLevel[r];
      const maxXp = xpToLevel(data, r, maxLevel(r));
      const foodXp = xpToLevel(data, r, foodLevel);
      const s = {
        rank: r,
        rankUps,
        food,
        foodLevel,
        levelPoints: rankUps * (maxLevel(r) - 1) * pts,
        rankUpPoints: rankUps * data.points.rankUp[r + 1],
        foodPoints: food * (foodLevel - 1) * pts,
        maxXp: rankUps * maxXp,
        foodXp: food * foodXp,
      };
      s.points = s.levelPoints + s.rankUpPoints + s.foodPoints;
      s.xp = s.maxXp + s.foodXp;
      stages.push(s);
    }

    let finish = null;
    if (opts.maxFinished && builds > 0) {
      finish = {
        rank: target,
        champions: builds,
        points: builds * (maxLevel(target) - 1) * data.points.perLevel[target],
        xp: builds * xpToLevel(data, target, maxLevel(target)),
      };
    }

    const points = sum(stages.map((s) => s.points)) + (finish ? finish.points : 0);
    const xp = sum(stages.map((s) => s.xp)) + (finish ? finish.xp : 0);

    const totals = { points, xp };
    if (opts.method === "brew") {
      const b = Number(opts.xpPerBrew) || 0;
      totals.brews = b > 0 ? Math.ceil(xp / b) : null;
    } else {
      const perRun = (Number(opts.xpPerChamp) || 0) * (Number(opts.champsPerRun) || 0);
      totals.runs = perRun > 0 ? Math.ceil(xp / perRun) : null;
      totals.energy = totals.runs == null ? null : totals.runs * (Number(opts.energyPerRun) || 0);
      totals.seconds = totals.runs == null ? null : totals.runs * (Number(opts.secondsPerRun) || 0);
    }
    totals.pointsPerThousandXp = xp > 0 ? (points / xp) * 1000 : 0;

    return { start, target, per, builds, needed, leftover, stages, finish, totals };
  }

  return { plan, efficientFoodLevel, championsPer, xpToLevel, maxLevel };
});
