export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxable?: boolean;
}

export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  cityStateZip: string;
  taxId: string;
  logoUrl?: string;
  website?: string;
}

export interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  cityStateZip: string;
  taxId?: string;
}

export type TemplateStyle = 'modern-blue' | 'minimal-slate' | 'classic-corporate' | 'bold-emerald';

export type DiscountType = 'percentage' | 'fixed';

export interface PaymentDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  swiftIban: string;
  paymentMethod: string; // e.g. "Bank Transfer", "PayPal", "UPI", "Stripe"
  paymentLinkOrQr: string; // URL or UPI string or custom info for QR
  qrCodeEnabled: boolean;
}

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  currencySymbol: string;
  company: CompanyInfo;
  client: ClientInfo;
  items: LineItem[];
  taxRate: number; // in percent, e.g. 10 for 10%
  taxEnabled: boolean;
  taxLabel: string; // "VAT", "GST", "Sales Tax"
  discountValue: number;
  discountType: DiscountType;
  discountEnabled: boolean;
  shippingFee: number;
  shippingEnabled: boolean;
  notes: string;
  terms: string;
  paymentDetails: PaymentDetails;
  footerMessage: string;
  templateStyle: TemplateStyle;
  signatoryName?: string;
  signatoryTitle?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}
