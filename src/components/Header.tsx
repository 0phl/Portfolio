import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
const Header = ({
  theme,
  toggleTheme
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const navItems = [{
    name: 'Skills',
    href: '#skills'
  }, {
    name: 'Experience',
    href: '#experience'
  }, {
    name: 'Projects',
    href: '#projects'
  }, {
    name: 'Education',
    href: '#education'
  }];
  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <a href="#" className="flex items-center gap-1 sm:gap-2">
            <img
              src="/images/logo/logo.png"
              alt="Ronan Dela Cruz Logo"
              className="h-7 sm:h-8 w-auto"
            />
            <span className="text-base sm:text-xl font-bold inline-block translate-y-0.5 truncate">Ronan Dela Cruz</span>
          </a>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => <a key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.name}
            </a>)}
          <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-muted transition-colors" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>
        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-1 sm:gap-2">
          <button onClick={toggleTheme} className="p-1.5 sm:p-2 rounded-md hover:bg-muted transition-colors" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={toggleMobileMenu} className="p-1.5 sm:p-2 rounded-md hover:bg-muted transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu - Improved styling */}
      {mobileMenuOpen && <div className="md:hidden p-4 bg-background border-b border-border animate-slide-down">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium py-2 px-2 rounded-md transition-colors hover:bg-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>}
    </header>;
};
export default Header;