import { Category, CelebPick, DealCard, Offer, Product, Review, Testimonial } from '../types/product';

type ProductData = Product & {
  whyLoveIt: { title: string; description: string }[];
};

export const categories: Category[] = [
  { id: 'hair', name: 'Hair Care', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn6-Gexar0emgg8tWqhLj2cfh4bu2uziZMa_kkk9Lw1X1LvGqUaVNwjFkStQzoxNWmXX8UQNojQcuds-Oj6GGo80arSm0Vl2gyIccuaxZXCC2RYuRjZkCACt6flnfxR2Iif9z4jqj-yIG71Ex4f2AtdHXGkvKfbeyLkxo8r0MyUM7IvLdczvOBEqGhOuoFU_oJuvNMtd8wN0wv7d8hQa3Qvmj_ZKOjDA0k05_AVBCSKZh0GcfOkpLc1I0y90q4HyyuyccrZJMRpXs' },
  { id: 'skin', name: 'Skin Care', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_S4iEGeRqlrPtlvupylSwWudbNH1qf838CFXhjrQiXXzFxvdfutiGdgd9EJm0vC9cH02k0Gd0o7HFcOlQDhQp58uV23L954P9Kxhy2OB4C64lw8Ox7WnUi0OUHHyFFiYG_0ePOZwb3e1bbysPfBz8QoLPIU_K1CY3aYTR9aeT62MlZ0XExX5VRIb46ePzVP0B9nd6628mYdzOPcX_h0YjB0q3N2pUS9LTWBKL_5ENVKkr4Ejb6UtJBJgvjeaAMwelR6I4HhiXZrA' },
  { id: 'makeup', name: 'Makeup', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR0mYap9H_BX4tfkeMP1WH58jkD0DZRgJwTXVipP5NExjM7tReM-ieBe8KJVoesoefL-uiNpkGnzmfI03ZaqstQaZRKmR7xpEDwLsVFDZt2UM9GcRsFCNlKebQmh-naxk_Xd54lr-5PB8_6chnAaiSvQ1o-Dl3_PYgFNLJowC-hjkRQ8FPTEdjJZJYsOk0zXJ6jeI9gdBK6A1E71pCZhs6LPAJDWC06VnONA219EuDUunFGUsTFmP6DawLSYSe5xurOIcgxtR6dW0' },
  { id: 'body', name: 'Body Care', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC7p8Mp9x-4UVxFVM8Qg_bYnWN1mUyk_LXzl81NuqqVBi511s3R8IMH1k_7W8QiVwSUI8GWy_GHuCG6Ojc1bf2sEGUG7zsKXGKYKHhat7SD3AA14vhepLXbVrWHGfg318-Iv8EHefz4-KQb24nPF33cMyZZ06ptrdxQyuZ7hreFVnYuOFuTkSoM_qUghCzMszZlCL8hYTVmjYR9L5bky0Z0beRomu-4fpNDuErpSN1OJmhRoiTqo18-b19vaBkTaG236G5Are7U2o' },
  { id: 'fragrance', name: 'Fragrance', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrT4tAVx_RhtMEqkYzLK9ZVQKRqg1AzkIsfbo30Ak-fH5H6DwJUb8dk9JwVvLbSWyeDWfJ02XzLvob8BELMMQUgEV0StrqtVLx4C75YnHR51nIi1WWSLTetDoLKe_ZkHdhg2CEnY32KSBMpaWUoP14QawrUJKi-IXx4llEkbQQ1KHLlbmZlJMD3oBCk3i_bIg7-b9bIMjSJJ8DThW5COT4pMf-RCJkNYaNd9k1fnq_XMhj1XYqwBinLdD8L2PHXdRKozUgF-gP49c' },
  { id: 'monsoon', name: 'Monsoon', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBri-oNlYv-QQnCFPtnsZPWT9L46-g9WDwoxhyxR40OO9juBabbp-aGRlkDyEe8PXoVmUlpe-KIcMuWgrQ1Uawnds2Rh-n1LYCcYLsEwwW2GeRQgb1QuZiUor5ws8ovIuD5agJu0qntXwi7io2upnDAFZfTn9G8QdsgOfqYZVP7aabBV7TU5VFI5hX7d_J0927WdK9Bhabmjp34VsNND7VQCkxnmHl7gfCDuI_t-JXxeoVKOKhICjZJprK6GPT5SgFgYWt0x-qSaJc' },
  { id: 'new', name: 'New Launch', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD3qz_HjXzdbv0-9OjS2SFlAyBY0rAKgmm6qq6bFHUVNC1i2E8hS7jTZf1XBWvQFJm6lOwX35ywu8z1IKM6GGjjYG3R0_2itKUGUfMzD-FLFGPIIPqzoGTB5GM4LSH2lXbaxXHbuvWGZKGv0MLrEgFFyhacz25JZRIrwrk1eWnJb8OrsfA7hh4bFnHyFwR1dtDbfw8Np3uzJmhxqCNw0ik29hxvq47ufYVH79m_NyeDzJDF-roBh__jsIIldPu_X0ah-oL-pgHoYU' },
  { id: 'bestsellers', name: 'Bestsellers', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKUjk_c5UrUnKE4sjYFWHi47oTXsbgPYRKM5Fol58bbrnm2x0TROfKeRtdi79Euze28jNAb4P1u5q0hHmPCx6I-7jM4IhuMpggn14fOlSae12ZcMPVyqmWVk7WDa4ALOSVW37b1-KL62ENuB5JyYrXOfa61qsL64Gmv6ozZYzST4X4dOTLjUIixNGbCrVYqUgl0uGU4Fpxz7KbFrOn370TooeJJlE3KLeV0x7bP62Npejt-gazoMKEP8ftOnNc1DzS0dHsj7wN5Q' },
];

export const products: ProductData[] = [
  {
    id: 'squalane-glow',
    name: 'Squalane Glow Crème with Vitamin C',
    price: 549,
    originalPrice: 650,
    rating: 4.7,
    reviewCount: 1200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPpnj1B-HtSA0EDhVebQ20qhqwjrER2KPgRu1iVcIrFq3-V_GyN51PstQC8FdHWcimW_0Ga0AIKzkDuIt8Agf-bd5X1EjVlXHgzXMiFiWAwB3js11cMG1KkxRFd2G-hvQ1BEJR_WiZR-dz85JXREkQ1uZy8Spcez3KAh_BsMwihvdPETKRM44__-NO25QOlDi485ftfFIZ7SwFIR_eBAfEQL4h1M875Y8VBenbtrN28DTUHpp4RBjeivsplkWtek21u90J07Pcn5k',
    badge: 'B1G1',
    tag: '#1 IN SKINCARE',
    category: 'skin',
    description: 'The Squalane Glow Crème combines the power of Squalane and Vitamin C to deliver intense hydration and brightening benefits. This lightweight formula absorbs quickly, leaving your skin radiant and nourished.',
    howToUse: 'Apply a small amount to cleansed face and neck. Use morning and evening. Follow with sunscreen during the day.',
    sizes: [{ label: '50g', price: 549 }, { label: '100g', price: 899 }],
    whyLoveIt: [
      { title: 'Deep Hydration That Lasts', description: 'Squalane mimics skin\'s natural oils to lock in moisture without a greasy feel.' },
      { title: 'Brightens With Vitamin C', description: 'Stable Vitamin C helps fade dark spots and restore a healthy, radiant glow.' },
      { title: 'Lightweight Daily Formula', description: 'Absorbs quickly into skin, perfect for layering under makeup or sunscreen.' },
    ],
  },
  {
    id: 'redensyl-serum',
    name: 'Redensyl Hair Growth Serum',
    price: 795,
    originalPrice: 850,
    rating: 4.9,
    reviewCount: 2800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG9TkMPV0J6I5aRP-TcxbU7DIBlaWBrgdYGKyoZ1JMgmcXI7M3ZxHRQN_r_X_pJai29W6WZ8G-qqLNSKdq1-L83w0e7MAJK44ssmf5JNB7mkVLzBemX4ac_eQeXpE5hYQEzahLZbGZ-mHgtylkBkIchsvHXjhF3-0ogGsoevuBvx8leaAayuHI9rxbQjD7er-NZxRa9MBf3fMVUGDaEJbpM-DwRTqunK1Iu7UpL7mOw_-m-Jm2_aWB8B01PDCKxelkqxpkcdiriQU',
    category: 'hair',
    description: 'Clinically proven Redensyl formula that stimulates hair follicles and promotes healthy hair growth.',
    howToUse: 'Apply 2-3 drops to scalp and massage gently. Use daily for best results.',
    whyLoveIt: [
      { title: 'Clinically Proven Redensyl', description: 'Redensyl activates stem cells in hair follicles to promote thicker, fuller hair growth.' },
      { title: 'Reduces Hair Fall', description: 'Strengthens hair roots and reduces breakage with regular use over 4–6 weeks.' },
      { title: 'Non-Greasy Scalp Serum', description: 'Lightweight formula absorbs quickly without leaving residue or weighing hair down.' },
    ],
  },
  {
    id: 'salicylic-wash',
    name: 'Salicylic Acid Face Wash',
    price: 350,
    originalPrice: 400,
    rating: 4.5,
    reviewCount: 950,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeG0V-ikZZkKcG0tY0j97_FRhTCEyDysp-n_lREvZhURKV9XbpQLaRi1MPR1LGgpZcBtn7KXUGVF-3y3RhUiRbN14divq-0W_lP3RagHo95AZ5nO4tl1FKKHEF1N2z8JNDznWpy-co1l_IAGxmAl3fTFju5axdr1LocZ7x6s1v3Yq6IPLBAXsh7CloUEPA2U22UNx86qehp_99wdRJSvbyavhzW8jojVWNudBgmLzD78MxtYHRpnBOxp_WBBIj-oqr9vCe5bJoZs0',
    badge: 'B1G1',
    category: 'skin',
    description: 'Gentle yet effective salicylic acid cleanser that unclogs pores and fights acne.',
    howToUse: 'Wet face, apply a small amount, massage gently, and rinse with water.',
    whyLoveIt: [
      { title: 'Unclogs Pores Fast', description: '2% Salicylic Acid penetrates deep into pores to dissolve oil and clear congestion.' },
      { title: 'Fights Active Acne', description: 'Antibacterial action reduces breakouts and prevents new blemishes from forming.' },
      { title: 'Gentle Enough For Daily Use', description: 'Balanced pH formula cleanses thoroughly without stripping the skin barrier.' },
    ],
  },
  {
    id: 'vitamin-c-serum',
    name: '10% Vitamin C Face Serum for Glowing Skin',
    price: 645,
    originalPrice: 850,
    rating: 4.6,
    reviewCount: 5476,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB_GUCagF4PllN6tYIUeDyBcVLBdNBtAIeQaBTmmnXzVIuCtxlm7RGr-svEBNpucCstjcuyk3ba0SzpGCNIOAhBlgqCNrQzp_tSVQiGIU9dDhOu-x9WxWerZGhJH7C_1BY9QGxSCMFLbqpI4ZXdVmYYGOFxHIptiisGyJe1wg2_8Tb-_6neaL6Upje8FeBRtwzlrsPjZaowRp3H8tbEN53A_MJD_4S1wk1g7sfniGn1I34OOSizPr7PmXH6i6F_Zy7ZVS45cJj_14',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBB_GUCagF4PllN6tYIUeDyBcVLBdNBtAIeQaBTmmnXzVIuCtxlm7RGr-svEBNpucCstjcuyk3ba0SzpGCNIOAhBlgqCNrQzp_tSVQiGIU9dDhOu-x9WxWerZGhJH7C_1BY9QGxSCMFLbqpI4ZXdVmYYGOFxHIptiisGyJe1wg2_8Tb-_6neaL6Upje8FeBRtwzlrsPjZaowRp3H8tbEN53A_MJD_4S1wk1g7sfniGn1I34OOSizPr7PmXH6i6F_Zy7ZVS45cJj_14',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfurSj2oWEGNj4wQvMPtXh2Jb1b3c0RM8GCpmjJ5IFQaFIvNnYawzmAloCwBln8E390mVbzowGrpm-olxCGS4OH2CSt1eC7pS2R_nK3Y0hI5v2rlfx8EseJKMw6Lpl5azPYPyZcLiGGThp0GChVHh6bOdWyl08rZnTkx6svhUdAWWsHbj52v7hwnFBodlqrVKyixXi2JH-qjiwrkViOvPUwaC5L2ssElfn4nhYHSWLtrs0HzmJuKF0yMmUuvjcDiqk8L1fRJN7TzE',
    ],
    badge: 'BESTSELLER',
    category: 'skin',
    description: 'Clinically proven formula with 10% Vitamin C and Kakadu Plum for brighter, more even skin tone. Enriched with Hyaluronic Acid for deep hydration.',
    howToUse: 'Apply 3-4 drops to cleansed face in your AM routine. Follow with moisturizer and sunscreen.',
    sizes: [{ label: '30ml', price: 645 }, { label: '50ml', price: 950 }],
    whyLoveIt: [
      { title: 'Glowing, Brighter Skin in 5 Days*', description: 'Advanced formula with 10% Vitamin C brightens and evens skin tone with consistent use.' },
      { title: 'Melanin Blocking Technology', description: 'Targets melanin production at the source to reduce dark spots and hyperpigmentation.' },
      { title: 'Gentle Formula For Sensitive Skin', description: 'Fragrance-free, non-comedogenic, suitable for all skin types including sensitive skin.' },
    ],
  },
  {
    id: 'serum-primer',
    name: 'Oh-the-Glow Serum Primer',
    price: 695,
    originalPrice: 795,
    rating: 4.4,
    reviewCount: 420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC_htwrrzNno9mrZGXHlhlCCyXIv-RBUQDLma9JshFul7MtH7JUMhuQRP525eViE7czJad4TxYAWWp_YPcM5DPRC3iHPaorva7CRW8eNzuhIHNHi_2ZpFIgTZyPDUI79Rr1k8GehzGav0KJ0Wa_UhRFVNexd_nfHty76Y1k00ftaXB-0GnDUAbzonLYOgyf5d3CX3Q22svFaJXmu1bYkh1xhnW7wKqw7PUGY_pI38WZLG8wUwKOhFYw1M6qafp8jaqYYtBKCxHN50',
    category: 'makeup',
    description: 'Skincare-infused primer that creates a smooth, glowing base for makeup.',
    howToUse: 'Apply evenly to face before foundation or wear alone for a natural glow.',
    whyLoveIt: [
      { title: 'Skincare Meets Makeup', description: 'Niacinamide and hyaluronic acid nourish skin while creating a smooth canvas for makeup.' },
      { title: 'Instant Glow Effect', description: 'Light-reflecting particles give skin a luminous, dewy finish from the first application.' },
      { title: 'Extends Makeup Wear', description: 'Grip technology helps foundation last longer without creasing or fading.' },
    ],
  },
  {
    id: 'dreamy-foundation',
    name: 'Dreamy Skin Foundation',
    price: 850,
    originalPrice: 950,
    rating: 4.3,
    reviewCount: 310,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsZCGfx-BobGY0VrrvA_MWQseJIHEMPah_SSJZT5-sE99Xxzhe3GrrEUI3JMU-a66r6Bi__B3o8jpPUwaLg27Evp8rGr7H_Bp9jMMnQRaLjXxKBFLxfiZM5Je_tYiD2QxOrv2vKHjioWnia3-8deZR-47GGTVc3rAuG2xCXYpa3r1BV-kuHQ35hM_jRxG692r0ymxg1cAr5ZOnvTFNvOgLbcVSWGnfT81_EqLc85xZqDZ_ZeuAis2Mcm-feUBABgb0CJgT8SJ3R8M',
    category: 'makeup',
    description: 'Lightweight foundation with skincare benefits for a dreamy, natural finish.',
    howToUse: 'Apply with fingers or brush, blending outward from center of face.',
    whyLoveIt: [
      { title: 'Buildable Medium Coverage', description: 'Layerable formula covers imperfections while still looking like natural skin.' },
      { title: 'Infused With Skincare', description: 'SPF 15 and antioxidants protect and nourish skin throughout the day.' },
      { title: 'All-Day Comfortable Wear', description: 'Breathable, non-cakey finish that stays fresh for up to 12 hours.' },
    ],
  },
];

export const celebPicks: CelebPick[] = [
  { id: 'manisha', name: 'Manisha', image: 'https://ui-avatars.com/api/?name=Manisha&background=006876&color=fff' },
  { id: 'jennifer', name: 'Jennifer', image: 'https://ui-avatars.com/api/?name=Jennifer&background=006876&color=fff', featured: true },
  { id: 'rashmika', name: 'Rashmika', image: 'https://ui-avatars.com/api/?name=Rashmika&background=006876&color=fff' },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Ananya S.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5yimn4tJuhXA9HwcnF7C9LMs1faRKG9J9K9gk8loubBXMpWTBeaoSPHTMatXvSs2Sni3HNRS_hQj2n_-6sHxr19zOF0dcmKGHHwpLLNLzh9ndIdKe0NBnGmg998e2bhYebTotpUwvptZ26VeeeOtwJJNopW5xPYGAxcFdmHRx-P4J7Erv2Fwv50WGJUBfHVnnV0gFaSi9KX-_WGFHPDiT0y6Pop2wG8udY8Yk01WHWN5UVEvwc6-qzuVVxhEEjrAIXclNcoij3ss',
    rating: 5,
    text: 'The Squalane Glow Crème is literally magic in a bottle. My dark spots faded in just 3 weeks!',
  },
  {
    id: '2',
    author: 'Rohan V.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnb4kUJGsIcxJGxgxB4t4WhXoRIQMDycp--UvvUp_YXMReXqArwHUhd8MVRxxfOonc_0xcPOPHFUuxPwnbeomt-UUh_qR06dEWxpSlATpjbdsHAZlmnWLImhDXV0RxxS67RHyFIjyOLFxOa_QdZY4dTF7FWS_-XO8DEa1TbntUQu2k3W3x9GYwsm-yV_L-hGS_OJJ6HyRFzWHpfmz1AuRI-TJaly_XurUJ7Smn5yZfoqACFlZk9QXAR9wTpWeJ8H6Am4Qkbf-d3ak',
    rating: 5,
    text: 'Hair growth serum actually works! Seeing baby hairs in my receding hairline after a month.',
  },
];

export const featuredLogos = ['TIMES OF INDIA', 'GRAZIA', 'COSMOPOLITAN', 'YourStory'];

export const offers: Offer[] = [
  { id: 'b2g2', title: 'Buy 2 Get 2 FREE', description: 'Add any 4 items to cart & pay for 2. Use Code: B2G2', icon: 'local-offer' },
  { id: 'b3g3', title: 'Buy 3 Get 3 FREE', description: 'Stock up on your favorites. Use Code: B3G3', icon: 'redeem' },
];

export const dealCards: DealCard[] = [
  { id: 'deal1', title: 'Unlocked: ₹150 Off!', description: 'Add items worth ₹500 more to unlock this special voucher.', unlocked: true },
  { id: 'deal2', title: 'Buy 2 Get 1 FREE', description: 'Add 1 more Squalane series product to cart.', unlocked: false },
];

export const ratingDistribution = [
  { stars: 5, percent: 75 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 2 },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Priya M.',
    avatar: 'https://ui-avatars.com/api/?name=Priya&background=006876&color=fff',
    rating: 5,
    text: 'Amazing serum! My skin looks so much brighter after 2 weeks of use.',
    productId: 'vitamin-c-serum',
  },
];

export const accordionItems = [
  {
    id: 'radiance',
    title: 'Glowing, Brighter Skin in 5 Days*',
    icon: 'flare',
    description: 'Advanced formula with 10% Vitamin C brightens and evens skin tone with consistent use.',
    content: 'Advanced formula with 10% Vitamin C brightens and evens skin tone with consistent use.',
  },
  {
    id: 'darkspots',
    title: 'Melanin Blocking Technology',
    icon: 'verified-user',
    description: 'Targets melanin production at the source to reduce dark spots and hyperpigmentation.',
    content: 'Targets melanin production at the source to reduce dark spots and hyperpigmentation.',
  },
  {
    id: 'hydrate',
    title: 'Gentle Formula For Sensitive Skin',
    icon: 'water-drop',
    description: 'Fragrance-free, non-comedogenic, suitable for all skin types including sensitive skin.',
    content: 'Fragrance-free, non-comedogenic, suitable for all skin types including sensitive skin.',
  },
];

export const pilgrimCodeItems = [
  { icon: 'eco', label: 'Natural Ingredients' },
  { icon: 'biotech', label: 'Derma-Tested' },
  { icon: 'verified', label: 'FDA Approved' },
  { icon: 'cruelty-free', label: '100% Vegan' },
  { icon: 'science', label: 'No Toxic Chemicals' },
  { icon: 'recycling', label: 'Plastic Positive' },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
