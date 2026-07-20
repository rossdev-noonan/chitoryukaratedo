// Real copy pulled 1:1 from Gil's History page Figma (node 168:222). This is
// genuine federation history content (not placeholder), so unlike the other
// still-unbuilt pages it's hardcoded here rather than left for Sanity — see
// project memory on the Sanity content-scope decision for the general rule.
// English-only for now, consistent with every other non-Home page until a
// translation decision is made for real body copy this long.
//
// Re-synced after Gil un-hid the full "Tsuyoshi Chitose" article (the one
// trimmed out of the previous pass) and restructured the China/lineage
// content into three separate titled sections — Origin in China, Generations,
// Tang Dynasty — each with its own portrait. Confirmed by re-checking the
// live Figma desktop frame directly (height grew from 12122px to 15492px
// since the last sync), not just the cached dump.
//
// Further re-sync: Key Milestones moved from its own full-width section into
// a compact sticky sidebar (year + title only, no description) that runs
// alongside Origins/Origin-in-China/Tang-Dynasty. Note Gil's sidebar circles
// literally repeat the "唐" character for 3 of the 4 milestones (only the
// first uses "起") — kept as-is since it reads as his actual current file
// state, not an obvious transcription typo, but worth a heads-up that it may
// be a copy/paste slip on his end.

export const historyOriginsDescription =
  "Discover the history, philosophy and leadership behind Chito Ryu Karate Do, founded by Dr. Tsuyoshi Chitose, and now practiced by generations of martial artists across the globe.";

export interface HistorySidebarMilestone {
  char: string;
  year: string;
  title: string;
  id: string;
}

