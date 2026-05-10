import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { StarRatingInput } from '../components/StarRatingInput';
import { usePageMeta } from '../hooks/usePageMeta';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  customer_name: string;
  rating: number;
  text: string;
  email: string;
  project_type: string;
}

const initialForm: FormState = {
  customer_name: '',
  rating: 0,
  text: '',
  email: '',
  project_type: '',
};

export function LeaveReview() {
  usePageMeta({
    title: 'Leave a Review | All Surfaces Renewal and Repair',
    description:
      'Share your experience with All Surfaces Renewal and Repair. Reviews help other customers and let us know how we did.',
  });

  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot — silent success
    if (honeypot.trim() !== '') {
      setStatus('success');
      return;
    }

    // Client-side validation
    if (!form.customer_name.trim()) {
      setErrorMessage('Please enter your name.');
      setStatus('error');
      return;
    }
    if (form.rating < 1 || form.rating > 5) {
      setErrorMessage('Please pick a star rating.');
      setStatus('error');
      return;
    }
    if (form.text.trim().length < 10) {
      setErrorMessage('Please write a few sentences (at least 10 characters).');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.customer_name.trim(),
          rating: form.rating,
          text: form.text.trim(),
          email: form.email.trim(),
          project_type: form.project_type,
          _gotcha: honeypot,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setErrorMessage(`We couldn’t send your review. ${message}`);
      setStatus('error');
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Leave a Review"
        title="Tell us how we did"
        description="Were we great? We’d love to hear about it. Reviews help other folks decide whether we’re the right fit for their project."
      />

      <section className="section">
        <div className="container-page max-w-3xl">
          {status === 'success' ? (
            <SuccessState onAnother={() => setStatus('idle')} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
              {/* Honeypot — hidden from real users */}
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

              <div className="grid gap-5">
                <Field label="Your name" required>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={80}
                    value={form.customer_name}
                    onChange={(e) => update('customer_name', e.target.value)}
                    className="input"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    First name + last initial is fine (e.g. “Sarah M.”) — or your full name if you prefer.
                  </p>
                </Field>

                <Field label="Rating" required>
                  <StarRatingInput
                    value={form.rating}
                    onChange={(rating) => update('rating', rating)}
                  />
                </Field>

                <Field label="Your review" required>
                  <textarea
                    required
                    rows={6}
                    minLength={10}
                    maxLength={2000}
                    value={form.text}
                    onChange={(e) => update('text', e.target.value)}
                    className="input"
                    placeholder="What did we do? How was the experience? Any details you’d want a future customer to know?"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    {form.text.length} / 2000
                  </p>
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email (optional)">
                    <input
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="input"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Only used to follow up if needed — never shown publicly.
                    </p>
                  </Field>

                  <Field label="Project type (optional)">
                    <select
                      value={form.project_type}
                      onChange={(e) => update('project_type', e.target.value)}
                      className="input"
                    >
                      <option value="">— select —</option>
                      <option value="Bathtub">Bathtub</option>
                      <option value="Countertop">Countertop</option>
                      <option value="Sink">Sink</option>
                      <option value="Bathroom">Bathroom</option>
                      <option value="Repair">Chip / crack repair</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                </div>
              </div>

              {status === 'error' && errorMessage && (
                <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
              )}

              <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  Reviews are read before being published. Most appear within 1–2 business days.
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-accent"
                >
                  {status === 'submitting' ? 'Submitting…' : 'Submit my review'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function SuccessState({ onAnother }: { onAnother: () => void }) {
  return (
    <div className="card p-8 text-center sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 7" />
        </svg>
      </div>
      <h2 className="mt-5 text-2xl font-bold">Thanks — we got it!</h2>
      <p className="mt-2 text-slate-600">
        Your review has been submitted. We read every review before publishing,
        so it’ll appear on the site within a business day or two.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">Back to home</Link>
        <button type="button" onClick={onAnother} className="btn-secondary">
          Submit another
        </button>
      </div>
    </div>
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
