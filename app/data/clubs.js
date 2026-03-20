export const clubs = [
  {
    id: 'barcelona',
    name: 'FC Barcelona',
    edition: 'The Blaugrana Edition',
    motto: 'Més que un club',
    colors: {
      primary: '#004D98',
      secondary: '#A50044',
      accent: '#EDBB00',
      gradient: 'linear-gradient(135deg, #004D98 0%, #A50044 50%, #EDBB00 100%)',
    },
    players: [
      { name: 'Lionel Messi', position: 'Forward', era: '2004–2021' },
      { name: 'Johan Cruyff', position: 'Forward', era: '1973–1978' },
      { name: 'Ronaldinho', position: 'Midfielder', era: '2003–2008' },
      { name: 'Xavi Hernández', position: 'Midfielder', era: '1998–2015' },
    ],
    history: {
      title: 'The Tiki-Taka Revolution',
      paragraphs: [
        'In 2009, FC Barcelona achieved the unthinkable — the Sextuple. Six trophies in a single calendar year, a feat never accomplished before in the history of football.',
        'Born from the legendary La Masia academy, the philosophy of possession-based football redefined the beautiful game. The tiki-taka revolution, masterminded by Pep Guardiola, turned the pitch into a canvas.',
      ],
      highlights: ['2009 Sextuple', 'La Masia Academy', 'Tiki-Taka Revolution', '26 La Liga Titles'],
    },
    visualTheme: 'mosaic',
    shoeImage: '/images/shoes/shoes1 barcelona.png',
     bgImage: '/BACKGROUND/FC Barcelona.jpg',
    price: '$299',
  },
  {
    id: 'real-madrid',
    name: 'Real Madrid',
    edition: 'The Galácticos Edition',
    motto: 'Hala Madrid y nada más',
    colors: {
      primary: '#FFFFFF',
      secondary: '#FEBE10',
      accent: '#1a1a1a',
      gradient: 'linear-gradient(135deg, #1a1a1a 0%, #FEBE10 50%, #FFFFFF 100%)',
    },
    players: [
      { name: 'Cristiano Ronaldo', position: 'Forward', era: '2009–2018' },
      { name: 'Zinedine Zidane', position: 'Midfielder', era: '2001–2006' },
      { name: 'Raúl González', position: 'Forward', era: '1994–2010' },
      { name: 'Alfredo Di Stéfano', position: 'Forward', era: '1953–1964' },
    ],
    history: {
      title: 'The Kings of Europe',
      paragraphs: [
        'With an unprecedented 15 UEFA Champions League titles, Real Madrid stands as the undisputed kings of European football. The Santiago Bernabéu has witnessed more glory than any other stadium.',
        'From Di Stéfano\'s five consecutive European Cups to the Galácticos era, from La Décima to the threepeat under Zidane — every chapter is written in gold.',
      ],
      highlights: ['15 Champions League Titles', 'La Décima 2014', 'Galácticos Era', '36 La Liga Titles'],
    },
    visualTheme: 'crown',
    shoeImage: '/images/shoes/shoes2 real madrid.png',
     bgImage: '/BACKGROUND/Real Madrid.jpg',
    price: '$299',
  },
  
  {
    id: 'liverpool',
    name: 'Liverpool FC',
    edition: 'Anfield Edition',
    motto: 'YOU\'LL NEVER WALK ALONE',
    colors: {
      primary: '#C8102E', // Liverpool Red
      secondary: '#00B2A9', // Teal (Crest)
      accent: '#F6EB61', // Yellow
      gradient: 'linear-gradient(135deg, rgba(200,16,46,0.15) 0%, rgba(0,178,169,0.05) 100%)'
    },
    players: [
      { name: 'Steven Gerrard', position: 'Midfielder', era: '1998-2015' },
      { name: 'Kenny Dalglish', position: 'Forward', era: '1977-1990' },
      { name: 'Ian Rush', position: 'Forward', era: '1980-1996' }
    ],
    history: {
      title: 'European Royalty',
      paragraphs: [
        'Under the lights at Anfield, logic defies reality. Liverpool\'s history is built on miraculous comebacks, heavy metal football, and an unbreakable bond with the Kop.',
        'Crafted with a deep crimson suede upper, this sneaker features subtle teal accents mirroring the Shankly Gates. The sole utilizes a specialized bounce technology, capturing the raw energy of the stadium crowd.'
      ],
      highlights: ['6x European Champions', '19x League Titles', 'Miracle of Istanbul']
    },
    visualTheme: 'iron-gate',
    shoeImage: '/images/shoes/shoes3 liverpool.png',
    bgImage: '/BACKGROUND/Liverpool.jpg',
    price: '$299',
  },
  {
    id: 'chelsea',
    name: 'Chelsea FC',
    edition: 'Stamford Edition',
    motto: 'KEEP THE BLUE FLAG FLYING HIGH',
    colors: {
      primary: '#034694', // Chelsea Blue
      secondary: '#DBA111', // Gold
      accent: '#FFFFFF', // White
      gradient: 'linear-gradient(135deg, rgba(3,70,148,0.15) 0%, rgba(219,161,17,0.05) 100%)'
    },
    players: [
      { name: 'Frank Lampard', position: 'Midfielder', era: '2001-2014' },
      { name: 'Didier Drogba', position: 'Forward', era: '2004-2015' },
      { name: 'John Terry', position: 'Defender', era: '1998-2017' }
    ],
    history: {
      title: 'The Kings of London',
      paragraphs: [
        'Built on an iron-clad spine and explosive attacking prowess, Chelsea revolutionized modern football with pure power and tactical brilliance.',
        'The "Stamford" edition boasts a brilliant royal blue primeknit exterior. A golden lion emblem rests cleanly on the heel tab, symbolizing the fierce, unyielding pride of West London.'
      ],
      highlights: ['2x European Champions', '6x League Titles', 'Munich 2012']
    },
    visualTheme: 'lion',
    shoeImage: '/images/shoes/shoes5 chelshea.png',
    price: '$299',
    bgImage: '/BACKGROUND/chelshea.jpg',
  },
  {
    id: 'arsenal',
    name: 'Arsenal FC',
    edition: 'The Invincibles Edition',
    motto: 'Victoria Concordia Crescit',
    colors: {
      primary: '#EF0107',
      secondary: '#FFFFFF',
      accent: '#DAA520',
      gradient: 'linear-gradient(135deg, #EF0107 0%, #9B0000 50%, #DAA520 100%)',
    },
    players: [
      { name: 'Thierry Henry', position: 'Forward', era: '1999–2007' },
      { name: 'Dennis Bergkamp', position: 'Forward', era: '1995–2006' },
      { name: 'Patrick Vieira', position: 'Midfielder', era: '1996–2005' },
      { name: 'Tony Adams', position: 'Defender', era: '1983–2002' },
    ],
    history: {
      title: 'The Invincibles',
      paragraphs: [
        '49 games. Zero defeats. The 2003-2004 Arsenal squad achieved what was deemed impossible in modern football — an entire Premier League season unbeaten. They didn\'t just win; they transcended.',
        'From the Art Deco grandeur of Highbury to the modern majesty of the Emirates, Arsenal\'s DNA is woven with elegance, innovation, and an unshakeable belief in beautiful football.',
      ],
      highlights: ['Invincibles 2003-04', '49 Games Unbeaten', 'Highbury Legacy', '13 League Titles'],
    },
    visualTheme: 'cannon',
    shoeImage: '/images/shoes/shoes6 arsenal.png',
    bgImage: '/BACKGROUND/ARSENAL.jpg',
    price: '$299',
  },
   {
    id: 'milan',
    name: 'AC Milan',
    edition: 'Rossoneri Edition',
    motto: 'SEMPRE MILAN',
    colors: {
      primary: '#E32221', // Milan Red
      secondary: '#000000', // Black
      accent: '#FFFFFF', // White
      gradient: 'linear-gradient(135deg, rgba(227,34,33,0.1) 0%, rgba(0,0,0,0.2) 100%)'
    },
    players: [
      { name: 'Paolo Maldini', position: 'Defender', era: '1984-2009' },
      { name: 'Marco van Basten', position: 'Forward', era: '1987-1995' },
      { name: 'Franco Baresi', position: 'Defender', era: '1977-1997' }
    ],
    history: {
      title: 'Il Diavolo',
      paragraphs: [
        'With defense as an art form and a midfield dripping with ruthless elegance, AC Milan holds a mythical status in European nights.',
        'The "Rossoneri" shoe is wrapped in premium matte black leather with devilish red racing stripes. The inner lining features a chainmail-inspired texture, honoring the impregnable defensive lines of the 90s.'
      ],
      highlights: ['7x European Champions', '19x Serie A', 'Defensive Legends']
    },
    visualTheme: 'pinstripes',
    shoeImage: '/images/shoes/shoes4 ac milan.png',
    bgImage: '/BACKGROUND/AC MILAN.jpg',
    price: '$299',

     
  },
  
];
