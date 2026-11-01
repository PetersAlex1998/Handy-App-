/* Katalog: Zutaten und Rezeptvorlagen (reine Daten, keine Logik)
   Zutaten:   Name~Alias1,Alias2|Einheit|Bereich|Vorrat (1 = meist zu Hause)
   Bereiche:  O Obst & Gemüse, M Milch & Kühlregal, F Fleisch & Fisch, B Brot & Backwaren, T Nudeln/Reis/Backzutaten,
              C Konserven & Saucen, G Gewürze & Öle, D Getränke, K Tiefkühl, N Nüsse & Snacks, H Haushalt */
const ING_DATA=`Tomate~Tomaten,Fleischtomate,Fleischtomaten|Stk|O|0
Kirschtomaten~Cherrytomaten,Cocktailtomaten|g|O|0
Gurke~Gurken,Salatgurke,Salatgurken|Stk|O|0
Paprika~Paprikaschote,Paprikaschoten|Stk|O|0
Zucchini~Zucchinis|Stk|O|0
Aubergine~Auberginen|Stk|O|0
Karotte~Karotten,Möhre,Möhren,Mohrrübe,Mohrrüben|Stk|O|0
Kartoffel~Kartoffeln,Speisekartoffeln|g|O|0
Süßkartoffel~Süßkartoffeln|Stk|O|0
Zwiebel~Zwiebeln,Speisezwiebel|Stk|O|1
Rote Zwiebel~Rote Zwiebeln|Stk|O|0
Knoblauch~Knoblauchzehe,Knoblauchzehen|Zehe|O|1
Frühlingszwiebel~Frühlingszwiebeln,Lauchzwiebel,Lauchzwiebeln|Bund|O|0
Lauch~Porree|Stk|O|0
Brokkoli~Broccoli|g|O|0
Blumenkohl|Stk|O|0
Spinat~Blattspinat|g|O|0
Salat~Kopfsalat,Eisbergsalat,Römersalat|Stk|O|0
Feldsalat|g|O|0
Rucola~Rauke|g|O|0
Champignons~Champignon,Pilze,Pilz|g|O|0
Fenchel|Stk|O|0
Staudensellerie~Stangensellerie|Stk|O|0
Sellerie~Knollensellerie|Stk|O|0
Kürbis~Hokkaido,Hokkaidokürbis|Stk|O|0
Rote Bete~Rote Beete,Rote Rüben|Stk|O|0
Kohlrabi|Stk|O|0
Rotkohl~Blaukraut|Stk|O|0
Weißkohl~Weisskohl,Weißkraut|Stk|O|0
Spargel|g|O|0
Erbsen~Zuckerschoten|g|O|0
Grüne Bohnen~Brechbohnen,Buschbohnen|g|O|0
Radieschen|Bund|O|0
Ingwer|g|O|0
Chili~Chilischote,Chilischoten,Peperoni|Stk|O|0
Petersilie|Bund|O|0
Basilikum|Bund|O|0
Schnittlauch|Bund|O|0
Dill|Bund|O|0
Koriander~Korianderblätter|Bund|O|0
Minze~Pfefferminze|Bund|O|0
Thymian|Bund|O|0
Rosmarin|Bund|O|0
Salbei|Bund|O|0
Zitrone~Zitronen|Stk|O|0
Limette~Limetten|Stk|O|0
Orange~Orangen,Apfelsine,Apfelsinen|Stk|O|0
Apfel~Äpfel|Stk|O|0
Birne~Birnen|Stk|O|0
Banane~Bananen|Stk|O|0
Erdbeeren~Erdbeere|g|O|0
Himbeeren~Himbeere|g|O|0
Blaubeeren~Heidelbeeren|g|O|0
Weintrauben~Trauben|g|O|0
Mango|Stk|O|0
Ananas|Stk|O|0
Avocado~Avocados|Stk|O|0
Kiwi~Kiwis|Stk|O|0
Pfirsich~Pfirsiche|Stk|O|0
Melone~Wassermelone|Stk|O|0
Milch~Vollmilch|ml|M|0
Sahne~Schlagsahne,Kochsahne|ml|M|0
Schmand~Saure Sahne|g|M|0
Crème fraîche~Creme fraiche,Crème fraiche|g|M|0
Joghurt~Naturjoghurt,Jogurt|g|M|0
Quark~Magerquark,Speisequark|g|M|0
Frischkäse~Doppelrahmfrischkäse|g|M|0
Butter|g|M|1
Margarine|g|M|0
Eier~Ei,Hühnerei,Hühnereier|Stk|M|0
Mozzarella|g|M|0
Parmesan~Grana Padano|g|M|0
Gouda~Edamer|g|M|0
Emmentaler|g|M|0
Feta~Schafskäse,Hirtenkäse|g|M|0
Mascarpone|g|M|0
Ricotta|g|M|0
Hüttenkäse~Körniger Frischkäse|g|M|0
Reibekäse~Geriebener Käse|g|M|0
Käse~Scheibenkäse|g|M|0
Buttermilch|ml|M|0
Kondensmilch|ml|M|0
Halloumi|g|M|0
Skyr|g|M|0
Hackfleisch~Hack,Gehacktes,Rinderhack|g|F|0
Hähnchenbrust~Hühnerbrust,Hähnchenbrustfilet,Hühnchenbrust|g|F|0
Hähnchenschenkel~Hühnerschenkel,Hähnchenkeule|Stk|F|0
Hähnchen~Brathähnchen,Huhn|Stk|F|0
Schweinefilet|g|F|0
Schnitzel~Schweineschnitzel,Putenschnitzel|Stk|F|0
Bratwurst~Würstchen,Wurst|Stk|F|0
Speck~Bacon,Frühstücksspeck,Speckwürfel|g|F|0
Schinken~Kochschinken|g|F|0
Salami|Scheibe|F|0
Aufschnitt|Pck|F|0
Lachs~Lachsfilet|g|F|0
Garnelen~Shrimps,Scampi|g|F|0
Forelle|Stk|F|0
Kabeljau~Dorsch,Seelachs|g|F|0
Rindfleisch~Gulasch,Rindergulasch|g|F|0
Steak~Rindersteak|Stk|F|0
Rinderfilet|g|F|0
Putenbrust~Putenfleisch|g|F|0
Lammfleisch|g|F|0
Leberkäse|Scheibe|F|0
Räucherlachs|g|F|0
Brot~Vollkornbrot,Bauernbrot,Mischbrot|Stk|B|0
Brötchen~Semmeln,Semmel,Weckle|Stk|B|0
Toastbrot~Toast|Pck|B|0
Wraps~Tortilla,Tortillas,Tortillawraps|Pck|B|0
Baguette|Stk|B|0
Fladenbrot~Naan,Pita|Stk|B|0
Pizzateig|Pck|B|0
Blätterteig|Pck|B|0
Burgerbrötchen~Hamburgerbrötchen|Pck|B|0
Croissant~Croissants|Stk|B|0
Knäckebrot|Pck|B|0
Brezel~Laugenbrezel|Stk|B|0
Tacoschalen~Taco Shells|Pck|B|0
Nudeln~Pasta,Teigwaren|g|T|1
Spaghetti|g|T|1
Penne~Fusilli,Farfalle,Rigatoni|g|T|1
Lasagneplatten~Lasagne|g|T|1
Reis~Langkornreis|g|T|1
Basmatireis~Jasminreis|g|T|1
Risottoreis~Arborio|g|T|0
Couscous|g|T|1
Bulgur|g|T|0
Quinoa|g|T|0
Haferflocken|g|T|1
Müsli~Cornflakes|g|T|0
Mehl~Weizenmehl|g|T|1
Zucker~Haushaltszucker|g|T|1
Puderzucker~Staubzucker|g|T|1
Brauner Zucker~Rohrzucker|g|T|1
Vanillezucker|Pck|T|1
Backpulver|Pck|T|1
Natron|TL|T|1
Trockenhefe~Hefe,Frischhefe|Pck|T|1
Speisestärke~Stärke,Maisstärke|g|T|1
Grieß~Weichweizengrieß|g|T|1
Semmelbrösel~Paniermehl,Panko|g|T|1
Linsen~Rote Linsen,Berglinsen,Tellerlinsen|g|T|0
Honig|g|T|1
Marmelade~Konfitüre,Gelee|Glas|T|0
Nuss-Nougat-Creme~Nutella|Glas|T|0
Kakaopulver~Kakao|g|T|1
Schokolade~Zartbitterschokolade,Vollmilchschokolade|g|T|0
Kuvertüre|g|T|0
Gelatine|Pck|T|1
Puddingpulver~Vanillepudding|Pck|T|1
Polenta~Maisgrieß|g|T|0
Gnocchi|g|T|0
Tortellini~Ravioli|g|T|0
Kokosraspeln~Kokosflocken|g|T|0
Sesam~Sesamsamen|g|T|1
Mohn|g|T|1
Leinsamen|g|T|1
Chiasamen~Chia|g|T|0
Dosentomaten~Gehackte Tomaten,Stückige Tomaten,Geschälte Tomaten|Dose|C|0
Tomatenmark|EL|C|1
Passierte Tomaten~Passata|Pck|C|0
Tomatensauce~Pastasauce|Glas|C|0
Kokosmilch|Dose|C|0
Kichererbsen|Dose|C|0
Kidneybohnen~Kidney-Bohnen|Dose|C|0
Weiße Bohnen~Cannellini,Weisse Bohnen|Dose|C|0
Mais~Dosenmais,Gemüsemais|Dose|C|0
Thunfisch|Dose|C|0
Pesto~Basilikumpesto|Glas|C|0
Senf~Dijonsenf,Mittelscharfer Senf|TL|C|1
Ketchup|EL|C|1
Mayonnaise~Mayo|EL|C|1
Sojasauce~Sojasoße,Soja Sauce|EL|C|1
Worcestersauce|EL|C|1
Sambal Oelek|TL|C|1
Currypaste~Rote Currypaste,Grüne Currypaste|TL|C|0
Gemüsebrühe~Gemüsebrühwürfel,Brühe,Brühwürfel|TL|C|1
Hühnerbrühe~Hühnerbrühwürfel|TL|C|1
Rinderbrühe~Rinderbrühwürfel|TL|C|1
Oliven~Schwarze Oliven,Grüne Oliven|Glas|C|0
Kapern|Glas|C|0
Gewürzgurken~Essiggurken,Cornichons|Glas|C|0
Sauerkraut|Dose|C|0
Apfelmus|Glas|C|0
Ajvar|Glas|C|0
Tahini~Sesampaste|EL|C|0
Erdnussbutter~Erdnussmus|EL|C|0
Hummus|Becher|C|0
Getrocknete Tomaten~Sonnengetrocknete Tomaten|Glas|C|0
Meerrettich|Glas|C|0
Salz~Meersalz,Speisesalz|TL|G|1
Pfeffer~Schwarzer Pfeffer,Pfefferkörner|TL|G|1
Olivenöl|EL|G|1
Öl~Pflanzenöl,Sonnenblumenöl,Rapsöl,Speiseöl|EL|G|1
Sesamöl|EL|G|0
Essig~Weißweinessig,Apfelessig|EL|G|1
Balsamico~Balsamicoessig,Balsamessig|EL|G|1
Paprikapulver~Paprika edelsüß|TL|G|1
Chilipulver~Chiliflocken,Cayennepfeffer|TL|G|1
Curry~Currypulver|TL|G|1
Kreuzkümmel~Kumin,Cumin|TL|G|1
Kurkuma~Gelbwurz|TL|G|1
Zimt|TL|G|1
Muskat~Muskatnuss|TL|G|1
Oregano|TL|G|1
Italienische Kräuter~Kräuter der Provence|TL|G|1
Lorbeerblatt~Lorbeer,Lorbeerblätter|Stk|G|1
Nelken~Gewürznelken|Stk|G|1
Vanilleschote~Vanille|Stk|G|0
Garam Masala|TL|G|0
Knoblauchpulver|TL|G|1
Zwiebelpulver|TL|G|1
Ingwerpulver|TL|G|1
Korianderpulver~Koriander gemahlen|TL|G|1
Thymian getrocknet|TL|G|1
Basilikum getrocknet|TL|G|1
Rosmarin getrocknet|TL|G|1
Majoran|TL|G|1
Piment~Pimentkörner|TL|G|1
Senfkörner|TL|G|1
Safran|Prise|G|0
Zitronensaft|EL|G|0
Wasser~Mineralwasser|Flasche|D|0
Orangensaft~Saft,Apfelsaft|Flasche|D|0
Cola~Limonade|Flasche|D|0
Bier|Flasche|D|0
Wein|Flasche|D|0
Weißwein|ml|D|0
Rotwein|ml|D|0
Sekt~Prosecco|Flasche|D|0
Kaffee~Kaffeebohnen,Kaffeepulver|g|D|0
Tee~Teebeutel|Pck|D|0
Hafermilch~Haferdrink|ml|D|0
Sojamilch~Sojadrink|ml|D|0
Mandelmilch~Mandeldrink|ml|D|0
TK-Gemüse~Tiefkühlgemüse,Gemüsemischung|g|K|0
TK-Erbsen~Tiefkühlerbsen|g|K|0
TK-Spinat~Tiefkühlspinat,Rahmspinat|g|K|0
TK-Pizza~Tiefkühlpizza,Pizza|Stk|K|0
Pommes~Pommes frites,Kroketten|g|K|0
Eis~Eiscreme,Vanilleeis|Pck|K|0
TK-Beeren~Tiefkühlbeeren|g|K|0
Fischstäbchen|Pck|K|0
Mandeln~Mandelstifte,Gemahlene Mandeln|g|N|0
Walnüsse~Walnuss,Walnusskerne|g|N|0
Haselnüsse~Haselnuss,Gemahlene Haselnüsse|g|N|0
Cashews~Cashewkerne|g|N|0
Erdnüsse~Erdnusskerne|g|N|0
Pinienkerne|g|N|0
Sonnenblumenkerne|g|N|0
Kürbiskerne|g|N|0
Rosinen~Sultaninen|g|N|0
Datteln|g|N|0
Chips~Kartoffelchips|Pck|N|0
Kekse~Butterkekse|Pck|N|0
Gummibärchen~Süßigkeiten|Pck|N|0
Salzstangen|Pck|N|0
Müsliriegel|Pck|N|0
Küchenrolle~Küchenpapier|Pck|H|0
Toilettenpapier~Klopapier|Pck|H|0
Spülmittel|Flasche|H|0
Spülmaschinentabs~Geschirrspültabs|Pck|H|0
Müllbeutel~Müllsäcke|Pck|H|0
Alufolie|Stk|H|0
Backpapier|Stk|H|0
Frischhaltefolie|Stk|H|0
Waschmittel|Pck|H|0
Zahnpasta|Stk|H|0
Seife~Handseife|Stk|H|0
Shampoo|Flasche|H|0
Duschgel|Flasche|H|0
Taschentücher|Pck|H|0
Batterien|Pck|H|0
Glühbirne~Leuchtmittel|Stk|H|0
Spülschwamm~Schwamm|Pck|H|0
Katzenfutter|Pck|H|0`;

