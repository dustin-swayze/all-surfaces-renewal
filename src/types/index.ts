/**
 * Shared type definitions for the All Surfaces Renewal and Repair site.
 * These mirror the data models in the project brief (section 10).
 */

export interface Service {
  id: string;
  title: string;
  /** Short lead-in description used in cards and previews. */
  description: string;
  /** Longer description for the Services page. */
  longDescription?: string;
  /** Plain-text benefits list used on detail sections. */
  benefits?: string[];
  /** Optional image path (relative to /public or an imported asset). */
  image?: string;
}

export type GalleryCategory =
  | 'bathtub'
  | 'countertop'
  | 'sink'
  | 'bathroom'
  | 'repair'
  | 'other';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  beforeImage: string;
  afterImage: string;
  description?: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  source?: 'Facebook' | 'Google' | 'Website' | 'Other';
}

export type PreferredContactMethod = 'phone' | 'email' | 'text';

export interface QuoteRequest {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  location?: string;
  description: string;
  preferredContactMethod: PreferredContactMethod;
}
