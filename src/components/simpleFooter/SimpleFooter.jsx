import React from 'react';
import './SimpleFooter.css';

export default function SimpleFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className=" text-white">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <span className="block text-sm sm:text-center">
                    © 2024-{currentYear} RegCon™. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}
