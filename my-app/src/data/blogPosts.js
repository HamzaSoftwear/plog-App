// Import images
import Technology1 from '../assets/image/Technology1.jpg';
import Technology2 from '../assets/image/Technology2.webp';
import Startup1 from '../assets/image/Startup1.webp';
import Startup2 from '../assets/image/Startup2.webp';
import Lifestyle1 from '../assets/image/Lifestyle1.webp';
import Lifestyle2 from '../assets/image/Lifestyle2.jpg';
import Finance1 from '../assets/image/Finance1.jpg';
import Finance2 from '../assets/image/Finance2.jpg';

export const blogPosts = [
  {
    id: 1,
    type: "Technology",
    title: "The Rise of Quantum Computing",
    description: "How quantum processors are set to revolutionize problem-solving and AI.",
    image: Technology1,
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    content: `
      <h2>The Quantum Revolution is Here</h2>
      <p>Quantum computing represents one of the most significant technological breakthroughs of our time. Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously.</p>
      
      <h3>How Quantum Computing Works</h3>
      <p>At the heart of quantum computing are three fundamental principles:</p>
      <ul>
        <li><strong>Superposition:</strong> Qubits can be in multiple states at once, allowing for parallel processing</li>
        <li><strong>Entanglement:</strong> Qubits can be interconnected, enabling instant communication</li>
        <li><strong>Interference:</strong> Quantum states can interfere constructively or destructively</li>
      </ul>
      
      <h3>Real-World Applications</h3>
      <p>Quantum computers are already showing promise in several areas:</p>
      <ul>
        <li>Cryptography and cybersecurity</li>
        <li>Drug discovery and molecular simulation</li>
        <li>Financial modeling and risk analysis</li>
        <li>Artificial intelligence and machine learning</li>
      </ul>
      
      <h3>The Future Outlook</h3>
      <p>While quantum computing is still in its early stages, companies like IBM, Google, and Microsoft are making significant investments. We can expect to see practical quantum applications within the next decade, potentially revolutionizing industries from healthcare to finance.</p>
    `,
    comments: []
  },
  {
    id: 2,
    type: "Technology",
    title: "5G vs 6G: What's Next for Connectivity?",
    description: "Exploring the evolution of wireless technology and what it means for the future.",
    image: Technology2,
    author: "Mike Rodriguez",
    date: "2024-01-10",
    readTime: "6 min read",
    content: `
      <h2>The Evolution of Wireless Technology</h2>
      <p>As 5G networks continue to roll out globally, researchers are already looking ahead to 6G technology. Understanding this evolution is crucial for businesses and consumers alike.</p>
      
      <h3>5G: Current Capabilities</h3>
      <p>5G networks offer several improvements over 4G:</p>
      <ul>
        <li>Faster download speeds (up to 10 Gbps)</li>
        <li>Lower latency (1-10 milliseconds)</li>
        <li>Higher device density (up to 1 million devices per km²)</li>
        <li>Better energy efficiency</li>
      </ul>
      
      <h3>6G: The Next Frontier</h3>
      <p>Expected to launch around 2030, 6G promises:</p>
      <ul>
        <li>Speeds up to 1 Tbps (1000x faster than 5G)</li>
        <li>Ultra-low latency (sub-millisecond)</li>
        <li>Advanced AI integration</li>
        <li>Holographic communications</li>
      </ul>
      
      <h3>Implications for the Future</h3>
      <p>The transition to 6G will enable new technologies like autonomous vehicles, smart cities, and advanced virtual reality experiences. Businesses should start preparing for this transformation now.</p>
    `,
    comments: []
  },
  {
    id: 3,
    type: "Startup",
    title: "How to Pitch Your Startup to Investors",
    description: "A step-by-step guide for entrepreneurs to attract funding successfully.",
    image: Startup1,
    author: "Alex Thompson",
    date: "2024-01-08",
    readTime: "10 min read",
    content: `
      <h2>Mastering the Art of Startup Pitching</h2>
      <p>Pitching your startup to investors is one of the most critical skills every entrepreneur needs to master. Here's a comprehensive guide to help you succeed.</p>
      
      <h3>1. Know Your Audience</h3>
      <p>Before crafting your pitch, research your potential investors:</p>
      <ul>
        <li>What types of companies do they typically invest in?</li>
        <li>What's their investment range?</li>
        <li>What questions do they usually ask?</li>
      </ul>
      
      <h3>2. Structure Your Pitch</h3>
      <p>A winning pitch follows this structure:</p>
      <ol>
        <li><strong>Hook:</strong> Start with a compelling problem statement</li>
        <li><strong>Solution:</strong> Present your unique solution</li>
        <li><strong>Market:</strong> Demonstrate market size and opportunity</li>
        <li><strong>Business Model:</strong> Explain how you'll make money</li>
        <li><strong>Traction:</strong> Show evidence of product-market fit</li>
        <li><strong>Team:</strong> Highlight your team's expertise</li>
        <li><strong>Financials:</strong> Present realistic projections</li>
        <li><strong>Ask:</strong> Clearly state what you're seeking</li>
      </ol>
      
      <h3>3. Practice, Practice, Practice</h3>
      <p>Rehearse your pitch until it becomes second nature. Consider recording yourself to identify areas for improvement.</p>
      
      <h3>4. Handle Questions with Confidence</h3>
      <p>Be prepared for tough questions about competition, scalability, and financial projections. Honesty and transparency build trust with investors.</p>
    `,
    comments: []
  },
  {
    id: 4,
    type: "Startup",
    title: "Lessons Learned from Failed Startups",
    description: "What early founders can learn from businesses that didn't make it.",
    image: Startup2,
    author: "Jennifer Lee",
    date: "2024-01-05",
    readTime: "7 min read",
    content: `
      <h2>Learning from Failure: A Founder's Guide</h2>
      <p>Failure is an inevitable part of the startup journey. By studying failed startups, we can avoid common pitfalls and increase our chances of success.</p>
      
      <h3>Common Reasons for Startup Failure</h3>
      
      <h4>1. No Market Need (42%)</h4>
      <p>The most common reason startups fail is building a product that no one wants. Always validate your idea with potential customers before investing heavily in development.</p>
      
      <h4>2. Running Out of Cash (29%)</h4>
      <p>Poor financial management leads to premature death. Create detailed financial projections and monitor your burn rate carefully.</p>
      
      <h4>3. Wrong Team (23%)</h4>
      <p>Hiring the wrong people or having team conflicts can destroy a startup. Focus on building a complementary team with shared vision.</p>
      
      <h4>4. Getting Outcompeted (19%)</h4>
      <p>Strong competition can quickly eliminate market share. Differentiate your product and build strong barriers to entry.</p>
      
      <h3>Key Takeaways</h3>
      <ul>
        <li>Validate your market before building</li>
        <li>Manage cash flow meticulously</li>
        <li>Build the right team</li>
        <li>Focus on differentiation</li>
        <li>Learn from feedback quickly</li>
      </ul>
      
      <p>Remember: every failed startup teaches us something valuable. Use these lessons to build a stronger, more resilient company.</p>
    `,
    comments: []
  },
  {
    id: 5,
    type: "Lifestyle",
    title: "Morning Habits That Boost Productivity",
    description: "Discover small daily routines that can transform your energy and focus.",
    image: Lifestyle1,
    author: "Emma Wilson",
    date: "2024-01-03",
    readTime: "5 min read",
    content: `
      <h2>Transform Your Mornings, Transform Your Life</h2>
      <p>How you start your morning sets the tone for your entire day. Here are scientifically-backed morning habits that can significantly boost your productivity and well-being.</p>
      
      <h3>The Power of Early Rising</h3>
      <p>Successful people often share one common trait: they wake up early. This gives you quiet time for personal development and planning before the day's distractions begin.</p>
      
      <h3>Essential Morning Habits</h3>
      
      <h4>1. Hydration First</h4>
      <p>Start your day with a large glass of water. Your body has been fasting for 8+ hours and needs rehydration.</p>
      
      <h4>2. Morning Exercise</h4>
      <p>Even 10-15 minutes of light exercise can boost your energy and mental clarity. Try yoga, walking, or simple stretching.</p>
      
      <h4>3. Mindfulness Practice</h4>
      <p>Spend 5-10 minutes in meditation or deep breathing. This reduces stress and improves focus throughout the day.</p>
      
      <h4>4. Goal Setting</h4>
      <p>Write down your top 3 priorities for the day. This simple act increases your chances of achieving them by 76%.</p>
      
      <h4>5. Avoid Technology</h4>
      <p>Resist the urge to check your phone immediately. Give yourself at least 30 minutes of screen-free time.</p>
      
      <h3>Creating Your Routine</h3>
      <p>Start small and gradually build your morning routine. Consistency is more important than perfection. Even implementing 2-3 of these habits can make a significant difference in your daily productivity.</p>
    `,
    comments: []
  },
  {
    id: 6,
    type: "Lifestyle",
    title: "The Digital Detox Guide",
    description: "How taking breaks from technology can improve your mental health.",
    image: Lifestyle2,
    author: "David Park",
    date: "2024-01-01",
    readTime: "6 min read",
    content: `
      <h2>Reclaiming Your Life from Digital Overload</h2>
      <p>In our hyper-connected world, digital detox has become essential for mental health and well-being. Here's how to successfully disconnect and reconnect with what matters.</p>
      
      <h3>Signs You Need a Digital Detox</h3>
      <ul>
        <li>Constantly checking your phone</li>
        <li>Feeling anxious when separated from devices</li>
        <li>Difficulty concentrating on tasks</li>
        <li>Sleep problems due to screen time</li>
        <li>Decreased face-to-face social interactions</li>
      </ul>
      
      <h3>Benefits of Digital Detox</h3>
      <ul>
        <li>Improved sleep quality</li>
        <li>Better focus and concentration</li>
        <li>Reduced anxiety and stress</li>
        <li>Enhanced real-world relationships</li>
        <li>Increased creativity and productivity</li>
      </ul>
      
      <h3>How to Start Your Digital Detox</h3>
      
      <h4>1. Start Small</h4>
      <p>Begin with 30 minutes of device-free time daily, gradually increasing to hours or entire days.</p>
      
      <h4>2. Create Phone-Free Zones</h4>
      <p>Designate areas in your home where devices are not allowed, such as the bedroom or dining room.</p>
      
      <h4>3. Set Specific Times</h4>
      <p>Establish clear boundaries, like no phone use during meals or before bedtime.</p>
      
      <h4>4. Find Alternatives</h4>
      <p>Replace screen time with activities like reading, exercise, or spending time in nature.</p>
      
      <h3>Long-term Strategies</h3>
      <p>Consider regular digital detox weekends or vacations. Use this time to reconnect with hobbies, relationships, and yourself.</p>
    `,
    comments: []
  },
  {
    id: 7,
    type: "Finance",
    title: "Top 10 Investment Strategies for 2025",
    description: "A breakdown of the most effective ways to grow your wealth this year.",
    image: Finance1,
    author: "Robert Kim",
    date: "2023-12-28",
    readTime: "9 min read",
    content: `
      <h2>Building Wealth in 2025: Strategic Investment Approaches</h2>
      <p>As we enter 2025, the investment landscape continues to evolve. Here are the top strategies to help you grow your wealth effectively and responsibly.</p>
      
      <h3>1. Diversified Index Fund Investing</h3>
      <p>Low-cost index funds remain one of the most reliable long-term investment strategies. They provide broad market exposure with minimal fees.</p>
      
      <h3>2. ESG (Environmental, Social, Governance) Investing</h3>
      <p>Investing in companies with strong ESG practices is becoming increasingly important as sustainability drives market trends.</p>
      
      <h3>3. Real Estate Investment Trusts (REITs)</h3>
      <p>REITs offer exposure to real estate markets without the need to buy physical properties, providing steady income and potential appreciation.</p>
      
      <h3>4. Technology Sector Focus</h3>
      <p>AI, renewable energy, and biotechnology continue to show strong growth potential. Consider allocating a portion of your portfolio to these sectors.</p>
      
      <h3>5. International Diversification</h3>
      <p>Don't limit yourself to domestic markets. Emerging markets and developed international markets offer diversification benefits.</p>
      
      <h3>6. Dollar-Cost Averaging</h3>
      <p>Regular, consistent investments reduce the impact of market volatility and help build wealth over time.</p>
      
      <h3>7. High-Yield Savings and CDs</h3>
      <p>With higher interest rates, these conservative options provide safe returns for emergency funds and short-term goals.</p>
      
      <h3>8. Alternative Investments</h3>
      <p>Consider commodities, precious metals, or peer-to-peer lending for additional diversification.</p>
      
      <h3>9. Tax-Efficient Investing</h3>
      <p>Maximize tax-advantaged accounts like 401(k)s, IRAs, and HSAs to reduce your tax burden.</p>
      
      <h3>10. Regular Portfolio Rebalancing</h3>
      <p>Periodically adjust your asset allocation to maintain your desired risk level and take advantage of market opportunities.</p>
      
      <h3>Key Principles</h3>
      <ul>
        <li>Start early and invest consistently</li>
        <li>Focus on long-term goals</li>
        <li>Don't try to time the market</li>
        <li>Keep costs low</li>
        <li>Stay diversified</li>
      </ul>
    `,
    comments: []
  },
  {
    id: 8,
    type: "Finance",
    title: "Cryptocurrency: Risk or Opportunity?",
    description: "An honest look at crypto's future and whether it's worth your attention.",
    image: Finance2,
    author: "Lisa Chen",
    date: "2023-12-25",
    readTime: "8 min read",
    content: `
      <h2>Navigating the Cryptocurrency Landscape</h2>
      <p>Cryptocurrency continues to be one of the most debated investment topics. Here's an honest assessment of the risks and opportunities in the crypto space.</p>
      
      <h3>The Case for Cryptocurrency</h3>
      
      <h4>1. Decentralization</h4>
      <p>Cryptocurrencies operate without central authority, offering financial freedom and resistance to censorship.</p>
      
      <h4>2. Innovation Potential</h4>
      <p>Blockchain technology enables new financial products, smart contracts, and decentralized applications.</p>
      
      <h4>3. Portfolio Diversification</h4>
      <p>Crypto can provide uncorrelated returns, potentially improving overall portfolio performance.</p>
      
      <h4>4. Growing Adoption</h4>
      <p>Institutional adoption and regulatory clarity are increasing, suggesting long-term viability.</p>
      
      <h3>The Risks of Cryptocurrency</h3>
      
      <h4>1. Extreme Volatility</h4>
      <p>Price swings can be dramatic, leading to significant losses in short periods.</p>
      
      <h4>2. Regulatory Uncertainty</h4>
      <p>Changing regulations can impact market prices and accessibility.</p>
      
      <h4>3. Technical Risks</h4>
      <p>Security vulnerabilities, hacking, and technological failures pose real threats.</p>
      
      <h4>4. Market Manipulation</h4>
      <p>Less regulated markets are susceptible to manipulation and fraud.</p>
      
      <h3>How to Approach Crypto Investing</h3>
      
      <h4>1. Start Small</h4>
      <p>Only invest what you can afford to lose completely. Consider crypto as a small portion (5-10%) of your portfolio.</p>
      
      <h4>2. Focus on Established Coins</h4>
      <p>Stick to well-known cryptocurrencies like Bitcoin and Ethereum rather than speculative altcoins.</p>
      
      <h4>3. Use Dollar-Cost Averaging</h4>
      <p>Regular, small investments can help reduce the impact of volatility.</p>
      
      <h4>4. Secure Your Investments</h4>
      <p>Use reputable exchanges and consider hardware wallets for long-term storage.</p>
      
      <h4>5. Stay Informed</h4>
      <p>Keep up with regulatory developments and technological advances.</p>
      
      <h3>The Bottom Line</h3>
      <p>Cryptocurrency represents both significant opportunities and substantial risks. It's not suitable for everyone, but for those willing to accept the volatility, it could be a valuable addition to a diversified portfolio. Always do your own research and never invest more than you can afford to lose.</p>
    `,
    comments: []
  }
];

export const getBlogPostById = (id) => {
  return blogPosts.find(post => post.id === parseInt(id));
};

export const getBlogPostsByCategory = (category) => {
  if (category === 'All') {
    return blogPosts;
  }
  return blogPosts.filter(post => post.type === category);
};
