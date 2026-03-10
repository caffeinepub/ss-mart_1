import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Baby,
  Clock,
  Coffee,
  Home,
  IceCream,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  ShoppingBasket,
  ShoppingCart,
  Sparkles,
  Star,
  Wheat,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  {
    icon: <IceCream className="w-8 h-8" />,
    name: "Frozen Foods",
    description: "Ice creams, frozen meals & more",
    emoji: "🧊",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    name: "Snacks",
    description: "Chips, biscuits & tasty bites",
    emoji: "🍿",
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    name: "Beverages",
    description: "Juices, sodas, teas & water",
    emoji: "🥤",
  },
  {
    icon: <Home className="w-8 h-8" />,
    name: "Household Essentials",
    description: "Cleaning & home care products",
    emoji: "🏠",
  },
  {
    icon: <Wheat className="w-8 h-8" />,
    name: "Pantry Staples",
    description: "Rice, oils, spices & grains",
    emoji: "🌾",
  },
  {
    icon: <Baby className="w-8 h-8" />,
    name: "Baby Products",
    description: "Everything for your little one",
    emoji: "🍼",
  },
  {
    icon: <Package className="w-8 h-8" />,
    name: "Dairy Products",
    description: "Milk, curd, butter & cheese",
    emoji: "🥛",
  },
];

const PRODUCTS = [
  {
    name: "Amul Full Cream Milk (1L)",
    price: "₹65",
    category: "Dairy Products",
    badge: "Fresh",
  },
  {
    name: "Lays Classic Salted (100g)",
    price: "₹20",
    category: "Snacks",
    badge: "Popular",
  },
  {
    name: "Nestle KitKat Ice Cream",
    price: "₹30",
    category: "Frozen Foods",
    badge: null,
  },
  {
    name: "Tata Salt (1kg)",
    price: "₹28",
    category: "Pantry Staples",
    badge: null,
  },
  {
    name: "Surf Excel Easy Wash (1kg)",
    price: "₹145",
    category: "Household Essentials",
    badge: null,
  },
  {
    name: "Maaza Mango Drink (600ml)",
    price: "₹40",
    category: "Beverages",
    badge: "Popular",
  },
  {
    name: "Fortune Sunflower Oil (1L)",
    price: "₹165",
    category: "Pantry Staples",
    badge: null,
  },
  {
    name: "Pampers Baby Diapers (M, 20pc)",
    price: "₹399",
    category: "Baby Products",
    badge: "New",
  },
  {
    name: "Amul Butter (100g)",
    price: "₹55",
    category: "Dairy Products",
    badge: "Fresh",
  },
];

const PROMO_BANNERS = [
  {
    title: "Weekend Special",
    discountText: "UP TO 30% OFF",
    subtitle: "On dairy & beverages",
  },
  {
    title: "Buy 2 Get 1 Free",
    discountText: "3 FOR 2",
    subtitle: "Selected snacks range",
  },
  {
    title: "Daily Essentials",
    discountText: "BEST PRICES",
    subtitle: "Household & pantry staples",
  },
];

const PROMO_GRADIENTS = [
  "from-blue-900 to-blue-700",
  "from-orange-500 to-orange-700",
  "from-emerald-600 to-teal-700",
];

const STORE_INFO = {
  name: "SS Mart",
  tagline: "Your one-stop shop for everything you need",
  address: "BH Road, Near TVS Showroom, Arsikere",
  phone: "+91 91873 86492",
  email: "ssmart88846@gmail.com",
  hours: "Mon–Sat: 8:00 AM – 9:00 PM | Sun: 9:00 AM – 8:00 PM",
};

