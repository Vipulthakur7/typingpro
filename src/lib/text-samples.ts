const textSamples = {
  easy: [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet and is commonly used for typing practice.",
    "Vipul believes that practice makes perfect. Every keystroke counts towards building muscle memory and improving typing speed.",
    "The sun sets behind the mountains, painting the sky in brilliant shades of orange and pink. Nature provides the most beautiful artwork.",
    "Reading books opens doors to new worlds and ideas. Every page turned is a step toward greater knowledge and understanding.",
    "Welcome to VipulType Pro, where typing becomes an art form. Master your keyboard with dedication and consistent practice."
  ],
  medium: [
    "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to reshape our world in unprecedented ways.",
    "Vipul's passion for creating exceptional user experiences shines through in every detail of this typing application. Clean design meets powerful functionality.",
    "Environmental sustainability has become a critical global concern. Climate change, deforestation, and pollution threaten ecosystems worldwide, demanding immediate action.",
    "The art of programming combines logical thinking with creative problem-solving. Each line of code written by developers like Vipul contributes to digital innovation.",
    "Effective communication involves not just speaking clearly, but also listening actively, understanding context, and adapting your message to your audience."
  ],
  hard: [
    "Quantum mechanics fundamentally challenges our classical understanding of reality, introducing concepts like superposition, entanglement, and wave-particle duality that defy intuitive comprehension.",
    "Cryptocurrency blockchain technology utilizes cryptographic hashing algorithms and distributed consensus mechanisms to create immutable, decentralized ledgers for peer-to-peer transactions.",
    "Neuroscientific research investigating synaptic plasticity, neurogenesis, and neuronal connectivity provides insights into cognitive function, memory consolidation, and behavioral adaptation.",
    "Macroeconomic policy implementation requires careful consideration of fiscal multipliers, monetary transmission mechanisms, and international capital flow dynamics to maintain economic stability.",
    "Bioinformatics algorithms process genomic sequencing data through computational methods including sequence alignment, phylogenetic analysis, and statistical modeling to identify genetic variations."
  ]
};

export function getTextSample(difficulty: "easy" | "medium" | "hard"): string {
  const samples = textSamples[difficulty];
  return samples[Math.floor(Math.random() * samples.length)];
}
