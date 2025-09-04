export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Axiom Agents. All rights reserved.</p>
        <nav className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
