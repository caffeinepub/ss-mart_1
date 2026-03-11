import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Baby,
  CheckCircle,
  Clock,
  Coffee,
  Copy,
  Home,
  IceCream,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Minus,
  Package,
  Pencil,
  Phone,
  Plus,
  QrCode,
  Search,
  ShoppingBasket,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
  Wallet,
  Wheat,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "919187386492";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi SS Mart! I'd like to inquire about your products.",
);
const UPI_ID = "6362806492@pthdfc";
const UPI_NAME = "SS%20Mart";
const FREE_DELIVERY_THRESHOLD = 1000;
const DELIVERY_CHARGE = 50;
const ADMIN_PASSWORD = "ssmart@admin";

type CartItem = { name: string; price: number; quantity: number };
type Order = {
  id: string;
  items: CartItem[];
  customerName: string;
  address: string;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  time: string;
};
type Product = {
  name: string;
  price: string;
  category: string;
  badge: string | null;
};

function getPaymentApps(amount: number) {
  const amParam = amount > 0 ? `&am=${amount}` : "";
  return [
    {
      name: "GPay",
      label: "Google Pay",
      emoji: "🔵",
      link: `gpay://upi/pay?pa=${UPI_ID}&pn=${UPI_NAME}&cu=INR${amParam}`,
      ocid: "payment.gpay_button",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "PhonePe",
      label: "PhonePe",
      emoji: "💜",
      link: `phonepe://pay?pa=${UPI_ID}&pn=${UPI_NAME}&cu=INR${amParam}`,
      ocid: "payment.phonepe_button",
      gradient: "from-purple-600 to-purple-700",
    },
    {
      name: "Paytm",
      label: "Paytm",
      emoji: "💙",
      link: `paytmmp://pay?pa=${UPI_ID}&pn=${UPI_NAME}&cu=INR${amParam}`,
      ocid: "payment.paytm_button",
      gradient: "from-sky-700 to-sky-800",
    },
  ];
}

const CATEGORIES = [
  { icon: <IceCream className="w-8 h-8" />, name: "Frozen Foods", emoji: "🧊" },
  { icon: <Sparkles className="w-8 h-8" />, name: "Snacks", emoji: "🍿" },
  { icon: <Coffee className="w-8 h-8" />, name: "Beverages", emoji: "🥤" },
  {
    icon: <Home className="w-8 h-8" />,
    name: "Household Essentials",
    emoji: "🏠",
  },
  { icon: <Wheat className="w-8 h-8" />, name: "Pantry Staples", emoji: "🌾" },
  { icon: <Baby className="w-8 h-8" />, name: "Baby Products", emoji: "🍼" },
  {
    icon: <Package className="w-8 h-8" />,
    name: "Dairy Products",
    emoji: "🥛",
  },
];

