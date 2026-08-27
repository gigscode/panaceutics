"use client"

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-background py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Privacy Policy</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Last updated: October 24, 2025
                    </p>
                </div>

                <div className="mt-12 prose prose-gray mx-auto">
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                        <p className="text-muted-foreground">
                            Panaceutics ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
                        <h3 className="text-xl font-medium text-foreground mt-6 mb-3">Personal Information</h3>
                        <p className="text-muted-foreground mb-4">
                            We may collect personal information that you voluntarily provide, including:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Name and contact information</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Billing and shipping address</li>
                            <li>Payment information</li>
                        </ul>

                        <h3 className="text-xl font-medium text-foreground mt-6 mb-3">Usage Information</h3>
                        <p className="text-muted-foreground mb-4">
                            We automatically collect certain information when you visit our website:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>IP address</li>
                            <li>Browser type</li>
                            <li>Device information</li>
                            <li>Pages viewed</li>
                            <li>Time spent on pages</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                        <p className="text-muted-foreground mb-4">We use the collected information for:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Processing and fulfilling orders</li>
                            <li>Communicating about your orders and products</li>
                            <li>Sending marketing communications (with your consent)</li>
                            <li>Improving our website and services</li>
                            <li>Analyzing usage patterns</li>
                            <li>Protecting against fraud</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing</h2>
                        <p className="text-muted-foreground mb-4">
                            We do not sell or rent your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Service providers who assist in our operations</li>
                            <li>Payment processors for secure transactions</li>
                            <li>Shipping partners for order delivery</li>
                            <li>Law enforcement when required by law</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Security</h2>
                        <p className="text-muted-foreground">
                            We implement appropriate security measures to protect your personal information. However, no internet transmission is completely secure. We cannot guarantee the security of information transmitted to our website.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
                        <p className="text-muted-foreground mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Request deletion of your information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Lodge a complaint with supervisory authorities</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies</h2>
                        <p className="text-muted-foreground">
                            We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookies through your browser settings.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Children's Privacy</h2>
                        <p className="text-muted-foreground">
                            Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Privacy Policy</h2>
                        <p className="text-muted-foreground">
                            We may update this Privacy Policy periodically. We will notify you of any material changes by posting the updated policy on this page with a new effective date.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                        <p className="text-muted-foreground">
                            If you have questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="mt-4 text-muted-foreground space-y-1">
                            <p>Email: <a href="mailto:support@panaceutics.org" className="text-primary hover:underline">support@panaceutics.org</a></p>
                            <p>Phone: +234 903 690 9455</p>
                            <p>Address: House 9, Mols&amp;Sims Complex, Zone-4, Irekanmi Quarters, Off Ilawe Road, Ado-Ekiti, Ekiti State, Nigeria</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}