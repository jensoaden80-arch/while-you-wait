
import { Question, Archetype } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Pace',
    question: 'What pace feels most natural to you?',
    imageUrl: '/10.png',
    options: {
      A: { label: 'A', text: 'A stroll: Wandering without a plan, open to the moment', code: 'S' },
      B: { label: 'B', text: 'A chase: From first light to dusk, never a moment wasted', code: 'A' }
    }
  },
  {
    id: 2,
    category: 'People',
    question: 'When you imagine yourself elsewhere, who are you spending most of your time around?',
    imageUrl: '/11.png',
    options: {
      A: { label: 'A', text: 'Myself, or someone I can be myself with', code: 'I' },
      B: { label: 'B', text: 'Locals, strangers, people with stories to share', code: 'E' }
    }
  },
  {
    id: 3,
    category: 'Immersion',
    question: 'Which moment pulls at your heart more?',
    imageUrl: '/12.png',
    options: {
      A: { label: 'A', text: 'Spending an afternoon by a river that feels older than language', code: 'N' },
      B: { label: 'B', text: 'Having your fortune told in a centuries-old tradition you don’t yet understand', code: 'P' }
    }
  },
  {
    id: 4,
    category: 'Growth',
    question: 'Which quote feels more like what you need right now?',
    imageUrl: '/13.png',
    options: {
      A: { label: 'A', text: '“The universe buries strange jewels deep within us all, and then stands back to see if we can find them.” — Elizabeth Gilbert', code: 'X' },
      B: { label: 'B', text: '“I’m in love with cities I’ve never been to and people I’ve never met.” — John Green', code: 'Z' }
    }
  }
];

