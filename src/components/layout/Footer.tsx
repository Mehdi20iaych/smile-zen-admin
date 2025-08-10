const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-8 text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} SmileZen – Clinique dentaire à Casablanca</p>
          <div className="flex items-center gap-4">
            <a href="tel:+212612345678" aria-label="Téléphone">+212 6 12 34 56 78</a>
            <a href="mailto:contact@smilezen.ma" aria-label="Email">contact@smilezen.ma</a>
            <a href="https://maps.google.com/?q=Bd.+d'Anfa,+Casablanca" target="_blank" rel="noreferrer">Voir sur Google Maps</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
