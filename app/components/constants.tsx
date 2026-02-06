import { Country } from "../types";



export const COUNTRIES: Country[] = [
  { name: 'United States', code: 'US', flag: '🇺🇸', dialCode: '+1' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', dialCode: '+44' },
  { name: 'India', code: 'IN', flag: '🇮🇳', dialCode: '+91' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', dialCode: '+1' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', dialCode: '+61' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', dialCode: '+49' },
  { name: 'France', code: 'FR', flag: '🇫🇷', dialCode: '+33' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', dialCode: '+81' },
];

export const TRACKING_STEPS = [
  'Initializing GSM connection...',
  'Requesting HLR lookup...',
  'Intercepting SS7 packets...',
  'Triangulating base station signals...',
  'Retrieving GPS coordinates from gateway...',
  'Mapping device metadata...',
  'Finalizing secure tunnel...'
];

export const MOCK_LOCATIONS = [
  { city: 'New York', region: 'New York', street: '5th Ave', lat: 40.7128, lng: -74.0060 },
  { city: 'London', region: 'Greater London', street: 'Baker St', lat: 51.5074, lng: -0.1278 },
  { city: 'Mumbai', region: 'Maharashtra', street: 'Marine Drive', lat: 19.0760, lng: 72.8777 },
  { city: 'Paris', region: 'Île-de-France', street: 'Champs-Élysées', lat: 48.8566, lng: 2.3522 },
  { city: 'Berlin', region: 'Berlin', street: 'Friedrichstraße', lat: 52.5200, lng: 13.4050 },
];
