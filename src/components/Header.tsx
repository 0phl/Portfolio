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
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  return <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-xl font-bold">
            Ronan Dela Cruz
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
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-muted transition-colors" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-muted transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden p-4 bg-background border-b border-border">
          <nav className="flex flex-col space-y-4">
            {navItems.map(item => <a key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </a>)}
          </nav>
        </div>}
    </header>;
};
export default Header;