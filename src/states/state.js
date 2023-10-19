import { signal } from "@preact/signals-react";

export const toggle = signal(false);
export const token = signal('');
export const loading = signal(true);
export const user = signal(null);
export const baseURL = signal('http://localhost:5000');