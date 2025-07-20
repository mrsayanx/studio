// This is the main file for managing your services.

import type { LucideIcon } from "lucide-react";
import {
  PenTool,
  Palette,
  Megaphone,
  Briefcase,
  ThumbsUp,
  CreditCard,
  MessageCircle,
  Clapperboard,
  Youtube,
  Code
} from 'lucide-react';


export type Service = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  highlights: string[];
  Icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: 1,
    slug: 'website-development',
    title: 'Website Development',
    shortDescription: 'Custom, responsive, and high-performance websites.',
    description: 'We build robust and scalable websites tailored to your business needs. From e-commerce platforms to corporate sites, our development process ensures a flawless user experience, fast loading times, and SEO-friendly architecture.',
    price: 'Starting from ₹999',
    highlights: ['Full-stack Development', 'Responsive on all devices', 'Optimized for Speed', 'Secure and Scalable'],
    Icon: Code,
  },
  {
    id: 2,
    slug: 'website-design',
    title: 'Website Design',
    shortDescription: 'Beautiful and intuitive user interfaces.',
    description: 'Our design team creates visually stunning and user-friendly interfaces that captivate your audience. We focus on creating a seamless user journey that converts visitors into customers, reflecting your brand\'s identity in every pixel.',
    price: 'Starting from ₹999',
    highlights: ['UI/UX Research', 'Modern & Clean Layouts', 'Interactive Prototypes', 'Brand-centric Design'],
    Icon: Palette,
  },
  {
    id: 3,
    slug: 'logo-designs',
    title: 'Logo Designs',
    shortDescription: 'Memorable logos that define your brand.',
    description: 'A great logo is the cornerstone of your brand identity. We design unique and memorable logos that tell your brand\'s story and resonate with your target audience, ensuring your business stands out from the competition.',
    price: 'Starting from ₹199',
    highlights: ['Multiple Concepts', 'Vector Files Included', 'Full Copyright Ownership', 'Stationery Mockups'],
    Icon: PenTool,
  },
  {
    id: 4,
    slug: 'poster-designs',
    title: 'Poster Designs',
    shortDescription: 'Eye-catching posters for events and promotions.',
    description: 'Promote your events, products, or services with professionally designed posters. We create compelling visuals that grab attention and communicate your message effectively, whether for print or digital distribution.',
    price: 'Starting from ₹199',
    highlights: ['Print-ready Files', 'Custom Illustrations', 'Fast Turnaround', 'Multiple Size Formats'],
    Icon: Megaphone,
  },
  {
    id: 5,
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    shortDescription: 'Engage and grow your audience on social platforms.',
    description: 'We develop and execute data-driven social media strategies to increase your brand awareness, engagement, and conversions. From content creation to community management, we handle it all.',
    price: 'Contact for Quote',
    highlights: ['Strategy Development', 'Content Creation', 'Audience Growth', 'Performance Tracking & Reporting'],
    Icon: ThumbsUp,
  },
  {
    id: 6,
    slug: 'facebook-page-setup',
    title: 'Facebook Page Setup',
    shortDescription: 'Professional setup of your Facebook business page.',
    description: 'Get your business on the world\'s largest social network. We set up and optimize your Facebook page for maximum visibility and engagement, including profile and cover photos, business info, and call-to-action buttons.',
    price: '₹999',
    highlights: ['Page Creation & Optimization', 'Custom URL', 'Cover & Profile Photo Design', 'Initial Content Strategy'],
    Icon: ThumbsUp,
  },
  {
    id: 7,
    slug: 'business-card-design',
    title: 'Business Card Design',
    shortDescription: 'Make a lasting impression with professional cards.',
    description: 'Network effectively with a business card that stands out. We design custom business cards that reflect your brand\'s professionalism and style, ensuring you leave a memorable impression.',
    price: 'Starting from ₹99',
    highlights: ['Double-sided Design', 'Print-ready PDF', 'Multiple Design Concepts', 'QR Code Integration'],
    Icon: CreditCard,
  },
  {
    id: 8,
    slug: 'whatsapp-catalog-design',
    title: 'WhatsApp Catalog Design',
    shortDescription: 'Showcase your products directly on WhatsApp.',
    description: 'Leverage WhatsApp for Business with a professionally designed product catalog. We help you set up and design your catalog to make it easy for customers to browse and purchase your products.',
    price: 'Starting from ₹499',
    highlights: ['Catalog Setup', 'Professional Product Images', 'Compelling Descriptions', 'Easy to Manage'],
    Icon: MessageCircle,
  },
  {
    id: 9,
    slug: 'ai-video-ads',
    title: 'AI Video Ads',
    shortDescription: 'Create stunning video ads with AI technology.',
    description: 'Harness the power of AI to create high-quality, engaging video ads at a fraction of the cost. We use cutting-edge tools to produce professional videos that drive results for your campaigns.',
    price: 'Starting from ₹2,500',
    highlights: ['Scriptwriting', 'AI Voiceovers', 'Stock Footage Included', 'Multiple Video Formats'],
    Icon: Clapperboard,
  },
  {
    id: 10,
    slug: 'youtube-channel-kit',
    title: 'YouTube Channel Design Kit',
    shortDescription: 'Logo, cover, and thumbnail designs for YouTube.',
    description: 'Launch or rebrand your YouTube channel with a complete design kit. We provide a custom logo, channel art (cover), and a template for your video thumbnails to create a cohesive and professional look.',
    price: 'Starting from ₹3,000',
    highlights: ['Custom Channel Logo', 'Engaging Channel Art', 'Click-worthy Thumbnail Template', 'Brand Style Guide'],
    Icon: Youtube,
  },
];
