import cover1 from '../assets/house 1.jpg'
import cover2 from '../assets/house 2.jpg'
import cover3 from '../assets/house 3.jpg'
import cover4 from '../assets/house 4.jpg'
import cover5 from '../assets/house 5.jpg'
import cover6 from '../assets/house 6.jpg'
import cover7 from '../assets/house 7.jpg'
import cover8 from '../assets/house 8.jpg'
import cover9 from '../assets/house 9.jpg'
import living1 from '../assets/living 1.jpg'
import living2 from '../assets/living 2.jpg'
import living3 from '../assets/living 3.jpg'
import living4 from '../assets/living 4.jpg'
import living5 from '../assets/living 5.jpg'
import living7 from '../assets/living 7.jpg'
import living8 from '../assets/living 8.jpg'
import living9 from '../assets/living 9.jpg'
import kitchen1 from '../assets/kitchen 1.jpg'
import kitchen2 from '../assets/kitchen 2.jpg'
import kitchen3 from '../assets/kitchen 3.jpg'
import kitchen4 from '../assets/kitchen 4.jpg'
import kitchen5 from '../assets/kitchen 5.jpg'
import bedroom1 from '../assets/bedroom 1.jpg'
import bedroom2 from '../assets/bedroom 2.jpg'
import bedroom3 from '../assets/bedroom 3.jpg'
import bedroom4 from '../assets/bedroom 4.jpg'
import bedroom5 from '../assets/bedroom 5.jpg'

