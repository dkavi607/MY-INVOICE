import { InvoiceData, LineItem } from '../types';

export function generateInvoiceNumber(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `INV-${datePart}-${randomPart}`;
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function calculateDueDate(startDateStr: string, daysToAdd: number): string {
  try {
    const baseDate = startDateStr ? new Date(startDateStr) : new Date();
    if (isNaN(baseDate.getTime())) {
      return getTodayDateString();
    }
    const result = new Date(baseDate);
    result.setDate(result.getDate() + daysToAdd);
    return result.toISOString().split('T')[0];
  } catch {
    return getTodayDateString();
  }
}

export interface InvoiceTotals {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  shippingAmount: number;
  grandTotal: number;
  totalQuantity: number;
}

export function calculateTotals(invoice: InvoiceData): InvoiceTotals {
  const subtotal = invoice.items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    return sum + (qty * price);
  }, 0);

  const totalQuantity = invoice.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  let discountAmount = 0;
  if (invoice.discountEnabled && invoice.discountValue > 0) {
    if (invoice.discountType === 'percentage') {
      discountAmount = (subtotal * Math.min(invoice.discountValue, 100)) / 100;
    } else {
      discountAmount = Math.min(invoice.discountValue, subtotal);
    }
  }

  const afterDiscount = Math.max(0, subtotal - discountAmount);

  let taxAmount = 0;
  if (invoice.taxEnabled && invoice.taxRate > 0) {
    taxAmount = (afterDiscount * invoice.taxRate) / 100;
  }

  const shippingAmount = invoice.shippingEnabled ? (Number(invoice.shippingFee) || 0) : 0;

  const grandTotal = afterDiscount + taxAmount + shippingAmount;

  return {
    subtotal: round(subtotal),
    discountAmount: round(discountAmount),
    taxableAmount: round(afterDiscount),
    taxAmount: round(taxAmount),
    shippingAmount: round(shippingAmount),
    grandTotal: round(grandTotal),
    totalQuantity,
  };
}

function round(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

export function formatMoney(amount: number, symbol: string = '$', currencyCode: string = 'USD'): string {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);

  // If currency is JPY or similar zero decimal, we can format cleanly
  if (['JPY', 'KRW'].includes(currencyCode)) {
    return `${symbol}${Math.round(amount || 0).toLocaleString()}`;
  }

  return `${symbol}${formatted}`;
}