/* Rezeptvorlagen: [Name, Portionen, [[Zutat, Menge, Einheit], ...]] */
const SAMPLES=[
 ['Spaghetti Bolognese',4,[['Spaghetti',400,'g'],['Hackfleisch',500,'g'],['Zwiebel',1,'Stk'],['Knoblauch',2,'Zehe'],['Karotte',1,'Stk'],['Dosentomaten',1,'Dose'],['Tomatenmark',2,'EL'],['Olivenöl',2,'EL'],['Salz',1,'TL'],['Pfeffer',1,'TL'],['Oregano',1,'TL'],['Parmesan',50,'g']]],
 ['Tomatensuppe',4,[['Tomate',8,'Stk'],['Zwiebel',1,'Stk'],['Knoblauch',2,'Zehe'],['Gemüsebrühe',2,'TL'],['Sahne',100,'ml'],['Olivenöl',2,'EL'],['Basilikum',1,'Bund'],['Salz',1,'TL'],['Pfeffer',1,'TL'],['Zucker',1,'TL']]],
 ['Griechischer Salat',2,[['Tomate',2,'Stk'],['Gurke',1,'Stk'],['Paprika',1,'Stk'],['Rote Zwiebel',1,'Stk'],['Feta',200,'g'],['Oliven',1,'Glas'],['Olivenöl',3,'EL'],['Oregano',1,'TL'],['Salz',1,'TL']]],
 ['Bruschetta',2,[['Baguette',1,'Stk'],['Tomate',4,'Stk'],['Knoblauch',1,'Zehe'],['Basilikum',1,'Bund'],['Olivenöl',2,'EL'],['Balsamico',1,'EL'],['Salz',1,'TL'],['Pfeffer',1,'TL']]],
 ['Hähnchen-Curry',4,[['Hähnchenbrust',600,'g'],['Zwiebel',1,'Stk'],['Knoblauch',2,'Zehe'],['Ingwer',20,'g'],['Paprika',2,'Stk'],['Kokosmilch',1,'Dose'],['Currypaste',2,'TL'],['Reis',300,'g'],['Koriander',1,'Bund'],['Öl',2,'EL'],['Salz',1,'TL']]],
 ['Pfannkuchen',4,[['Mehl',250,'g'],['Eier',3,'Stk'],['Milch',500,'ml'],['Zucker',1,'EL'],['Salz',1,'Prise'],['Butter',20,'g']]]
];

