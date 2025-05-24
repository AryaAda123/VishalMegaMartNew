import { useState, useEffect, useRef } from 'react'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCartPage, setShowCartPage] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignupPage, setShowSignupPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const cartRef = useRef(null);
  const searchRef = useRef(null);

  // Updated product list with verified images and correct categories
  const products = [
    {
      id: 1,
      name: "Sony WH-1000XM4 Wireless Headphones",
      category: "electronics",
      price: 29999,
      discountPrice: 24999,
      image: "https://rukminim2.flixcart.com/image/416/416/kj0bp8w0/headphone/d/p/k/wh-1000xm4-sony-original-imafyz9egfbtmggm.jpeg",
      rating: 4.5,
      featured: true
    },
    {
      id: 2,
      name: "Fossil Grant Chronograph Men's Watch",
      category: "accessories",
      price: 12995,
      discountPrice: 8995,
      image: "https://rukminim2.flixcart.com/image/832/832/jvsf3ww0/watch/z/h/9/fs5151-fossil-original-imafgmkzhgbyyhh3.jpeg",
      rating: 4.2,
      featured: true
    },
    {
      id: 4,
      name: "JBL Flip 5 Portable Bluetooth Speaker",
      category: "electronics",
      price: 9999,
      discountPrice: 7499,
      image: "https://rukminim2.flixcart.com/image/416/416/k6fd47k0/speaker/mobile-tablet-speaker/9/h/z/jbl-flip-5-original-imafzvhcgmfzgydf.jpeg",
      rating: 4.8,
      featured: true
    },
    {
      id: 5,
      name: "Hidesign Leather Wallet For Men",
      category: "accessories",
      price: 2499,
      discountPrice: 1799,
      image: "https://rukminim2.flixcart.com/image/832/832/kkfrjww0/wallet-card-wallet/z/q/n/dc225-201-haws10013-wallet-hidesign-original-imafzsfsj7pfmpnx.jpeg",
      rating: 4.1,
      featured: false
    },
    {
      id: 6,
      name: "Apple Watch Series 7 GPS",
      category: "electronics",
      price: 41900,
      discountPrice: 36900,
      image: "https://rukminim2.flixcart.com/image/416/416/kuk4u4w0/smartwatch/p/g/x/mkn53hn-a-apple-original-imag7nyyhh7q9fgz.jpeg",
      rating: 4.7,
      featured: true
    },
    {
      id: 7,
      name: "American Tourister Backpack",
      category: "fashion",
      price: 2199,
      discountPrice: 1299,
      image: "https://rukminim2.flixcart.com/image/832/832/jwxuvm80/backpack/s/9/y/amt-fizz-sch-bag-03-blue-ff9-0-01-002-backpack-american-original-imafhhczgzhvj8fw.jpeg",
      rating: 4.3,
      featured: false
    },
    {
      id: 8,
      name: "Nike Air Zoom Pegasus Running Shoes",
      category: "fashion",
      price: 9995,
      discountPrice: 7995,
      image: "https://rukminim2.flixcart.com/image/832/832/juwzf680/shoe/j/y/n/ar4561-068-7-5-nike-black-white-thunder-grey-bright-crimson-original-imaffnuy4bykyhdy.jpeg",
      rating: 4.6,
      featured: true
    },
    {
      id: 9,
      name: "Samsung Galaxy S23 Ultra 5G",
      category: "electronics",
      price: 124999,
      discountPrice: 99999,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/2/s/7/-original-imagmg6gktts6sfy.jpeg",
      rating: 4.9,
      featured: true
    },
    {
      id: 10,
      name: "HP Pavilion Gaming Laptop",
      category: "electronics",
      price: 72990,
      discountPrice: 59990,
      image: "https://rukminim2.flixcart.com/image/416/416/keaaavk0/computer/x/m/y/hp-na-laptop-original-imafuzt8r5jqppfn.jpeg",
      rating: 4.7,
      featured: true
    },
    {
      id: 11,
      name: "Tata Sampann Toor Dal",
      category: "grocery",
      price: 369,
      discountPrice: 319,
      image: "https://rukminim2.flixcart.com/image/416/416/kqidx8w0/pulses/r/4/4/1-unpolished-toor-dal-arhar-dal-tata-sampann-original-imag4gb8r7jwftgf.jpeg",
      rating: 4.5,
      featured: false
    },
    {
      id: 12,
      name: "Saffola Gold Refined Oil",
      category: "grocery",
      price: 249,
      discountPrice: 199,
      image: "https://rukminim2.flixcart.com/image/416/416/l0fm07k0/edible-oil/7/u/u/-original-imagc8f9xtvscrey.jpeg",
      rating: 4.6,
      featured: false
    },
    {
      id: 13,
      name: "Morphy Richards Coffee Maker",
      category: "homeappliances",
      price: 4995,
      discountPrice: 3499,
      image: "https://rukminim2.flixcart.com/image/416/416/jzmw3rk0/coffee-maker/h/w/v/morphy-richards-europa-espresso-cappuccino-4-cups-coffee-maker-original-imafjkgcrnhbmt48.jpeg",
      rating: 4.3,
      featured: true
    },
    {
      id: 14,
      name: "Samsung 28L Convection Microwave Oven",
      category: "homeappliances",
      price: 16990,
      discountPrice: 12490,
      image: "https://rukminim2.flixcart.com/image/416/416/jtnqvm80/microwave-new/z/j/7/ce1041dsb2-tlb-samsung-original-imafdsyaytr8hg7y.jpeg",
      rating: 4.2,
      featured: false
    },
    {
      id: 15,
      name: "Lakme Absolute Face Serum Foundation",
      category: "beauty",
      price: 899,
      discountPrice: 699,
      image: "https://rukminim2.flixcart.com/image/416/416/kosxzm80/foundation/j/z/g/20-ml-9-to-5-weightless-mousse-foundation-lakme-original-imag36335gz4hxnb.jpeg",
      rating: 4.8,
      featured: false
    },
    {
      id: 17,
      name: "Nilkamal Winner Chair",
      category: "furniture",
      price: 2500,
      discountPrice: 1799,
      image: "https://rukminim2.flixcart.com/image/416/416/km9ht3k0/office-study-chair/j/b/y/pp-polypropylene-swd-7-nilkamal-original-imagf7dpedktvnz7.jpeg",
      rating: 4.5,
      featured: true
    },
    {
      id: 18,
      name: "Urban Ladder Sofa 3 Seater",
      category: "furniture",
      price: 39999,
      discountPrice: 34999,
      image: "https://rukminim2.flixcart.com/image/416/416/jlqwpe80-1/sofa-sectional/9/z/u/blue-polyester-palermo-urban-ladder-blue-original-imaf8t6ywxfbk9jz.jpeg",
      rating: 4.7,
      featured: true
    },
    {
      id: 20,
      name: "Webby Remote Control Racing Car",
      category: "toys",
      price: 1999,
      discountPrice: 1299,
      image: "https://rukminim2.flixcart.com/image/416/416/kgiaykw0/remote-control-toy/x/y/q/remote-control-car-1-20-scale-with-rechargeable-batteries-original-imafwqhggpwzezph.jpeg",
      rating: 4.1,
      featured: false
    },
    {
      id: 21,
      name: "Adidas Training Yoga Mat",
      category: "sports",
      price: 2199,
      discountPrice: 1799,
      image: "https://rukminim2.flixcart.com/image/416/416/jxdkpzk0/sport-mat/n/g/r/training-mat-12mm-adidas-original-imafhu9hvvhzcfed.jpeg",
      rating: 4.6,
      featured: false
    },
    {
      id: 22,
      name: "Lifelong Fitness Cast Iron Dumbbells",
      category: "sports",
      price: 1999,
      discountPrice: 1599,
      image: "https://rukminim2.flixcart.com/image/416/416/jw0zr0w0/dumbbell/8/a/w/pvc-combo16-na-8-flx2-8kg-combo-fitbox-original-imafgshfsxykgy6g.jpeg",
      rating: 4.8,
      featured: true
    },
    {
      id: 23,
      name: "Prestige Omega Deluxe Cookware Set",
      category: "kitchen",
      price: 2995,
      discountPrice: 2295,
      image: "https://rukminim2.flixcart.com/image/416/416/jt4olu80/pot-pan/y/r/h/omega-deluxe-granite-byz-prestige-original-imafejwfrjhcvjuk.jpeg",
      rating: 4.7,
      featured: true
    },
    {
      id: 24,
      name: "Victorinox Chef's Knife",
      category: "kitchen",
      price: 2499,
      discountPrice: 1999,
      image: "https://rukminim2.flixcart.com/image/416/416/knife/p/g/j/5-2063-20-victorinox-original-imaef376rpfkhmt8.jpeg",
      rating: 4.5,
      featured: false
    },
    {
      id: 25,
      name: "Harry Potter Box Set Complete Collection",
      category: "books",
      price: 3999,
      discountPrice: 2799,
      image: "https://rukminim2.flixcart.com/image/416/416/kplisnk0/book/l/l/t/harry-potter-box-set-the-complete-collection-children-s-original-imag3shevuu2d9wr.jpeg",
      rating: 4.4,
      featured: false
    },
    {
      id: 27,
      name: "Lavie Women's Handbag",
      category: "fashion",
      price: 2499,
      discountPrice: 1499,
      image: "https://rukminim2.flixcart.com/image/832/832/jpr86fk0/hand-messenger-bag/s/v/b/ss19cb227d-camel-ss19cb227d-camel-shoulder-bag-lavie-original-imafbzczbuxgf4dt.jpeg",
      rating: 4.3,
      featured: true
    },
    {
      id: 28,
      name: "Arrow Men's Formal Shirt",
      category: "fashion",
      price: 2499,
      discountPrice: 1399,
      image: "https://rukminim2.flixcart.com/image/832/832/kqgyhe80/shirt/z/i/h/39-arfw1785-arrow-original-imag4hy9b2kf2pjj.jpeg",
      rating: 4.4,
      featured: false
    },
    {
      id: 29,
      name: "boAt Airdopes 141 Bluetooth Earbuds",
      category: "electronics",
      price: 4490,
      discountPrice: 1299,
      image: "https://rukminim2.flixcart.com/image/416/416/l4hcx3k0/headphone/b/f/2/-original-imagfdeqab29wfph.jpeg",
      rating: 4.6,
      featured: true
    },
    {
      id: 31,
      name: "Samsung Galaxy F54 5G",
      category: "electronics",
      price: 29999,
      discountPrice: 24999,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/a/k/-original-imagqhyfh7ykyjby.jpeg",
      rating: 4.3,
      featured: true
    },
    {
      id: 32,
      name: "Apple iPhone 14",
      category: "electronics",
      price: 79900,
      discountPrice: 69900,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/9/e/e/-original-imaghx9q5rvcdghy.jpeg",
      rating: 4.7,
      featured: true
    },
    {
      id: 33,
      name: "ASUS TUF Gaming F15 Core i5 Laptop",
      category: "electronics",
      price: 74990,
      discountPrice: 54990,
      image: "https://rukminim2.flixcart.com/image/416/416/l0fm07k0/computer/c/s/i/-original-imagc7ktkz37ugpf.jpeg",
      rating: 4.3,
      featured: true
    },
    {
      id: 34,
      name: "Men's Checkered Cotton Casual Shirt",
      category: "fashion",
      price: 999,
      discountPrice: 379,
      image: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/g/b/q/xl-st2-vebnor-original-imagqwxfm9zgs8fg.jpeg",
      rating: 4.1,
      featured: false
    },
    {
      id: 35,
      name: "Recliner 3 Seater Sofa",
      category: "furniture",
      price: 49999,
      discountPrice: 22999,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/recliner/y/o/t/2-seater-77-5-maroon-101-5-birla-fabric-manual-recliner-original-imagpgf9qhh5myz7.jpeg",
      rating: 4.4,
      featured: true
    },
    {
      id: 36,
      name: "LG 190L Direct Cool Refrigerator",
      category: "homeappliances",
      price: 18990,
      discountPrice: 14490,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/refrigerator-new/j/x/v/-original-imagqf7vjwh74hey.jpeg",
      rating: 4.4,
      featured: true
    },
    {
      id: 37,
      name: "HAVELLS EURO-II 1200mm Ceiling Fan",
      category: "homeappliances",
      price: 2595,
      discountPrice: 1549,
      image: "https://rukminim2.flixcart.com/image/416/416/kzhbfrk0/fan/e/b/p/euro-ii-new-havells-original-imagbhzjgjagzkkr.jpeg",
      rating: 4.1,
      featured: false
    },
    {
      id: 42,
      name: "Maybelline Fit Me Matte Foundation",
      category: "beauty",
      price: 549,
      discountPrice: 384,
      image: "https://rukminim2.flixcart.com/image/416/416/ktx9si80/foundation/r/b/u/fit-me-matte-poreless-liquid-foundation-maybelline-new-york-original-imag75kzmmghfvbs.jpeg",
      rating: 4.4,
      featured: true
    },
    {
      id: 44,
      name: "Noise ColorFit Ultra 2 Smartwatch",
      category: "electronics",
      price: 5999,
      discountPrice: 2499,
      image: "https://rukminim2.flixcart.com/image/416/416/kzogn0w0/smartwatch/u/p/c/1-45-android-ios-colorfit-ultra-2-noise-original-imagbmyghhbthcbr.jpeg",
      rating: 4.2,
      featured: true
    },
    {
      id: 47,
      name: "OnePlus Nord 2T 5G",
      category: "electronics",
      price: 28999,
      discountPrice: 24999,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/0/8/4/-original-imagmeepbghjgudm.jpeg",
      rating: 4.3,
      featured: true
    },
    {
      id: 48,
      name: "Lenovo IdeaPad Slim 3 Laptop",
      category: "electronics",
      price: 43990,
      discountPrice: 33990,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/computer/r/6/n/-original-imagpxgqesgrthks.jpeg",
      rating: 4.2,
      featured: false
    }
  ];

  // Additional products from Flipkart
  const moreProducts = [
    {
      id: 31,
      name: "Samsung Galaxy F54 5G (Stardust Silver, 8GB RAM, 256GB)",
      category: "electronics",
      price: 29999,
      discountPrice: 24999,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/a/k/-original-imagqhyfh7ykyjby.jpeg",
      rating: 4.3,
      featured: true
    },
    {
      id: 32,
      name: "APPLE iPhone 14 (Midnight, 128 GB)",
      category: "electronics",
      price: 79900,
      discountPrice: 69900,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/9/e/e/-original-imaghx9q5rvcdghy.jpeg",
      rating: 4.7,
      featured: true
    },
    {
      id: 33,
      name: "ASUS TUF Gaming F15 Core i5 11th Gen",
      category: "electronics",
      price: 74990,
      discountPrice: 54990,
      image: "https://rukminim2.flixcart.com/image/416/416/l0fm07k0/computer/c/s/i/-original-imagc7ktkz37ugpf.jpeg",
      rating: 4.3,
      featured: true
    },
    {
      id: 34,
      name: "Men Regular Fit Checkered Button Down Collar Casual Shirt",
      category: "fashion",
      price: 999,
      discountPrice: 379,
      image: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/g/b/q/xl-st2-vebnor-original-imagqwxfm9zgs8fg.jpeg",
      rating: 4.1,
      featured: false
    },
    {
      id: 35,
      name: "Premium Recliner Sofa (3 Seater)",
      category: "furniture",
      price: 49999,
      discountPrice: 22999,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/recliner/y/o/t/2-seater-77-5-maroon-101-5-birla-fabric-manual-recliner-original-imagpgf9qhh5myz7.jpeg",
      rating: 4.4,
      featured: true
    },
    {
      id: 36,
      name: "LG 190 L Direct Cool Single Door Refrigerator",
      category: "homeappliances",
      price: 18990,
      discountPrice: 14490,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/refrigerator-new/j/x/v/-original-imagqf7vjwh74hey.jpeg",
      rating: 4.4,
      featured: true
    },
    {
      id: 37,
      name: "HAVELLS EURO-II 1200mm Ceiling Fan",
      category: "homeappliances",
      price: 2595,
      discountPrice: 1549,
      image: "https://rukminim2.flixcart.com/image/416/416/kzhbfrk0/fan/e/b/p/euro-ii-new-havells-original-imagbhzjgjagzkkr.jpeg",
      rating: 4.1,
      featured: false
    },
    {
      id: 38,
      name: "Tata Sampann Unpolished Toor Dal/Arhar Dal",
      category: "grocery",
      price: 369,
      discountPrice: 215,
      image: "https://rukminim2.flixcart.com/image/416/416/kqidx8w0/pulses/r/4/4/1-unpolished-toor-dal-arhar-dal-tata-sampann-original-imag4gb8r7jwftgf.jpeg",
      rating: 4.3,
      featured: true
    },
    {
      id: 39,
      name: "MAMMON Genuine Leather Wallet for Men",
      category: "accessories",
      price: 999,
      discountPrice: 299,
      image: "https://rukminim2.flixcart.com/image/832/832/jxw5g280/wallet-card-wallet/v/t/r/wallet-wallet-1-gs-original-imafgbymyqyt5mw8.jpeg",
      rating: 4.2,
      featured: false
    },
    {
      id: 40,
      name: "Bajaj Pulsar NS200 Bike",
      category: "vehicles",
      price: 155000,
      discountPrice: 145000,
      image: "https://rukminim2.flixcart.com/image/416/416/jkmriw80/motorcycle/v/8/s/ns-200-fi-abs-pulsar-bajaj-original-imaf7y9avbhrp9pr.jpeg",
      rating: 4.5,
      featured: true
    },
    {
      id: 41,
      name: "Honda Activa 6G Scooter",
      category: "vehicles",
      price: 75000,
      discountPrice: 72000,
      image: "https://rukminim2.flixcart.com/image/416/416/k76igcw0/scooter-moped/n/9/v/6g-125-std-dlx-6g-honda-original-imafpgbsbrvfmggr.jpeg",
      rating: 4.6,
      featured: true
    },
    {
      id: 42,
      name: "Maybelline New York Fit Me Matte Foundation",
      category: "beauty",
      price: 549,
      discountPrice: 384,
      image: "https://rukminim2.flixcart.com/image/416/416/ktx9si80/foundation/r/b/u/fit-me-matte-poreless-liquid-foundation-maybelline-new-york-original-imag75kzmmghfvbs.jpeg",
      rating: 4.4,
      featured: true
    },
    {
      id: 43,
      name: "LEGO Star Wars Millennium Falcon Building Kit",
      category: "toys",
      price: 14999,
      discountPrice: 11999,
      image: "https://rukminim2.flixcart.com/image/416/416/k6pd7680/block-construction/q/g/m/star-wars-millennium-falcon-75257-lego-original-imafp2ggpayw4hy3.jpeg",
      rating: 4.7,
      featured: true
    },
    {
      id: 44,
      name: "Noise ColorFit Ultra 2 Smartwatch",
      category: "electronics",
      price: 5999,
      discountPrice: 2499,
      image: "https://rukminim2.flixcart.com/image/416/416/kzogn0w0/smartwatch/u/p/c/1-45-android-ios-colorfit-ultra-2-noise-original-imagbmyghhbthcbr.jpeg",
      rating: 4.2,
      featured: true
    },
    {
      id: 45,
      name: "Flight Ticket Delhi to Mumbai",
      category: "travel",
      price: 5400,
      discountPrice: 4200,
      image: "https://rukminim2.flixcart.com/image/416/416/kdkkdjk0/travel-booking-card/n/z/v/domestic-flight-ticket-booking-cleartrip-original-imafugxagzjgkk8h.jpeg",
      rating: 4.1,
      featured: true
    },
    {
      id: 46,
      name: "Tour Package: Goa Beach Vacation (3N/4D)",
      category: "travel",
      price: 15999,
      discountPrice: 12999,
      image: "https://rukminim2.flixcart.com/image/416/416/k4hcjgw0/travel-booking-card/h/d/n/3n-4d-goa-beach-vacation-package-mmttrip-original-imafnbfd9zbvyf7g.jpeg",
      rating: 4.3,
      featured: true
    }
  ];

  // Use a merged array of products for the site
  const allProducts = [...products, ...moreProducts];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'grocery', name: 'Grocery & Staples' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'furniture', name: 'Home & Furniture' },
    { id: 'homeappliances', name: 'Appliances' },
    { id: 'beauty', name: 'Beauty & Personal Care' },
    { id: 'toys', name: 'Toys & Games' },
    { id: 'sports', name: 'Sports & Fitness' },
    { id: 'kitchen', name: 'Kitchen Essentials' },
    { id: 'books', name: 'Books & Stationery' },
    { id: 'travel', name: 'Travel' },
    { id: 'vehicles', name: 'Two Wheelers' }
  ];

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Reset search term
  const clearSearch = () => {
    setSearchTerm('');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  // Add to cart function with real cart functionality
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if product already in cart
        return prevItems.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
      } else {
        // Add new product to cart
        return [...prevItems, {...product, quantity: 1}];
      }
    });
    
    // Show notification
    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 2000);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? {...item, quantity: newQuantity} 
          : item
      )
    );
  };

  // Calculate total cart items
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.quantity, 
    0
  ).toFixed(2);

  // Filter products based on category and search term
  const filteredProducts = allProducts
    .filter(product => activeCategory === 'all' || product.category === activeCategory)
    .filter(product => 
      searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle cart page
  const viewCartPage = () => {
    setShowCart(false);
    setShowCartPage(true);
    setShowAllProducts(false);
    setShowContactPage(false);
  };

  // Go back to shopping
  const continueShopping = () => {
    setShowCartPage(false);
    setShowAllProducts(false);
    setShowContactPage(false);
  };

  // Proceed to checkout
  const checkout = () => {
    alert('Thank you for your purchase!');
    setCartItems([]);
    setShowCartPage(false);
    setShowContactPage(false);
  };

  // View all products
  const viewAllProducts = () => {
    setShowAllProducts(true);
    setShowCartPage(false);
    setShowContactPage(false);
  };
  
  // Back to home
  const backToHome = () => {
    setShowAllProducts(false);
    setShowContactPage(false);
  };
  
  // View contact page
  const viewContactPage = () => {
    setShowContactPage(true);
    setShowAllProducts(false);
    setShowCartPage(false);
  };

  // Login functions
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    // In a real app, you would verify credentials with a backend
    // For this demo, we'll just accept any valid-looking input
    if (email && password) {
      setIsLoggedIn(true);
      setUserInfo({
        name: email.split('@')[0],
        email: email
      });
      setShowLoginPage(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    // In a real app, you would register the user with a backend
    // For this demo, we'll just accept any valid-looking input
    if (name && email && password) {
      setIsLoggedIn(true);
      setUserInfo({
        name: name,
        email: email
      });
      setShowSignupPage(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  // View login page
  const viewLoginPage = () => {
    setShowLoginPage(true);
    setShowSignupPage(false);
    setShowCartPage(false);
    setShowAllProducts(false);
    setShowContactPage(false);
  };

  // View signup page
  const viewSignupPage = () => {
    setShowSignupPage(true);
    setShowLoginPage(false);
    setShowCartPage(false);
    setShowAllProducts(false);
    setShowContactPage(false);
  };

  return (
    <div className="font-sans antialiased text-gray-900">
      {!showCartPage && !showAllProducts && !showContactPage && !showLoginPage && !showSignupPage ? (
        // Main shop content
        <>
          {/* Header with added All Products link */}
          <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">
                  <span className="text-blue-600">VISHAL</span>
                  <span className="text-green-600">MEGA</span>
                  <span className="text-orange-500">MART</span>
                  <span className="text-red-500">NEW</span>
                </h1>
              </div>
              
              {/* Search Box */}
              <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    ref={searchRef}
                  />
                  {searchTerm && (
                    <button 
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              
              <div className="md:hidden relative z-50">
                <button 
                  className="flex flex-col justify-between w-6 h-5 focus:outline-none"
                  onClick={toggleMenu}
                >
                  <span className={`h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
              </div>
              
              <nav className={`${menuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent shadow-lg md:shadow-none z-40 md:z-auto`}>
                <ul className="flex flex-col md:flex-row md:items-center py-4 md:py-0 px-4 md:px-0">
                  <li className="mb-2 md:mb-0 md:mr-6"><a href="#home" className="block text-blue-600 hover:text-blue-800 font-medium">Home</a></li>
                  <li className="mb-2 md:mb-0 md:mr-6"><a href="#products" className="block text-gray-700 hover:text-blue-600">Products</a></li>
                  <li className="mb-2 md:mb-0 md:mr-6"><a href="#categories" className="block text-gray-700 hover:text-blue-600">Categories</a></li>
                  <li className="mb-2 md:mb-0 md:mr-6"><a href="#deals" className="block text-gray-700 hover:text-blue-600">Deals</a></li>
                  <li className="mb-2 md:mb-0 md:mr-6">
                    <button 
                      onClick={viewAllProducts}
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      All Products
                    </button>
                  </li>
                  <li className="mb-2 md:mb-0">
                    <button 
                      onClick={viewContactPage}
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      Contact
                    </button>
                  </li>
                  
                  {/* Mobile Search Box */}
                  <li className="mt-4 md:hidden">
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      {searchTerm && (
                        <button 
                          onClick={clearSearch}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </li>
                </ul>
              </nav>
              
              {/* Login/Account */}
              <div className="flex items-center">
                {isLoggedIn ? (
                  <div className="relative group mr-4">
                    <button className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-1">👤</span>
                      <span className="hidden md:inline">{userInfo.name}</span>
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg z-50 hidden group-hover:block">
                      <div className="p-3 border-b">
                        <p className="font-medium">{userInfo.name}</p>
                        <p className="text-sm text-gray-500">{userInfo.email}</p>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={viewLoginPage}
                    className="mr-4 text-gray-700 hover:text-blue-600 flex items-center"
                  >
                    <span className="mr-1">👤</span>
                    <span className="hidden md:inline">Login</span>
                  </button>
                )}
              
                <div className="relative flex items-center" ref={cartRef}>
                  <div className="relative cursor-pointer flex items-center" onClick={toggleCart}>
                    <span className="text-2xl">🛒</span>
                    <span className="hidden md:inline ml-1">Cart</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  
                  {/* Cart notification */}
                  {showCartNotification && (
                    <div className="absolute top-full right-0 mt-2 bg-green-100 text-green-800 py-2 px-4 rounded-md shadow-md whitespace-nowrap animate-fadeIn">
                      Item added to cart!
                    </div>
                  )}
                  
                  {/* Cart dropdown */}
                  {showCart && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 p-4 max-h-[80vh] overflow-auto">
                      <h3 className="font-bold text-lg mb-3">Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h3>
                      
                      {cartItems.length === 0 ? (
                        <p className="text-gray-500 py-3">Your cart is empty</p>
                      ) : (
                        <>
                          <div className="divide-y">
                            {cartItems.map(item => (
                              <div key={item.id} className="py-3 flex items-start">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-md mr-3" 
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <p className="text-blue-600">
                                    ${(item.discountPrice || item.price).toFixed(2)}
                                  </p>
                                  <div className="flex items-center mt-1">
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-6 h-6 flex items-center justify-center rounded-md"
                                    >
                                      -
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-6 h-6 flex items-center justify-center rounded-md"
                                    >
                                      +
                                    </button>
                                    <button 
                                      onClick={() => removeFromCart(item.id)}
                                      className="ml-auto text-red-500 hover:text-red-700"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between mb-4">
                              <span className="font-semibold">Total:</span>
                              <span className="font-bold">${cartTotal}</span>
                            </div>
                            <button 
                              onClick={viewCartPage}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mb-2 transition-colors duration-300"
                            >
                              View Cart
                            </button>
                            <button 
                              onClick={checkout}
                              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
                            >
                              Proceed to Checkout
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          
          {/* Category Navigation Bar with Dropdowns like Flipkart */}
          <div className="border-b shadow-sm bg-white">
            <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-3 overflow-x-auto flex-nowrap no-scrollbar">
              <div className="flex justify-center items-center flex-nowrap min-w-max">
                <div className="relative group category-dropdown mx-4">
                  <div className="flex flex-col items-center cursor-pointer">
                    <img src="https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png" alt="Grocery" className="w-10 h-10 object-contain" />
                    <span className="text-sm font-medium">Grocery</span>
                  </div>
                  <div className="absolute z-10 w-64 bg-white shadow-lg py-3 rounded-b-md hidden group-hover:block top-full mt-1 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('grocery')}>Dals & Pulses</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('grocery')}>Rice & Flour</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('grocery')}>Dry Fruits & Nuts</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('grocery')}>Edible Oils</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('grocery')}>Spices & Masalas</a>
                    </div>
                  </div>
                </div>
                
                <div className="relative group category-dropdown mx-4">
                  <div className="flex flex-col items-center cursor-pointer" onClick={() => setActiveCategory('electronics')}>
                    <img src="https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png" alt="Mobiles" className="w-10 h-10 object-contain" />
                    <span className="text-sm font-medium">Mobiles</span>
                  </div>
                  <div className="absolute z-10 w-64 bg-white shadow-lg py-3 rounded-b-md hidden group-hover:block top-full mt-1 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('electronics')}>iPhone</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('electronics')}>Samsung</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('electronics')}>Xiaomi</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('electronics')}>OPPO</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('electronics')}>Vivo</a>
                    </div>
                  </div>
                </div>
                
                <div className="relative group category-dropdown mx-4">
                  <div className="flex flex-col items-center cursor-pointer" onClick={() => setActiveCategory('fashion')}>
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png" alt="Fashion" className="w-10 h-10 object-contain" />
                    <span className="text-sm font-medium">Fashion</span>
                  </div>
                  <div className="absolute z-10 w-64 bg-white shadow-lg py-3 rounded-b-md hidden group-hover:block top-full mt-1 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('fashion')}>Men's T-Shirts</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('fashion')}>Men's Casual Shirts</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('fashion')}>Men's Jeans</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('fashion')}>Women's Dresses</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('fashion')}>Women's Tops</a>
                    </div>
                  </div>
                </div>
                
                <div className="relative group category-dropdown mx-4">
                  <div className="flex flex-col items-center cursor-pointer" onClick={() => setActiveCategory('electronics')}>
                    <img src="https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png" alt="Electronics" className="w-10 h-10 object-contain" />
                    <span className="text-sm font-medium">Electronics</span>
                  </div>
                  <div className="absolute z-10 w-64 bg-white shadow-lg py-3 rounded-b-md hidden group-hover:block top-full mt-1 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('electronics')}>Laptops</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('electronics')}>Headphones</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('electronics')}>Bluetooth Speakers</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('electronics')}>Smart Watches</a>
                    </div>
                  </div>
                </div>
                
                <div className="relative group category-dropdown mx-4">
                  <div className="flex flex-col items-center cursor-pointer" onClick={() => setActiveCategory('furniture')}>
                    <img src="https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg" alt="Home" className="w-10 h-10 object-contain" />
                    <span className="text-sm font-medium">Home</span>
                  </div>
                  <div className="absolute z-10 w-64 bg-white shadow-lg py-3 rounded-b-md hidden group-hover:block top-full mt-1 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('furniture')}>Sofas</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('furniture')}>Beds</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('furniture')}>Dining Tables</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('furniture')}>Wardrobes</a>
                    </div>
                  </div>
                </div>
                
                <div className="relative group category-dropdown mx-4">
                  <div className="flex flex-col items-center cursor-pointer" onClick={() => setActiveCategory('homeappliances')}>
                    <img src="https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png" alt="Appliances" className="w-10 h-10 object-contain" />
                    <span className="text-sm font-medium">Appliances</span>
                  </div>
                  <div className="absolute z-10 w-64 bg-white shadow-lg py-3 rounded-b-md hidden group-hover:block top-full mt-1 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('homeappliances')}>Refrigerators</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('homeappliances')}>Washing Machines</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('homeappliances')}>Air Conditioners</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('homeappliances')}>Microwave Ovens</a>
                    </div>
                  </div>
                </div>
                
                <div className="relative group category-dropdown mx-4">
                  <div className="flex flex-col items-center cursor-pointer" onClick={() => setActiveCategory('beauty')}>
                    <img src="https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png" alt="Beauty & Toys" className="w-10 h-10 object-contain" />
                    <span className="text-sm font-medium">Beauty & Toys</span>
                  </div>
                  <div className="absolute z-10 w-64 bg-white shadow-lg py-3 rounded-b-md hidden group-hover:block top-full mt-1 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('beauty')}>Makeup</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('beauty')}>Skincare</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('toys')}>Remote Control Toys</a>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <a href="#" className="block text-sm" onClick={() => setActiveCategory('toys')}>Board Games</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-100 to-purple-100 py-20" id="home">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fadeIn">Summer Collection 2025</h2>
                <p className="text-xl text-gray-600 mb-8 animate-fadeIn opacity-0 animation-delay-200">Discover the latest trends at amazing prices</p>
                <a href="#products" className="inline-block bg-blue-600 text-white font-medium py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 animate-fadeIn opacity-0 animation-delay-400">
                  Shop Now
                </a>
              </div>
            </div>
          </section>
          
          {/* Featured Products */}
          <section className="py-16" id="products">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500 py-16">
                  <p className="text-xl">No products found matching your search.</p>
                  <button 
                    onClick={clearSearch}
                    className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-full">
                  {filteredProducts.filter(product => product.featured || searchTerm !== '').map(product => (
                    <div key={product.id} className="bg-white rounded-md shadow-md overflow-hidden border border-gray-200 flex flex-col product-card cursor-pointer hover-lift transition-transform duration-300">
                      <div className="relative h-40 sm:h-48 md:h-56 bg-gray-100 p-4 flex items-center justify-center">
                        {product.discountPrice && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs uppercase py-1 px-2 rounded font-bold">
                            SALE
                          </span>
                        )}
                        <img 
                          className="w-full h-auto object-contain" 
                          src={product.image} 
                          alt={product.name}
                          loading="lazy" 
                        />
                      </div>
                      <div className="p-3 flex-grow flex flex-col">
                        <h3 className="font-medium text-sm mb-1 text-gray-700 line-clamp-2 h-10">{product.name}</h3>
                        <div className="flex items-center text-xs mb-1">
                          <div className="bg-green-600 text-white px-1.5 py-0.5 rounded flex items-center">
                            <span>{product.rating}</span>
                            <span className="ml-0.5">★</span>
                          </div>
                          <span className="ml-2 text-gray-500">({Math.floor(Math.random() * 500) + 50})</span>
                        </div>
                        <div className="flex items-center mb-1">
                          {product.discountPrice ? (
                            <>
                              <span className="font-bold text-base">₹{product.discountPrice}</span>
                              <span className="text-gray-500 line-through text-xs ml-2">₹{product.price}</span>
                              <span className="text-green-600 text-xs ml-2">
                                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-base">₹{product.price}</span>
                          )}
                        </div>
                        <p className="text-xs text-green-600 mb-2">Free delivery</p>
                        <button 
                          onClick={() => addToCart(product)}
                          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-sm transition-colors duration-300 font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Categories Section */}
          <section className="py-16 bg-gray-50" id="categories">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
              
              <div className="flex flex-wrap justify-center mb-10 gap-2">
                {categories.map(category => (
                  <button 
                    key={category.id} 
                    className={`py-2 px-6 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === category.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500 py-16">
                  <p className="text-xl">No products found matching your search.</p>
                  <button 
                    onClick={clearSearch}
                    className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-full">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-md shadow-md overflow-hidden border border-gray-200 flex flex-col product-card cursor-pointer hover-lift transition-transform duration-300">
                      <div className="relative h-40 sm:h-48 md:h-56 bg-gray-100 p-4 flex items-center justify-center">
                        {product.discountPrice && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs uppercase py-1 px-2 rounded font-bold">
                            SALE
                          </span>
                        )}
                        <img 
                          className="w-full h-auto object-contain" 
                          src={product.image} 
                          alt={product.name}
                          loading="lazy" 
                        />
                      </div>
                      <div className="p-3 flex-grow flex flex-col">
                        <h3 className="font-medium text-sm mb-1 text-gray-700 line-clamp-2 h-10">{product.name}</h3>
                        <div className="flex items-center text-xs mb-1">
                          <div className="bg-green-600 text-white px-1.5 py-0.5 rounded flex items-center">
                            <span>{product.rating}</span>
                            <span className="ml-0.5">★</span>
                          </div>
                          <span className="ml-2 text-gray-500">({Math.floor(Math.random() * 500) + 50})</span>
                        </div>
                        <div className="flex items-center mb-1">
                          {product.discountPrice ? (
                            <>
                              <span className="font-bold text-base">₹{product.discountPrice}</span>
                              <span className="text-gray-500 line-through text-xs ml-2">₹{product.price}</span>
                              <span className="text-green-600 text-xs ml-2">
                                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-base">₹{product.price}</span>
                          )}
                        </div>
                        <p className="text-xs text-green-600 mb-2">Free delivery</p>
                        <button 
                          onClick={() => addToCart(product)}
                          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-sm transition-colors duration-300 font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Special Offer */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white" id="deals">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
                <p className="text-xl mb-8">Get 20% off on selected items. Limited time offer!</p>
                <a href="#products" className="inline-block bg-white text-blue-600 font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300">
                  Shop Now
                </a>
              </div>
            </div>
          </section>
          
          {/* Newsletter */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 mb-8">Get updates on new products and special promotions</p>
                <form className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 flex-grow max-w-md"
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white font-medium py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
            <div className="w-full max-w-full mx-auto px-2 sm:px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">AbhishekPatelMegaMartNew</h3>
                  <p className="mb-4">Your one-stop shop for premium products at affordable prices.</p>
                  <div className="flex gap-4">
                    <a href="#" className="text-2xl hover:text-white transition-colors duration-300">📱</a>
                    <a href="#" className="text-2xl hover:text-white transition-colors duration-300">📸</a>
                    <a href="#" className="text-2xl hover:text-white transition-colors duration-300">🐦</a>
                    <a href="#" className="text-2xl hover:text-white transition-colors duration-300">📺</a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white text-lg font-semibold mb-4">Shop</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white transition-colors duration-300">All Products</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Featured</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">New Arrivals</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Discounted</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white text-lg font-semibold mb-4">Customer Service</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">FAQs</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Shipping Information</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Returns & Exchanges</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                <p className="mb-4 md:mb-0 copyright-text">
                  &copy; <span className="text-blue-400">2025</span> <span className="text-blue-400">VISHAL</span><span className="text-green-400">MEGA</span><span className="text-orange-400">MART</span><span className="text-red-400">NEW</span>. <span className="text-gray-400">All Rights Reserved.</span> <span className="text-white ml-2">| 📞 +91-8707852404 | 📧 vishal831865@gmail.com | 📍 Ghazipur, UP</span>
                </p>
                <div className="flex items-center">
                  <span className="mr-4">Payment methods:</span>
                  <span className="text-2xl mr-2">💳</span>
                  <span className="text-2xl mr-2">💰</span>
                  <span className="text-2xl mr-2">💵</span>
                  <span className="text-2xl">🏦</span>
                </div>
              </div>
            </div>
          </footer>
        </>
      ) : showCartPage ? (
        // Cart page
        <div className="min-h-screen flex flex-col">
          {/* Cart page header */}
          <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold flex items-center">
                  <button 
                    onClick={continueShopping}
                    className="mr-3 text-gray-600 hover:text-gray-800"
                  >
                    ←
                  </button>
                  <span className="text-blue-600">VISHAL</span>
                  <span className="text-green-600">MEGA</span>
                  <span className="text-orange-500">MART</span>
                  <span className="text-red-500">NEW</span>
                </h1>
              </div>
              
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <div className="relative cursor-pointer" onClick={toggleCart}>
                    <span className="text-2xl">🛒</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Cart content */}
          <div className="flex-grow container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-2xl text-gray-500 mb-6">Your cart is empty</p>
                <button 
                  onClick={continueShopping}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="lg:flex lg:gap-8">
                {/* Cart items */}
                <div className="lg:flex-grow">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="hidden md:grid md:grid-cols-6 bg-gray-100 p-4 text-gray-600 text-sm font-medium">
                      <div className="md:col-span-3">Product</div>
                      <div className="text-center">Price</div>
                      <div className="text-center">Quantity</div>
                      <div className="text-right">Total</div>
                    </div>
                    
                    <div className="divide-y">
                      {cartItems.map(item => (
                        <div key={item.id} className="p-4 md:grid md:grid-cols-6 md:gap-4 md:items-center">
                          <div className="flex md:col-span-3 mb-4 md:mb-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md mr-4" 
                            />
                            <div>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <p className="text-gray-500 text-sm">Category: {item.category}</p>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm mt-1 flex items-center"
                              >
                                <span className="mr-1">✕</span> Remove
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-blue-600 font-medium text-center">
                            ${(item.discountPrice || item.price).toFixed(2)}
                            {item.discountPrice && (
                              <span className="line-through text-gray-500 text-sm ml-2">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-center my-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 flex items-center justify-center rounded-l-md"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-12 h-8 text-center border-gray-200 border-y focus:outline-none"
                            />
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 flex items-center justify-center rounded-r-md"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="text-right font-bold">
                            ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={continueShopping}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <span className="mr-2">←</span> Continue Shopping
                    </button>
                    
                    <button 
                      onClick={() => setCartItems([])}
                      className="text-red-500 hover:text-red-700"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
                
                {/* Order summary */}
                <div className="lg:w-80 mt-8 lg:mt-0">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4 pb-4 border-b">Order Summary</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                        <span>${cartTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>${(parseFloat(cartTotal) * 0.1).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
                      <span>Total</span>
                      <span>${(parseFloat(cartTotal) * 1.1).toFixed(2)}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={checkout}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-300"
                      >
                        Proceed to Checkout
                      </button>
                      
                      <div className="flex items-center justify-center text-gray-500 text-sm">
                        <span className="mr-2">We accept:</span>
                        <span className="text-xl">💳 💰 💵 🏦</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Simple footer */}
          <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="container mx-auto px-4 text-center">
              <p className="copyright-text">
                &copy; <span className="text-blue-400">2025</span> <span className="text-blue-400">VISHAL</span><span className="text-green-400">MEGA</span><span className="text-orange-400">MART</span><span className="text-red-400">NEW</span>. <span className="text-gray-400">All Rights Reserved.</span> <span className="text-white ml-2">| 📞 +91-8707852404 | 📧 vishal831865@gmail.com | 📍 Ghazipur, UP</span>
              </p>
            </div>
          </footer>
        </div>
      ) : showContactPage ? (
        // Contact page
        <div className="min-h-screen flex flex-col">
          {/* Contact page header */}
          <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold flex items-center">
                  <button 
                    onClick={backToHome}
                    className="mr-3 text-gray-600 hover:text-gray-800"
                  >
                    ←
                  </button>
                  <span className="text-blue-600">VISHAL</span>
                  <span className="text-green-600">MEGA</span>
                  <span className="text-orange-500">MART</span>
                  <span className="text-red-500">NEW</span>
                </h1>
              </div>
              
              <div className="flex items-center">
                <div className="relative flex items-center" ref={cartRef}>
                  <div className="relative cursor-pointer" onClick={toggleCart}>
                    <span className="text-2xl">🛒</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Contact content */}
          <div className="flex-grow container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-bold mb-6 text-blue-600">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Phone Numbers</h4>
                        <p className="text-gray-700">+91-8707852404</p>
                        <p className="text-gray-700">+91-9792544615</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Location</h4>
                        <p className="text-gray-700">Vishal Patel Farm House</p>
                        <p className="text-gray-700">Ghazipur, Uttar Pradesh</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Email</h4>
                        <p className="text-gray-700">vishal831865@gmail.com</p>
                        <p className="text-gray-700">vp643729@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Business Hours</h4>
                        <p className="text-gray-700">Monday - Saturday: 9:00 AM to 9:00 PM</p>
                        <p className="text-gray-700">Sunday: 10:00 AM to 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <img 
                      src="/vishal-patel-profile.jpg" 
                      alt="Vishal Patel" 
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <p className="text-center mt-3 text-gray-700 font-medium">Vishal Patel - Owner</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-blue-600">Send us a Message</h3>
                  
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you for your message! We will get back to you soon.');
                    backToHome();
                  }}>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Inquiry about products"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300 font-medium"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.4963660567185!2d83.75517099999999!3d25.637038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39920500239e41f5%3A0x3af73e1ffa8673dd!2sVishal%20Patel%20Farm%20House!5e0!3m2!1sen!2sin!4v1653991207037!5m2!1sen!2sin" 
                    width="100%" 
                    height="400" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vishal Patel Farm House Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          
          {/* Simple footer */}
          <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="container mx-auto px-4 text-center">
              <p className="copyright-text">
                &copy; <span className="text-blue-400">2025</span> <span className="text-blue-400">VISHAL</span><span className="text-green-400">MEGA</span><span className="text-orange-400">MART</span><span className="text-red-400">NEW</span>. <span className="text-gray-400">All Rights Reserved.</span> <span className="text-white ml-2">| 📞 +91-8707852404 | 📧 vishal831865@gmail.com | 📍 Ghazipur, UP</span>
              </p>
            </div>
          </footer>
        </div>
      ) : showLoginPage ? (
        // Login page
        <div className="min-h-screen flex items-center justify-center login-page-bg">
          <div className="glassmorphism-card p-8 max-w-md w-full z-10 animate-fade-in-up">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white">Login to Your Account</h2>
              <p className="text-gray-200 mt-2">Welcome back! Please enter your details</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2" htmlFor="login-email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2" htmlFor="login-password">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 bg-white bg-opacity-20 border-white border-opacity-30 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-blue-300 hover:text-blue-100">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium backdrop-filter backdrop-blur-sm bg-opacity-70"
              >
                Sign in
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-white">
                Don't have an account?{' '}
                <button 
                  onClick={viewSignupPage}
                  className="text-blue-300 hover:text-blue-100 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
            
            <div className="mt-8 border-t border-white border-opacity-20 pt-6">
              <button 
                onClick={() => {
                  setShowLoginPage(false);
                  setShowSignupPage(false);
                  continueShopping();
                }}
                className="w-full flex items-center justify-center text-white hover:text-blue-100 cursor-pointer"
              >
                <span className="mr-2">←</span> Return to shopping
              </button>
            </div>
          </div>
        </div>
      ) : showSignupPage ? (
        // Signup page
        <div className="min-h-screen flex items-center justify-center signup-page-bg">
          <div className="glassmorphism-card p-8 max-w-md w-full z-10 animate-fade-in-up">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white">Create an Account</h2>
              <p className="text-gray-200 mt-2">Join us today and enjoy shopping!</p>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2" htmlFor="signup-name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2" htmlFor="signup-email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2" htmlFor="signup-password">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                  placeholder="Create a password"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 bg-white bg-opacity-20 border-white border-opacity-30 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-white">
                  I agree to the <a href="#" className="text-blue-300 hover:text-blue-100">Terms of Service</a> and <a href="#" className="text-blue-300 hover:text-blue-100">Privacy Policy</a>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium backdrop-filter backdrop-blur-sm bg-opacity-70"
              >
                Create Account
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-white">
                Already have an account?{' '}
                <button 
                  onClick={viewLoginPage}
                  className="text-blue-300 hover:text-blue-100 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
            
            <div className="mt-8 border-t border-white border-opacity-20 pt-6">
              <button 
                onClick={() => {
                  setShowLoginPage(false);
                  setShowSignupPage(false);
                  continueShopping();
                }}
                className="w-full flex items-center justify-center text-white hover:text-blue-100 cursor-pointer"
              >
                <span className="mr-2">←</span> Return to shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        // All Products page
        <div className="min-h-screen flex flex-col">
          {/* All Products header */}
          <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold flex items-center">
                  <button 
                    onClick={backToHome}
                    className="mr-3 text-gray-600 hover:text-gray-800"
                  >
                    ←
                  </button>
                  <span className="text-blue-600">All</span>
                  <span className="text-gray-800">Products</span>
                </h1>
              </div>
              
              <div className="flex items-center">
                <div className="relative flex items-center mr-4">
                  <div className="relative cursor-pointer" onClick={toggleCart}>
                    <span className="text-2xl">🛒</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search all products..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {searchTerm && (
                    <button 
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          </header>
          
          {/* All Products content */}
          <div className="flex-grow container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-8 text-center">All Products ({products.length})</h2>
            
            <div className="flex flex-wrap justify-center mb-10 gap-2">
              {categories.map(category => (
                <button 
                  key={category.id} 
                  className={`py-2 px-6 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center text-gray-500 py-16">
                <p className="text-xl">No products found matching your search.</p>
                <button 
                  onClick={clearSearch}
                  className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-full">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-md shadow-md overflow-hidden border border-gray-200 flex flex-col product-card cursor-pointer hover-lift transition-transform duration-300">
                      <div className="relative h-40 sm:h-48 md:h-56 bg-gray-100 p-4 flex items-center justify-center">
                        {product.discountPrice && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs uppercase py-1 px-2 rounded font-bold">
                            SALE
                          </span>
                        )}
                        <img 
                          className="w-full h-auto object-contain" 
                          src={product.image} 
                          alt={product.name}
                          loading="lazy" 
                        />
                      </div>
                      <div className="p-3 flex-grow flex flex-col">
                        <h3 className="font-medium text-sm mb-1 text-gray-700 line-clamp-2 h-10">{product.name}</h3>
                        <div className="flex items-center text-xs mb-1">
                          <div className="bg-green-600 text-white px-1.5 py-0.5 rounded flex items-center">
                            <span>{product.rating}</span>
                            <span className="ml-0.5">★</span>
                          </div>
                          <span className="ml-2 text-gray-500">({Math.floor(Math.random() * 500) + 50})</span>
                        </div>
                        <div className="flex items-center mb-1">
                          {product.discountPrice ? (
                            <>
                              <span className="font-bold text-base">₹{product.discountPrice}</span>
                              <span className="text-gray-500 line-through text-xs ml-2">₹{product.price}</span>
                              <span className="text-green-600 text-xs ml-2">
                                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-base">₹{product.price}</span>
                          )}
                        </div>
                        <p className="text-xs text-green-600 mb-2">Free delivery</p>
                        <button 
                          onClick={() => addToCart(product)}
                          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-sm transition-colors duration-300 font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-center mt-8">
              <button 
                onClick={backToHome}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
          
          {/* Simple footer */}
          <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="container mx-auto px-4 text-center">
              <p className="copyright-text">
                &copy; <span className="text-blue-400">2025</span> <span className="text-blue-400">VISHAL</span><span className="text-green-400">MEGA</span><span className="text-orange-400">MART</span><span className="text-red-400">NEW</span>. <span className="text-gray-400">All Rights Reserved.</span> <span className="text-white ml-2">| 📞 +91-8707852404 | 📧 vishal831865@gmail.com | 📍 Ghazipur, UP</span>
              </p>
            </div>
          </footer>
        </div>
      )}

      {/* Fade-in animation style */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s forwards;
        }
        .opacity-0 {
          opacity: 0;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        /* Product Card Hover Animation */
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        /* Login Page Background */
        .login-page-bg {
          background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .login-page-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
        }

        /* Signup Page Background */
        .signup-page-bg {
          background-image: url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .signup-page-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
        }
        
        /* Glassmorphism Card */
        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        
        .glassmorphism-card input[type="email"],
        .glassmorphism-card input[type="password"],
        .glassmorphism-card input[type="text"] {
          background: rgba(255, 255, 255, 0.25);
          color: white;
          font-weight: 500;
        }
        
        .glassmorphism-card input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .glassmorphism-card input:focus {
          background: rgba(255, 255, 255, 0.35);
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Copyright Text Animation */
        .copyright-text {
          animation: pulse 2s infinite alternate;
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
          }
        }
        
        /* Scrollbar hiding for category navigation */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s forwards;
        }
      `}</style>
    </div>
  )
}

export default App
