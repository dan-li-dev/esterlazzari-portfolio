export default function PrivacyPage() {
  return (
    <main className="bg-background text-foreground min-h-screen py-16 px-6 sm:px-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-card-foreground">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-card-foreground">1. Introduction</h2>
        <p>
          This website is a personal portfolio operated by Ester Lazzari. I respect your privacy and
          am committed to protecting your personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-card-foreground">2. What Data I Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>If you contact me through a form, I collect your name and email address.</li>
          <li>I may use cookies for basic analytics and site functionality (with your consent).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
          3. Why I Collect Your Data
        </h2>
        <p>
          I collect personal data solely to respond to inquiries or improve the website experience
          through anonymized usage analytics.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-card-foreground">4. Your Rights</h2>
        <p>
          Under the GDPR, you have the right to access, correct, or delete your personal data. You
          can also withdraw your consent at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-card-foreground">5. Contact</h2>
        <p>
          If you have questions or requests related to your data, please contact me at{' '}
          <a
            href="mailto:ester.lazzari@univie.ac.at"
            className="text-primary underline hover:text-secondary"
          >
            ester.lazzari@univie.ac.at
          </a>
          .
        </p>
      </section>

      <footer className="mt-16 text-sm text-muted-foreground">Last updated: May 2025</footer>
    </main>
  )
}
