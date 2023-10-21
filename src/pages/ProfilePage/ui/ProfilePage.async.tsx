import { FC, lazy } from 'react';

export const ProfilePageAsync = lazy<FC>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!!
    setTimeout(() => resolve(import('./ProfilePage')), 1500);
}));