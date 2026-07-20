// Real copy pulled 1:1 from Gil's History page Figma (node 168:222). This is
// genuine federation history content (not placeholder), so unlike the other
// still-unbuilt pages it's hardcoded here rather than left for Sanity — see
// project memory on the Sanity content-scope decision for the general rule.
// English-only for now, consistent with every other non-Home page until a
// translation decision is made for real body copy this long.

export interface HistoryMilestone {
  year: string;
  title: string;
  description: string;
}

export const historyMilestones: HistoryMilestone[] = [
  {
    year: "~1000",
    title: "Origin in China",
    description: "Karate-do believed to have originated approximately 1000 years ago in China.",
  },
  {
    year: "618–907",
    title: "Tang Dynasty (To-te)",
    description: "To-te (Karate-do) flourished during the Tang Dynasty.",
  },
  {
    year: "1898–1984",
    title: "Tsuyoshi Chitose",
    description: "Chitose Sensei is born in Okinawa and devotes his life to Karate-do.",
  },
  {
    year: "1984–",
    title: "International Federation",
    description: "The International Chito-Ryu Karate-Do Federation continues the legacy worldwide.",
  },
];

export interface HistoryMeaningDefinition {
  term: string;
  definition: string;
}

export const historyMeaningDefinitions: HistoryMeaningDefinition[] = [
  { term: "CHI", definition: "means 'one thousand'." },
  {
    term: "TO",
    definition:
      "refers to China's Tang dynasty (618–907), which is where To-de (which later became known as Karate-do) is commonly thought have sprung from.",
  },
  { term: "RYU", definition: "is the Japanese word for style." },
];

export const historyFounderCitation = {
  text: "From: The Five Hills Karate Club Link: ",
  linkText: "https://www.fivehillskarateclub.com/about/history-of-chito-ryu-karate-do/",
  href: "https://www.fivehillskarateclub.com/about/history-of-chito-ryu-karate-do/",
};

// New as of this sync: Gil replaced the old "Bridge Through Time" intro
// article with this shorter "Origin in China" lineage piece as the opening
// of the biography, and kept the old full article (Dometrich, Fairmont,
// Slemansky, Tsuruoka, and the rest of the North America expansion story
// through Chitose's 1984 death) as a hidden layer in Figma rather than
// deleting it outright — a deliberate trim, not an accidental hide. See EOD
// notes: flagged to Ross/Gil since it's a large content removal.
export const historyChinaLineageHeading = "Origin in China";
export const historyChinaLineageByline =
  "The History and Lineage of Chinto-ryu\nText by: Takashi Nakayama";
export const historyChinaLineageParagraphs: string[] = [
  'Chinto-ryu\'s history as an organized school is generally dated to 1946, when the Yōseikan dojo was established in the town of Waifu, Kikuchi District, Kumamoto Prefecture. Its founder, the First Soke, was Chitose Tsuyoshinao (1898–1984; born Chinen Chikanao in Okinawa). He was 48 years old at the time — just a year after the end of the Pacific War, while the wounds of the conflict were still fresh across Japan. Opening a dojo at 48 might seem late in life, but in fact, before the war, he had already opened and led the "Okinawa Kenpō Miyako Tōde Research Institute" on Miyako Island, Okinawa.',
  "In other words, while Chinto-ryu as an organization dates to the postwar period, the First Soke's career teaching karate began much earlier. And as the name of that prewar Okinawan dojo makes clear, its roots trace back to tōde.",
  "According to the First Soke, the first master of tōde was Chinen Peechin (peechin being a court title), who is said to have traveled to Fujian, China, around 1688 to study Chinese boxing. In 1726 he became a military attendant to King Shō Kei.",
  "The second generation is generally given as Matsumura Peechin (Matsumura Sōkon, 1809–1896, though his birth and death years are disputed), military attendant to King Shō Kō. However, some accounts hold that his teacher, Sakugawa Kanga (also known as Tōdī Sakugawa; his birth year is variously given as 1733, 1762, 1782, or 1786) was actually the second-generation master, with Matsumura Sōkon succeeding him rather than being counted as second generation himself.",
  "The lineage continues with Awagune Ueekata (ueekata also a court title), military attendant to King Shō Iku, as third generation in 1818; Hokama Peechin as fourth generation in 1838; and Arakaki Seishō (1840–1918, death year disputed) as fifth generation in 1860. From there, Chitose Tsuyoshinao became sixth generation, and in 1984 his son succeeded him as the second-generation Chitose Tsuyoshinao, seventh in the overall lineage (b. 1950).",
  "Where birth and death years are not given definitively above, multiple accounts exist, and further research is needed.",
];

