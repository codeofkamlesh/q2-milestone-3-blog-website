import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">About World of AI </h1>
      <div className="mb-8">
        <Image
          src="/robot2.jpg"
          alt="AI Insights Team"
          width={800}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="prose max-w-none">
        <p>
          Welcome to World of AI, your premier destination for cutting-edge information and analysis in the world of Artificial Intelligence. Our mission is to bridge the gap between complex AI technologies and our diverse readership, ranging from tech enthusiasts to industry professionals.
        </p>
        <h2 className="text-yellow-600">Our Expertise</h2>
        <p>
          In AI, we pride ourselves on our team of expert contributors, including data scientists, AI researchers, and industry veterans. Their collective experience spans various AI domains, including machine learning, natural language processing, computer vision, and robotics.
        </p>
        <h2 className='text-yellow-600'>What We Offer</h2>
        <ul>
          <li>In-depth articles on the latest AI breakthroughs and their potential impacts</li>
          <li>Interviews with leading AI researchers and innovators</li>
          <li>Practical guides and tutorials for implementing AI in various industries</li>
          <li>Ethical discussions surrounding the development and deployment of AI technologies</li>
          <li>News and updates from major AI conferences and events worldwide</li>
        </ul>
        <h2 className='text-yellow-600'>Our Commitment</h2>
        <p>
          We are committed to providing accurate, unbiased, and accessible information about AI. Our goal is to foster a community of informed individuals who can critically engage with AI technologies and contribute to shaping the future of this rapidly evolving field.
        </p>
        <p>
          Join us on this exciting journey as we explore the frontiers of Artificial Intelligence and its potential to transform our world.
        </p>
      </div>
    </div>
  )
}

