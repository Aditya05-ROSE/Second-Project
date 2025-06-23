import { BlogPost } from '../types/blog';

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Improve Your Programming Skills',
    excerpt: 'This article explores how programmers can enhance their coding abilities through systematic learning and practice.',
    content: 'Detailed content would go here, including code examples, tips, and practical methods...',
    coverImage: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/cdafd80d-54dd-4c9d-8d82-8bd02b4e534a.jpg',
    author: {
      id: 'u1',
      name: 'John Smith',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/f87dcda5-645b-4995-a50e-91c490ee1dbc.jpg'
    },
    category: 'programming',
    tags: ['coding', 'learning', 'skills'],
    publishedAt: new Date('2025-06-10').toISOString(),
    likes: 42,
    commentsCount: 8
  },
  {
    id: '2',
    title: 'Frontend Frameworks Worth Learning in 2025',
    excerpt: 'With rapid developments in frontend technology, which frameworks are worth investing time in? This article breaks it down.',
    content: 'Detailed content would go here...',
    coverImage: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/1bf02e4a-52d3-4d46-bd24-fb55f72939e5.jpg',
    author: {
      id: 'u2',
      name: 'Emily Johnson',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/f87dcda5-645b-4995-a50e-91c490ee1dbc.jpg'
    },
    category: 'frontend',
    tags: ['frontend', 'React', 'Vue', 'frameworks'],
    publishedAt: new Date('2025-06-05').toISOString(),
    likes: 36,
    commentsCount: 12
  },
  {
    id: '3',
    title: 'AI Applications and Challenges in Healthcare',
    excerpt: 'AI technologies are transforming multiple aspects of healthcare, but they also face significant challenges.',
    content: 'Detailed content would go here...',
    coverImage: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/1b29d556-6709-42d0-868a-4df9d30d4046.jpg',
    author: {
      id: 'u3',
      name: 'Michael Chen',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/f87dcda5-645b-4995-a50e-91c490ee1dbc.jpg'
    },
    category: 'ai',
    tags: ['artificial intelligence', 'healthcare', 'technology'],
    publishedAt: new Date('2025-06-01').toISOString(),
    likes: 78,
    commentsCount: 23
  },
  {
    id: '4',
    title: 'Sustainable Development and Green Tech Innovation',
    excerpt: 'Exploring how the latest environmental technologies are helping to achieve global sustainability goals.',
    content: 'Detailed content would go here...',
    coverImage: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/fcb3ff99-740a-4434-8781-75516c90d5b9.jpg',
    author: {
      id: 'u4',
      name: 'Sarah Williams',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/f87dcda5-645b-4995-a50e-91c490ee1dbc.jpg'
    },
    category: 'environment',
    tags: ['environment', 'sustainability', 'innovation'],
    publishedAt: new Date('2025-05-28').toISOString(),
    likes: 56,
    commentsCount: 14
  },
];