const MORE_TPL=[
 ['Spaghetti Carbonara',4,[['Spaghetti',400,'g'],['Speck',150,'g'],['Eier',3,'Stk'],['Parmesan',80,'g'],['Pfeffer',1,'TL'],['Salz',1,'TL']]],
 ['Lasagne',4,[['Lasagneplatten',250,'g'],['Hackfleisch',500,'g'],['Dosentomaten',1,'Dose'],['Zwiebel',1,'Stk'],['Knoblauch',2,'Zehe'],['Butter',40,'g'],['Mehl',40,'g'],['Milch',500,'ml'],['Reibekäse',150,'g'],['Olivenöl',2,'EL'],['Salz',1,'TL'],['Pfeffer',1,'TL'],['Oregano',1,'TL']]],
 ['Chili con Carne',4,[['Hackfleisch',500,'g'],['Zwiebel',1,'Stk'],['Knoblauch',2,'Zehe'],['Paprika',2,'Stk'],['Dosentomaten',1,'Dose'],['Kidneybohnen',1,'Dose'],['Mais',1,'Dose'],['Tomatenmark',2,'EL'],['Chilipulver',1,'TL'],['Paprikapulver',2,'TL'],['Kreuzkümmel',1,'TL'],['Reis',250,'g'],['Öl',2,'EL'],['Salz',1,'TL']]],
 ['Gemüsepfanne mit Reis',4,[['Reis',300,'g'],['Paprika',2,'Stk'],['Zucchini',1,'Stk'],['Karotte',2,'Stk'],['Zwiebel',1,'Stk'],['Champignons',200,'g'],['Sojasauce',3,'EL'],['Öl',2,'EL'],['Salz',1,'TL'],['Pfeffer',1,'TL']]],
 ['Kartoffelsuppe',4,[['Kartoffel',800,'g'],['Karotte',2,'Stk'],['Lauch',1,'Stk'],['Zwiebel',1,'Stk'],['Gemüsebrühe',2,'TL'],['Sahne',100,'ml'],['Butter',20,'g'],['Petersilie',1,'Bund'],['Salz',1,'TL'],['Pfeffer',1,'TL'],['Muskat',1,'TL']]],
 ['Ofenkartoffeln mit Quark',4,[['Kartoffel',1000,'g'],['Quark',500,'g'],['Schnittlauch',1,'Bund'],['Öl',3,'EL'],['Paprikapulver',1,'TL'],['Zitrone',1,'Stk'],['Salz',1,'TL']]],
 ['Schnitzel mit Pommes und Salat',4,[['Schnitzel',4,'Stk'],['Mehl',50,'g'],['Eier',2,'Stk'],['Semmelbrösel',100,'g'],['Pommes',600,'g'],['Salat',1,'Stk'],['Tomate',2,'Stk'],['Öl',4,'EL'],['Zitrone',1,'Stk'],['Salz',1,'TL']]],
 ['Fischstäbchen mit Kartoffelpüree',4,[['Fischstäbchen',1,'Pck'],['Kartoffel',800,'g'],['Milch',150,'ml'],['Butter',40,'g'],['TK-Erbsen',300,'g'],['Muskat',1,'TL'],['Salz',1,'TL']]],
 ['Pesto-Nudeln',2,[['Penne',250,'g'],['Pesto',1,'Glas'],['Parmesan',40,'g'],['Kirschtomaten',150,'g'],['Salz',1,'TL']]],
 ['Wraps mit Hähnchen',4,[['Wraps',1,'Pck'],['Hähnchenbrust',400,'g'],['Paprika',1,'Stk'],['Salat',1,'Stk'],['Tomate',2,'Stk'],['Gurke',1,'Stk'],['Joghurt',150,'g'],['Paprikapulver',1,'TL'],['Öl',2,'EL'],['Salz',1,'TL']]],
 ['Rührei mit Brot',2,[['Eier',4,'Stk'],['Milch',50,'ml'],['Butter',10,'g'],['Brot',1,'Stk'],['Schnittlauch',1,'Bund'],['Salz',1,'Prise'],['Pfeffer',1,'Prise']]],
 ['Nudelsalat',4,[['Penne',300,'g'],['Gurke',1,'Stk'],['Paprika',1,'Stk'],['Mais',1,'Dose'],['Schinken',150,'g'],['Mayonnaise',4,'EL'],['Joghurt',150,'g'],['Essig',2,'EL'],['Salz',1,'TL'],['Pfeffer',1,'TL']]],
 ['Linsensuppe',4,[['Linsen',300,'g'],['Karotte',2,'Stk'],['Sellerie',1,'Stk'],['Zwiebel',1,'Stk'],['Dosentomaten',1,'Dose'],['Gemüsebrühe',2,'TL'],['Essig',1,'EL'],['Öl',2,'EL'],['Salz',1,'TL'],['Pfeffer',1,'TL']]],
 ['Gemüse-Quiche',4,[['Blätterteig',1,'Pck'],['Zucchini',1,'Stk'],['Paprika',1,'Stk'],['Zwiebel',1,'Stk'],['Eier',3,'Stk'],['Sahne',200,'ml'],['Reibekäse',100,'g'],['Salz',1,'TL'],['Pfeffer',1,'TL']]],
 ['Burger',4,[['Burgerbrötchen',1,'Pck'],['Hackfleisch',500,'g'],['Salat',1,'Stk'],['Tomate',2,'Stk'],['Zwiebel',1,'Stk'],['Käse',4,'Scheibe'],['Ketchup',4,'EL'],['Gewürzgurken',1,'Glas'],['Öl',2,'EL'],['Salz',1,'TL'],['Pfeffer',1,'TL']]],
 ['Pilz-Rahmgeschnetzeltes mit Reis',4,[['Hähnchenbrust',500,'g'],['Champignons',300,'g'],['Zwiebel',1,'Stk'],['Sahne',200,'ml'],['Reis',300,'g'],['Butter',20,'g'],['Petersilie',1,'Bund'],['Hühnerbrühe',1,'TL'],['Salz',1,'TL'],['Pfeffer',1,'TL']]],
 ['Haferflocken mit Joghurt und Obst',2,[['Haferflocken',100,'g'],['Joghurt',300,'g'],['Banane',2,'Stk'],['Apfel',1,'Stk'],['Honig',20,'g']]],
 ['Abendbrot',2,[['Brot',1,'Stk'],['Butter',50,'g'],['Käse',150,'g'],['Schinken',100,'g'],['Gurke',1,'Stk'],['Tomate',2,'Stk']]]
];