const navLinks = [
  { label: "Home", href: "#home", ocid: "nav.home_link" },
  { label: "Categories", href: "#categories", ocid: "nav.categories_link" },
  { label: "Offers", href: "#offers", ocid: "nav.offers_link" },
  { label: "Products", href: "#products", ocid: "nav.products_link" },
  { label: "Contact", href: "#contact", ocid: "nav.contact_link" },
];

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading] = useState(false);

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    toast.success(`${productName} added to cart!`, { duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2">
              <ShoppingCart className="w-7 h-7 text-primary" />
              <span className="text-xl font-black text-primary">SS Mart</span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.ocid}
                  href={link.href}
                  data-ocid={link.ocid}
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="relative border-primary/20 hover:border-primary hover:bg-primary/5"
                data-ocid="nav.cart_button"
              >
                <ShoppingCart className="w-5 h-5 text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden pb-4"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.ocid}
                    href={link.href}
                    data-ocid={link.ocid}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-br from-green-800 to-green-600"
        >
          <div className="relative h-[480px] sm:h-[540px] flex items-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full" />
              <div className="absolute bottom-10 right-20 w-60 h-60 bg-white rounded-full" />
              <div className="absolute top-1/2 right-10 w-20 h-20 bg-white rounded-full" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    🛒 Arsikere's Trusted Store
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4">
                  Welcome to
                  <br />
                  <span className="text-yellow-300">SS Mart</span>
                </h1>
                <p className="text-lg text-white/80 mb-3">
                  BH Road, Near TVS Showroom, Arsikere
                </p>
                <p className="text-base text-white/70 mb-8">
                  Frozen foods, snacks, beverages, household essentials, pantry
                  staples, baby products & dairy — all under one roof.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-base px-8"
                    data-ocid="hero.primary_button"
                    onClick={() =>
                      document
                        .getElementById("products")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Shop Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-green-800 font-bold text-base px-8"
                    data-ocid="hero.secondary_button"
                    onClick={() =>
                      document
                        .getElementById("offers")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View Offers
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Promo Banners */}
        <section id="offers" className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PROMO_BANNERS.map((banner, i) => (
                <motion.div
                  key={banner.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${PROMO_GRADIENTS[i]} text-white cursor-pointer hover:scale-[1.02] transition-transform duration-200`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/70 mb-1">
                    {banner.subtitle}
                  </p>
                  <p className="text-2xl font-black text-yellow-300 mb-1">
                    {banner.discountText}
                  </p>
                  <p className="text-lg font-bold">{banner.title}</p>
                  <Zap className="absolute bottom-4 right-4 w-8 h-8 text-white/20" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-green-800 mb-2">
                Shop by Category
              </h2>
              <p className="text-muted-foreground">
                7 categories to find everything you need
              </p>
            </motion.div>

            <div
              data-ocid="categories.list"
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4"
            >
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  data-ocid={`categories.item.${i + 1}` as string}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-700 mb-3 group-hover:bg-green-100 transition-colors">
                    <span className="text-2xl">{cat.emoji}</span>
                  </div>
                  <p className="text-xs font-bold text-green-800 text-center leading-tight">
                    {cat.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-10"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-green-800 mb-1">
                  Featured Products
                </h2>
                <p className="text-muted-foreground">
                  Popular picks at SS Mart
                </p>
              </div>
              <Star className="w-8 h-8 text-orange-500 hidden sm:block" />
            </motion.div>

            {isLoading ? (
              <div
                data-ocid="products.loading_state"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {SKELETON_KEYS.map((sk) => (
                  <div key={sk} className="bg-gray-50 rounded-xl p-5">
                    <Skeleton className="h-40 w-full rounded-lg mb-4" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div
                data-ocid="products.list"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {PRODUCTS.map((product, i) => (
                  <motion.div
                    key={product.name}
                    data-ocid={`products.item.${i + 1}` as string}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <div className="relative h-40 bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center">
                      <ShoppingBasket className="w-14 h-14 text-green-200 group-hover:text-green-300 transition-colors" />
                      {product.badge && (
                        <Badge
                          className={`absolute top-3 left-3 text-xs font-bold ${
                            product.badge === "Fresh"
                              ? "bg-green-600 text-white"
                              : product.badge === "Popular"
                                ? "bg-orange-500 text-white"
                                : "bg-blue-600 text-white"
                          }`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-bold text-foreground text-base mb-3 leading-snug">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-green-800">
                          {product.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                          data-ocid={`products.item.${i + 1}` as string}
                          onClick={() => handleAddToCart(product.name)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          data-ocid="contact.section"
          className="py-14 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-green-800 mb-2">
                Find Us
              </h2>
              <p className="text-muted-foreground">Visit SS Mart in Arsikere</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <MapPin className="w-6 h-6" />,
                  label: "Address",
                  value: STORE_INFO.address,
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  label: "Phone",
                  value: STORE_INFO.phone,
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  label: "Email",
                  value: STORE_INFO.email,
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  label: "Store Hours",
                  value: STORE_INFO.hours,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-3">
                    {item.icon}
                  </div>
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground/70 leading-snug">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-black">SS Mart</span>
              </div>
              <p className="text-white/60 text-sm">
                BH Road, Near TVS Showroom, Arsikere
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/40">
            <span>
              © {new Date().getFullYear()} SS Mart, Arsikere. All rights
              reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
