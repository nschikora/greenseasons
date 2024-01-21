import { readFile, writeFile } from "fs/promises";

//few shot greatly improves overall consistency
function createPrompt(veg) {
  return `Erstelle einen Steckbrief wie den folgenden (im JSON Format) für ${veg}:
Beispiel für Chicorée:
{
    "id": "chicoree",
    "name": "Chicorée",
    "description": "Chicorée, auch bekannt als Brüsseler Endivie, ist ein Blattgemüse mit einer unverwechselbaren leicht bitteren Note. Er besteht aus langen, schmalen, blassen Blättern, die sich um einen festen, kegelförmigen Kern gruppieren. Die Blätter sind meist weiß mit hellgelben Spitzen. Chicorée ist reich an Ballaststoffen, Vitaminen und Mineralstoffen und wird oft roh in Salaten verwendet, kann aber auch gekocht oder gebraten werden. Sein leicht bitterer Geschmack harmoniert gut mit süßen, sauren oder fetthaltigen Zutaten. Chicorée wird auch für seine gesundheitlichen Vorteile geschätzt, einschließlich der Förderung der Verdauung und der Lebergesundheit.",
    "origin": "Chicorée hat seinen Ursprung in Europa und wurde bereits im Altertum bekannt. Der moderne Chicorée, wie wir ihn kennen, entstand jedoch erst im 19. Jahrhundert in Belgien. Um 1830 wurde entdeckt, dass das Wurzelgemüse Chicorium intybus, wenn es in Dunkelheit nachwächst, bleiche, zarte Blätter entwickelt, die wir heute als Chicorée kennen. Diese Entdeckung fand in der Region Brüssel statt, daher wird Chicorée auch oft als \"Brüsseler Endivie\" bezeichnet. Seitdem hat sich der Anbau und die Beliebtheit von Chicorée in ganz Europa und darüber hinaus verbreitet.",
    "health": "Chicorée bietet eine Reihe von gesundheitlichen Vorteilen, hat aber auch einige potenzielle Nachteile, die beachtet werden sollten:\\n  \\n**Gesundheitliche Vorteile von Chicorée:**\\n1. **Reich an Nährstoffen:** Chicorée ist eine gute Quelle für Ballaststoffe, Vitamine (insbesondere Vitamin K und B-Vitamine) und Mineralien wie Kalium, Kalzium und Magnesium.\\n2. **Verdauungsfördernd:** Der hohe Ballaststoffgehalt kann die Darmgesundheit unterstützen und zur Vorbeugung von Verstopfung beitragen.\\n3. **Gut für die Leber:** Chicorée enthält Inulin, einen Typ von löslichem Ballaststoff, der die Leberfunktion unterstützen und die Gallenproduktion anregen kann.\\n4. **Blutzuckerregulation:** Inulin kann auch helfen, den Blutzuckerspiegel zu stabilisieren, was besonders für Menschen mit Diabetes vorteilhaft sein kann.\\n5. **Antioxidative Eigenschaften:** Chicorée enthält Antioxidantien, die Zellschäden durch freie Radikale bekämpfen können.\\n\\n**Mögliche Nachteile von Chicorée:**\\n1. **Bitterer Geschmack:** Einige Menschen finden den bitteren Geschmack von Chicorée unangenehm, was seine Akzeptanz als Nahrungsmittel einschränken kann.\\n2. **Allergische Reaktionen:** Chicorée kann bei einigen Personen allergische Reaktionen auslösen, insbesondere bei Menschen, die auch auf andere Mitglieder der Korbblütlerfamilie allergisch sind.\\n3. **Wechselwirkungen mit Medikamenten:** Chicorée kann die Wirksamkeit bestimmter Medikamente beeinflussen, daher ist es ratsam, vor dem Verzehr Rücksprache mit einem Arzt zu halten, falls man Medikamente einnimmt.\\n\\nInsgesamt ist Chicorée ein gesundes und nährstoffreiches Gemüse, das in Maßen genossen werden kann. Es ist immer gut, auf die individuelle Verträglichkeit zu achten und bei Unsicherheiten bezüglich Allergien oder Medikamentenwechselwirkungen einen Arzt zu konsultieren."
}

Beispiel für Feldsalat:
{
    "id": "feldsalat",
    "name": "Feldsalat",
    "description": "Feldsalat, auch bekannt als Rapunzel oder Nüsslisalat, ist ein kleines, rosettenförmiges Blattgemüse mit dunkelgrünen, länglichen bis runden Blättern. Er hat einen milden, leicht nussigen Geschmack und ist besonders beliebt in der kalten Jahreszeit. Feldsalat ist reich an Vitamin C, Betacarotin, Folsäure, Eisen und Omega-3-Fettsäuren. Er wird meist roh in Salaten gegessen, kann aber auch in warmen Gerichten verwendet werden.",
    "origin": "Feldsalat stammt ursprünglich aus Europa und Westasien. Schon seit dem Mittelalter ist er in diesen Regionen als Kulturpflanze bekannt. Feldsalat wird vor allem wegen seiner Robustheit gegenüber Kälte geschätzt, was ihn zu einem wichtigen Wintergemüse macht.",
    "health": "Feldsalat bietet zahlreiche gesundheitliche Vorteile:\\n\\n**Gesundheitliche Vorteile von Feldsalat:**\\n1. **Nährstoffreich:** Feldsalat ist eine gute Quelle für Vitamin C, Folsäure, Eisen und Omega-3-Fettsäuren.\\n2. **Herzgesundheit:** Die Omega-3-Fettsäuren in Feldsalat können zur Herzgesundheit beitragen.\\n3. **Unterstützung des Immunsystems:** Der hohe Vitamin-C-Gehalt stärkt das Immunsystem.\\n4. **Gut für die Augen:** Betacarotin, das im Feldsalat enthalten ist, ist wichtig für die Augengesundheit.\\n\\n**Mögliche Nachteile von Feldsalat:**\\n1. **Schadstoffbelastung:** Feldsalat kann, wie andere Blattgemüse auch, mit Nitrat belastet sein, insbesondere wenn er aus konventionellem Anbau stammt.\\n2. **Verderblichkeit:** Feldsalat ist relativ empfindlich und verdirbt schnell, daher sollte er frisch verzehrt und sachgerecht gelagert werden.\\n\\nGenerell ist Feldsalat ein sehr gesundes Gemüse, das in eine ausgewogene Ernährung gut integriert werden kann. Es ist ratsam, auf Frische und Qualität zu achten und möglichst Bio-Qualität zu wählen, um Schadstoffbelastung zu minimieren."
}`;
}

