import React from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Contact</h2>

        <div className="max-w-4xl mx-auto bg-muted/20 rounded-xl border border-border/40 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold mb-6 border-b border-border pb-2">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-full shadow-sm">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Email</h4>
                    <a href="mailto:roncruz1503@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      roncruz1503@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-full shadow-sm">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Location</h4>
                    <p className="text-muted-foreground">
                      Manila, Philippines
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect With Me */}
            <div>
              <h3 className="text-xl font-semibold mb-6 border-b border-border pb-2">Connect With Me</h3>
              <div className="flex gap-4 mb-8">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                  aria-label="Twitter"
                >
                  <Twitter size={22} />
                </a>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-border/60 shadow-sm">
                <p className="text-foreground/90">
                  I'm currently available for freelance work and open to full-time opportunities.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Response time: <span className="text-green-500 font-medium">Within 24 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