// Also new this sync: a standalone section between the Origins meaning block
// and Key Milestones, not present in the previous build.
export const historyWhatIsChitoRyuHeading = "What is Chito Ryu?";
export const historyWhatIsChitoRyuParagraphs: string[] = [
  // Figma's source text drops the leading "T" of "The" ("he empty-handed...") — corrected here as an obvious paste typo, not a wording change.
  'The empty-handed martial art known as karate originated in ancient China, crossed the sea to Okinawa, and there developed into a distinctive art called tōde ("Chinese hand"). Tōde flourished during China\'s Tang dynasty and, according to the teachings passed down by Master Arakaki (mentor to the First Soke), carried a thousand years of history behind it. It was from this heritage that the First Soke coined the name "Chito-ryu" — combining sen (千, "thousand," from "a thousand years of history") with tō (唐, "Tang," from the Tang dynasty).',
  "The techniques of Chito-ryu carry forward the excellent traditions cultivated over this long history. Grounded in physiology and medicine, and guided by the principles of Wanin (harmony and endurance) and Rikihittatsu (the will to achieve through strength), the school aims to develop people who are sound in both body and mind.",
  "It is our hope that practitioners will acquire correct knowledge of Chinto-ryu karate and continue to teach, spread, and develop the art.",
];

export const historyEarlyYearsCaption = "City of Naha, Okinawa";

export interface HistoryPortrait {
  src: string;
  name: string;
  caption: string;
}

export const historyPortraits: { hirohito: HistoryPortrait; funakoshi: HistoryPortrait } = {
  hirohito: {
    src: "/images/history/hirohito.png",
    name: "Crown Prince Hirohito",
    caption: "Emperor of Japan",
  },
  funakoshi: {
    src: "/images/history/funakoshi.png",
    name: "Gichin Funakoshi",
    caption: 'Known as a "Father of Modern Karate"',
  },
};

export const historyEarlyYearsParagraph =
  "Chitose's birthday was October 18th, 1898, in the Kumochi area of Naha City. His father, Chinen (Masuo) Chlyoyu, took on his wife's family name as was custom at the time but never took up the study of the Okinawan martial arts. In his son we would see a life dedicated to the study and research of the old ways, and his founding in later years his method of karate we now understand as Chito Ryu. During his early years in Okinawa he was known as Chinen Gua and in later years when living in Japan he adopted the Chitose name for personal reasons, becoming Chitose Gochoku, among others that he used.";

export const historyAragakiParagraph =
  "Chitose, through family connections, had access to the finest teachers Okinawa had to offer. He began his study at the age of seven (1905) under Aragaki Seisho, a teacher of Tode and extremely skilled in the use of bo (staff) and kama (sickle). His grandfather, a senior official with the Naha Government had begun taking a very young Chitose with him when visiting Tode seniors and eventually was the one to set up the Aragaki connection in 1905. Young Chitose spent over seven years with Aragaki Sensei (teacher) until a disagreement had him leaving Aragaki for other instruction around 1913/1914. Chitose had spent most of his time on the kata Seisan though he also was taught Sanchin and Niseishi and the skills of walking on coral and being able to reverse himself while climbing trees. Other noted seniors at this early stage of his training with Aragaki were Funakoshi Gichin and the teacher of Miyagi Chojun, Higashionna Kanryo. Funakoshi Gichin was also Chitose's grade school teacher, and Funakoshi's eldest son, Giei, a fellow classmate. This early connection would last a lifetime, until the elder Funakoshi passed away in 1957.";