const vegs = [
  "Rucola",
  "Spargel",
  "Erdbeeren",
  "Batavia",
  "Eichblattsalat",
  "Endiviensalat",
  "Kopfsalat",
  "Lollo Rosso",
  "Blumenkohl",
  "Kohlrabi",
  "Lauch- / Frühlingszwiebeln",
  "Mangold",
  "Radieschen",
  "Spitzkohl",
  "Blaubeeren / Heidelbeeren",
  "Himbeeren",
  "Johannisbeeren",
  "Kirschen",
  "Stachelbeeren",
  "Eisbergsalat",
  "Dicke Bohnen",
  "Brokkoli",
  "Erbsen",
  "Fenchel",
  "Gurke / Salatgurke",
  "Kartoffeln",
  "Möhren / Karotten",
  "Rotkohl",
  "Weißkohl",
  "Zucchini",
  "Zuckerschoten",
  "Aprikose",
  "Brombeeren",
  "Mirabellen",
  "Pflaumen",
  "Zwetschen",
  "Aubergine",
  "Grüne Bohnen",
  "Paprika",
  "Rote Bete",
  "Staudensellerie",
  "Tomaten",
  "Zwiebeln",
  "Apfel",
  "Birne",
  "Wassermelonen",
  "Radicchio",
  "Butterrüben",
  "Kürbis",
  "Mais",
  "Holunderbeeren / Flieder",
  "Quitten",
  "Weintrauben",
  "Steckrüben",
];

for (const veg of vegs) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: createPrompt(veg) }],
    }),
  });

  const data = await res.json();
  const detail = data.choices[0].message.content;

  const old = await readFile("details.json", "utf-8");
  const oldData = JSON.parse(old);
  oldData.push(JSON.parse(detail));
  await writeFile("details.json", JSON.stringify(oldData, null, 2));

  console.log(`Added ${veg}`);
}
