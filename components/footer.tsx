import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Panaceutics</h3>
            <p className="text-sm opacity-80">Where the cure is natural, but the proof is scientific.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/products" className="hover:opacity-100 transition-opacity">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=herbal" className="hover:opacity-100 transition-opacity">
                  Herbal Solutions
                </Link>
              </li>
              <li>
                <Link href="/products?category=research" className="hover:opacity-100 transition-opacity">
                  Research
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/about" className="hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:opacity-100 transition-opacity">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>



          {/* <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/terms" className="hover:opacity-100 transition-opacity">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:opacity-100 transition-opacity">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:opacity-100 transition-opacity">
                  Returns
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 Panaceutics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