const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertChunk(num: number): string {
  let str = '';
  if (num >= 100) {
    str += ONES[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }
  if (num >= 20) {
    str += TENS[Math.floor(num / 10)] + ' ';
    num %= 10;
  }
  if (num > 0) {
    str += ONES[num] + ' ';
  }
  return str.trim();
}

export function numberToWords(amount: number, currencyCode: string = 'USD'): string {
  if (amount === 0) return 'Zero';
  if (isNaN(amount) || amount < 0) return '';

  const parts = amount.toFixed(2).split('.');
  let integerPart = parseInt(parts[0], 10);
  const decimalPart = parseInt(parts[1] || '0', 10);

  if (integerPart === 0 && decimalPart === 0) return 'Zero';

  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  const chunks: string[] = [];

  let scaleIndex = 0;
  while (integerPart > 0) {
    const chunk = integerPart % 1000;
    if (chunk > 0) {
      const chunkText = convertChunk(chunk);
      const scaleName = scales[scaleIndex];
      chunks.unshift(scaleName ? `${chunkText} ${scaleName}` : chunkText);
    }
    integerPart = Math.floor(integerPart / 1000);
    scaleIndex++;
  }

  let words = chunks.join(', ');

  const currencyNames: Record<string, { main: string; sub: string }> = {
    USD: { main: 'Dollars', sub: 'Cents' },
    LKR: { main: 'Sri Lankan Rupees', sub: 'Cents' },
    EUR: { main: 'Euros', sub: 'Cents' },
    GBP: { main: 'Pounds', sub: 'Pence' },
    INR: { main: 'Rupees', sub: 'Paise' },
    CAD: { main: 'Canadian Dollars', sub: 'Cents' },
    AUD: { main: 'Australian Dollars', sub: 'Cents' },
    JPY: { main: 'Yen', sub: 'Sen' },
    CNY: { main: 'Yuan', sub: 'Fen' },
    SGD: { main: 'Singapore Dollars', sub: 'Cents' },
    AED: { main: 'Dirhams', sub: 'Fils' },
    MYR: { main: 'Ringgit', sub: 'Sen' },
  };

  const curr = currencyNames[currencyCode] || { main: currencyCode, sub: 'Units' };

  if (words) {
    words = `${words} ${curr.main}`;
  }

  if (decimalPart > 0 && !['JPY', 'KRW'].includes(currencyCode)) {
    const decWords = convertChunk(decimalPart);
    words = words ? `${words} and ${decWords} ${curr.sub}` : `${decWords} ${curr.sub}`;
  }

  return words ? `${words} Only` : '';
}

export function exportToCSV(invoice: InvoiceData): void {
  const totals = calculateTotals(invoice);
  const rows = [
    ['INVOICE DETAILS'],
    ['Invoice Number', invoice.invoiceNumber],
    ['Invoice Date', invoice.invoiceDate],
    ['Due Date', invoice.dueDate],
    ['Currency', `${invoice.currency} (${invoice.currencySymbol})`],
    [],
    ['COMPANY DETAILS'],
    ['Company Name', invoice.company.name],
    ['Email', invoice.company.email],
    ['Phone', invoice.company.phone],
    ['Address', `"${invoice.company.address}, ${invoice.company.cityStateZip}"`],
    ['Tax / VAT ID', invoice.company.taxId],
    [],
    ['CLIENT DETAILS'],
    ['Client Name', invoice.client.name],
    ['Client Email', invoice.client.email],
    ['Client Phone', invoice.client.phone],
    ['Client Address', `"${invoice.client.address}, ${invoice.client.cityStateZip}"`],
    ['Client Tax ID', invoice.client.taxId || ''],
    [],
    ['LINE ITEMS'],
    ['#', 'Description', 'Quantity', 'Unit Price', 'Total'],
    ...invoice.items.map((item, idx) => [
      (idx + 1).toString(),
      `"${item.description.replace(/"/g, '""')}"`,
      item.quantity.toString(),
      item.unitPrice.toFixed(2),
      (item.quantity * item.unitPrice).toFixed(2),
    ]),
    [],
    ['SUMMARY'],
    ['Subtotal', totals.subtotal.toFixed(2)],
    ['Discount', invoice.discountEnabled ? `-${totals.discountAmount.toFixed(2)}` : '0.00'],
    [`Tax (${invoice.taxRate}%)`, invoice.taxEnabled ? totals.taxAmount.toFixed(2) : '0.00'],
    ['Shipping', invoice.shippingEnabled ? totals.shippingAmount.toFixed(2) : '0.00'],
    ['TOTAL DUE', totals.grandTotal.toFixed(2)],
    ['Amount in Words', `"${numberToWords(totals.grandTotal, invoice.currency)}"`],
    [],
    ['PAYMENT & TERMS'],
    ['Bank Name', invoice.paymentDetails.bankName],
    ['Account Name', invoice.paymentDetails.accountName],
    ['Account Number', invoice.paymentDetails.accountNumber],
    ['Routing / Swift', invoice.paymentDetails.routingNumber || invoice.paymentDetails.swiftIban],
    ['Notes', `"${invoice.notes.replace(/"/g, '""')}"`],
    ['Terms', `"${invoice.terms.replace(/"/g, '""')}"`],
  ];

  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${invoice.invoiceNumber || 'invoice'}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getDefaultInvoiceData(): InvoiceData {
  const today = getTodayDateString();
  const due = calculateDueDate(today, 14);

  return {
    id: `inv-${Date.now()}`,
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: today,
    dueDate: due,
    currency: 'USD',
    currencySymbol: '$',
    company: {
      name: 'Acme Studio Innovations LLC',
      email: 'billing@acmestudio.io',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Suite 400',
      cityStateZip: 'San Francisco, CA 94107',
      taxId: 'US-89342019',
      website: 'www.acmestudio.io',
      logoUrl: '',
    },
    client: {
      name: 'Global Horizon Enterprises',
      email: 'accounts@globalhorizon.com',
      phone: '+1 (555) 987-6543',
      address: '100 Innovation Boulevard, Floor 12',
      cityStateZip: 'Austin, TX 78701',
      taxId: 'TX-44820194',
    },
    items: [
      {
        id: 'item-1',
        description: 'Brand Identity Design & UI Component System',
        quantity: 1,
        unitPrice: 2450.0,
      },
      {
        id: 'item-2',
        description: 'Full-Stack Web App Development (Sprint 1-2)',
        quantity: 35,
        unitPrice: 85.0,
      },
      {
        id: 'item-3',
        description: 'Cloud Infrastructure Setup & Security Audit',
        quantity: 1,
        unitPrice: 750.0,
      },
    ],
    taxRate: 8.5,
    taxEnabled: true,
    taxLabel: 'Sales Tax',
    discountValue: 10,
    discountType: 'percentage',
    discountEnabled: false,
    shippingFee: 0,
    shippingEnabled: false,
    notes: 'Payment is due within 14 days of invoice issuance. Late payments may be subject to a 1.5% monthly service charge.',
    terms: 'All deliverables are covered under the standard service agreement. Thank you for your continued partnership!',
    paymentDetails: {
      bankName: 'Silicon Valley Commercial Bank',
      accountName: 'Acme Studio Innovations LLC',
      accountNumber: '•••••••• 8842',
      routingNumber: '121000358',
      swiftIban: 'SVCBUS6SXXX',
      paymentMethod: 'Bank Wire / ACH / QR Pay',
      paymentLinkOrQr: 'https://pay.acmestudio.io/inv-latest',
      qrCodeEnabled: true,
    },
    footerMessage: 'Thank you for your business! We look forward to working with you again.',
    templateStyle: 'modern-blue',
    signatoryName: 'Alex Morgan',
    signatoryTitle: 'Managing Director & Partner',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function getBlankInvoiceData(): InvoiceData {
  const today = getTodayDateString();
  return {
    id: `inv-${Date.now()}`,
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: today,
    dueDate: calculateDueDate(today, 15),
    currency: 'USD',
    currencySymbol: '$',
    company: {
      name: '',
      email: '',
      phone: '',
      address: '',
      cityStateZip: '',
      taxId: '',
      logoUrl: '',
    },
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
      cityStateZip: '',
    },
    items: [
      {
        id: 'item-1',
        description: '',
        quantity: 1,
        unitPrice: 0,
      },
    ],
    taxRate: 10,
    taxEnabled: false,
    taxLabel: 'Tax',
    discountValue: 0,
    discountType: 'percentage',
    discountEnabled: false,
    shippingFee: 0,
    shippingEnabled: false,
    notes: 'Payment is due within 15 days.',
    terms: 'Please send payment via bank transfer or online link.',
    paymentDetails: {
      bankName: '',
      accountName: '',
      accountNumber: '',
      routingNumber: '',
      swiftIban: '',
      paymentMethod: 'Bank Transfer',
      paymentLinkOrQr: '',
      qrCodeEnabled: false,
    },
    footerMessage: 'Thank you for your business!',
    templateStyle: 'modern-blue',
  };
}
