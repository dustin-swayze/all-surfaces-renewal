import { useState, type FormEvent, type ReactNode } from 'react';
import { services } from '../data/services';
import type { QuoteRequest } from '../types';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialForm: QuoteRequest = {
  name: '',
  phone: '',
  email: '',
  serviceType: '',
  location: '',
  description: '',
  preferredContactMethod: 'phone',
};

export function QuoteForm() {
  const [form, setForm] = useState<QuoteRequest>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  // Honeypot field — real users won't fill this. If it's non-empty on submit,
  // silently treat the submission as success (so bots don't learn) but drop it.
  const [honeypot, setHoneypot] = useState('');

  const update = <K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot trap — if filled, pretend it worked without sending anything.
    if (honeypot.trim() !== '') {
      setStatus('success');
      return;
    }

    // Basic required-field validation (HTML already handles most of this).
    if (!form.name || !form.phone || !form.serviceType || !form.description) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      // POST to our Vercel serverless function at /api/submit-quote.
      // It saves the lead to the dashboard AND forwards to Formspree for
      // email — all server-side so no secrets are exposed in the browser.
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || '',
          serviceType: form.serviceType,
          location: form.location || '',
          description: form.description,
          preferredContactMethod: form.preferredContactMethod,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setErrorMessage(`We couldn’t send your request. ${message}`);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold">Thanks — we got your request.</h3>
        <p className="mt-2 text-sm text-slate-600">
          We&rsquo;ll reach out within one business day using your preferred contact method.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn-secondary mt-6"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      {/* Honeypot: hidden from real users with aria-hidden + CSS hiding. */}
      <div aria-hidden className="hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Phone number" required>
          <input
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Email address">
          <input
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="input"
          />
        </Field>

        <Field label="City / location">
          <input
            type="text"
            autoComplete="address-level2"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Service needed" required>
          <select
            required
            value={form.serviceType}
            onChange={(e) => update('serviceType', e.target.value)}
            className="input"
          >
            <option value="">Select a service…</option>
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Other">Other / not sure</option>
          </select>
        </Field>

        <Field label="Preferred contact method" required>
          <select
            required
            value={form.preferredContactMethod}
            onChange={(e) =>
              update('preferredContactMethod', e.target.value as QuoteRequest['preferredContactMethod'])
            }
            className="input"
          >
            <option value="phone">Phone call</option>
            <option value="text">Text message</option>
            <option value="email">Email</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Project description" required>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className="input"
            placeholder="Tell us about the surface, what&rsquo;s wrong with it, and any other details that would help us quote the job."
          />
        </Field>
      </div>

      {status === 'error' && errorMessage && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          * Required. We&rsquo;ll never share your contact info.
        </p>
        <button type="submit" disabled={status === 'submitting'} className="btn-accent">
          {status === 'submitting' ? 'Sending…' : 'Request my free quote'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
