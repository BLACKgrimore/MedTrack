

const tnc = () => {
    return (
        <div class="xsm:w-full bg-white shadow-md rounded-lg md:p-8 xsm:p-3 md:pt-20 xsm:pt-20">
            {/* <h1 class="md:text-6xl xsm:text-3xl font-bold text-gray-800 mb-6">Terms and Services</h1> */}

            {/* <div class=" mx-auto p-4  md:p-8 bg-white shadow-lg"> */}
            <div class="w-full p-6 bg-white shadow-md rounded-lg space-y-6">
                <h1 class="text-2xl md:text-4xl xsm:text-xl font-bold mb-6 text-center">Terms and Conditions for Payment (Vendors and Customers)</h1>
                <p class="mb-4">Welcome to the Evego Event platform. By using our services to make or receive payments, both vendors and customers agree to the following Terms and Conditions. Please read these carefully to ensure mutual understanding and compliance.</p>

                <section class="mb-8">
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p class="mb-4">By accessing or using the Evego Event platform, you agree to these Terms and Conditions. If you do not agree with any part of these terms, you should refrain from using our platform for payment processing.</p>
                </section>

                <section class="mb-8">
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">2. Payment Processing</h2>
                    <ul class="list-disc pl-6 mb-4">
                        <li><strong>Third-Party Payment Gateway:</strong> Evego Event utilizes a third-party payment processor to handle all financial transactions. By using the platform, you agree to comply with the payment processor's terms of service. Evego Event is not responsible for any issues that arise due to the operations of the payment gateway.</li>
                        <li><strong>Accepted Payment Methods:</strong> Customers can make payments using various methods including credit cards, debit cards, and any other payment methods supported by the payment gateway. All transactions are processed in the currency displayed at checkout.</li>
                        <li><strong>Currency Fluctuations:</strong> Customers are aware that fluctuations in exchange rates may affect the final amount charged if payments are made in a currency different from that of the vendor. Evego Event will notify users of any significant changes in currency conversion rates prior to processing payments.</li>
                    </ul>
                </section>

                <section class="mb-8">
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">3. Vendor Payments</h2>
                    <ul class="list-disc pl-6 mb-4">
                        <li><strong>Booking Confirmation:</strong> A booking is only confirmed when full payment has been successfully processed by the customer. Vendors will receive notifications of confirmed bookings through the Evego Event platform.</li>
                        <li><strong>Commission and Service Fees:</strong> Evego Event charges a commission or service fee on every confirmed booking. The applicable commission rate will be communicated to vendors during registration and may change with prior notice. The commission is deducted from the payment made by the customer before it is transferred to the vendor.</li>
                        <li><strong>Payment to Vendors:</strong> Payments to vendors will be processed after the successful completion of the event. This may take up to [4 days] depending on the payment gateway's processing time. Vendors must provide accurate payment details to avoid delays.</li>
                        <li><strong>Vendor Responsibility for Taxes:</strong> Vendors are responsible for calculating, collecting, and remitting any applicable taxes (e.g., VAT, sales tax) on the services they provide. Evego Event is not liable for any tax-related issues.</li>
                    </ul>
                </section>

                <section class="mb-8">
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">4. Customer Payments</h2>
                    <ul class="list-disc pl-6 mb-4">
                        <li><strong>Payment Upon Booking:</strong> Customers must make full payment at the time of booking through the platform to confirm their booking and secure the vendor’s services. Partial payments or cash payments directly to the vendor are not accepted unless explicitly specified by Evego Event.</li>
                        <li><strong>Refunds:</strong> Refunds, if applicable, will be processed in accordance with Evego Event’s Cancellation and Refund Policy. Refunds will be returned to the original payment method and may take up to [7 days] to reflect in the customer’s account, depending on the payment provider’s policies.</li>
                        <li><strong>Currency:</strong> Payments are processed in the currency displayed at checkout. Any currency conversion fees or additional charges levied by the customer’s bank are the responsibility of the customer.</li>
                    </ul>
                </section>

                <section class="mb-8">
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">5. Cancellation and Refunds</h2>
                    <ul class="list-disc pl-6 mb-4">
                        <li><strong>Vendor Cancellations:</strong> If a vendor cancels a confirmed booking, the customer is entitled to a full refund of the amount paid. Evego Event will facilitate the refund process, and the vendor may be held liable for any charges associated with the cancellation.</li>
                        <li><strong>Customer Cancellations:</strong> If a customer cancels a booking, any refund will be processed in accordance with the Cancellation Policy agreed upon during booking. The refund amount may vary based on how close to the event date the cancellation is made.</li>
                        <li><strong>Non-Refundable Fees:</strong> Certain service fees, such as Evego Event’s platform fee, may be non-refundable in the event of cancellations by either the vendor or the customer. The platform will communicate any non-refundable fees clearly before the payment is made.</li>
                    </ul>
                </section>

                {/* <!-- Section 6: Security and Fraud Prevention --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">6. Security and Fraud Prevention</h2>

                    {/* <!-- Secure Transactions --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Secure Transactions</h3>
                        <p class="text-gray-600 mt-2">
                            Evego Event employs industry-standard encryption and security protocols to ensure that
                            all payment information is kept secure. However, Evego Event is not responsible for
                            unauthorized access to customer or vendor financial details caused by third-party
                            actions.
                        </p>
                    </div>

                    {/* <!-- Fraud Detection --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Fraud Detection</h3>
                        <p class="text-gray-600 mt-2">
                            All payments made through the platform are subject to fraud detection and monitoring.
                            Any suspicious transactions may be flagged, delayed, or canceled pending investigation.
                            Both customers and vendors agree to cooperate in case additional verification is
                            needed.
                        </p>
                    </div>

                    {/* <!-- Chargebacks --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Chargebacks</h3>
                        <p class="text-gray-600 mt-2">
                            In the event of a chargeback or payment dispute initiated by the customer, Evego Event
                            will work with the vendor and the payment processor to resolve the issue. Vendors may
                            be required to provide proof of service delivery to counter any chargeback claims.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 7: Late or Failed Payments --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">7. Late or Failed Payments</h2>

                    {/* <!-- Customer Payment Failure --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Customer Payment Failure</h3>
                        <p class="text-gray-600 mt-2">
                            If a customer’s payment fails or is delayed, the booking will not be confirmed. Evego
                            Event reserves the right to cancel the booking if payment is not completed within a
                            reasonable time frame.
                        </p>
                    </div>

                    {/* <!-- Vendor Payment Issues --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Vendor Payment Issues</h3>
                        <p class="text-gray-600 mt-2">
                            If a vendor does not receive payment due to an error in the payment process or incorrect
                            payment details, Evego Event will assist in resolving the issue. However, Evego Event is
                            not responsible for delays caused by banks or third-party payment providers.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 8: User Account Responsibilities --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">8. User Account Responsibilities</h2>

                    {/* <!-- Account Security --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Account Security</h3>
                        <p class="text-gray-600 mt-2">
                            Users are responsible for maintaining the confidentiality of their account credentials. Any
                            unauthorized use of their account must be reported immediately to Evego Event.
                        </p>
                    </div>

                    {/* <!-- Account Information Updates --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Account Information Updates</h3>
                        <p class="text-gray-600 mt-2">
                            Users must ensure that their account information is accurate and up-to-date, including
                            contact details and payment methods.
                        </p>
                    </div>
                </section>


                {/* <!-- Section 9: Amendments to Payment Terms --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">9. Amendments to Payment Terms</h2>
                    <p class="text-gray-600 mt-2">
                        Evego Event reserves the right to modify or update these payment terms at any time. Any
                        changes will be communicated to users through email or notifications on the platform.
                        Continued use of the platform for making or receiving payments will constitute acceptance of the
                        updated terms.
                    </p>
                </section>

                {/* <!-- Section 10: Dispute Resolution --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">10. Dispute Resolution</h2>

                    {/* <!-- Payment Disputes --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Payment Disputes</h3>
                        <p class="text-gray-600 mt-2">
                            Any disputes regarding payments, including refund issues, should first be addressed
                            between the customer and the vendor. If no resolution is reached, Evego Event may
                            mediate the dispute and make a final decision based on the evidence provided by both
                            parties.
                        </p>
                    </div>

                    {/* <!-- Final Decision --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Final Decision</h3>
                        <p class="text-gray-600 mt-2">
                            Evego Event’s decision on any payment dispute will be final and binding. Both vendors
                            and customers agree to abide by the platform’s resolution process.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 11: Termination of Payment Services --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">11. Termination of Payment Services</h2>

                    {/* <!-- Vendor Removal --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Vendor Removal</h3>
                        <p class="text-gray-600 mt-2">
                            Evego Event reserves the right to suspend or terminate payment services for vendors
                            who violate the platform’s terms and conditions, engage in fraudulent activities, or fail to
                            deliver services as agreed.
                        </p>
                    </div>

                    {/* <!-- Account Closure --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Account Closure</h3>
                        <p class="text-gray-600 mt-2">
                            Both customers and vendors may close their accounts on the platform by providing
                            written notice. However, any pending payments or unresolved disputes must be settled
                            before account closure.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 12: Payment Deadlines and Scheduling --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">12. Payment Deadlines and Scheduling</h2>

                    {/* <!-- Advance Payments --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Advance Payments</h3>
                        <p class="text-gray-600 mt-2">
                            Customers are required to make advance payments at the time of booking unless
                            otherwise specified by the vendor. In certain cases, vendors may offer partial payment
                            options, which will be explicitly mentioned in the service details.
                        </p>
                    </div>

                    {/* <!-- Payment Schedule for Vendors --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Payment Schedule for Vendors</h3>
                        <p class="text-gray-600 mt-2">
                            Vendors may receive payments in installments for long-term bookings or ongoing
                            services (e.g., multi-day events). The exact payment schedule will be communicated
                            during the booking process and must be followed accordingly.
                        </p>
                    </div>

                    {/* <!-- Late Payment Penalties --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Late Payment Penalties</h3>
                        <p class="text-gray-600 mt-2">
                            If a customer fails to make the payment within the agreed time frame, Evego Event
                            reserves the right to charge late fees or cancel the booking entirely. Vendors may also
                            impose penalties for late payments based on their service policies.
                        </p>
                    </div>
                </section>


                {/* <!-- Section 13: Deposits and Upfront Fees --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">13. Deposits and Upfront Fees</h2>

                    {/* <!-- Security Deposit --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Security Deposit</h3>
                        <p class="text-gray-600 mt-2">
                            For certain types of services (e.g., venue rental, equipment), vendors may require a
                            security deposit, which will be clearly stated during the booking. The deposit will be held
                            by Evego Event or the vendor and refunded after successful service completion, minus
                            any damages or losses, if applicable.
                        </p>
                    </div>

                    {/* <!-- Non-Refundable Deposits --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Non-Refundable Deposits</h3>
                        <p class="text-gray-600 mt-2">
                            Certain deposits or fees may be non-refundable, particularly for custom or specialized
                            services. Customers will be made aware of this during booking, and by proceeding with
                            the payment, they agree to the terms regarding the non-refundable deposit.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 14: Currency and Conversion Fees --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">14. Currency and Conversion Fees</h2>

                    {/* <!-- Currency Selection --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Currency Selection</h3>
                        <p class="text-gray-600 mt-2">
                            All payments will be processed in the currency displayed at the time of booking. Vendors
                            are responsible for ensuring that the prices listed in their profiles reflect the appropriate
                            currency for their region.
                        </p>
                    </div>

                    {/* <!-- Currency Conversion --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Currency Conversion</h3>
                        <p class="text-gray-600 mt-2">
                            If the customer’s payment is made in a different currency than the vendor’s, conversion
                            fees or exchange rate differences may apply. These fees will be borne by the customer
                            or the vendor, depending on the circumstances, and Evego Event will not be held
                            responsible for any discrepancies caused by exchange rates.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 15: Service Completion and Release of Payment --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">15. Service Completion and Release of Payment</h2>

                    {/* <!-- Confirmation of Service Completion --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Confirmation of Service Completion</h3>
                        <p class="text-gray-600 mt-2">
                            Vendors must confirm through the platform that the service has been delivered
                            successfully to the customer. Failure to confirm service completion may result in delays
                            in payment release to the vendor.
                        </p>
                    </div>

                    {/* <!-- Disputes on Completion --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Disputes on Completion</h3>
                        <p class="text-gray-600 mt-2">
                            If a customer disputes the service completion (e.g., service not as described, delays,
                            etc.), Evego Event will investigate the claim. Payment may be withheld from the vendor
                            until the dispute is resolved.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 16: Split Payments and Shared Bookings --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">16. Split Payments and Shared Bookings</h2>

                    {/* <!-- Split Payments --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Split Payments</h3>
                        <p class="text-gray-600 mt-2">
                            In certain cases, customers may have the option to split the payment among multiple
                            parties (e.g., for group events). This feature will be clearly displayed at the time of
                            booking. All participants must make their share of the payment for the booking to be
                            confirmed.
                        </p>
                    </div>

                    {/* <!-- Shared Bookings --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Shared Bookings</h3>
                        <p class="text-gray-600 mt-2">
                            If a booking involves multiple customers (e.g., group services), the cancellation policy
                            will apply to the entire group, not individual participants. Refunds, if applicable, will be
                            processed based on the terms agreed to by the primary customer at the time of booking.
                        </p>
                    </div>
                </section>


                {/* <!-- Section 17: Vendor Payment Restrictions --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">17. Vendor Payment Restrictions</h2>

                    {/* <!-- Withholding Payments --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Withholding Payments</h3>
                        <p class="text-gray-600 mt-2">
                            Evego Event reserves the right to withhold payments to vendors in cases where there
                            are complaints, disputes, or investigations related to service quality or fraud. Payments
                            will only be released after the resolution of the issue.
                        </p>
                    </div>

                    {/* <!-- Account Suspensions and Payment Holds --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Account Suspensions and Payment Holds</h3>
                        <p class="text-gray-600 mt-2">
                            If a vendor’s account is suspended for violating platform policies, Evego Event may hold
                            all pending payments until the situation is resolved. Vendors are encouraged to follow
                            platform guidelines to avoid disruptions in payments.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 18: Discounts, Promotions, and Coupons --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">18. Discounts, Promotions, and Coupons</h2>

                    {/* <!-- Platform Promotions --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Platform Promotions</h3>
                        <p class="text-gray-600 mt-2">
                            Evego Event may run promotions, discounts, or coupon programs from time to time.
                            Vendors agree to honor these discounts if their services are included in the promotion.
                            The discount amount will be deducted from the total payment received by the vendor.
                        </p>
                    </div>

                    {/* <!-- Vendor Promotions --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Vendor Promotions</h3>
                        <p class="text-gray-600 mt-2">
                            Vendors may offer their own discounts and promotions through the platform, provided
                            they comply with the platform’s rules and guidelines. Evego Event is not responsible for
                            any issues arising from vendor-specific promotions.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 19: Force Majeure --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">19. Force Majeure</h2>

                    {/* <!-- Unforeseen Circumstances --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Unforeseen Circumstances</h3>
                        <p class="text-gray-600 mt-2">
                            In the event that services are disrupted due to circumstances beyond the control of
                            either the vendor or the customer (e.g., natural disasters, strikes, pandemics), the
                            platform’s standard cancellation policy may not apply. Evego Event will assess such
                            situations on a case-by-case basis, and refunds or alternative arrangements may be
                            offered where applicable.
                        </p>
                    </div>

                    {/* <!-- Vendor and Customer Responsibilities --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Vendor and Customer Responsibilities</h3>
                        <p class="text-gray-600 mt-2">
                            Vendors and customers are responsible for informing each other and Evego Event of
                            any force majeure events as soon as possible to avoid further complications.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 20: Compliance with Anti-Money Laundering (AML) Laws --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">20. Compliance with Anti-Money Laundering (AML) Laws</h2>

                    {/* <!-- AML Compliance --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● AML Compliance</h3>
                        <p class="text-gray-600 mt-2">
                            Vendors and customers agree to comply with all applicable anti-money laundering (AML)
                            laws and regulations. Any suspicious activity related to payments may result in account
                            suspension, reporting to authorities, and further investigation by Evego Event.
                        </p>
                    </div>

                    {/* <!-- Transaction Monitoring --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Transaction Monitoring</h3>
                        <p class="text-gray-600 mt-2">
                            Evego Event reserves the right to monitor transactions for AML purposes and may
                            request additional information from both customers and vendors to verify the legitimacy
                            of a transaction.
                        </p>
                    </div>
                </section>


                {/* <!-- Section 21: Non-Payment and Legal Remedies --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">21. Non-Payment and Legal Remedies</h2>

                    {/* <!-- Vendor Legal Recourse --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Vendor Legal Recourse</h3>
                        <p class="text-gray-600 mt-2">
                            In the event of non-payment by a customer, the vendor may seek legal remedies in
                            accordance with local laws. Evego Event will provide necessary documentation (e.g.,
                            proof of booking, payment records) to support legal action but is not liable for collecting
                            unpaid fees.
                        </p>
                    </div>

                    {/* <!-- Customer Refund Disputes --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Customer Refund Disputes</h3>
                        <p class="text-gray-600 mt-2">
                            If a customer disputes a refund or chargeback claim, Evego Event will follow the
                            payment processor’s guidelines for dispute resolution. Customers may be required to
                            provide documentation or evidence supporting their claim.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 22: User Notifications and Communications --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">22. User Notifications and Communications</h2>

                    {/* <!-- Communication Preferences --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Communication Preferences</h3>
                        <p class="text-gray-600 mt-2">
                            Users can set their preferences for how they receive notifications regarding payments
                            and updates (e.g., email, SMS). It is the user’s responsibility to ensure that their contact
                            information is current.
                        </p>
                    </div>

                    {/* <!-- Platform Announcements --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Platform Announcements</h3>
                        <p class="text-gray-600 mt-2">
                            Important changes regarding payment terms will be communicated through platform
                            announcements. Users are encouraged to regularly check for updates.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 23: Governing Laws and Jurisdiction --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">23. Governing Laws and Jurisdiction</h2>

                    {/* <!-- Jurisdictional Variance --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Jurisdictional Variance</h3>
                        <p class="text-gray-600 mt-2">
                            Depending on the geographical location of the vendor and customer, different laws may
                            apply. Users are encouraged to review the applicable laws in their jurisdiction.
                        </p>
                    </div>

                    {/* <!-- Legal Fees in Disputes --> */}
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">● Legal Fees in Disputes</h3>
                        <p class="text-gray-600 mt-2">
                            In the event of legal disputes, the losing party may be responsible for covering the legal
                            fees incurred by the prevailing party.
                        </p>
                    </div>
                </section>

                {/* <!-- Section 24: Termination of Services --> */}
                <section>
                    <h2 class="text-xl md:text-2xl font-semibold mb-4">24. Termination of Services</h2>
                    <p class="text-gray-600 mt-4">
                        Evego Event reserves the right to terminate services to users who violate these Terms and
                        Conditions. Upon termination, users will be notified and must resolve any pending payments or
                        disputes.
                    </p>
                </section>

                <footer class="mt-8 text-center text-sm text-gray-500">
                    <p>&copy; 2024 Evego Event Platform. All rights reserved.</p>
                </footer>
            </div>

        </div >
    )
}

export default tnc