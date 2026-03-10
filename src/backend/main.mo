import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // Store Information Type
  type StoreInfo = {
    name : Text;
    tagline : Text;
    address : Text;
    phone : Text;
    email : Text;
    hours : Text;
  };

  // Product Category Type
  type Category = {
    name : Text;
    description : Text;
    icon : Text;
  };

  module Category {
    public func compare(cat1 : Category, cat2 : Category) : Order.Order {
      Text.compare(cat1.name, cat2.name);
    };
  };

  // Product Type
  type Product = {
    name : Text;
    price : Nat;
    originalPrice : ?Nat;
    category : Text;
    badge : ?Text;
  };

  module Product {
    public func compare(prod1 : Product, prod2 : Product) : Order.Order {
      Text.compare(prod1.name, prod2.name);
    };
  };

  // Banner Type
  type Banner = {
    title : Text;
    subtitle : Text;
    discountText : Text;
  };

  module Banner {
    public func compare(banner1 : Banner, banner2 : Banner) : Order.Order {
      Text.compare(banner1.title, banner2.title);
    };
  };

  // Store Information
  let storeInfo : StoreInfo = {
    name = "SS Mart";
    tagline = "Your One-Stop Superstore!";
    address = "123 Main St, Springfield, USA";
    phone = "+1 555-123-4567";
    email = "contact@ssmart.com";
    hours = "Mon-Sat: 8am-9pm, Sun: 10am-6pm";
  };

  // Categories Map
  let categories = Map.fromArray<Text, Category>([
    ("groceries", { name = "Groceries"; description = "Fresh and packaged food items"; icon = "cart" }),
    ("electronics", { name = "Electronics"; description = "Home appliances and gadgets"; icon = "tv" }),
    ("clothing", { name = "Clothing"; description = "Men's, women's, and kids' apparel"; icon = "tshirt" }),
    ("household", { name = "Household"; description = "Cleaning and home supplies"; icon = "broom" }),
    ("personalCare", { name = "Personal Care"; description = "Health and beauty products"; icon = "spa" }),
    ("stationery", { name = "Stationery"; description = "Office and school supplies"; icon = "toolbox" }),
  ]);

  // Products Map
  let products = Map.fromArray<Text, Product>([
    (
      "milk",
      {
        name = "Organic Milk";
        price = 399;
        originalPrice = null;
        category = "Groceries";
        badge = ?("New");
      },
    ),
    (
      "tv",
      {
        name = "Smart TV 50\"";
        price = 24999;
        originalPrice = ?29999;
        category = "Electronics";
        badge = ?("Sale");
      },
    ),
    (
      "jeans",
      {
        name = "Denim Jeans";
        price = 1999;
        originalPrice = ?2499;
        category = "Clothing";
        badge = ?("Discount");
      },
    ),
    (
      "detergent",
      {
        name = "Liquid Detergent";
        price = 799;
        originalPrice = null;
        category = "Household";
        badge = null;
      },
    ),
    (
      "shampoo",
      {
        name = "Herbal Shampoo";
        price = 599;
        originalPrice = ?699;
        category = "Personal Care";
        badge = ?("Sale");
      },
    ),
    (
      "notebook",
      {
        name = "Spiral Notebook (3-pack)";
        price = 299;
        originalPrice = null;
        category = "Stationery";
        badge = ?("New");
      },
    ),
  ]);

  // Banners Map
  let banners = Map.fromArray<Text, Banner>([
    (
      "superSale",
      {
        title = "Super Sale!";
        subtitle = "Up to 50% off electronics";
        discountText = "Limited time offer";
      },
    ),
    (
      "freshStocks",
      {
        title = "Fresh Stocks";
        subtitle = "New arrivals in groceries";
        discountText = "10% off first purchase";
      },
    ),
    (
      "winterClearance",
      {
        title = "Winter Clearance";
        subtitle = "Apparel discounts";
        discountText = "Buy 2 get 1 free";
      },
    ),
  ]);

  public query ({ caller }) func getStoreInfo() : async StoreInfo {
    storeInfo;
  };

  public query ({ caller }) func getCategories() : async [Category] {
    categories.values().toArray().sort();
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getBanners() : async [Banner] {
    banners.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(product) { product.category == category });
  };

  public query ({ caller }) func getProduct(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist.") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getCategory(id : Text) : async Category {
    switch (categories.get(id)) {
      case (null) { Runtime.trap("Category does not exist.") };
      case (?category) { category };
    };
  };

  public query ({ caller }) func getBanner(id : Text) : async Banner {
    switch (banners.get(id)) {
      case (null) { Runtime.trap("Banner does not exist.") };
      case (?banner) { banner };
    };
  };
};
