import { signal } from "@preact/signals-react";

export const toggle = signal(false);
export const token = signal('');
export const loading = signal(false);
export const user = signal(null);
// export const baseURL = signal('http://localhost:5000');
export const baseURL = signal('https://techconnect-community-server.onrender.com'); 