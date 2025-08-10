import { Link } from "react-router-dom";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 glass">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Accueil SmileZen">
          <Smile className="text-primary" />
          <span className="font-semibold">SmileZen</span>
        </Link>
        <div className="hidden gap-6 md:flex">
          <a href="#services" className="text-sm hover:text-primary">Services</a>
          <a href="#reserver" className="text-sm hover:text-primary">Réserver</a>
          <a href="#contact" className="text-sm hover:text-primary">Contact</a>
        </div>
        <div className="hidden md:block">
          <a href="#reserver">
            <Button variant="hero">Prendre RDV</Button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
