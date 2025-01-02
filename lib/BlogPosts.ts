import { BlogPost } from './types'

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Colorful World of AI',
    author: 'Arif Ali',
    date: '2023-07-01',
    excerpt: 'Exploring how AI is bringing vibrant changes to various industries...',
    content: `
      <p>Artificial Intelligence is not just about algorithms and data; it's a spectrum of innovations that are coloring our world in ways we never imagined. From the vivid visualizations in data analysis to the rich, nuanced language of advanced chatbots, AI is painting a new picture of our technological landscape.</p>
      <h2>The Rainbow of AI Applications</h2>
      <p>In healthcare, AI is adding new hues to medical imaging, making diagnoses more accurate and treatments more personalized. In the world of art, AI-generated pieces are creating a whole new palette of creative expression. Even in fields like agriculture, AI is helping to cultivate a greener, more sustainable future.</p>
      <h2>A Bright Future</h2>
      <p>As we look ahead, the future of AI promises to be even more colorful. With advancements in quantum computing, we're on the brink of unlocking an entirely new spectrum of possibilities. The ethical considerations of AI add depth and shadow to this vibrant picture, reminding us of the importance of responsible innovation.</p>
      <p>In conclusion, the world of AI is not black and white, but a rich tapestry of colors, each representing new opportunities, challenges, and discoveries. As we continue to develop and implement AI technologies, we're not just coding – we're crafting a masterpiece of human ingenuity.</p>
    `,
    image: '/img1.jpg',
    comments: []
  },
  {
    id: '2',
    title: 'The Vibrant Palette of Machine Learning',
    author: 'Saim ',
    date: '2023-07-15',
    excerpt: 'Discover how machine learning algorithms are creating a spectrum of possibilities...',
    content: `
      <p>Machine Learning, a subset of AI, is like a box of colorful crayons, each algorithm bringing its own unique shade to the canvas of data analysis and prediction. From the deep blues of neural networks to the bright yellows of decision trees, ML is painting a vivid picture of our data-driven world.</p>
      <h2>A Rainbow of Algorithms</h2>
      <p>Supervised learning algorithms shine like primary colors, providing a strong foundation for classification and regression tasks. Unsupervised learning methods add subtle hues, revealing hidden patterns and structures in data. Reinforcement learning brings dynamic, shifting tones as algorithms learn to navigate complex environments.</p>
      <h2>Blending Colors: Ensemble Methods</h2>
      <p>Just as artists mix colors to create new shades, data scientists use ensemble methods to combine multiple algorithms, creating more robust and accurate models. These techniques, like the vibrant purples and rich greens of a well-mixed palette, often outperform individual algorithms.</p>
      <p>As we continue to refine and develop new machine learning techniques, we're not just improving our models – we're expanding the color palette of what's possible in the world of AI and data science.</p>
    `,
    image: '/img2.jpg',
    comments: []
  }
]

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  return blogPosts.find(post => post.id === id)
}

export async function addBlogPost(newPost: BlogPost): Promise<void> {
  blogPosts.unshift(newPost)
  console.log('New colorful blog post added:', newPost)
}

