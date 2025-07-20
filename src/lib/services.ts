
// This is the main file for managing your services.
// All images are currently using placeholders from `https://placehold.co`.
// To add your own images:
// 1. Upload your image files to the `public/images/services` folder.
// 2. Update the `src` path for the corresponding service below with your new filename.
// For example, change 'https://placehold.co/600x400.png' to '/images/services/your-new-image.png'.

export type Service = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  images: { src: string; alt: string; hint: string }[];
  highlights: string[];
};

export const services: Service[] = [
  {
    id: 1,
    slug: 'website-development',
    title: 'Website Development',
    shortDescription: 'Custom, responsive, and high-performance websites.',
    description: 'We build robust and scalable websites tailored to your business needs. From e-commerce platforms to corporate sites, our development process ensures a flawless user experience, fast loading times, and SEO-friendly architecture.',
    price: 'Starting from ₹999',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'Code on a screen', hint: 'code editor' },
      { src: 'https://placehold.co/600x400.png', alt: 'Responsive design showcase', hint: 'responsive design' },
      { src: 'https://placehold.co/600x400.png', alt: 'Database diagram', hint: 'database schema' },
    ],
    highlights: ['Full-stack Development', 'Responsive on all devices', 'Optimized for Speed', 'Secure and Scalable'],
  },
  {
    id: 2,
    slug: 'website-design',
    title: 'Website Design',
    shortDescription: 'Beautiful and intuitive user interfaces.',
    description: 'Our design team creates visually stunning and user-friendly interfaces that captivate your audience. We focus on creating a seamless user journey that converts visitors into customers, reflecting your brand\'s identity in every pixel.',
    price: 'Starting from ₹999',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'Website wireframe', hint: 'website wireframe' },
      { src: 'https://placehold.co/600x400.png', alt: 'Color palette selection', hint: 'color palette' },
      { src: 'https://placehold.co/600x400.png', alt: 'Mobile app design', hint: 'mobile design' },
    ],
    highlights: ['UI/UX Research', 'Modern & Clean Layouts', 'Interactive Prototypes', 'Brand-centric Design'],
  },
  {
    id: 3,
    slug: 'logo-designs',
    title: 'Logo Designs',
    shortDescription: 'Memorable logos that define your brand.',
    description: 'A great logo is the cornerstone of your brand identity. We design unique and memorable logos that tell your brand\'s story and resonate with your target audience, ensuring your business stands out from the competition.',
    price: 'Starting from ₹199',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'Collection of logos', hint: 'abstract logo' },
      { src: 'https://placehold.co/600x400.png', alt: 'Logo design process sketch', hint: 'design sketch' },
      { src: 'https://placehold.co/600x400.png', alt: 'Logo on a business card', hint: 'brand identity' },
    ],
    highlights: ['Multiple Concepts', 'Vector Files Included', 'Full Copyright Ownership', 'Stationery Mockups'],
  },
  {
    id: 4,
    slug: 'poster-designs',
    title: 'Poster Designs',
    shortDescription: 'Eye-catching posters for events and promotions.',
    description: 'Promote your events, products, or services with professionally designed posters. We create compelling visuals that grab attention and communicate your message effectively, whether for print or digital distribution.',
    price: 'Starting from ₹199',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'Promotional poster for a music event', hint: 'event poster' },
      { src: 'https://placehold.co/600x400.png', alt: 'Corporate poster design', hint: 'corporate design' },
    ],
    highlights: ['Print-ready Files', 'Custom Illustrations', 'Fast Turnaround', 'Multiple Size Formats'],
  },
  {
    id: 5,
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    shortDescription: 'Engage and grow your audience on social platforms.',
    description: 'We develop and execute data-driven social media strategies to increase your brand awareness, engagement, and conversions. From content creation to community management, we handle it all.',
    price: 'Contact for Quote',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'Social media analytics dashboard', hint: 'social media analytics' },
      { src: 'https://placehold.co/600x400.png', alt: 'Content calendar planning', hint: 'content plan' },
    ],
    highlights: ['Strategy Development', 'Content Creation', 'Audience Growth', 'Performance Tracking & Reporting'],
  },
  {
    id: 6,
    slug: 'facebook-page-setup',
    title: 'Facebook Page Setup',
    shortDescription: 'Professional setup of your Facebook business page.',
    description: 'Get your business on the world\'s largest social network. We set up and optimize your Facebook page for maximum visibility and engagement, including profile and cover photos, business info, and call-to-action buttons.',
    price: '₹999',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'Facebook page on a laptop', hint: 'facebook profile' },
      { src: 'https://placehold.co/600x400.png', alt: 'Facebook cover design', hint: 'cover photo' },
    ],
    highlights: ['Page Creation & Optimization', 'Custom URL', 'Cover & Profile Photo Design', 'Initial Content Strategy'],
  },
  {
    id: 7,
    slug: 'business-card-design',
    title: 'Business Card Design',
    shortDescription: 'Make a lasting impression with professional cards.',
    description: 'Network effectively with a business card that stands out. We design custom business cards that reflect your brand\'s professionalism and style, ensuring you leave a memorable impression.',
    price: 'Starting from ₹99',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'Modern business card design', hint: 'business card' },
      { src: 'https://placehold.co/600x400.png', alt: 'Stack of business cards', hint: 'professional networking' },
    ],
    highlights: ['Double-sided Design', 'Print-ready PDF', 'Multiple Design Concepts', 'QR Code Integration'],
  },
  {
    id: 8,
    slug: 'whatsapp-catalog-design',
    title: 'WhatsApp Catalog Design',
    shortDescription: 'Showcase your products directly on WhatsApp.',
    description: 'Leverage WhatsApp for Business with a professionally designed product catalog. We help you set up and design your catalog to make it easy for customers to browse and purchase your products.',
    price: 'Starting from ₹499',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'WhatsApp product catalog on a phone', hint: 'product catalog' },
      { src: 'https://placehold.co/600x400.png', alt: 'Product photography for catalog', hint: 'product photo' },
    ],
    highlights: ['Catalog Setup', 'Professional Product Images', 'Compelling Descriptions', 'Easy to Manage'],
  },
  {
    id: 9,
    slug: 'ai-video-ads',
    title: 'AI Video Ads',
    shortDescription: 'Create stunning video ads with AI technology.',
    description: 'Harness the power of AI to create high-quality, engaging video ads at a fraction of the cost. We use cutting-edge tools to produce professional videos that drive results for your campaigns.',
    price: 'Starting from ₹2,500',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'Video editing software interface', hint: 'video editing' },
      { src: 'https://placehold.co/600x400.png', alt: 'AI generating video scenes', hint: 'artificial intelligence' },
    ],
    highlights: ['Scriptwriting', 'AI Voiceovers', 'Stock Footage Included', 'Multiple Video Formats'],
  },
  {
    id: 10,
    slug: 'youtube-channel-kit',
    title: 'YouTube Channel Design Kit',
    shortDescription: 'Logo, cover, and thumbnail designs for YouTube.',
    description: 'Launch or rebrand your YouTube channel with a complete design kit. We provide a custom logo, channel art (cover), and a template for your video thumbnails to create a cohesive and professional look.',
    price: 'Starting from ₹3,000',
    images: [
      { src: 'https://placehold.co/600x400.png', alt: 'YouTube channel page on a monitor', hint: 'youtube channel' },
      { src: 'https://placehold.co/600x400.png', alt: 'A grid of YouTube video thumbnails', hint: 'video thumbnails' },
    ],
    highlights: ['Custom Channel Logo', 'Engaging Channel Art', 'Click-worthy Thumbnail Template', 'Brand Style Guide'],
  },
];
