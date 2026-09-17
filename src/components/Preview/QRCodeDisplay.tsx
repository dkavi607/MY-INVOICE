import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 80,
  className = '',
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    if (!value) {
      setDataUrl('');
      return;
    }

    QRCode.toDataURL(value, {
      width: size * 2,
      margin: 1,
      color: {
        dark: '#111827',
        light: '#ffffff',
      },
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [value, size]);

  if (!dataUrl) return null;

  return (
    <div className={`flex flex-col items-center justify-center p-1.5 bg-white rounded-lg border border-gray-200 shadow-2xs ${className}`}>
      <img
        src={dataUrl}
        alt="Payment QR Code"
        width={size}
        height={size}
        className="block object-contain"
      />
      <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
        Scan to Pay
      </span>
    </div>
  );
};
