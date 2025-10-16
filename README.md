# Gourmet Haven Restaurant Website - Easy Image Editing

Now you can **edit all images directly in the HTML file**! No more digging through CSS or JavaScript files.

## 🖼️ How to Change Images

### **1. Open `index.html` in any text editor**

### **2. Find the IMAGE CONFIGURATION section at the top:**

```html
<script id="imageConfig" type="application/json">
{
  "hero": "YOUR_HERO_IMAGE_URL_HERE",
  "menu": {
    "st1": "YOUR_TRUFFLE_ARANCINI_IMAGE_URL",
    "st2": "YOUR_BURRATA_CAPRESE_IMAGE_URL",
    "st3": "YOUR_BEEF_CARPACCIO_IMAGE_URL",
    ...etc for all 24 menu items
  },
  "highlights": {
    "mushrooms": "YOUR_MUSHROOM_IMAGE_URL",
    "wine": "YOUR_WINE_CELLAR_IMAGE_URL", 
    "dessert": "YOUR_DESSERT_IMAGE_URL"
  }
}
</script>
```

### **3. Replace URLs with your images:**

**For Hero Background:**
```html
"hero": "images/my-restaurant-interior.jpg"
```

**For Menu Items (24 total):**
```html
"st1": "images/menu/my-arancini.jpg",    // Truffle Arancini
"st2": "images/menu/my-burrata.jpg",     // Burrata Caprese
"m1": "images/menu/my-steak.jpg",        // Wagyu Striploin
"d1": "images/menu/my-chocolate.jpg",    // Chocolate Lava Cake
"w1": "images/menu/my-chardonnay.jpg"    // Chardonnay
```

**For Chef's Highlights:**
```html
"mushrooms": "images/highlights/my-mushrooms.jpg",
"wine": "images/highlights/my-wine-cellar.jpg",
"dessert": "images/highlights/my-dessert.jpg"
```

## 📋 Complete Menu Item IDs

### **Starters (st1-st6):**
- `st1` = Truffle Arancini ($16)
- `st2` = Burrata Caprese ($18)
- `st3` = Beef Carpaccio ($20)
- `st4` = Seared Scallops ($24)
- `st5` = Wild Prawn Cocktail ($17)
- `st6` = Roasted Beet Salad ($14)

### **Mains (m1-m6):**
- `m1` = Wagyu Striploin ($65)
- `m2` = Truffle Pasta ($28)
- `m3` = Grilled Salmon ($32)
- `m4` = Duck Confit ($38)
- `m5` = Lamb Rack ($42)
- `m6` = Porcini Risotto ($26)

### **Desserts (d1-d6):**
- `d1` = Chocolate Lava Cake ($12)
- `d2` = Crème Brûlée ($11)
- `d3` = Lemon Tart ($10)
- `d4` = Tiramisu ($10)
- `d5` = Pistachio Panna Cotta ($11)
- `d6` = Cheese Plate ($15)

### **Wine (w1-w6):**
- `w1` = Chardonnay ($12)
- `w2` = Sauvignon Blanc ($11)
- `w3` = Pinot Noir ($13)
- `w4` = Cabernet Sauvignon ($15)
- `w5` = Chianti Classico ($12)
- `w6` = Cava Brut ($10)

## 💰 How to Change Currency

**In `app.js`**, find these lines and replace `$` with your currency:

```javascript
// Around line 110:
<span class="price">$${item.price.toFixed(2)}</span>

// Change to (examples):
<span class="price">€${item.price.toFixed(2)}</span>  // Euro
<span class="price">£${item.price.toFixed(2)}</span>  // Pound
<span class="price">¥${item.price.toFixed(2)}</span>  // Yen

// Also change these lines (around line 180-190):
subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
taxEl.textContent = `$${tax.toFixed(2)}`;
totalEl.textContent = `$${total.toFixed(2)}`;

// And in the receipt section (around line 240-250):
<p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
<p><strong>Tax (8%):</strong> $${tax.toFixed(2)}</p>
<p><strong>Total: $${total.toFixed(2)}</strong></p>
```

## 📁 Recommended Folder Structure

```
gourmet-haven-restaurant/
├── index.html
├── styles.css
├── app.js
└── images/
    ├── hero-background.jpg
    ├── menu/
    │   ├── arancini.jpg
    │   ├── burrata.jpg
    │   ├── carpaccio.jpg
    │   └── ... (21 more menu images)
    └── highlights/
        ├── mushrooms.jpg
        ├── wine-cellar.jpg
        └── dessert.jpg
```

## ✨ Features Included

- 🍽️ **Complete Menu System**: 24 items across 4 categories
- 🛒 **Full Ordering System**: Cart, checkout, digital receipts
- 📅 **Table Reservations**: Complete booking system
- 🌙 **Day/Night Theme**: Brown/gold color palette
- 📱 **Fully Responsive**: Perfect on all devices
- 🖼️ **Easy Image Management**: Edit all images in HTML

## 🚀 Getting Started

1. **Download all files** to a folder
2. **Add your images** to the `images/` folder
3. **Edit image URLs** in the HTML configuration section
4. **Open `index.html`** in your browser
5. **Or use VS Code** with Live Server extension

## 🎯 Quick Tips

- **Use consistent image sizes**: 400×300px for menu items works best
- **Optimize for web**: Keep images under 200KB each
- **Use descriptive filenames**: `grilled-salmon.jpg` instead of `IMG_001.jpg`
- **Test locally first**: Make sure your folder structure is correct

## 🔧 Easy Editing Steps

1. **Open `index.html`** in Notepad/VS Code/any text editor
2. **Scroll to the top** and find the `<script id="imageConfig">` section
3. **Replace the URLs** with your own image paths
4. **Save the file** and refresh your browser
5. **Done!** Your images will appear instantly

**No CSS knowledge required - everything is in HTML now!** 🎉

---

## 📞 Support

If you need help:
1. Check that your image paths are correct
2. Make sure images exist in the specified folders
3. Try using full URLs if local paths don't work
4. Test with one image first before changing all of them

**Your restaurant website is ready to customize!** 🍽️