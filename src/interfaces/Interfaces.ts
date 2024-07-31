// src/interfaces.ts

export interface Money {
    amount: string;
    currency_code: string;
  }
  
  export interface MoneySet {
    shop_money: Money;
    presentment_money: Money;
  }
  
  export interface TaxLine {
    price: string;
    rate: number;
    title: string;
    price_set: MoneySet;
    channel_liable: boolean;
  }
  
  export interface LineItem {
    id: string;
    name: string;
    price: string;
    quantity: number;
    title: string;
    total_discount: string;
    total_discount_set: MoneySet;
    product_id: string;
    variant_id: string;
    tax_lines: TaxLine[];
    [key: string]: any;
  }
  
  export interface Address {
    first_name: string;
    last_name: string;
    address1: string;
    address2: string;
    city: string;
    zip: string | null;
    province: string | null;
    country: string;
    phone: string | null;
    latitude: number | null;
    longitude: number | null;
    name: string;
    country_code: string;
    province_code: string | null;
  }
  
  export interface Customer {
    id: string;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    created_at: string;
    updated_at: string;
    state: string;
    note: string | null;
    verified_email: boolean;
    multipass_identifier: string | null;
    tax_exempt: boolean;
    email_marketing_consent: any;
    sms_marketing_consent: any;
    tags: string;
    currency: string;
    tax_exemptions: any[];
    admin_graphql_api_id: string;
    default_address: Address;
  }
  
  export interface Order {
    id: string;
    admin_graphql_api_id: string;
    app_id: number;
    browser_ip: string;
    buyer_accepts_marketing: boolean;
    cancel_reason: string | null;
    cancelled_at: string | null;
    cart_token: string;
    checkout_id: string;
    checkout_token: string;
    client_details: any;
    closed_at: string | null;
    company: string | null;
    confirmation_number: string;
    confirmed: boolean;
    contact_email: string | null;
    created_at: string;
    currency: string;
    current_subtotal_price: string;
    current_subtotal_price_set: MoneySet;
    current_total_additional_fees_set: any | null;
    current_total_discounts: string;
    current_total_discounts_set: MoneySet;
    current_total_duties_set: any | null;
    current_total_price: string;
    current_total_price_set: MoneySet;
    current_total_tax: string;
    current_total_tax_set: MoneySet;
    customer_locale: string;
    device_id: string | null;
    discount_codes: any[];
    email: string | null;
    estimated_taxes: boolean;
    financial_status: string;
    fulfillment_status: string | null;
    landing_site: string;
    landing_site_ref: string | null;
    location_id: string | null;
    merchant_of_record_app_id: string | null;
    name: string;
    note: string | null;
    note_attributes: any[];
    number: number;
    order_number: number;
    order_status_url: string;
    original_total_additional_fees_set: any | null;
    original_total_duties_set: any | null;
    payment_gateway_names: string[];
    phone: string | null;
    po_number: string | null;
    presentment_currency: string;
    processed_at: string;
    reference: string;
    referring_site: string;
    source_identifier: string;
    source_name: string;
    source_url: string | null;
    subtotal_price: string;
    subtotal_price_set: MoneySet;
    tags: string;
    tax_exempt: boolean;
    tax_lines: TaxLine[];
    taxes_included: boolean;
    test: boolean;
    token: string;
    total_discounts: string;
    total_discounts_set: MoneySet;
    total_line_items_price: string;
    total_line_items_price_set: MoneySet;
    total_outstanding: string;
    total_price: string;
    total_price_set: MoneySet;
    total_shipping_price_set: MoneySet;
    total_tax: string;
    total_tax_set: MoneySet;
    total_tip_received: string;
    total_weight: number;
    updated_at: string;
    user_id: string | null;
    billing_address: Address;
    customer: Customer;
    discount_applications: any[];
    fulfillments: any[];
    line_items: LineItem[];
    payment_terms: any | null;
    refunds: any[];
    shipping_address: Address;
    shipping_lines: any[];
  }
  