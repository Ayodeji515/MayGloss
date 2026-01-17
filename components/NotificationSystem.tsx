
import React, { useEffect } from 'react';
import { X, CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { Notification } from '../types';

interface NotificationSystemProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed bottom-6 left-6 z-[200] space-y-3 w-80 pointer-events-none">
      {notifications.map((notif) => (
        <NotificationToast key={notif.id} notification={notif} onClose={() => removeNotification(notif.id)} />
      ))}
    </div>
  );
};

const NotificationToast: React.FC<{ notification: Notification; onClose: () => void }> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />
  };

  return (
    <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-neutral-100 shadow-xl p-4 flex items-start space-x-3 animate-in slide-in-from-left-4 duration-300">
      <div className="flex-shrink-0 mt-0.5">{icons[notification.type]}</div>
      <div className="flex-grow">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-800">{notification.message}</p>
      </div>
      <button onClick={onClose} className="text-neutral-300 hover:text-neutral-900 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
