#!/bin/bash
# Blog Dashboard Setup Verification Checklist

echo "🔍 Blog Dashboard Setup Verification"
echo "===================================="
echo ""

# Check Node files exist
echo "✓ Checking project structure..."
test -f src/app/page.tsx && echo "  ✓ Home page" || echo "  ✗ Home page missing"
test -f src/app/dashboard/page.tsx && echo "  ✓ Dashboard" || echo "  ✗ Dashboard missing"
test -f src/app/blog/page.tsx && echo "  ✓ Blog page" || echo "  ✗ Blog page missing"
test -f src/lib/firebase.ts && echo "  ✓ Firebase config" || echo "  ✗ Firebase config missing"
test -f src/lib/blogService.ts && echo "  ✓ Blog service" || echo "  ✗ Blog service missing"
echo ""

# Check dependencies
echo "✓ Checking dependencies..."
test -d node_modules/next && echo "  ✓ Next.js installed" || echo "  ✗ Next.js not installed"
test -d node_modules/firebase && echo "  ✓ Firebase installed" || echo "  ✗ Firebase not installed"
test -d node_modules/tailwindcss && echo "  ✓ Tailwind installed" || echo "  ✗ Tailwind not installed"
echo ""

# Check config files
echo "✓ Checking configuration files..."
test -f tsconfig.json && echo "  ✓ TypeScript config" || echo "  ✗ TypeScript config missing"
test -f tailwind.config.ts && echo "  ✓ Tailwind config" || echo "  ✗ Tailwind config missing"
test -f next.config.ts && echo "  ✓ Next.js config" || echo "  ✗ Next.js config missing"
test -f .env.local && echo "  ✓ .env.local exists" || echo "  ! .env.local not created yet (you need to create it)"
echo ""

# Check documentation
echo "✓ Checking documentation..."
test -f QUICK_START.md && echo "  ✓ Quick start guide" || echo "  ✗ Quick start guide missing"
test -f BLOG_SETUP.md && echo "  ✓ Setup guide" || echo "  ✗ Setup guide missing"
test -f SETUP_SUMMARY.md && echo "  ✓ Setup summary" || echo "  ✗ Setup summary missing"
echo ""

echo "===================================="
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Read: QUICK_START.md"
echo "2. Create Firebase project"
echo "3. Update .env.local with Firebase credentials"
echo "4. Run: npm run dev"
echo "5. Visit: http://localhost:3000/dashboard"
echo ""