const INITIAL_PRODUCTS: Product[] = [
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
  {
    name: "Britannia Good Day (200g)",
    price: "₹35",
    category: "Snacks",
    badge: "Popular",
  },
  {
    name: "Aashirvaad Atta (5kg)",
    price: "₹295",
    category: "Pantry Staples",
    badge: null,
  },
  {
    name: "Mother Dairy Curd (400g)",
    price: "₹42",
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

const _SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="WhatsApp"
    >
      <title>WhatsApp</title>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Payment Modal ────────────────────────────────────────────────────────────
interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  onConfirm: (customerName: string, address: string) => void;
}

function PaymentModal({
  open,
  onClose,
  subtotal,
  deliveryCharge,
  grandTotal,
  onConfirm,
}: PaymentModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const paymentApps = getPaymentApps(grandTotal);

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy UPI ID");
    }
  };

  const handleConfirm = () => {
    if (!customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }
    onConfirm(customerName.trim(), address.trim());
    setCustomerName("");
    setAddress("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm w-full" data-ocid="payment.dialog">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-black text-green-800 flex items-center justify-center gap-2">
            <Wallet className="w-5 h-5 text-orange-500" />
            Pay Online
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[75vh]">
          <div className="space-y-4 py-2 pr-1">
            {/* Order Summary */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold text-orange-700 uppercase tracking-wider">
                Order Summary
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span
                  className={
                    deliveryCharge === 0
                      ? "font-semibold text-green-600"
                      : "font-semibold"
                  }
                >
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black border-t border-orange-200 pt-2">
                <span className="text-orange-700">Total</span>
                <span className="text-orange-600">₹{grandTotal}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
                  Your Name
                </Label>
                <Input
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  data-ocid="payment.customer_name_input"
                  className="border-green-200 focus-visible:ring-green-500"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
                  Delivery Address
                </Label>
                <Textarea
                  placeholder="Enter your full delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  data-ocid="payment.address_textarea"
                  className="border-green-200 focus-visible:ring-green-500 min-h-[80px] resize-none"
                />
              </div>
            </div>

            {/* UPI ID */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">
                UPI ID
              </p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-bold text-green-900 bg-white border border-green-200 rounded-lg px-3 py-2 flex-1 text-center select-all">
                  {UPI_ID}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-600 hover:text-white shrink-0 gap-1.5"
                  onClick={handleCopyUPI}
                  data-ocid="payment.copy_upi_button"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">
                or pay with app
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Payment App Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {paymentApps.map((app) => (
                <a
                  key={app.name}
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={app.ocid}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${app.gradient} text-white font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-md`}
                >
                  <span className="text-2xl">{app.emoji}</span>
                  <span>{app.label}</span>
                </a>
              ))}
            </div>

            {/* QR hint */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg py-3">
              <QrCode className="w-4 h-4" />
              <span>Or scan UPI QR at store</span>
            </div>

            {/* Confirm Order */}
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-base py-6"
              onClick={handleConfirm}
              data-ocid="payment.confirm_button"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Confirm Order
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  onUpdateQty: (name: string, delta: number) => void;
  onRemove: (name: string) => void;
  onPayOnline: () => void;
}

function CartDrawer({
  open,
  onClose,
  cartItems,
  subtotal,
  deliveryCharge,
  grandTotal,
  onUpdateQty,
  onRemove,
  onPayOnline,
}: CartDrawerProps) {
  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
        data-ocid="cart.drawer"
      >
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="text-lg font-black text-green-800 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-orange-500" />
            My Cart
            {cartItems.length > 0 && (
              <Badge className="bg-orange-500 text-white ml-auto">
                {cartItems.reduce((s, i) => s + i.quantity, 0)} items
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8"
            data-ocid="cart.empty_state"
          >
            <ShoppingBasket className="w-16 h-16 text-green-200" />
            <div>
              <p className="font-bold text-green-800 text-lg">
                Your cart is empty
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Add some products to get started!
              </p>
            </div>
            <Button
              variant="outline"
              className="border-green-600 text-green-700"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Free Delivery Progress */}
            <div className="px-5 py-3 bg-green-50 border-b border-border">
              {subtotal >= FREE_DELIVERY_THRESHOLD ? (
                <p className="text-sm font-bold text-green-700 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Free delivery unlocked! 🎉
                </p>
              ) : (
                <p className="text-sm text-green-700 mb-2">
                  <span className="font-bold">₹{remaining}</span> more for free
                  delivery
                </p>
              )}
              <Progress value={progress} className="h-2" />
            </div>

            {/* Items */}
            <ScrollArea className="flex-1 px-5">
              <div className="space-y-3 py-4">
                {cartItems.map((item, i) => (
                  <div
                    key={item.name}
                    data-ocid={`cart.item.${i + 1}`}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground leading-snug truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹{item.price} each
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => onUpdateQty(item.name, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => onUpdateQty(item.name, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-black text-green-800 w-16 text-right shrink-0">
                      ₹{item.price * item.quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50 shrink-0"
                      onClick={() => onRemove(item.name)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-border bg-gray-50 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span
                    className={
                      deliveryCharge === 0
                        ? "font-semibold text-green-600"
                        : "font-semibold"
                    }
                  >
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span className="text-green-800">₹{grandTotal}</span>
                </div>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5"
                onClick={onPayOnline}
                data-ocid="cart.pay_online_button"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Pay Online — ₹{grandTotal}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ─── Orders View ──────────────────────────────────────────────────────────────
function OrdersView({
  orders,
  onBack,
}: { orders: Order[]; onBack: () => void }) {
  return (
    <div className="min-h-[60vh] max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="border-green-600 text-green-700 hover:bg-green-50"
          data-ocid="orders.back_button"
        >
          ← Back to Store
        </Button>
        <h1 className="text-3xl font-black text-green-800">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-4 py-20 text-center"
          data-ocid="orders.empty_state"
        >
          <Package className="w-16 h-16 text-green-200" />
          <p className="font-bold text-green-800 text-xl">No orders yet</p>
          <p className="text-muted-foreground">
            Place your first order to see it here!
          </p>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
            onClick={onBack}
          >
            Shop Now
          </Button>
        </div>
      ) : (
        <div data-ocid="orders.list" className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              data-ocid={`orders.item.${i + 1}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="bg-green-700 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-white font-bold text-base">
                    {order.customerName}
                  </p>
                  <p className="text-green-200 text-xs">{order.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-300 font-black text-lg">
                    ₹{order.grandTotal}
                  </p>
                  <p className="text-green-300 text-xs">{order.time}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold text-green-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span
                      className={
                        order.deliveryCharge === 0
                          ? "text-green-600 font-semibold"
                          : ""
                      }
                    >
                      {order.deliveryCharge === 0
                        ? "FREE"
                        : `₹${order.deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-black text-base pt-1">
                    <span>Grand Total</span>
                    <span className="text-green-800">₹{order.grandTotal}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Admin Login Dialog ───────────────────────────────────────────────────────
function AdminLoginDialog({
  open,
  onClose,
  onLogin,
}: { open: boolean; onClose: () => void; onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setPassword("");
      setError("");
      onLogin();
      onClose();
      toast.success("Logged in as Admin");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setPassword("");
          setError("");
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-xs w-full" data-ocid="admin.login_dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-800 font-black">
            <Lock className="w-5 h-5 text-orange-500" />
            Admin Login
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              data-ocid="admin.password_input"
              className="border-green-200 focus-visible:ring-green-500"
            />
            {error && (
              <p className="text-xs text-red-500" data-ocid="admin.error_state">
                {error}
              </p>
            )}
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
            onClick={handleSubmit}
            data-ocid="admin.login_submit_button"
          >
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Add Product Dialog ───────────────────────────────────────────────────────
const CATEGORY_NAMES = [
  "Frozen Foods",
  "Snacks",
  "Beverages",
  "Household Essentials",
  "Pantry Staples",
  "Baby Products",
  "Dairy Products",
];

function AddProductDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [badge, setBadge] = useState("");

  const handleAdd = () => {
    if (!name.trim()) {
      toast.error("Enter product name");
      return;
    }
    if (!price.trim() || Number.isNaN(Number(price.replace(/[^0-9]/g, "")))) {
      toast.error("Enter a valid price");
      return;
    }
    if (!category) {
      toast.error("Select a category");
      return;
    }
    const priceNum = Number(price.replace(/[^0-9.]/g, ""));
    onAdd({
      name: name.trim(),
      price: `₹${priceNum}`,
      category,
      badge: badge.trim() || null,
    });
    setName("");
    setPrice("");
    setCategory("");
    setBadge("");
    onClose();
    toast.success("Product added!");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        className="max-w-sm w-full"
        data-ocid="admin.add_product_dialog"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-800 font-black">
            <Plus className="w-5 h-5 text-orange-500" />
            Add New Product
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Product Name
            </Label>
            <Input
              placeholder="e.g. Amul Cheese (200g)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-ocid="admin.product_name_input"
              className="border-green-200 focus-visible:ring-green-500"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Price (₹)
            </Label>
            <Input
              placeholder="e.g. 120"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              data-ocid="admin.product_price_input"
              className="border-green-200 focus-visible:ring-green-500"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                data-ocid="admin.product_category_select"
                className="border-green-200 focus:ring-green-500"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_NAMES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Badge (optional)
            </Label>
            <Select value={badge} onValueChange={setBadge}>
              <SelectTrigger
                data-ocid="admin.product_badge_select"
                className="border-green-200 focus:ring-green-500"
              >
                <SelectValue placeholder="No badge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No badge</SelectItem>
                <SelectItem value="Fresh">Fresh</SelectItem>
                <SelectItem value="Popular">Popular</SelectItem>
                <SelectItem value="New">New</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              className="flex-1 border-gray-300"
              onClick={() => {
                setName("");
                setPrice("");
                setCategory("");
                setBadge("");
                onClose();
              }}
              data-ocid="admin.add_product_cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold"
              onClick={handleAdd}
              data-ocid="admin.add_product_submit_button"
            >
              Add Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Edit Product Dialog ──────────────────────────────────────────────────────
function EditProductDialog({
  open,
  onClose,
  onEdit,
  product,
}: {
  open: boolean;
  onClose: () => void;
  onEdit: (product: Product) => void;
  product: Product | null;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(
    product ? product.price.replace(/[^0-9.]/g, "") : "",
  );
  const [category, setCategory] = useState(product?.category ?? "");
  const [badge, setBadge] = useState(product?.badge ?? "");

  // Sync fields when product changes
  const prevProduct = product;
  if (
    product &&
    (product.name !== prevProduct?.name ||
      product.category !== prevProduct?.category)
  ) {
    // handled by key prop on dialog
  }

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Enter product name");
      return;
    }
    if (!price.trim() || Number.isNaN(Number(price.replace(/[^0-9]/g, "")))) {
      toast.error("Enter a valid price");
      return;
    }
    if (!category) {
      toast.error("Select a category");
      return;
    }
    const priceNum = Number(price.replace(/[^0-9.]/g, ""));
    onEdit({
      name: name.trim(),
      price: `₹${priceNum}`,
      category,
      badge: badge.trim() || null,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent
        className="max-w-sm w-full"
        data-ocid="admin.edit_product_dialog"
        key={product?.name}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-800 font-black">
            <Pencil className="w-5 h-5 text-orange-500" />
            Edit Product
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Product Name
            </Label>
            <Input
              placeholder="e.g. Amul Cheese (200g)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-ocid="admin.edit_product_name_input"
              className="border-green-200 focus-visible:ring-green-500"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Price (₹)
            </Label>
            <Input
              placeholder="e.g. 120"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              data-ocid="admin.edit_product_price_input"
              className="border-green-200 focus-visible:ring-green-500"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                data-ocid="admin.edit_product_category_select"
                className="border-green-200 focus:ring-green-500"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_NAMES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-bold text-green-700 uppercase tracking-wider">
              Badge (optional)
            </Label>
            <Select value={badge} onValueChange={setBadge}>
              <SelectTrigger
                data-ocid="admin.edit_product_badge_select"
                className="border-green-200 focus:ring-green-500"
              >
                <SelectValue placeholder="No badge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No badge</SelectItem>
                <SelectItem value="Fresh">Fresh</SelectItem>
                <SelectItem value="Popular">Popular</SelectItem>
                <SelectItem value="New">New</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              className="flex-1 border-gray-300"
              onClick={onClose}
              data-ocid="admin.edit_product_cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold"
              onClick={handleSave}
              data-ocid="admin.edit_product_submit_button"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeView, setActiveView] = useState<"store" | "orders">("store");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [editProductIndex, setEditProductIndex] = useState<number | null>(null);
  const [deleteProductIndex, setDeleteProductIndex] = useState<number | null>(
    null,
  );

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryCharge =
    subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : subtotal > 0
        ? DELIVERY_CHARGE
        : 0;
  const grandTotal = subtotal + deliveryCharge;
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToCart = (name: string, priceStr: string) => {
    const price = Number.parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing)
        return prev.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + 1 } : i,
        );
      return [...prev, { name, price, quantity: 1 }];
    });
    toast.success(`${name} added to cart!`, { duration: 2000 });
  };

  const handleUpdateQty = (name: string, delta: number) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.name === name);
      if (!item) return prev;
      if (item.quantity + delta <= 0)
        return prev.filter((i) => i.name !== name);
      return prev.map((i) =>
        i.name === name ? { ...i, quantity: i.quantity + delta } : i,
      );
    });
  };

  const handleRemove = (name: string) => {
    setCartItems((prev) => prev.filter((i) => i.name !== name));
    toast.success("Item removed from cart.");
  };

  const handleConfirmOrder = (customerName: string, address: string) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cartItems],
      customerName,
      address,
      subtotal,
      deliveryCharge,
      grandTotal,
      time: new Date().toLocaleString("en-IN"),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setCartDrawerOpen(false);
    setPaymentModalOpen(false);
    toast.success("Order placed successfully! 🎉");
  };

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const handleEditProduct = (updated: Product, index: number) => {
    setProducts((prev) => {
      const next = [...prev];
      next[index] = updated;
      return next;
    });
    toast.success("Product updated!");
    setEditProductOpen(false);
    setEditProductIndex(null);
  };

  const handleDeleteProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    toast.success("Product deleted!");
    setDeleteProductIndex(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* Admin Dialogs */}
      <AdminLoginDialog
        open={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLogin={() => setIsAdmin(true)}
      />
      <AddProductDialog
        open={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onAdd={handleAddProduct}
      />
      <EditProductDialog
        open={editProductOpen}
        onClose={() => {
          setEditProductOpen(false);
          setEditProductIndex(null);
        }}
        onEdit={(updated) => {
          if (editProductIndex !== null)
            handleEditProduct(updated, editProductIndex);
        }}
        product={editProductIndex !== null ? products[editProductIndex] : null}
      />
      <AlertDialog
        open={deleteProductIndex !== null}
        onOpenChange={(v) => {
          if (!v) setDeleteProductIndex(null);
        }}
      >
        <AlertDialogContent data-ocid="admin.delete_confirm_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-700">
              Delete Product?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold text-foreground">
                {deleteProductIndex !== null
                  ? products[deleteProductIndex]?.name
                  : ""}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              data-ocid="admin.delete_confirm_button"
              onClick={() => {
                if (deleteProductIndex !== null)
                  handleDeleteProduct(deleteProductIndex);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        grandTotal={grandTotal}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onPayOnline={() => {
          setCartDrawerOpen(false);
          setPaymentModalOpen(true);
        }}
      />

      {/* Payment Modal */}
      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        grandTotal={grandTotal}
        onConfirm={handleConfirmOrder}
      />

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveView("store")}
              data-ocid="nav.logo_button"
            >
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg text-green-800 tracking-tight">
                SS Mart
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.ocid}
                  href={activeView === "store" ? link.href : "#"}
                  data-ocid={link.ocid}
                  onClick={() => setActiveView("store")}
                  className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                data-ocid="orders.tab_button"
                onClick={() => setActiveView("orders")}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              >
                Orders {orders.length > 0 && `(${orders.length})`}
              </button>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Admin badge / logout */}
              {isAdmin && (
                <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-orange-700">
                    Admin
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdmin(false);
                      toast("Logged out");
                    }}
                    className="text-orange-400 hover:text-orange-700 transition-colors"
                    data-ocid="admin.logout_button"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-1.5 border-green-600 text-green-700 hover:bg-green-50 font-semibold"
                onClick={() => setPaymentModalOpen(true)}
                data-ocid="nav.pay_online_button"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Pay Online</span>
                <span className="sm:hidden">Pay</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="relative border-primary/20 hover:border-primary hover:bg-primary/5"
                onClick={() => setCartDrawerOpen(true)}
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
                    href={activeView === "store" ? link.href : "#"}
                    data-ocid={link.ocid}
                    onClick={() => {
                      setActiveView("store");
                      setMobileMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  data-ocid="orders.tab_button"
                  onClick={() => {
                    setActiveView("orders");
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                >
                  Orders {orders.length > 0 && `(${orders.length})`}
                </button>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdmin(false);
                      setMobileMenuOpen(false);
                      toast("Logged out");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                    data-ocid="admin.mobile_logout_button"
                  >
                    Logout Admin
                  </button>
                )}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {activeView === "orders" ? (
        <main>
          <OrdersView orders={orders} onBack={() => setActiveView("store")} />
        </main>
      ) : (
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
                      🛒 Arsikere&apos;s Trusted Store
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
                    Frozen foods, snacks, beverages, household essentials,
                    pantry staples, baby products &amp; dairy — all under one
                    roof.
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
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="hero.whatsapp_button"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base transition-colors"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      Chat on WhatsApp
                    </a>
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
                    data-ocid={`categories.item.${i + 1}`}
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
                className="flex items-center justify-between mb-8"
              >
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black text-green-800 mb-1">
                    Featured Products
                  </h2>
                  <p className="text-muted-foreground">
                    Popular picks at SS Mart
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-orange-500 hidden sm:block" />
                  {/* Admin: Add Product button */}
                  {isAdmin && (
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold gap-2"
                      onClick={() => setAddProductOpen(true)}
                      data-ocid="admin.add_product_button"
                    >
                      <Plus className="w-4 h-4" />
                      Add Product
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-green-200 focus-visible:ring-green-500"
                  data-ocid="search.search_input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center gap-4 py-20 text-center"
                  data-ocid="products.empty_state"
                >
                  <Search className="w-12 h-12 text-green-200" />
                  <p className="font-bold text-green-800 text-lg">
                    No products found
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Try a different search term
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                    className="border-green-600 text-green-700"
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div
                  data-ocid="products.list"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.name}
                      data-ocid={`products.item.${i + 1}`}
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
                            data-ocid={`products.item.${i + 1}`}
                            onClick={() =>
                              handleAddToCart(product.name, product.price)
                            }
                          >
                            Add to Cart
                          </Button>
                        </div>
                        {isAdmin && (
                          <div className="flex gap-2 pt-3 border-t border-gray-100">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-green-300 text-green-700 hover:bg-green-50 gap-1.5"
                              data-ocid={`admin.product_edit_button.${i + 1}`}
                              onClick={() => {
                                setEditProductIndex(i);
                                setEditProductOpen(true);
                              }}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-red-300 text-red-600 hover:bg-red-50 gap-1.5"
                              data-ocid={`admin.product_delete_button.${i + 1}`}
                              onClick={() => setDeleteProductIndex(i)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Free Delivery Banner */}
          <section className="py-8 bg-green-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-white font-black text-xl">
                🚚 FREE Delivery on orders above ₹1,000!
              </p>
              <p className="text-green-200 text-sm mt-1">
                Orders below ₹1,000 — only ₹50 delivery charge
              </p>
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
                <p className="text-muted-foreground">
                  Visit SS Mart in Arsikere
                </p>
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
      )}

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
                  onClick={() => setActiveView("store")}
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
            <div className="flex items-center gap-4">
              {/* Admin login trigger */}
              <button
                type="button"
                onClick={() => setAdminLoginOpen(true)}
                className="flex flex-col items-center gap-0.5 text-white/60 hover:text-white transition-colors"
                data-ocid="admin.login_trigger_button"
                title="Admin Login"
              >
                <span className="text-xs font-medium">Admin Login</span>
                <Lock className="w-3 h-3" />
              </button>
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
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-3 rounded-full shadow-lg shadow-green-900/30 transition-colors"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span className="text-sm hidden sm:inline">Chat with us</span>
      </motion.a>
    </div>
  );
}
