import type { Metadata } from 'next'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'RoboKit privacy policy — how we collect, use, and protect your personal data.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="bg-[#0f2744] py-14 px-4 text-center">
        <div className="container-xl max-w-3xl mx-auto">
          <Shield size={40} className="text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: 1 January 2025</p>
        </div>
      </section>

      <div className="container-xl max-w-3xl mx-auto py-14 px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">1. Who We Are</h2>
            <p>
              RoboKit (registered as RoboKit Technologies Private Limited, CIN: U52100MH2019PTC123456)
              operates the website robokit.in. This policy explains what personal data we collect,
              why we collect it, and your rights in relation to it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Order information:</strong> name, email address, phone number, shipping and billing address.</li>
              <li><strong>Payment information:</strong> We do not store card details. Payments are processed by PCI-DSS compliant gateways (Razorpay / PayU).</li>
              <li><strong>Usage data:</strong> Pages visited, products viewed, browser type, IP address, collected via cookies and analytics tools.</li>
              <li><strong>Communications:</strong> Emails or WhatsApp messages you send us, including support queries.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To process and fulfil your orders and send shipping updates.</li>
              <li>To issue GST-compliant tax invoices.</li>
              <li>To respond to support queries and returns.</li>
              <li>To send transactional emails (order confirmation, dispatch notification).</li>
              <li>To improve our website, product listings, and user experience.</li>
              <li>With your consent, to send promotional emails (you may opt out at any time).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal data. We share it only with:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Logistics partners</strong> (Delhivery, Shiprocket) to fulfil deliveries.</li>
              <li><strong>Payment processors</strong> to handle transactions securely.</li>
              <li><strong>Analytics providers</strong> (Google Analytics) in anonymised form.</li>
              <li><strong>Legal authorities</strong> when required to comply with applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">5. Cookies</h2>
            <p>
              We use essential cookies to run the shopping cart and session management.
              We also use analytics cookies to understand how visitors use our site.
              You can disable non-essential cookies in your browser settings, though this may
              affect some functionality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">6. Data Retention</h2>
            <p>
              Order and invoice data is retained for 8 years as required by Indian tax law (GST Act).
              Marketing preferences and account data are retained until you request deletion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data (subject to legal obligations).</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, email us at <strong>privacy@robokit.in</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">8. Security</h2>
            <p>
              Our website uses SSL/TLS encryption (HTTPS) for all data in transit.
              Access to order data is restricted to authorised personnel only.
              We follow industry best practices to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">9. Third-Party Links</h2>
            <p>
              Our site may contain links to external websites. We are not responsible for
              the privacy practices of those sites and encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be communicated
              via email or a prominent notice on our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-gray-900 mb-3">11. Contact Us</h2>
            <p>
              For any privacy-related questions, contact our Data Protection Officer at:<br />
              <strong>RoboKit Technologies Private Limited</strong><br />
              401 TechHub Building, Baner Road, Pune 411045, Maharashtra, India<br />
              Email: <strong>privacy@robokit.in</strong>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
