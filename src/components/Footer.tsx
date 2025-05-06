import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return <footer id="contact" className="bg-muted/30 border-t border-border py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a href="mailto:ronan@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                  roncruz1503@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span className="text-muted-foreground">
                  Manila, Philippines
                </span>
              </div>
            </div>
          </div>

          {/* Connect With Me */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/0phl"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/80 border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ronan-dela-cruz-9661bb335/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/80 border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/0phl1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/80 border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Availability</h3>
            <p className="text-sm text-muted-foreground mb-2">
              I'm currently available for freelance work and open to full-time opportunities.
            </p>
            <p className="text-xs text-muted-foreground">
              Response time: <span className="text-green-500 font-medium">Within 24 hours</span>
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex justify-center">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} <span className="font-medium text-foreground/80">Ronan Dela Cruz</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};

export default Footer;
