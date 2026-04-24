import { PageHeader } from '../components/PageHeader';
import { QuoteForm } from '../components/QuoteForm';
import { ContactInfo } from '../components/ContactInfo';

export function Quote() {
  return (
    <>
      <PageHeader
        eyebrow="Get a Free Quote"
        title="Tell us about your project"
        description="Share a few details and we’ll get back to you within one business day. Quotes are always free and no-obligation."
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.6fr]">
          <QuoteForm />
          <aside className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-brand">Prefer to talk first?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Give us a call or send an email and we&rsquo;ll walk through your project.
              </p>
            </div>
            <ContactInfo />
          </aside>
        </div>
      </section>
    </>
  );
}
