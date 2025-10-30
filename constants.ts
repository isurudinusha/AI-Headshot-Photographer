
import type { StyleOption } from './types';

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'corporate',
    name: 'Corporate Grey Backdrop',
    prompt: 'Generate a professional corporate headshot of the person in the image. The background should be a neutral, solid light grey, similar to a studio backdrop. The lighting should be soft and even. The person should be wearing professional business attire like a suit or a blazer.',
    thumbnail: 'https://picsum.photos/seed/corporate/200/200'
  },
  {
    id: 'tech',
    name: 'Modern Tech Office',
    prompt: 'Generate a professional headshot of the person in the image, placing them in a modern tech office environment. The background should be slightly out of focus, featuring elements like glass walls, open-plan desks, or subtle tech-related decor. The lighting should be bright and modern.',
    thumbnail: 'https://picsum.photos/seed/tech/200/200'
  },
  {
    id: 'outdoor',
    name: 'Outdoor Natural Light',
    prompt: 'Generate a professional headshot of the person in the image with an outdoor setting. The background should be a pleasant, blurred natural environment, like a park or garden. Use soft, natural lighting (golden hour style). The person should appear friendly and approachable.',
    thumbnail: 'https://picsum.photos/seed/outdoor/200/200'
  },
  {
    id: 'creative',
    name: 'Creative/Startup Vibe',
    prompt: 'Generate a creative and modern headshot of the person in the image. Place them against a textured wall (like brick or concrete) or a colorful, minimalist background. The lighting can be more dramatic. The overall feel should be confident and innovative.',
    thumbnail: 'https://picsum.photos/seed/creative/200/200'
  }
];