export const ARCHETYPES: Record<string, Archetype> = {
  "SINX": {
    id: "the-pilgrim",
    name: "The Pilgrim",
    code: "SINX",
    essence: "You seek beauty in simplicity. Moving gently through the world comes naturally to you, and collecting stillness like treasure is the best souvenir you can find.",
    destination: "Yakushima Island, Japan",
    destinationDescription: "A UNESCO World Heritage site known for its subtropical climate and ancient cedar forests. Home to the \"Jomon Sugi,\" a cedar tree estimated to be between 2,000 and 7,000 years old. The moss-covered landscapes and misty mountains served as the visual inspiration for Studio Ghibli’s Princess Mononoke.",
    imageUrl: "https://images.pexels.com/photos/17772875/pexels-photo-17772875.jpeg",
    bumpInto: "Keanu Reaves, Yoda"
  },
  "SINZ": {
    id: "the-arctic-monk",
    name: "The Arctic Monk",
    code: "SINZ",
    essence: "You’re rounded and inward as a person, and yet there is a quiet hunger for change in you. You learn, grow and evolve best in spaces that take you to the edge of your safe space, with a little nudge to take a step further out.",
    destination: "Reine, Norway",
    destinationDescription: "A quiet, picturesque fishing village located in the Lofoten archipelago. Features iconic red fishing huts (rorbuer) set against sharp, granite peaks and crystal-clear Arctic waters. An ideal spot for witnessing the Northern Lights or experiencing the Midnight Sun.",
    imageUrl: "https://images.pexels.com/photos/28903368/pexels-photo-28903368.jpeg",
    bumpInto: "Tilda Swinton, Walter Mitty"
  },
  "SIPX": {
    id: "the-curator",
    name: "The Curator",
    code: "SIPX",
    essence: "To the world, you are a sensitive and soulful person. You value the “patina” of life: memories as much as (or maybe more) than diamonds, and every achievement is merely a stepping stone to your next momentous adventure.",
    destination: "Matera, Italy",
    destinationDescription: "One of the oldest continuously inhabited cities in the world, famous for its ancient cave dwellings. The \"Sassi di Matera\" are complex cavern systems carved directly into the limestone hillside. Its unique, monochromatic stone architecture creates a cinematic atmosphere that feels frozen in time.",
    imageUrl: "https://images.pexels.com/photos/36806546/pexels-photo-36806546.jpeg",
    bumpInto: "Wes Anderson, Hercule Poirot"
  },
  "SIPZ": {
    id: "the-listener",
    name: "The Listener",
    code: "SIPZ",
    essence: "You’re a quiet observer, functioning from a place of emotional strength—yet quietly so. When you travel, you’re looking beyond what meets the eye and into what feels like a soul encounter with the world.",
    destination: "Tbilisi, Georgia",
    destinationDescription: "A city where history and modern creative energy collide. Known for its dramatic valley setting, colorful wooden balconies, and ancient sulfur baths. The city has a thriving \"underground\" scene, from hidden wine bars to repurposed Soviet-era spaces turned into design hubs.",
    imageUrl: "https://images.pexels.com/photos/9397565/pexels-photo-9397565.jpeg",
    bumpInto: "Lana Del Ray, Amélie Poulain"
  },
  "SENX": {
    id: "the-palm-tree",
    name: "The Palm Tree",
    code: "SENX",
    essence: "You view the world through a textural lens, as you seek to refuel your inner creative streak through every journey.",
    destination: "Siwa Oasis, Egypt",
    destinationDescription: "A remote desert sanctuary near the Libyan border. Famous for its unique karsheef architecture—a mix of mud and salt—and its vast groves of olive and palm trees. Features shimmering turquoise salt lakes and natural springs that offer a sensory contrast to the surrounding Great Sand Sea.",
    imageUrl: "https://images.pexels.com/photos/33661271/pexels-photo-33661271.jpeg",
    bumpInto: "Zendaya, Moana"
  },
  "SENZ": {
    id: "the-romantic",
    name: "The Romantic",
    code: "SENZ",
    essence: "When you step out into the world, you experience the world through your senses and truly feel the moment. And so, the growth you seek finds its way to you as you move, learn and trail through the world.",
    destination: "Zanzibar, Tanzania",
    destinationDescription: "An archipelago off the coast of East Africa with a rich, sensory history. The Stone Town district is a labyrinth of narrow alleys, aromatic spice markets, and intricately carved wooden doors. Its coastline features dramatic tide changes that reveal sprawling sandbars and hidden tidepools.",
    imageUrl: "https://images.pexels.com/photos/23877182/pexels-photo-23877182.jpeg",
    bumpInto: "Dev Patel, Jay Gatsby"
  },
  "SEPX": {
    id: "the-wandering-artisan",
    name: "The Wandering Artisan",
    code: "SEPX",
    essence: "Every destination comes with a map. For you, that map is a bridge that brings you closer to where your feet want to be. You find joy in the little, yet meaningful things—be it a warm 2-minute exchange with the local baker or a friendly wave to your next-door homestay guest.",
    destination: "Essaouira, Morocco",
    destinationDescription: "A windswept coastal city known for its laid-back, creative vibe. The medina is surrounded by 18th-century seafront ramparts and is filled with art galleries and woodworking shops. The strong Atlantic winds make it a haven for surfers and musicians, creating a rhythmic, coastal energy.",
    imageUrl: "https://images.pexels.com/photos/10727384/pexels-photo-10727384.jpeg",
    bumpInto: "Emma Watson, Zoë Kravitz"
  },
  "SEPZ": {
    id: "the-poet",
    name: "The Poet",
    code: "SEPZ",
    essence: "You’re an emotionally porous and innately curious human, which means that no experience is out of the realm of your imagination. Challenging the threshold is what brings a trip alive for you, and you know just how to get there.",
    destination: "Ronda, Spain",
    destinationDescription: "A dramatic city perched atop a deep gorge in Andalusia. The town is split by the El Tajo canyon, connected by the 18th-century \"New Bridge\" (Puente Nuevo). Its literary history is deep, having been a favorite retreat for writers like Ernest Hemingway and Orson Welles.",
    imageUrl: "https://images.pexels.com/photos/1703311/pexels-photo-1703311.jpeg",
    bumpInto: "Sufjan Stevens, Timothée Chalamet"
  },
  "AINX": {
    id: "the-albatross",
    name: "The Albatross",
    code: "AINX",
    essence: "Your instinct and impulse are your two best friends, leading you through all the adventures you have said yes to and all the not-so-sure plans you may have ditched. An unplanned detour brings you more joy than a planned dining experience ever will, and that solitude you crave is seasoned with wonder.",
    destination: "La Gomera, Canary Islands (Spain)",
    destinationDescription: "A rugged, circular island in the Canaries characterized by mist-shrouded laurel forests. Features a network of ancient hiking trails that descend from volcanic peaks to secluded black-sand beaches. Home to \"Silbo Gomero,\" a unique whistled language used to communicate across the island's deep ravines.",
    imageUrl: "https://images.pexels.com/photos/34957478/pexels-photo-34957478.jpeg",
    bumpInto: "Cillian Murphy, Robert Pattinson"
  },
  "AINZ": {
    id: "the-earth-whisperer",
    name: "The Earth Whisperer",
    code: "AINZ",
    essence: "A nonconformist wanderer at heart, travel is a means through which you stay alive. Be it through unconventional routes or intentionally unplanned days to surprise yourself, you never miss an opportunity to explore the world with child-like curiosity.",
    destination: "Torres del Paine, Chile",
    destinationDescription: "A masterpiece of raw, Patagonian wilderness. Defined by its \"granite towers,\" massive glaciers, and bright blue icebergs. The park demands physical endurance, rewarding hikers with some of the most dramatic mountain vistas on the planet.",
    imageUrl: "https://images.pexels.com/photos/26382392/pexels-photo-26382392.jpeg",
    bumpInto: "The Dalai Lama, Katniss Everdeen"
  },
  "AIPX": {
    id: "the-unhurried",
    name: "The Unhurried",
    code: "AIPX",
    essence: "Time is a long-lost concept when you’re on the road. Your days are decided by the richness that surrounds you, and your evenings bring a tale of quiet, gentle transformation. You’re never quite the same again after a journey. Are you?",
    destination: "Luang Prabang, Laos",
    destinationDescription: "A tranquil city nestled at the confluence of the Mekong and Nam Khan rivers. Known for its numerous Buddhist temples and the daily morning alms-giving ritual. The surrounding area features the stunning multi-tiered Kuang Si Falls and lush jungle paths.",
    imageUrl: "https://images.pexels.com/photos/17653315/pexels-photo-17653315.jpeg",
    bumpInto: "Benedict Cumberbatch, Gandalf"
  },
  "AIPZ": {
    id: "the-treasure-hunter",
    name: "The Treasure Hunter",
    code: "AIPZ",
    essence: "The environment speaks to you and what better way to heighten this beautiful sense than through travel? You are naturally inclined to stories with centre and the emotions that come with it, shape you.",
    destination: "Mostar, Bosnia and Herzegovina",
    destinationDescription: "A city where history is etched into every stone. Famous for the Stari Most (Old Bridge), a reconstructed Ottoman bridge that is the heart of the city's identity. The streets are filled with artisan shops and echoes of a complex, resilient past.",
    imageUrl: "https://images.pexels.com/photos/14016479/pexels-photo-14016479.jpeg",
    bumpInto: "Tom Hardy, Indiana Jones"
  },
  "AENX": {
    id: "the-driftwood",
    name: "The Driftwood",
    code: "AENX",
    essence: "Life is all about reinvention for you. The new and unknown invite you in, and the creative play of travel (not escape) keeps you charmed and looped in.",
    destination: "Lombok, Indonesia",
    destinationDescription: "Bali before discovery - with waterfalls, jungle paths, and kind-hearted strangers along the way. Home to the massive Mount Rinjani volcano and pristine, white-sand bays. The island offers a mix of intense trekking and quiet, hidden waterfalls.",
    imageUrl: "https://images.pexels.com/photos/17850921/pexels-photo-17850921.jpeg",
    bumpInto: "Harry Styles, Jack Sparrow"
  },
  "AENZ": {
    id: "the-ranger",
    name: "The Ranger",
    code: "AENZ",
    essence: "You eat intensity for breakfast, and unlike others, intense experiences draw you in. A part of your existence is devoted to finding raw, real, and unforgettable moments—no matter how big or small.",
    destination: "The Azores, Portugal",
    destinationDescription: "A mid-Atlantic archipelago of volcanic islands known for its lush, green landscapes. Known as the \"Hawaii of Europe,\" featuring crater lakes, thermal springs, and high sea cliffs. The environment is raw and unpredictable, perfect for whale watching and coastal hiking.",
    imageUrl: "https://images.pexels.com/photos/34391381/pexels-photo-34391381.jpeg",
    bumpInto: "Lewis Hamilton, Lara Croft"
  },
  "AEPX": {
    id: "the-serendipitous",
    name: "The Serendipitous",
    code: "AEPX",
    essence: "You derive joy, strength and grounding from collective energy and deep transformation. You’re every bit an inward explorer as you are outward—all it takes is the right time, place and fellow curious travelers on their feet.",
    destination: "Oaxaca, Mexico",
    destinationDescription: "A cultural powerhouse defined by its indigenous roots and vibrant arts. Famous for its world-class culinary scene (mezcal and mole) and colourful street festivals. The city feels lived-in and personal, with bustling markets that are the centre of communal life.",
    imageUrl: "https://images.pexels.com/photos/17029908/pexels-photo-17029908.jpeg",
    bumpInto: "Pedro Pascal, Harry Potter"
  },
  "AEPZ": {
    id: "the-insatiable",
    name: "The Insatiable",
    code: "AEPZ",
    essence: "Do you travel to dissolve, rebuild, and feel awakened? Because you have an unrivalled appetite for adventures waiting to happen, with strangers you may never see again and through a culture you’ve never experienced before. Keep the curious hat on, always!",
    destination: "Almaty, Kazakhstan",
    destinationDescription: "Sophisticated and snow-dusted, with street art, steppe stories, Almaty attracts those who seek a new, unconventional frontier. A blend of post-Soviet architecture, lush green parks, and a thriving modern creative pulse. Offers immediate access to the Trans-Ili Alatau, with wild mountain ridges and vast steppes.",
    imageUrl: "https://images.pexels.com/photos/16980256/pexels-photo-16980256.jpeg",
    bumpInto: "Anthony Bourdain, Julia Child"
  }
};