const properties = [
  {
    id: 'p1',
    title: 'Seacliff Modern Estate',
    city: 'Malibu, CA',
    price: '$3,250,000',
    cover: cover1,
    status: 'For Sale',
    overview: 'A dramatic coastal estate with glass-wrapped living spaces, private infinity pool, and panoramic ocean vistas.',
    size: '4,850 sqft',
    beds: 5,
    baths: 6,
    amenities: ['Infinity pool', 'Private elevator', 'Media room', 'Smart home'],
    rooms: {
      living: [living1, living4],
      kitchen: [kitchen1],
      bedroom: [bedroom1, bedroom4],
    },
  },
  {
    id: 'p2',
    title: 'Orchard View Pavilion',
    city: 'Napa Valley, CA',
    price: '$2,950,000',
    cover: cover2,
    status: 'Sold',
    overview: 'A refined vineyard retreat anchored by cathedral ceilings, a private courtyard, and bespoke hospitality spaces.',
    size: '3,720 sqft',
    beds: 4,
    baths: 4,
    amenities: ['Wine cellar', 'Chef kitchen', 'Private garden', 'Outdoor fireplace'],
    rooms: {
      living: [living2, living5],
      kitchen: [kitchen2],
      bedroom: [bedroom2, bedroom5],
    },
  },
  {
    id: 'p3',
    title: 'Sierra Summit Residence',
    city: 'Lake Tahoe, CA',
    price: '$4,120,000',
    cover: cover3,
    status: 'For Sale',
    overview: 'A mountain sanctuary with dramatic stone detailing, heated patios, and ski-in access from the drive-in garage.',
    size: '5,200 sqft',
    beds: 6,
    baths: 6,
    amenities: ['Spa retreat', 'Heated floors', 'Wine grotto', 'Fireplace lounge'],
    rooms: {
      living: [living3, living7],
      kitchen: [kitchen3],
      bedroom: [bedroom3],
    },
  },
  {
    id: 'p4',
    title: 'Garden Court Villa',
    city: 'Beverly Hills, CA',
    price: '$1,980,000',
    cover: cover4,
    status: 'Under Offer',
    overview: 'A sleek urban villa with landscaped terraces, luminous interiors, and thoughtful indoor-outdoor flow.',
    size: '3,100 sqft',
    beds: 4,
    baths: 5,
    amenities: ['Concierge service', 'Private garage', 'Security system', 'Roof terrace'],
    rooms: {
      living: [living1, living2],
      kitchen: [kitchen4],
      bedroom: [bedroom1, bedroom2],
    },
  },
  {
    id: 'p5',
    title: 'Harbor Point Penthouse',
    city: 'Monterey, CA',
    price: '$3,900,000',
    cover: cover5,
    status: 'For Sale',
    overview: 'A sky-high penthouse with sweeping water views, private terrace, and curated entertainment spaces.',
    size: '4,100 sqft',
    beds: 4,
    baths: 5,
    amenities: ['Private terrace', 'Wet bar', 'Glass walls', 'Concierge'],
    rooms: {
      living: [living5, living3],
      kitchen: [kitchen5],
      bedroom: [bedroom4, bedroom5],
    },
  },
  {
    id: 'p6',
    title: 'Cedar Grove Manor',
    city: 'San Francisco, CA',
    price: '$4,700,000',
    cover: cover6,
    status: 'For Sale',
    overview: 'A landmark residence blending classic form with contemporary materials, private gardens, and refinement at every turn.',
    size: '5,340 sqft',
    beds: 5,
    baths: 5,
    amenities: ['Architecture studio', 'Cinema hall', 'Private courtyard', 'Library'],
    rooms: {
      living: [living7, living8],
      kitchen: [kitchen1],
      bedroom: [bedroom1, bedroom3],
    },
  },
  {
    id: 'p7',
    title: 'Summit Vista Chalet',
    city: 'Aspen, CO',
    price: '$5,180,000',
    cover: cover7,
    status: 'For Sale',
    overview: 'An alpine chalet with rich timber finishes, dramatic light, and premium amenities tailored for year-round luxury living.',
    size: '5,900 sqft',
    beds: 6,
    baths: 6,
    amenities: ['Spa pool', 'Ski locker', 'Fireplace lounge', 'Mountain deck'],
    rooms: {
      living: [living9, living8],
      kitchen: [kitchen2],
      bedroom: [bedroom2, bedroom4],
    },
  },
  {
    id: 'p8',
    title: 'Riviera Courtyard Villa',
    city: 'Bel Air, CA',
    price: '$4,650,000',
    cover: cover8,
    status: 'For Sale',
    overview: 'A private Bel Air compound anchored by sunlit courtyards, immersive interiors, and gracious hospitality features.',
    size: '4,420 sqft',
    beds: 5,
    baths: 5,
    amenities: ['Courtyard pool', 'Private spa', 'Guest pavilion', 'Smart home'],
    rooms: {
      living: [living7, living9],
      kitchen: [kitchen3],
      bedroom: [bedroom3, bedroom5],
    },
  },
  {
    id: 'p9',
    title: 'Skyline Panorama Loft',
    city: 'Los Angeles, CA',
    price: '$3,340,000',
    cover: cover9,
    status: 'Under Offer',
    overview: 'A skyline loft with expansive city drama, elevated entertainment, and private moments that feel distinctly rare.',
    size: '3,850 sqft',
    beds: 3,
    baths: 4,
    amenities: ['Private elevator', 'Rooftop lounge', 'Virtual concierge', 'Glass atrium'],
    rooms: {
      living: [living8, living9],
      kitchen: [kitchen4],
      bedroom: [bedroom4, bedroom5],
    },
  },
  {
    id: 'p10',
    title: 'Ivy Lane Sanctuary',
    city: 'San Jose, CA',
    price: '$2,720,000',
    cover: cover5,
    status: 'For Sale',
    overview: 'A secluded sanctuary with lush gardens, elegant interiors, and a calm sense of privacy that feels effortlessly luxurious.',
    size: '3,200 sqft',
    beds: 4,
    baths: 4,
    amenities: ['Private garden', 'Media suite', 'Secure entry', 'Spa bath'],
    rooms: {
      living: [living4, living5],
      kitchen: [kitchen5],
      bedroom: [bedroom2, bedroom5],
    },
  },
]

export default properties

