import { create } from 'zustand';

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'published' | 'draft' | 'reported';
  createdAt: Date;
};

type PostStore = {
  posts: Post[];
  addPost: (post: Post) => void;
  deletePost: (id: string) => void;
  updatePost: (id: string, updatedPost: Partial<Post>) => void;
  reportPost: (id: string) => void;
};

// Generate 20 mock reported posts
const generateMockPosts = () => {
  const mockPosts: Post[] = [];
  const contentTypes = ['Misleading information', 'Inappropriate content', 'Spam', 'Offensive language', 'Copyright violation'];
  const authors = ['User123', 'User456', 'User789', 'GuestUser', 'Anonymous'];
  const titles = ['Product Review', 'News Update', 'Opinion Piece', 'Technical Guide', 'Community Post'];

  for (let i = 1; i <= 20; i++) {
    const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    
    mockPosts.push({
      id: `post-${i}`,
      title: `${title} #${i}`,
      content: `This post contains ${contentType.toLowerCase()} and has been reported by multiple users.`,
      author: author,
      status: 'reported',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    });
  }

  // Add a few published and draft posts
  for (let i = 21; i <= 25; i++) {
    mockPosts.push({
      id: `post-${i}`,
      title: `Regular Post #${i}`,
      content: `This is a regular published post.`,
      author: 'Admin',
      status: 'published',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000),
    });
  }

  for (let i = 26; i <= 28; i++) {
    mockPosts.push({
      id: `post-${i}`,
      title: `Draft Post #${i}`,
      content: `This is a draft post.`,
      author: 'Editor',
      status: 'draft',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
    });
  }

  return mockPosts;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: generateMockPosts(),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      ),
    })),
  reportPost: (id) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, status: 'reported' } : post
      ),
    })),
}));
