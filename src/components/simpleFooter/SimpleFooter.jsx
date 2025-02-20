import React from 'react';
import './SimpleFooter.css';

export default function SimpleFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background dark:bg-dark-cards border-t border-gray-200 dark:border-gray-600">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <span className="block text-sm sm:text-center text-text dark:text-dark-text">
                    © 2024-{currentYear} RegCon™. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}