// `id` targets the matching section's anchor (see HistoryOriginsAndLineage.tsx
// and HistoryBiography.tsx) — the sidebar scroll-spies against these.
export const historySidebarMilestones: HistorySidebarMilestone[] = [
  { char: "起", year: "c. 1000 CE", title: "Origin in China", id: "origin-in-china" },
  { char: "唐", year: "618-907", title: "Tang Dynasty", id: "tang-dynasty" },
  { char: "千", year: "1898-1984", title: "Tsuyoshi Chitose", id: "tsuyoshi-chitose" },
  {
    char: "連",
    year: "1984-present",
    title: "International Federation",
    id: "international-federation",
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

// --- Origin in China (168:241 / 418:859) ---
// Shorter now than the previous sync: Gil moved the Chinen Peechin / Matsumura
// / Awagune genealogy detail out into its own "Generations" section below.
export const historyChinaLineageHeading = "Origin in China";
export const historyChinaLineageByline =
  "The History and Lineage of Chito Ryu\nText by: Takashi Nakayama";
export const historyChinaLineageParagraphs: string[] = [
  // Figma's source text has "bornChinen" with no space — corrected as an obvious paste typo.
  'Chito Ryu\'s history as an organized school is generally dated to 1946, when the Yōseikan dojo was established in the town of Waifu, Kikuchi District, Kumamoto Prefecture. Its founder, the First Soke, was Chitose Tsuyoshin (1898–1984; born Chinen (Gochoku) Masuo in Okinawa). He was 48 years old at the time — just a year after the end of the Pacific War, while the wounds of the conflict were still fresh across Japan. Opening a dojo at 48 might seem late in life, but in fact, before the war, he had already opened and led the "Okinawa Kenpō Miyako Tōde Research Institute" on Miyako Island, Okinawa.',
  "In other words, while Chito Ryu as an organization dates to the postwar period, the First Soke's career teaching karate began much earlier. And as the name of that prewar Okinawan dojo makes clear, its roots trace back to tōde.",
];
export const historyChinaLineagePortrait = "/images/history/origin-china-mural.png";

// --- Generations (nested inside 418:859, new sub-section this sync) ---
export const historyGenerationsHeading = "Generations";
export const historyGenerationsParagraphs: string[] = [
  "According to the First Soke, the first master of tōde was Chinen Peechin, who is said to have traveled to Fujian, China, around 1688 to study Chinese boxing. In 1726 he became a military attendant to King Shō Kei.",
  "The second generation is generally given as Matsumura Peechin (Matsumura Sōkon, 1809–1896, though his birth and death years are disputed), military attendant to King Shō Kō. However, some accounts hold that his teacher, Sakugawa Kanga (also known as Tōdī Sakugawa; his birth year is variously given as 1733, 1762, 1782, or 1786) was actually the second-generation master, with Matsumura Sōkon succeeding him rather than being counted as second generation himself.",
  "The lineage continues with Awagune Ueekata, military attendant to King Shō Iku, as third generation in 1818; Hokama Peechin as fourth generation in 1838; and Arakaki Seishō (1840–1918, death year disputed) as fifth generation in 1860. From there, Chitose Tsuyoshi became sixth generation, and in 1984 his son succeeded him as the second-generation Chitose Tsuyoshi, seventh in the overall lineage (b. 1950).",
  "Where birth and death years are not given definitively above, multiple accounts exist, and further research is needed.",
];
export const historyGenerationsPortrait = {
  src: "/images/history/matsumura-sokon.png",
  caption: "Matsumura Sokon",
};

// --- Tang Dynasty (504:1108, new standalone section this sync) ---
// Reuses the same "empty-handed martial art..." copy as the Origins page's
// "What is Chito Ryu?" section — Gil repeated it here verbatim in Figma.
export const historyTangDynastyHeading = "Tang Dynasty";
export const historyTangDynastyParagraph = historyWhatIsChitoRyuParagraphs[0];
export const historyTangDynastyPortrait = "/images/history/tang-dynasty.png";

// --- Tsuyoshi Chitose (485:246) — restored. Gil un-hid the full article
// rather than deleting it; the previous sync mistakenly treated the hidden
// layer as an intentional trim. ---
export const historyIntroParagraphs: string[] = [
  "Chitose Tsuyoshi: A Bridge Through Time",
  "by Michael Colling",
  "",
  "(History: A knowledge of the past based upon Testimony).",
  "This article was re-printed with the kind permission of the author.",
  "",
  "Chinen Tsuyoshi, later to be known by the name Chitose, among others as was custom to his culture, was born in an era where the Okinawan fighting arts were quietly taught to those who knew the right people. His lineage can be traced back to Chinen Yamagushiku (aka: Chinen Peichin and Aburaya Yamaki) 1791-1881. He is a grandson of Matsumura Soken, well known into modern times as one of the most notable of his era. It seems with this family background Chitose was destined to follow the path he spent a lifetime studying. As a boy Chitose saw the entrance of karate into the school system in Okinawa by Itosu Anko (1830-1915) in a regimented form for mass instruction, to Funakoshi Gichin, a school teacher he had in grade school, introducing this art to Japan as a middle aged man to the Crown Prince Hirohito in 1922 at the First National Athletic Exhibition in Tokyo, to the opening of worldwide acceptance when U.S. servicemen began learning the art under different sensei and taking it home to open dojo in the states.",
];

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

export const historyDojoParagraph =
  'When Chitose opened his dojo he was at that point where two eras of karate were crossing, the old Te of Okinawa and the new systemized ways of post war Japan that were reshaping what was to be modern karate. One of the first students from this group was Masami Tsuruoka, a Canadian who returned to Japan to live. He recalled some of his early years studying with Chitose, how the term "Kempo" was still used as a common reference to his art, and Chitose still hadn\'t given a term to his method of teaching, as was becoming common with other groups. Chitose would take the wording "Chito Ryu" by 1952, recalling a discussion with Aragaki Seisho in which Aragaki talked about the roots of his art in China around the 6th century. Thus, Chito Ryu, the "method that goes back to the T’ang era in China about 1000 years ago. This was one way to keep the old teachings in mind in a modern society, by it’s name. By 1950 Chitose was ready to retire from his medical practise and devote all his energy to promoting his art in a new era.';

export const historyDojoPhotoCaption = {
  title: "Backyard training at O-Sensei's home.",
  subtitle: "The original Chito-kai hombu.",
};

export const historyDojoSecondPhotoCaption =
  "Chitose and Professor Gichin Funakoshi (August 18, 1955)";
export const historyDojoSecondParagraph =
  "Chitose talked about his first encounter with American service men in an interview held in Tachikawa City, Tokyo, in March of 1980. This event was in 1946. Chitose said, ” In Kumamoto City there was a busy shopping and entertainment area referred to as the “New World”. When an American Gl happened to pass through, the Japanese became agitated and someone started a fight. I got into the middle of it, trying to break it up, and someone hit me. It didn't matter to me whether it was the American or a Japanese. I went through and beat up each and every person in the crowd. Two or three days after the commotion, we were visited at the Hombu by an M.P. (US Military Police). Hereto, I was convinced that I would be thrown in jail, and I had resigned myself to going along with him. On my way out, though, we were talking about karate and he said to me, “Please, by all means, come and teach my staff”. So each day I ended up going to teach alternate groups of 30″. For this reason Chitose was probably one of the first people in Japan to teach American servicemen. A major result from this is today the growth of his methods in North America.";

export const historyDometrichPhotoCaption = "O'Sensei with Dometrich";
export const historyDometrichParagraph =
  "In the 1950's U.S. Military personnel were getting involved in the martial ways of Japan and Okinawa. Some of note were Donn Draeger, Dan Ivan, Walter Todd, and a future Chitose student William J. Dometrich. Little would Dometrich realize that this beginning in 1952 would become a lifelong study, first under Shirahama Ichiro, a Chito Ryu instructor in Beppu, and then directly under the founder, Dr. Chitose Tsuyoshi. The beginning was fairly rocky as Chitose didn't feel these foreign students would last under the harsh training regime so Chitose wouldn't accept them. Dometrich told of the trips from Beppu to Chitose's own dojo in Kumamoto when he was on leave, and being turned away at the door by a senior instructor. His persistence finally paid off and he was allowed to train at the hombu, and then the fun began. The training was extremely hard and Dometrich was under the impression they were trying to discourage him by beating him out of the dojo. Being young, and in good shape helped to balance the classes, and with time he now saw they weren't selecting him out but that everyone trained this way. He was a shodan now and by the time he was to head back to the U.S. he had attained the rank of sandan, bypassing his nidan. If you are ever fortunate to visit the United States Chito Ryu Hombu you will be able to see an old certificate Dometrich received shortly before he left Japan. It is signed by four noted teachers of the time, Funakoshi Gichen (1868-1957), Toyama Kanken (1886-1966), Higa Seiko (1889-1966), and Chitose Tsuyoshi (1898-1984).";

export const historyFairmontParagraph =
  "The first Chito Ryu dojo outside of Japan was opened in Fairmont, West Virginia, in 1955. William Dometrich had returned home, now discharged from the military, and was ready to teach the karate he had studied while in Japan. The class he started was short lived. In about two weeks Dometrich had run off all who had entered the door. Being in excellent shape, from his military training plus his karate, he pushed his new charges to the limit and they couldn't keep up the strenuous pace he set. It would be six years before he would attempt to teach again.";

// Newly given its own portrait this sync — previously just plain text inside
// the flowing paragraphs.
export const historySlomanskiPortrait = {
  src: "/images/history/slomanski.png",
  caption: 'Henry "Hank" Slomanski',
};
export const historySlomanskiParagraph =
  "Henry Slomanski, a career soldier who was a member of the 187th Airborne Regimental Combat Team in Korea and Japan, had a small group he was teaching back on base in the USA. Two well known students at this time were Dan Inosanto, who in later years would become known for his connections with Bruce Lee, and Elvis Presley, who had started his karate training in Germany under Jurgen Seydel, and received his shodan in 1960 under Slomanski. Slomanski ended up in Vietnam by the mid 60's and was supposedly killed in a helicopter crash while on duty there. Another to show up during this period, 1956/57 was a student of Slomanski, Wallace Reumann, now a godan, who settled in Trenton, New Jersey. From this beginning in Trenton Reumann would create the American Karate Federation growing to a group of 27 dojo. In the early 60's Reumann moved out to California settling in the Monterey area. He would connect with Dometrich at Chitose's request. The New Jersey dojo was left in the hands of James Cheatham, a sandan under Reumann, and under this new leadership some top fighters were produced. Some of the students who would walk in the door of the Broad St. dojo under Cheatham were Karriem Allah who would gain fame through his television fight with Jeff Smith, and create his own karate system. Rudy Croswell, later to be a Shito Ryu instructor in the west and Prentiss Newton who attended the 1963 Canadian Championships held in Toronto under Masami Tsuruoka, and almost beat the eventual winner, Shane Higashi. Connections with the Nation Of Islam would cause the dojo to be expelled from the AKF organization shortly before Cheatham's death in a plane crash in 1965.";

// The bulk of the article: Gil's Figma had this as one continuous flowing
// block. Split into paragraphs here only for rendering — the copy itself is
// untouched. (Ends where "International Federation" now picks up as its own
// titled section below.)
export const historyMainParagraphs: string[] = [
  "As Dometrich was getting settled at home another who would attain senior rank in the years to come under Chitose was beginning his karate career in Japan. Michael Foster began in Goju Ryu under a Mr. Watanabe, reaching nidan in two years. Watanabe Sensei was instrumental in Foster's meeting his next teacher, Yamamoto Mamoru, one of Chitose's top students and a tough fighter in Southern Japan. Yamamoto had just won the All Japan Championships and was in the process of opening his own dojo in Kokura, Kyushu. His years under the guidance of Yamamoto would produce one of the top fighters in the USA in the 60's. Foster's skills in kumite would show through in Japan as well, with him winning the 1965 Southern All Japan title and in the USA he was a kumite champion 1966 through to 1969.",
  "Dometrich and Foster would meet in 1963 in St. Louis, Missouri, at a karate tournament sponsored by Matsubayashi Shorin Ryu seniors James Wax, Robert Yarnell and Ansei Ushiro.",
  "In Canada Masami Tsuruoka had returned home to the Toronto area of Ontario after spending the last ten years training under Chitose. In 1957 he began a small class at a local gym and by 1958 he had to open his own dojo to accommodate his growing student base. From these beginnings Tsuruoka was to become one of the most influential karate teachers in Canada. Many seniors in other martial arts would have their start either training under Tsuruoka as a student, or have use of his facilities until they were on their feet and able to acquire space of their own. Tsuruoka Sensei was always open to assisting where ever possible. In the early 60's a dream of Tsuruoka's came into being, the National Karate Association. This would encompass all provinces and territories of Canada giving a meeting point for all styles in Canada for competition and assistance in running the many schools now opening in the country.",
  "Tsuruoka would also host one of the first tournaments in North America in 1962. Gary Alexander, a yudansha from New York, would be the first winner of this yearly tournament. One of Tsuruoka's students would place second, Shane Y. Higashi. This spoke well for Tsuruoka's teachings as Higashi was only a brown belt at the time, Alexander was a sandan. The 1963 gathering would see Higashi, now a new yudansha, take first place. Other Tsuruoka students during this period later to become well known in Canadian karate circles were Dr. Ned Paige, Monty and Nathan Guest, Kei Tsumura, Benny Allen and Alcide Bourque. Through the 60's Tsuruoka would travel across the continent refereeing and making contacts with the many seniors who would attend these early competitions. In a recent discussion I was surprised to learn Emil Farkas had spent time in Toronto when he first arrived from Europe, and had studied with Tsuruoka reaching the rank of sankyu in Chito Ryu.",
  'Chitose\'s first trip outside of Japan was in the late fall of 1961 when a group on the Hawaiian Islands banded together to fund his travelling there. Tom Morita, James Miyaji and Wilfred Ho were part of the sponsoring group for this 4-5 month visit. Anthony "Sonny" Palabrica told me Chitose taught a wide variety of kata, many not covered in the Chito Ryu syllabus of today. His knowledge like many of his generation, was not "style" based but gained from study with the many seniors he had access to. Disagreement among the sponsors cut short the visit and by April of 1962 Chitose was heading back to Kumamoto. Later that year he made a second trip to visit the Canadian Hombu in Toronto under Masami Tsuruoka. The visit brought the two North American leaders together for the first time as William Dometrich travelled from Kentucky to see his teacher who he hadn\'t seen in 8 years and to meet one he had heard so much about when in Japan, Tsuruoka Sensei.',
  "After Chitose returned home the Hawaiian branch of the Chito Ryu would last about four more years under the leadership of Tom Morita. At one point during this short time frame Kenneth Funakoshi, was approached to join the Chitose group but he declined. Del Saito, spent his early days as a Chito Ryu student reaching yudansha level in the style. Anthony Palabrica moved to the mainland in 1963 and ended up in Los Angeles, opening his own dojo in the city. He spent time employed by Black Belt Magazine and had written quite a few articles covering Chito Ryu in the early 60's. He is now retired from karate and I have had the pleasure of talking with him and gaining insight to Chitose's visit so many years ago. Mr. Palabrica spent many hours training with Chitose and has many fond memories of this time spent with the founder of Chito Ryu.",
  "In 1967 Canada celebrated its centennial year and arrangements were made with the Federal Government to sponsor the Canadian Karate Championships in Toronto. Two guests brought in for this 3 day competition were Dr. Tsuyoshi Chitose and his senior protege Mamoru Yamamoto. From the U.S.A. William Dometrich and Michael Foster arrived, to see their respective teachers and assist with the running of the tournament. It was the last time a large gathering of Chitose students would meet in North America. Yamamoto and his student, Foster, put on an excellent bo (staff) and Sai (three pronged truncheon) demonstration along with other martial groups showing their abilities. The overall proceedings were filmed and the tape of that day still is available in karate circles. Following the competition Chitose and Yamamoto toured Canada and the States meeting Chito Ryu students and conducting clinics during their many stopovers. It was during this time, when Chitose was visiting Covington, Kentucky, that William Dometrich's dojo was designated hombu for the Chito Ryu in the United States and he was asked to create a strong organization. The birth of the United States Chito Ryu Karate Federation was in October, 1967. To this day it prospers under Dometrich Sensei's guidance, both Mr. and Mrs. Dometrich as the organization is taught by Sensei, and Mrs. Barbara Dometrich, a yudansha ranking in the organization, runs all the business day to day.",
  "Through the 60's and 70's Chito Ryu was growing in the United States, and in Canada it had become one of the driving forces of growth in that country, having some representation in each province and the territories to the north. The 70's would also bring rifts in the organization, with Mamoru Yamamoto being the first to leave the Chitose group. He had started his own dojo in Kitakyushu, Japan, in 1961, called the Yoshukan. This small beginning in the Fujitani Judo Club grew to a large number of dojo on Kyushu Island and the-southern United States. With his departure Michael Foster, his immediate student and North American representative, also left thus creating the Yoshukai International Karate Do in 1971.",
  "A small group of students and teachers from the United States left for Kumamoto in the fall of 1971 to train under Chitose at the international hombu. During this visit Dometrich was awarded his 7th dan ranking (shichidan), and given the title of Kyoshi by Chitose. In discussions with Dometrich about his visits to Japan and the training under Chitose he described how Chitose taught during classes held in the backyard at his home. Chitose usually took it fairly easy in that he demonstrated the techniques softly but his uke (receiver of the technique) often ended up heavily bruised for days. Every once in awhile Chitose would let his abilities show through and now the technique became fast and deadly. These were the times that Chitose's karate quietly demonstrated the destructive power waiting to be unleashed. Inamoto Masuru, a 7th dan under Chitose, said Chitose loved to train with Judo people as he would literally bounce them around the dojo. If anyone asked about the session he would say “you know how to break your fall, don't you?” Chitose was ranked Rokudan in Judo and had Mifune Kyuzo as a longtime friend.",
  "The list of kata studied in Chito Ryu is small compared to other schools of today. Chitose had settled on a few common kata used by many, Bassai, Chinto, Kusanku, and Sanchin, plus a group used as preparatory kata, Niseishi (sho and dai) to work up to Sanchin, and Rohai (sho and dai). He also included a few he wished to see preserved from his teachers of old, Shihohai and Ryusan from Hanashiro Chomo, plus his Tenshin, Sochin, Sanshiryu, and the family kata Rochin. He was known for his Kung Fu No Kata performed at the many demonstrations he attended. This old kata was between 40-45 minutes long and in it was shown the old ways with soft flowing hand techniques, grappling and joint strikes. Through the many years of training he was quite adept at these moves, having accumulated about 400 points on the body to attack. These old skills are slowly being lost as the sport aspect takes precedence today. David Akutagawa, head of Renshikan, an offshoot of Chitose's teachings, is researching these skills to include them in his system and pass them on to future karate ka.",
  "Even in the 70's Chitose was studying and researching the kata he used in his teachings, still undecided on exactly what he would end up with as a syllabus for his Chito Ryu. His insight to what he wished to pass on as a finished work was always a question in his mind. One of the yudansha in Nova Scotia, Travis Cottreau, has compiled a list of the kata we use on his website, giving what historical information he could acquire, and bringing out new information for those interested in who taught Chitose in the early days in Okinawa, and as we come to know these teachers we start to see their overall influence in this style today.",
  "In 1973 and 1982 Chitose would make two more trips to visit the North American dojo and view old and new students studying his art. The first trip (1973) was with Kugazaki Hidemichi, a rokudan from the Kumamoto Hombu, and the last trip (1982) Chitose was accompanied by his son, Chitose Yasuhiro. Both trips were well attended with many gaining new insight to their studies by having the designer there to pass on his knowledge first hand. During the 1982 trip many had the chance to compete under Chitose's watchful eyes as an international competition was held in Chitose's honor. Students of all ranks from Canada and the United States met in Toronto to compete and one stood out after all placings had been settled. Roland Figgs, a yudansha under William Dometrich, from Kentucky, was promoted on the spot, batsugan (exceptional technical skill). This was the first time a Chito Ryu student was upgraded in this manner.",
  "As the 70's were coming to a close two more splits were to take place. In Canada Masami Tsuruoka would leave the Chito Kai and become an independent running his own organization within Canada. In the United States Michael Foster would split around 1980 from his teacher Yamamoto thus creating a second Yoshukai group that was international in scope. With Tsuruoka now on his own the Canadian organization took on new leadership with Shane Higashi becoming councillor and David Akutagawa taking the vice councillor position. This new leadership also brought a drastic change in the techniques to be taught in Canada as we now had to adjust to what was being taught in Japan. For the senior teachers across the country it took sometime to relate to the now shorter stances used by the hombu and the adjustments that had to be applied to our kata.",
];

// --- International Federation (505:1134) — new titled section this sync,
// formed from the old article's closing paragraphs plus a new Yasuhiro
// Chitose portrait. The old standalone "Yasuhiro Chitose 2nd Soke" line is
// dropped since the portrait caption now covers that. ---
export const historyInternationalFederationHeading = "International Federation";
export const historyInternationalFederationPortrait = {
  src: "/images/history/yasuhiro-chitose.png",
  name: "Yasuhiro Chitose",
  caption: "2nd Generation Soke",
};
export const historyInternationalFederationIntroParagraph =
  "On June 6th, 1984, Dr. Tsuyoshi Chitose passed away while in hospital. He had been ill for sometime now. Students who were in Japan training at the time said Chitose still spent time teaching as he was able to under these conditions until he was hospitalized. At his passing we also lost another of the few remaining connections to the rich heritage of Okinawan budo. He had begun his training just before the veil of secrecy was being lifted by teachers such as Itosu, he saw Funakoshi take the art to Japan proper in 1922, and saw others shortly follow, Mabuni Kenwa, Motobu Choki, to demonstrate their methods. He was in Japan when the first nuclear weapons were used to shorten the Pacific War and U.S. Military occupied the country giving an opportunity for this group to explore the military arts that Japan was noted for and many taking interest in the Okinawan empty hand art thus opening it up to the world in general as they returned home. To the Chito Ryu membership worldwide this was a tremendous loss, as most leaders passing are to their followers, for Chitose was easily approached by any rank, and he would give freely his time to those wishing to learn his Chito Ryu. In August, 1984, his youngest son Yasuhiro Chitose, took on the leadership of the style his father founded so many years ago, and as is custom, also took on his name, Tsuyoshi. He is now regarded as “Soke” (member of the founding family) to all involved in the international organisation.";
export const historyInternationalFederationClosingParagraphs: string[] = [
  "With Chitose's passing and the succession settled, rebuilding under new leadership was to take place. The younger Chitose had made numerous trips to North America through the years and was well known to the senior yudansha. As always with change new ideas would start to come into the ways of running things and the Chito Ryu International was no different. The younger Chitose soon headed into his own take on how things would be run and this began a shift from the older ways his father had set in place. This would cause older leaders to depart from the larger body. William Dometrich and the United States Chito Ryu Karate Federation left in August of 1994. He had dedicated his karate life to his teacher and felt he must continue in this chosen path. Similar problems arose in the Canadian group and David Akutagawa, vice- councillor for Canada, left to form Renshikan, his own organization mainly based in Canada. In Japan seniors would begin leaving by the late 90's to continue along the path the older Chitose had begun with them. This group of independents keep in touch to this day, preserving the ways they were taught by the founder. In October, 1998, a small contingent of Chito Ryu seniors from the United States Hombu in Covington travelled to Norfolk, Virginia, to attend the first world Butoku Sai held outside of Japan. In attendance from the Hombu in Japan was the cousin of the Emperor, the Honorable Jiko Higashi Fushimi. This would be the first time that Chitose's karate would be demonstrated in front of the Dai Nippon Butokukai. In the fall of 1999 Tesshin Hamada, Hanshi, the international representative of the Dai Nippon Butokukai, visited the United States Hombu, along with guests from across the U.S.A. and Canada. A great honor was bestowed on Dometrich Sensei that weekend as Hamada, Hanshi, promoted Dometrich to Hachidan in the Dai Nippon Butokukai, and the title of Hanshi was conferred on him. In Chito Ryu he is only the second to hold this title, as Chitose was the first in 1962 when the now defunct All Okinawan Karate Kobudo Rengokai awarded him his Hanshi title.",
  "Chito Ryu, with its many variations, continues to grow slowly on an international level, with each group passing along what the teacher had acquired from the founder. Japan, Canada and the United States are the mainstays of this method, but other countries such as Norway, Germany, Australia and Scotland are seeing new members joining each year. Many first generation students are still active thus ensuring the teachings of Chitose will survive for the next generation. With the ongoing search for more information the gaps we have in Chitose's life will be slowly closed and a more accurate profile will be presented on this teacher who spent 80 years of his life studying and developing his art we know today as Chito Ryu. In 1999 Chitose's first written work was brought to light to the author and by September of 2000 through the labors of Chris Johnston in translations, an English copy is now available. We hope that through articles such as this one more will come forward with information to add to the big picture.",
];
