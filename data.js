/* KITCHEN ER — symptom database
 *
 * Each entry describes one thing that goes wrong in a kitchen.
 * Add new entries by copying a block and editing it. Keep the commas.
 * Run `node validate.js` after editing to catch mistakes.
 *
 *   symptom  — the failure, phrased the way someone would type it into Google
 *   category — one of: Sauces, Eggs, Meat, Rice & grains, Baking, Technique
 *   tags     — extra search words (synonyms, related dishes, misspellings)
 *   verdict  — honest one-liner: can this be saved?
 *   rescue   — ordered steps to do RIGHT NOW, most useful first
 *   why      — the mechanism. This is the part people remember.
 *   prevent  — how to avoid it next time
 */
window.FIXES = [
{
  symptom: "My hollandaise split",
  category: "Sauces",
  tags: [
    "hollandaise",
    "split",
    "curdled",
    "broken",
    "separated",
    "greasy",
    "béarnaise",
    "emulsion"
  ],
  verdict: "Almost always rescuable",
  rescue: [
    "Take it off the heat immediately.",
    "In a clean bowl, whisk one fresh egg yolk with 1 tsp cold water until frothy.",
    "Whisk the broken sauce into it drop by drop at first, then in a thin stream. It will come back."
  ],
  why: "An emulsion is butterfat held in droplets inside the yolk's water. The yolk's lecithin can only coat so much fat at a time. Add butter too fast — or overheat it — and the droplets merge and pour back out as oil.",
  prevent: "Butter goes in drop by drop until it takes, then a slow stream. Keep the bowl over barely-steaming water, never simmering."
},

{
  symptom: "My mayonnaise won't thicken",
  category: "Sauces",
  tags: [
    "mayo",
    "mayonnaise",
    "thin",
    "runny",
    "won't emulsify",
    "liquid",
    "split"
  ],
  verdict: "Rescuable",
  rescue: [
    "Put 1 tsp Dijon mustard in a clean bowl.",
    "Whisk your runny mixture into it a teaspoon at a time. Do not rush the first third.",
    "If it's still loose, start again with a fresh yolk and use the failed batch as your oil."
  ],
  why: "Same failure as hollandaise: oil added faster than the yolk can disperse it. Cold ingredients make it worse — cold oil forms larger droplets that won't stay suspended.",
  prevent: "Room-temperature egg and oil. First tablespoon of oil goes in literally drop by drop."
},

{
  symptom: "My gravy is lumpy",
  category: "Sauces",
  tags: [
    "gravy",
    "lumps",
    "lumpy",
    "sauce",
    "flour",
    "bechamel",
    "white sauce",
    "roux"
  ],
  verdict: "Always rescuable",
  rescue: [
    "Push it through a fine sieve. This works and nobody will know.",
    "Or blitz with a stick blender for ten seconds.",
    "If it's also thin, simmer it down after straining."
  ],
  why: "Flour hitting hot liquid all at once. The outside of each clump gelatinises instantly and seals the dry flour inside, so it can never hydrate.",
  prevent: "Cook flour into fat first (a roux), then add liquid a splash at a time, whisking until smooth before the next addition."
},

{
  symptom: "My sauce is too salty",
  category: "Sauces",
  tags: [
    "salty",
    "too much salt",
    "oversalted",
    "seasoning",
    "soup"
  ],
  verdict: "Usually rescuable",
  rescue: [
    "Dilute: add unsalted stock, water, cream or crushed tomatoes.",
    "Add bulk: more vegetables, beans, rice or pasta will absorb it.",
    "Add acid and a pinch of sugar — lemon or vinegar makes salt read as less harsh."
  ],
  why: "Salt doesn't evaporate. As liquid reduces, concentration climbs — a sauce seasoned correctly at the start is often too salty after 30 minutes of reduction.",
  prevent: "Season at the end of reduction, not the start. Especially with stock cubes, soy or anchovy already in the pot."
},

{
  symptom: "The potato trick for salty soup didn't work",
  category: "Sauces",
  tags: [
    "potato",
    "salty",
    "soup",
    "myth",
    "fix salt"
  ],
  verdict: "Use a real fix instead",
  rescue: [
    "Remove the potato — it's doing nothing useful.",
    "Dilute with unsalted liquid, or add a starch (rice, pasta, bread) that increases total volume.",
    "Balance with acid and fat: cream, yoghurt or lemon."
  ],
  why: "A potato absorbs salty liquid, but at the same concentration as the rest of the pot. It removes salt and water in the same ratio, so the remaining soup tastes identical. It's one of the most persistent kitchen myths.",
  prevent: "Under-salt during cooking and correct at the end."
},

{
  symptom: "My meringue won't whip",
  category: "Eggs",
  tags: [
    "meringue",
    "egg whites",
    "won't whip",
    "soft peaks",
    "flat",
    "foam",
    "pavlova"
  ],
  verdict: "Not rescuable if fat is present",
  rescue: [
    "Check the bowl for grease and any speck of yolk. If yolk got in, start over — this one won't recover.",
    "If it's clean, add ¼ tsp cream of tartar or a squeeze of lemon and keep going.",
    "Plastic bowls hold grease invisibly. Switch to glass or metal."
  ],
  why: "A meringue is unfolded egg-white protein forming walls around air bubbles. Fat molecules wedge between the proteins and stop the walls forming. Egg yolk is about a third fat — one speck flattens the bowl.",
  prevent: "Separate eggs cold (yolks are firmer), wipe bowl and whisk with vinegar, and break each white into a cup before adding."
},

{
  symptom: "My meringue is weeping / beading",
  category: "Eggs",
  tags: [
    "meringue",
    "weeping",
    "syrup",
    "beads",
    "sticky",
    "leaking"
  ],
  verdict: "Cosmetic only",
  rescue: [
    "Beads on top mean overcooked. Sticky liquid underneath means undissolved sugar.",
    "Nothing to fix after baking — but it still tastes fine.",
    "Serve it the day you make it; humidity accelerates the weeping."
  ],
  why: "Sugar added too fast never dissolves; it draws water out of the foam and pools. Overbaking squeezes water out of the proteins as syrupy beads.",
  prevent: "Add caster sugar one spoonful at a time. Rub a little between your fingers — if it's gritty, keep whisking. Bake low (100–120°C) and cool in the switched-off oven."
},

{
  symptom: "My scrambled eggs are watery",
  category: "Eggs",
  tags: [
    "scrambled eggs",
    "watery",
    "liquid",
    "weeping",
    "rubbery"
  ],
  verdict: "Not rescuable",
  rescue: [
    "Pour off the liquid and serve immediately — it will only get worse.",
    "Next batch: lower heat and stop cooking while they still look underdone."
  ],
  why: "Overcooked egg protein contracts and squeezes out the water it was holding. The pool in the pan is water wrung out of the curds. Salting long before cooking accelerates it.",
  prevent: "Medium-low heat, constant movement, off the heat when they're still glossy and slightly loose. Salt just before serving."
},

{
  symptom: "My omelette / frittata is rubbery",
  category: "Eggs",
  tags: [
    "omelette",
    "frittata",
    "rubbery",
    "tough",
    "dry",
    "overcooked"
  ],
  verdict: "Not rescuable",
  rescue: [
    "No fix once set. Serve with something saucy to mask it.",
    "Cut heat and time by a third next attempt."
  ],
  why: "Egg proteins set from about 62°C and tighten sharply above 70°C. Too hot a pan sets the outside long before the middle, so by the time the centre cooks the edge is leather.",
  prevent: "Moderate heat and pull it while the top is still slightly wet. Carryover heat finishes it on the plate."
},

{
  symptom: "My poached eggs go stringy and fall apart",
  category: "Eggs",
  tags: [
    "poached egg",
    "stringy",
    "wispy",
    "falls apart",
    "white spreads"
  ],
  verdict: "Cosmetic only",
  rescue: [
    "Fish out the wisps with a slotted spoon and serve — it's only appearance.",
    "Next one: crack into a fine sieve first and let the loose white drain away."
  ],
  why: "Egg whites have two layers — a thick one that holds shape and a thin, watery one that disperses. That thin layer gets thinner as an egg ages, which is why old eggs poach badly.",
  prevent: "Freshest eggs you have, sieve off the loose white, water at a bare tremble rather than a boil. Vinegar helps a little; a whirlpool mostly doesn't."
},

{
  symptom: "There's a green ring around my boiled egg yolk",
  category: "Eggs",
  tags: [
    "green yolk",
    "grey ring",
    "boiled egg",
    "hard boiled",
    "sulphur"
  ],
  verdict: "Harmless",
  rescue: [
    "Harmless. Tastes very slightly sulphurous but it's safe.",
    "Shorter cook and an ice bath next time."
  ],
  why: "Sulphur in the white reacts with iron in the yolk to form iron sulphide. It only happens with prolonged heat, so it's a reliable sign of overcooking.",
  prevent: "Boil no more than 9–10 minutes for hard, then straight into ice water to stop carryover cooking."
},

{
  symptom: "My steak is grey, not browned",
  category: "Meat",
  tags: [
    "steak",
    "grey",
    "no crust",
    "no sear",
    "pale",
    "not browning",
    "maillard"
  ],
  verdict: "Recoverable mid-cook",
  rescue: [
    "Nothing to do mid-cook except get the pan hotter and dry the surface.",
    "Remove the steak, crank the heat until the pan smokes, pat the meat dry, then return it."
  ],
  why: "Browning (the Maillard reaction) needs roughly 140°C+ at the surface. While there's surface moisture, the meat can't exceed 100°C — it steams instead. A crowded or cold pan does the same thing.",
  prevent: "Pat bone dry, salt ahead, pan properly hot, and cook in batches so the pan temperature doesn't crash."
},

{
  symptom: "My steak came out dry after resting looked fine",
  category: "Meat",
  tags: [
    "steak",
    "dry",
    "juices",
    "resting",
    "carving",
    "tough"
  ],
  verdict: "Partly rescuable",
  rescue: [
    "Pour the board juices back over the sliced meat.",
    "Serve with butter, a pan sauce or a compound butter."
  ],
  why: "Heat drives moisture toward the cooler centre and tightens the fibres. Cut immediately and that pressure dumps onto the board. Rest, and much of it redistributes.",
  prevent: "Rest roughly half the cooking time, somewhere warm, loosely covered. A thick steak wants 8–10 minutes."
},

{
  symptom: "My chicken breast is dry",
  category: "Meat",
  tags: [
    "chicken",
    "dry",
    "overcooked",
    "breast",
    "tough",
    "stringy"
  ],
  verdict: "Partly rescuable",
  rescue: [
    "Slice thin against the grain and dress it — sauce, mayo, yoghurt or a warm vinaigrette.",
    "Shredding into a sauce hides it better than slicing."
  ],
  why: "Chicken breast is very lean, so it has almost no fat or collagen buffer. It goes from juicy at 65°C to dry at 74°C — a window of about 9 degrees.",
  prevent: "Thermometer to 63–65°C and rest. Brining for 30 minutes buys you real insurance."
},

{
  symptom: "My pork chop / chicken thigh is tough and chewy",
  category: "Meat",
  tags: [
    "pork chop",
    "tough",
    "chewy",
    "thigh",
    "undercooked collagen"
  ],
  verdict: "Depends on the cut",
  rescue: [
    "If it's a tough cut, it's undercooked — not overcooked. Put it back with liquid and low heat for another 30–60 minutes.",
    "If it's a lean cut, it's overcooked and can't be fixed. Slice thin against the grain."
  ],
  why: "Two opposite problems share one symptom. Lean cuts get tough from too much heat. Collagen-rich cuts (shoulder, shin, thigh, brisket) get tough from too little — collagen needs hours above 70°C to melt into gelatine.",
  prevent: "Match method to cut: fast and hot for lean, low and slow for connective tissue."
},

{
  symptom: "My slow-cooked beef is still tough after hours",
  category: "Meat",
  tags: [
    "stew",
    "brisket",
    "tough",
    "slow cook",
    "braise",
    "not tender",
    "pot roast"
  ],
  verdict: "Time fixes it",
  rescue: [
    "Keep going. It genuinely needs more time — another hour, sometimes two.",
    "Make sure it's actually at a simmer and the meat is mostly submerged."
  ],
  why: "Collagen converts to gelatine slowly. Meat passes through a tough stage on the way to tender, and stopping there is the single most common braising mistake. It is not overcooked — it's early.",
  prevent: "Cook to texture, never to the clock. A fork should twist freely with no resistance."
},

{
  symptom: "My burgers puff into domes",
  category: "Meat",
  tags: [
    "burger",
    "dome",
    "puffed",
    "shrink",
    "patty",
    "meatball"
  ],
  verdict: "Rescuable",
  rescue: [
    "Press the dome flat once with a spatula — you'll lose a little juice, but it will sit properly in a bun.",
    "Better: cut the dome off level and pile the trimmings back on top under the cheese.",
    "For the rest of the batch, dimple each raw patty before it hits the pan."
  ],
  why: "Muscle fibres contract as they heat, and the edges — hotter, drier, in contact with the pan — tighten first. That shrinking ring squeezes the softer centre upward into a dome, the same way a shirt button puckers fabric around it.",
  prevent: "Press a thumb-deep dimple in the centre of each raw patty. It flattens out as it cooks."
},

{
  symptom: "My rice is mushy",
  category: "Rice & grains",
  tags: [
    "rice",
    "mushy",
    "soggy",
    "sticky",
    "overcooked",
    "wet"
  ],
  verdict: "Partly rescuable",
  rescue: [
    "Take the lid off and put it on low heat for a few minutes to steam off moisture.",
    "Spread on a tray to cool — it firms up considerably.",
    "Or accept it and make fried rice tomorrow; day-old mushy rice fries well."
  ],
  why: "Too much water, or stirring, which abrades starch off the grains. Once the grain wall bursts, texture is gone for good.",
  prevent: "1:1.5 rice to water for long grain, lid on, no stirring, and rest off the heat for 10 minutes before fluffing."
},

{
  symptom: "My rice is hard in the middle",
  category: "Rice & grains",
  tags: [
    "rice",
    "hard",
    "crunchy",
    "undercooked",
    "raw"
  ],
  verdict: "Always rescuable",
  rescue: [
    "Add 3–4 tbsp hot water, lid back on, lowest heat, 5–10 minutes.",
    "Don't stir — just let it steam."
  ],
  why: "Not enough water, or the lid let steam escape, or the heat was too high so the water boiled off before the starch could hydrate.",
  prevent: "Heavy lid, lowest possible heat, and don't lift the lid to check."
},

{
  symptom: "My risotto isn't creamy",
  category: "Rice & grains",
  tags: [
    "risotto",
    "not creamy",
    "watery",
    "thin",
    "arborio"
  ],
  verdict: "Rescuable",
  rescue: [
    "Keep it on the heat and stir hard for 3–4 more minutes — agitation is what releases the starch.",
    "Finish off the heat with cold butter and grated parmesan, beaten in vigorously."
  ],
  why: "Risotto's cream is starch rubbed off the grains by friction and hot liquid. Cold stock, too much liquid at once, or too little stirring leaves the starch locked inside.",
  prevent: "Hot stock, one ladle at a time, and only add more once the last is absorbed."
},

{
  symptom: "My pasta is gluey and clumped",
  category: "Rice & grains",
  tags: [
    "pasta",
    "sticky",
    "clumped",
    "gluey",
    "stuck together"
  ],
  verdict: "Rescuable",
  rescue: [
    "Rinse briefly in hot — never cold — water to wash off surface starch, then toss with sauce or oil immediately.",
    "If it's stuck in one mass, return it to boiling water for 20 seconds to loosen, then drain and dress at once.",
    "Dress it with something fatty. Sauce clinging to each strand is what keeps them apart."
  ],
  why: "Too little water means starch concentration climbs and the pasta glues itself together. Oil in the water doesn't help — it floats.",
  prevent: "Plenty of water at a rolling boil, salted, and stir in the first minute. Save a cup of the water for the sauce."
},

{
  symptom: "My cake sank in the middle",
  category: "Baking",
  tags: [
    "cake",
    "sunk",
    "collapsed",
    "dip",
    "sank",
    "fell"
  ],
  verdict: "Not rescuable, but repurposable",
  rescue: [
    "Cut out the middle and call it a ring cake, or fill the crater with cream and fruit.",
    "Cube it for trifle — genuinely the best use of a sunken cake."
  ],
  why: "Usually the oven door opened before the structure set, or the raising agent over-inflated and the crumb collapsed before the protein could hold it. Underbaking does the same.",
  prevent: "No opening the door in the first two-thirds. Measure raising agents precisely — more is not better. Test with a skewer."
},

{
  symptom: "My cake is dense and heavy",
  category: "Baking",
  tags: [
    "cake",
    "dense",
    "heavy",
    "didn't rise",
    "flat",
    "tough"
  ],
  verdict: "Not rescuable",
  rescue: [
    "No fix to the crumb after baking — but a dense cake is closer to a pudding than a failure.",
    "Serve warm with custard, cream or a poured sauce; the tight texture soaks it up and reads as intentional.",
    "Or cube it into a trifle, soak it in syrup as a rum cake, or blitz it into cake-pop crumbs."
  ],
  why: "Usually one of four things: stale raising agent, overmixing (which builds gluten and toughens the crumb), cold butter and eggs that never emulsified into a stable foam, or too much flour from scooping the cup instead of weighing. All four end the same way — not enough trapped air, and too strong a structure to let it expand.",
  prevent: "Weigh your flour. Room-temperature butter and eggs. Mix only until the flour disappears."
},

{
  symptom: "My cookies spread into one flat sheet",
  category: "Baking",
  tags: [
    "cookies",
    "spread",
    "flat",
    "thin",
    "melted",
    "biscuits"
  ],
  verdict: "Cosmetic",
  rescue: [
    "Cut them apart while warm with a knife or a round cutter.",
    "Chill the remaining dough two hours before the next tray."
  ],
  why: "Butter too soft or melted when creamed, dough too warm going in, too little flour, or a hot baking sheet. The butter liquefies before the structure sets.",
  prevent: "Chill the dough. Cool baking sheets between batches. Weigh the flour."
},

{
  symptom: "My bread didn't rise",
  category: "Baking",
  tags: [
    "bread",
    "didn't rise",
    "dough",
    "flat",
    "yeast",
    "dead yeast",
    "no rise"
  ],
  verdict: "Often rescuable",
  rescue: [
    "Give it more time somewhere warm — cold dough is slow, not dead.",
    "Test the yeast: warm water, a pinch of sugar, 10 minutes. Foam means it's alive.",
    "If the yeast is dead, the dough can be re-kneaded with fresh yeast dissolved in a little water."
  ],
  why: "Yeast killed by water above ~50°C, or by direct contact with salt, or simply expired. Cold kitchens slow it dramatically but don't kill it.",
  prevent: "Water at blood heat, salt and yeast on opposite sides of the bowl, and check the date on the packet."
},

{
  symptom: "My bread is dense with a tight crumb",
  category: "Baking",
  tags: [
    "bread",
    "dense",
    "tight crumb",
    "heavy",
    "no holes"
  ],
  verdict: "Not rescuable",
  rescue: [
    "No structural fix once baked, but the flavour is fine — it toasts and fries very well.",
    "Slice it thin: dense bread works better as toast, croutons, bruschetta or breadcrumbs than as a sandwich.",
    "Stale-proof it as panzanella, bread pudding or French toast, all of which want a firm crumb."
  ],
  why: "Under-proved, under-kneaded, or simply too much flour. Either the gluten network was never developed enough to trap gas, or it was never given the time to inflate — the dough went into the oven before the yeast had filled it out.",
  prevent: "Prove until roughly doubled and a poked finger leaves a slow-filling dent. Knead until the dough passes the windowpane test."
},

{
  symptom: "My pastry shrank in the tin",
  category: "Baking",
  tags: [
    "pastry",
    "shrink",
    "shrunk",
    "tart",
    "pie crust",
    "slumped"
  ],
  verdict: "Not rescuable",
  rescue: [
    "No fix once baked — but patch any cracks with raw pastry and re-bake for five minutes if it needs to hold a wet filling.",
    "If the sides slumped low, trim them level and accept a shallower tart; reduce the filling to match.",
    "Serve it as a free-form slice rather than a neat wedge and nobody registers it."
  ],
  why: "Overworked dough develops gluten, which is elastic and pulls back like a rubber band when heated. Stretching pastry into the tin guarantees it.",
  prevent: "Handle minimally, rest the dough chilled for an hour, and ease it into the corners rather than stretching."
},

{
  symptom: "My pastry is tough, not short",
  category: "Baking",
  tags: [
    "pastry",
    "tough",
    "chewy",
    "hard",
    "shortcrust"
  ],
  verdict: "Not rescuable",
  rescue: [
    "Not rescuable — gluten, once developed, can't be undone.",
    "Use it where texture matters least: a deep pie base under a wet filling, or blind-baked and crumbled as a crunchy topping.",
    "Serving it warm helps. Tough pastry is at its worst cold."
  ],
  why: "Too much water or too much mixing. Both build gluten, and gluten is exactly what shortcrust is trying to avoid — the fat is there to coat flour and prevent it.",
  prevent: "Ice-cold fat, minimum water, stop mixing the second it comes together."
},

{
  symptom: "My chocolate seized into a grainy paste",
  category: "Baking",
  tags: [
    "chocolate",
    "seized",
    "grainy",
    "stiff",
    "melting",
    "lumpy"
  ],
  verdict: "Rescuable as ganache",
  rescue: [
    "Add boiling water one teaspoon at a time, stirring hard. It loosens into a smooth ganache.",
    "It won't return to pure melted chocolate, but it's perfect for sauce, brownies or frosting."
  ],
  why: "A tiny amount of water makes cocoa particles clump together and pull out of the fat. Counter-intuitively, a lot of water dissolves the sugar and smooths it back out.",
  prevent: "Bone-dry bowl and spatula, gentle heat, and never cover the bowl — condensation is the usual culprit."
},

{
  symptom: "My caramel crystallised into grit",
  category: "Baking",
  tags: [
    "caramel",
    "crystallised",
    "grainy",
    "sugar",
    "crystals",
    "hard"
  ],
  verdict: "Rescuable",
  rescue: [
    "Add a splash of water and remelt over low heat until fully clear again, then continue.",
    "Don't stir once it's melted."
  ],
  why: "One stray sugar crystal on the pan wall seeds a chain reaction and the whole syrup crystallises.",
  prevent: "Brush the pan sides with a wet pastry brush, add a squeeze of lemon or a spoon of glucose, and swirl the pan instead of stirring."
},

{
  symptom: "My garlic tastes bitter",
  category: "Technique",
  tags: [
    "garlic",
    "bitter",
    "burnt",
    "acrid",
    "brown"
  ],
  verdict: "Act fast or restart",
  rescue: [
    "If it's just browned, fish it out now — the oil is still usable.",
    "If the oil already smells acrid, start again. Bitterness spreads into everything you add next."
  ],
  why: "Garlic has little water and lots of sugar, so it goes from gold to scorched in seconds. Burnt sugar compounds dissolve into the oil and flavour the whole dish.",
  prevent: "Warm oil, not hot. Garlic goes in after onions, not before, and comes out pale gold."
},

{
  symptom: "My onions won't caramelise",
  category: "Technique",
  tags: [
    "onions",
    "caramelise",
    "brown",
    "slow",
    "not browning"
  ],
  verdict: "Time fixes it",
  rescue: [
    "Turn the heat down, not up. Add a pinch of salt to draw out water.",
    "A splash of water when they stick will lift the browned bits back into the onions."
  ],
  why: "Real caramelisation takes 35–45 minutes. The recipes saying 10 are wrong. Onions are mostly water and it all has to leave before browning can start.",
  prevent: "Medium-low, wide pan, salt early, and stir only occasionally."
},

{
  symptom: "My stir-fry is soggy and steamed",
  category: "Technique",
  tags: [
    "stir fry",
    "soggy",
    "steamed",
    "watery",
    "limp",
    "wok"
  ],
  verdict: "Rescuable",
  rescue: [
    "Drain the pan, get it screaming hot, and return the food in two batches.",
    "Thicken the released liquid with a cornflour slurry into a sauce."
  ],
  why: "Too much food in too cool a pan. The pan temperature crashes below boiling, moisture pools instead of evaporating, and everything simmers.",
  prevent: "Very hot pan, small batches, dry ingredients, and everything prepped before you start."
},

{
  symptom: "My vegetables are grey and drab",
  category: "Technique",
  tags: [
    "vegetables",
    "grey",
    "drab",
    "dull",
    "green beans",
    "broccoli",
    "colour"
  ],
  verdict: "Not rescuable",
  rescue: [
    "The colour won't come back — but the dish can still be saved by contrast.",
    "Add something vivid on top: lemon zest, chopped parsley, sliced chilli, toasted nuts.",
    "Or lean into it — blitz them into a soup or purée, where dull green stops mattering."
  ],
  why: "Prolonged heat destroys chlorophyll, and acid accelerates it. Boiling with the lid on traps volatile acids that fall back into the water.",
  prevent: "Big pot of well-salted boiling water, lid off, brief cook, then straight into ice water."
},

{
  symptom: "My soup is bland even though I salted it",
  category: "Technique",
  tags: [
    "bland",
    "flat",
    "boring",
    "no flavour",
    "soup",
    "stew",
    "needs something"
  ],
  verdict: "Always rescuable",
  rescue: [
    "Acid first — lemon, vinegar, a splash of wine. Bland usually means flat, not unsalted.",
    "Then fat: butter, cream, olive oil.",
    "Then depth: soy, miso, anchovy, parmesan rind, tomato paste."
  ],
  why: "Salt amplifies, acid brightens and fat carries. Cooks reach for salt for every problem, but if a dish tastes dull and heavy rather than weak, acid is nearly always the missing element.",
  prevent: "Taste for acid, fat and salt separately. Finish almost everything with a squeeze of lemon."
},

{
  symptom: "My sauce won't thicken",
  category: "Technique",
  tags: [
    "thin",
    "won't thicken",
    "watery",
    "runny",
    "reduce",
    "sauce"
  ],
  verdict: "Always rescuable",
  rescue: [
    "Simmer uncovered — most sauces just need evaporation time.",
    "Faster: whisk in a slurry of 1 tsp cornflour in 2 tbsp cold water, then boil one minute to activate it.",
    "Or beurre manié: equal butter and flour mashed together, whisked in a pinch at a time."
  ],
  why: "A lid traps steam and returns it to the pan, so a covered sauce can simmer for an hour without reducing at all.",
  prevent: "Reduce with the lid off and a wide pan — surface area matters more than time."
},

{
  symptom: "My food sticks to the stainless steel pan",
  category: "Technique",
  tags: [
    "sticking",
    "stuck",
    "pan",
    "stainless",
    "fish",
    "skin",
    "non stick"
  ],
  verdict: "Wait it out",
  rescue: [
    "Stop pulling. Protein releases itself once a crust forms — usually 30–60 more seconds.",
    "If it still resists, it isn't ready."
  ],
  why: "Hot metal expands and closes its microscopic pores, so a properly preheated pan is effectively smoother. Protein also bonds chemically to bare metal until browning is complete, then releases.",
  prevent: "Preheat the dry pan, then add oil, then the food. Water flicked in should ball and skitter, not hiss and vanish."
},

{
  symptom: "My roast potatoes aren't crispy",
  category: "Technique",
  tags: [
    "roast potatoes",
    "not crispy",
    "soggy",
    "chips",
    "fries",
    "crisp"
  ],
  verdict: "Rescuable",
  rescue: [
    "Crank the oven to 220°C, spread them out with space between, and give them 15 more minutes.",
    "Don't add more oil — crowding, not oil, is usually the problem."
  ],
  why: "Crisping needs surface water gone and space for steam to escape. A crowded tray becomes a steam box.",
  prevent: "Parboil, rough up the edges, dry them off, hot fat, and one layer with gaps."
},

{
  symptom: "My fried food is greasy",
  category: "Technique",
  tags: [
    "fried",
    "greasy",
    "oily",
    "soggy batter",
    "deep fry",
    "oil"
  ],
  verdict: "Partly rescuable",
  rescue: [
    "Drain on a rack, not paper — paper traps steam and softens the crust.",
    "Re-fry briefly at 190°C to drive out absorbed oil."
  ],
  why: "Oil below about 170°C doesn't create enough outward steam pressure to keep it out, so the food soaks it up. Adding cold food in bulk crashes the temperature.",
  prevent: "Thermometer in the oil, fry in small batches, let the oil recover between them."
},

{
  symptom: "My cheese sauce went stringy and oily",
  category: "Sauces",
  tags: [
    "cheese sauce",
    "stringy",
    "oily",
    "split",
    "grainy",
    "mac and cheese",
    "fondue"
  ],
  verdict: "Rescuable",
  rescue: [
    "Off the heat, whisk in a splash of evaporated milk or a cornflour slurry.",
    "A teaspoon of lemon juice or sodium citrate will pull it back smooth."
  ],
  why: "Too much heat makes cheese proteins clump and squeeze out their fat. Aged hard cheeses split most easily because they hold less moisture.",
  prevent: "Add grated cheese off the heat, a handful at a time, and never let it boil."
},

{
  symptom: "My yoghurt / cream curdled in the sauce",
  category: "Sauces",
  tags: [
    "yoghurt",
    "curdled",
    "cream",
    "split",
    "curry",
    "separated",
    "milk"
  ],
  verdict: "Often rescuable",
  rescue: [
    "Blitz with a stick blender — often enough to bring it back.",
    "Or strain, then whisk into a fresh cornflour slurry base."
  ],
  why: "Dairy proteins coagulate with heat and acid. Low-fat yoghurt splits fastest because fat is what buffers the proteins.",
  prevent: "Temper it: stir hot liquid into the yoghurt first, then return it to the pan off the boil. Stabilise with a teaspoon of cornflour."
},

{
  symptom: "My beans are still hard after hours",
  category: "Rice & grains",
  tags: [
    "beans",
    "hard",
    "won't soften",
    "chickpeas",
    "lentils",
    "tough"
  ],
  verdict: "Rescuable",
  rescue: [
    "Add a pinch of bicarbonate of soda and keep simmering — it raises the pH and softens the skins fast.",
    "Remove any acidic ingredients (tomato, vinegar, wine) until they're tender."
  ],
  why: "Acid and calcium strengthen the pectin in bean skins and stop water getting in. Add tomatoes early and beans can cook for hours without softening. Old beans also simply refuse.",
  prevent: "Cook beans until tender first, then add acidic ingredients."
},

{
  symptom: "My guacamole / apple went brown",
  category: "Technique",
  tags: [
    "brown",
    "oxidised",
    "guacamole",
    "avocado",
    "apple",
    "banana",
    "discoloured"
  ],
  verdict: "Cosmetic",
  rescue: [
    "Scrape off the brown layer — the flesh underneath is fine.",
    "Stir in lime juice and press cling film directly onto the surface."
  ],
  why: "An enzyme reacts with oxygen and turns phenols into brown pigment. It's harmless and doesn't affect flavour much.",
  prevent: "Acid slows the enzyme and excluding air stops it. Contact-wrap the surface rather than covering the bowl."
},

{
  symptom: "My pancakes are tough and flat",
  category: "Baking",
  tags: [
    "pancakes",
    "tough",
    "flat",
    "rubbery",
    "chewy",
    "waffles"
  ],
  verdict: "Next batch",
  rescue: [
    "Rest the remaining batter 15 minutes and don't stir it again — the next pancakes will be noticeably better.",
    "Check your raising agent is in date; baking powder more than six months open is often dead.",
    "If the batter looks over-beaten and smooth, fold in a little extra milk to loosen it."
  ],
  why: "Overmixing develops gluten, which turns a tender pancake chewy. Pancake batter is supposed to look wrong — lumpy and unpromising. Those lumps hydrate on their own during resting, and the rest also lets the gluten you did build relax before it hits the pan.",
  prevent: "Mix until just combined, lumps and all, then rest 15–30 minutes before cooking."
},

{
  symptom: "My custard scrambled",
  category: "Eggs",
  tags: [
    "custard",
    "scrambled",
    "curdled",
    "crème anglaise",
    "lumpy",
    "split"
  ],
  verdict: "Often rescuable",
  rescue: [
    "Off the heat immediately, then blitz with a stick blender or pass through a fine sieve.",
    "Caught early, it comes back almost perfectly."
  ],
  why: "Egg proteins set around 80°C, and custard is cooked to about 82°C — a very narrow window. Pouring hot milk in too fast cooks the yolks on contact.",
  prevent: "Temper: add hot milk to the yolks in a thin stream while whisking. Cook gently and stop when it coats a spoon."
},

{
  symptom: "My fish fell apart in the pan",
  category: "Meat",
  tags: [
    "fish",
    "fell apart",
    "flaking",
    "broke",
    "salmon",
    "sticking"
  ],
  verdict: "Repurposable",
  rescue: [
    "Serve it as flakes over something — a salad, rice bowl or pasta. Nobody minds.",
    "Stop turning it; one flip only."
  ],
  why: "Fish has very little connective tissue, so cooked flesh has almost nothing holding it together. Moving it early, before the crust sets, tears it.",
  prevent: "Dry surface, hot pan, place it skin-side down and leave it completely alone until it releases on its own."
},

{
  symptom: "My quinoa is bitter",
  category: "Rice & grains",
  tags: [
    "quinoa",
    "bitter",
    "soapy",
    "grains",
    "rinse",
    "saponin"
  ],
  verdict: "Rescuable next batch",
  rescue: [
    "Rinse the cooked quinoa in a fine sieve under hot water and drain hard — it removes some of the bitterness.",
    "Season aggressively: lemon, olive oil, salt and herbs mask what's left.",
    "Always rinse it raw before cooking."
  ],
  why: "Quinoa seeds are coated in saponins, a natural bitter compound the plant uses to deter birds and insects. It dissolves in water, so a 30-second rinse removes nearly all of it — but unrinsed quinoa carries a distinct soapy edge.",
  prevent: "Rinse raw quinoa in a fine sieve until the water runs clear, then toast it dry in the pan before adding liquid."
},

{
  symptom: "My polenta is lumpy",
  category: "Rice & grains",
  tags: [
    "polenta",
    "lumpy",
    "lumps",
    "cornmeal",
    "grits",
    "clumps"
  ],
  verdict: "Rescuable",
  rescue: [
    "Whisk hard off the heat — most lumps break down with vigorous whisking.",
    "Stubborn ones: blitz with a stick blender, or pass through a sieve.",
    "Add a splash of hot liquid to loosen it before whisking."
  ],
  why: "Cornmeal dropped in all at once hydrates on the outside instantly, sealing dry grain inside. Same failure as lumpy gravy — the starch gelatinises faster than the water can penetrate.",
  prevent: "Rain the polenta into simmering liquid in a thin stream while whisking constantly, never in one go."
},

{
  symptom: "My couscous is clumped and stodgy",
  category: "Rice & grains",
  tags: [
    "couscous",
    "clumped",
    "stodgy",
    "sticky",
    "lumps",
    "dry"
  ],
  verdict: "Rescuable",
  rescue: [
    "Rake it apart with a fork — never a spoon, which compacts it further.",
    "Add a spoon of olive oil or butter and keep forking until the grains separate.",
    "If it's still wet and heavy, spread it on a tray for a few minutes to dry out."
  ],
  why: "Couscous is tiny pasta, and its surface starch glues grains together when it sits undisturbed in liquid. Stirring while wet compacts it into a paste instead of separating it.",
  prevent: "Equal volumes couscous and boiling liquid, cover, leave five minutes untouched, then fluff with a fork and a little fat."
},

{
  symptom: "My noodles went mushy in the soup",
  category: "Rice & grains",
  tags: [
    "noodles",
    "mushy",
    "soup",
    "soggy",
    "ramen",
    "overcooked",
    "bloated"
  ],
  verdict: "Not rescuable in the pot",
  rescue: [
    "Strain the noodles out now — they'll keep swelling in hot broth otherwise.",
    "Serve the broth separately and add fresh noodles per bowl.",
    "Leftovers: reheat broth and noodles separately, never together."
  ],
  why: "Noodles keep absorbing liquid as long as they sit in hot broth, long after the heat is off. A bowl that's perfect at the stove is bloated ten minutes later — and the broth thins as its liquid moves into the noodles.",
  prevent: "Cook noodles separately, undercook them slightly, and combine in the bowl at the moment of serving."
}
];
