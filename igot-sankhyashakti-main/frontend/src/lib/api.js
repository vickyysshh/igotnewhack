import axios from 'axios';
const storageKey = 'sankhyashakti-demo-session';
let session = localStorage.getItem(storageKey);
if (!session) { session = crypto.randomUUID(); localStorage.setItem(storageKey, session); }
const rawBackend = process.env.REACT_APP_BACKEND_URL;
const backendUrl = (rawBackend && rawBackend !== 'undefined') ? rawBackend.replace(/\/+$/, '') : '';
export const api = axios.create({baseURL: backendUrl ? `${backendUrl}/api` : '/api', headers: {'X-Demo-Session': session}});
export const apiError = error => typeof error.response?.data?.detail === 'string' ? error.response.data.detail : 'Something went wrong. Please try again.';