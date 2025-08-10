const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="container mx-auto py-12 md:py-16">
        <h2 className="text-3xl font-semibold">Contact</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-medium">Téléphone</p>
            <a className="text-muted-foreground" href="tel:+212612345678">+212 6 12 34 56 78</a>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <a className="text-muted-foreground" href="mailto:contact@smilezen.ma">contact@smilezen.ma</a>
          </div>
          <div>
            <p className="font-medium">Adresse</p>
            <p className="text-muted-foreground">Bd. d'Anfa, Casablanca</p>
            <a className="text-primary" href="https://maps.google.com/?q=Bd.+d'Anfa,+Casablanca" target="_blank" rel="noreferrer">Voir sur Google Maps</a>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-medium">Horaires</p>
          <p className="text-muted-foreground">Lun–Ven 08:00–18:00, Sam 09:00–14:00, Dim fermé</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
