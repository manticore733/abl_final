import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

// 1. Create the Context
const ToastContext = createContext();

// Custom hook to use the toast easily in any file
export const useToast = () => useContext(ToastContext);

// 2. Create the Provider
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    // Function to trigger a new toast
    const showToast = useCallback((type, title, message) => {
        const id = Date.now(); // Unique ID
        setToasts((prev) => [...prev, { id, type, title, message }]);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    // Map the types to specific icons and colors based on your HTML
    const getToastStyles = (type) => {
        switch (type) {
            case 'success':
                return { icon: 'check_circle', accentClass: 'toast-accent-success', iconBgClass: 'toast-icon-bg-success' };
            case 'error':
                return { icon: 'report', accentClass: 'toast-accent-error', iconBgClass: 'toast-icon-bg-error' };
            case 'info':
            default:
                return { icon: 'info', accentClass: 'toast-accent-info', iconBgClass: 'toast-icon-bg-info' };
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* The floating container that holds the toasts */}
            <div className="toast-container">
                <AnimatePresence>
                    {toasts.map((toast) => {
                        const styles = getToastStyles(toast.type);
                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                className="toast-wrapper"
                            >
                                {/* Left Side Color Accent */}
                                <div className={`toast-accent ${styles.accentClass}`}></div>

                                <div className="toast-content-area">
                                    {/* Icon */}
                                    <div className={`toast-icon-box ${styles.iconBgClass}`}>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            {styles.icon}
                                        </span>
                                    </div>

                                    {/* Text Content */}
                                    <div className="toast-text-area">
                                        <h3>{toast.title}</h3>
                                        <p>{toast.message}</p>
                                    </div>

                                    {/* Close Button */}
                                    <button className="toast-close-btn" onClick={() => removeToast(toast.id)}>
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};