import { HeroCollage } from '@/components/ui/modern-hero-section';

export default function HeroCollageDemo() {
  const stats = [
    { value: '3,888,846+', label: 'Users Trusted' },
    { value: '16,015,507+', label: 'Images Processed' },
  ];

  const unsplashImages = [
    // Central Image: Portrait
    'https://cdn.21st.dev/assets/mirror/66/66a230562aa63505d3089a2040fd63a69f123bd9a36377b5c27f9bfa10de0ac2.jpg',
    // Top-Left (Before/After concept)
    'https://cdn.21st.dev/assets/mirror/55/551a3a38515bdf2d189041c89af7bf5dde3aea48f5867060101cb2a5b8884411.jpg',
    // Top-Right (Daisies)
    'https://cdn.21st.dev/assets/mirror/63/632124869b61777b6c8ef65776fc36fea8e417d8f6b4f67cbe499701e689e145.jpg',
    // Bottom-Right (Sliders/Beach)
    'https://cdn.21st.dev/assets/mirror/89/8908fd16f3ea85f950fa88adee07272a6ec68d9ef51470669754ced375950b4b.jpg',
    // Far-Right (Sunflowers)
    'https://cdn.21st.dev/assets/mirror/b0/b0de7d23f38dfbab566e2578db495b440d52bbf6fd78699afd33e598104d61c2.jpg',
    // Bottom-Left (Product)
    'https://cdn.21st.dev/assets/mirror/88/88b4510727e3e917c0cf04dae4b880d70e9360aaa1a95f93db1faff2aa0bab19.jpg',
    // Far-Left (Rainbow)
    'https://cdn.21st.dev/assets/mirror/69/69fce1ff9836c5092a6dfadfbd46649563779cceaf84a2eca1dc059a5f011f03.jpg',
  ];

  return (
    <div className="w-full">
      <HeroCollage
        title={
          <>
            Free <span className="text-blue-600">AI Photo Editor</span>
          </>
        }
        subtitle="Supercharge your editing 10x faster and easier than ever with AIEASE’s a diverse of AI-powered toolsets. Use our all-in-one online free AI photo editor to deliver perfect and professional images."
        stats={stats}
        images={unsplashImages}
      />
    </div>
  );
}
