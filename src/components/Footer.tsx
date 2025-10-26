import { Code2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center shadow-md">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight">
                  Bit By Bit Club
                </span>
                <span className="text-xs text-muted-foreground">E-Learning Platform</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering the next generation of technology leaders through comprehensive education and hands-on experience.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors font-medium">All Courses</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-medium">Learning Paths</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-medium">Certifications</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-medium">Student Dashboard</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors font-medium">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-medium">Our Team</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-medium">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors font-medium">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:hello@bitbybit.club" className="hover:text-foreground transition-colors">
                  hello@bitbybit.club
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>123 Education Ave<br />Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Bit By Bit Club. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors font-medium">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors font-medium">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