export const historyHirohitoSectionParagraphs: string[] = [
  "His next teacher was Higashionna Kanryo, though it would only be for a short period as Higashionna passed away in 1915. One fellow student would become the founder of modern Goju Ryu, Miyagi Chojun. Under Higashionna he learned the katas Saifa and Seipai. In Shuri he studied under Motobu Chotoku gaining knowledge in Unsu and Wansu. In Kadena (Nakigami District) he learned Chinto and Kusanku, and, along with Aragaki Ankichi, the katas Bassai (Potsai) and Ananko under Kyan Chotoku. Aragaki Ankichi, not to be confused with Chitose's first teacher, was a close friend and Chitose was deeply grieved when Aragaki passed at a young age in 1927. At the Sogen Ji he learned the katas Jion, Jitte, Shihohai and Ryusan under Hanashiro Chomo. He also spent time studying the kobudo of Chinen Sanda, and the old style grappling and submission techniques from Kanagushiku Peichin, along with a future karate leader Chibana Chosin. He furthered his kobudo under two noted experts Kogushiku Ufuchiku and Maezato Shinken. Teruo Chinen related a story he had heard many times as a young boy when living in Okinawa. His grandfather and Chinen Masami and a young Chitose (Chinen) were boyhood friends and this connection lasted into the budo years with Chinen Masami.",
  "As we can now see Chitose was well grounded in the knowledge that was available during the early years that the “public” in later years would access as “karate”. The list of teachers and fellow students he was acquainted with reads as a who's who today, so many to become founders of their unique methods or leaders of a known system from that time.",
  "Chitose spent two years in Tokyo enlisted as a member of the Imperial Guard Division (1918- 1920) but when he contracted typhoid fever he had to return home to recover.",
  "In March of 1921, Crown Prince Hirohito made a stopover in Okinawa on his way to Europe. A karate demonstration was organized and held at Shuri Castle. Chitose's youngest son, Yasuhiro Chitose, mentioned his father talking about this visit so many years ago and Chitose being introduced to the Prince but no mention of what Chitose's involvement was in the actual demonstration. Chitose took up teaching for a short while at the Okinawan Teachers College and by 1922 he was ready to head back to Japan to study medicine. He was accepted as a student at the Tokyo University Medical Center and became a doctor in 1924, then spent five years working in a hospital after graduation from medical school before he was accepted as a full doctor by the Japanese Medical Association. His field of study was obstetrics/gynecology. On his return to Tokyo he found Funakoshi Gichin had begun his teaching in Japan at the request of Judo's Kano Jigaro. Chitose would assist at times during these early days of karate as Funakoshi was getting established. Chitose taught at the Yotsuya Dojo and at various university clubs as they became established. Some of the future leaders he dealt with were Ohtsuka Hironori who would develop Wado Ryu and Konishi Yasuhiro, founder of Ryobukai. During this period, late 20's, he spent time studying weapons under Yabuki Moden. He was also making trips back to Okinawa to keep his connections with his teachers and peers. Into the 30's Chitose was working at his practise and still assisting Funakoshi. He spent time teaching at Kelo University at the time when Nakayama Masatoshi began his karate training. Nakayama would become the second head of the JKA, on the passing of Funakoshi in 1957. Chitose talks about the outlook his fellow doctors had on karate in general. As it was at the time karate was still considered a second class budo and Chitose would train in secrecy, keeping his martial skills silent to those he worked with. In 1933 he aligned himself with Toyama Kanken's Zen Nippon Karate Do Renmei but lack of support at this time hindered any progress. In 1937 the Okinawan Prefectural Karate Do Promotional Society was formed with noted members such as Hanashiro Chomo, Chibana Chosin, Miyagi Chojun, Gusukuma Shimpan, Nakasone Genwa and Chitose Tsuyoshi.",
];

export const historyWarEraParagraph =
  "By 1945 Chitose had lost all his teachers, either by losses in the war, or natural causes. He was now living in Kumamoto, staying at the home of his future wife's parents. He had arrived in Kumamoto in 1944 and was stationed at the Kumamoto Military Preparatory School as an officer-in-training and by 1945 would end the war as a major in the Japanese Medical Corps. He had 40 years of training and study and was now embarking on a new course in his karate. He opened his first dojo in 1946 and began teaching a new generation of students which would culminate in his creating what was to be Chito Ryu from his many years in budo. He also took a side venture in opening a department store, the Chitose Department Store, but it only lasted about 5 years as the times wouldn't support an undertaking of this type in post war Japan. With the immense destruction in Okinawa he held a benefit exhibition at the Kabukiza in Kumamoto, to raise funds for his home country. The All Japan Karate Do Federation was resurrected with Toyama Kanken and for a short time Funakoshi Gichen and Mabuni Kenwa held memberships. Chitose would hold several positions under this banner, serving terms as its president and vice president.";

