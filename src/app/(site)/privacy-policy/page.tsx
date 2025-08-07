import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | A Thousand Voices",
};

export default function Page() {
    return (
        <section>
            <div className="relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
                <div className="container relative z-10">
                    <div className='flex flex-col gap-5'>
                        <h1 className='md:text-6xl text-4xl font-medium text-center'>
                            Privacy Policy
                        </h1>
                        <div className="bg-white dark:bg-dark_black p-8 rounded-2xl">
                            <p className="text-opacity-60 mb-6">
                                <strong>Last updated:</strong> August 6, 2025
                            </p>

                            <p className="text-opacity-60 mb-6">
                                A Thousand Voices ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit stories, or contact us through our platform.
                            </p>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">Information We Collect</h4>
                                
                                <h5 className="font-semibold mb-2">Personal Information</h5>
                                <p className="mb-4 text-opacity-60">
                                    When you submit a story or contact us, we may collect the following personal information:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>First and last name</li>
                                    <li>Email address</li>
                                    <li>Country and city</li>
                                    <li>Story title and content</li>
                                    <li>Language preference</li>
                                    <li>Any additional information you choose to provide</li>
                                </ul>

                                <h5 className="font-semibold mb-2">Story Submissions</h5>
                                <p className="mb-4 text-opacity-60">
                                    When you submit a story through our platform:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Your story content and PDF files are stored securely</li>
                                    <li>We generate a unique submission ID for tracking</li>
                                    <li>Your story may be reviewed for publication consideration</li>
                                    <li>We may contact you regarding your submission</li>
                                </ul>

                                <h5 className="font-semibold mb-2">Contact Information</h5>
                                <p className="mb-4 text-opacity-60">
                                    When you use our contact form, we collect:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Name and email address</li>
                                    <li>Subject of inquiry</li>
                                    <li>Message content</li>
                                </ul>

                                <h5 className="font-semibold mb-2">Automatically Collected Information</h5>
                                <p className="mb-4 text-opacity-60">
                                    We automatically collect certain information when you visit our website:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>IP address and browser type</li>
                                    <li>Pages visited and time spent</li>
                                    <li>Device information</li>
                                    <li>Cookies and similar technologies</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">How We Use Your Information</h4>
                                <p className="mb-4 text-opacity-60">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Process and review story submissions</li>
                                    <li>Communicate with you about your submissions</li>
                                    <li>Respond to your inquiries and provide support</li>
                                    <li>Send confirmation emails and updates</li>
                                    <li>Improve our website and services</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">Information Sharing and Disclosure</h4>
                                <p className="mb-4 text-opacity-60">
                                    We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li><strong>Service Providers:</strong> We use trusted third-party services for email delivery (Resend), file storage (Supabase), and website hosting (Vercel)</li>
                                    <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                                    <li><strong>Consent:</strong> We may share information with your explicit consent</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">Data Security</h4>
                                <p className="mb-4 text-opacity-60">
                                    We implement appropriate security measures to protect your personal information:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Encrypted data transmission (HTTPS)</li>
                                    <li>Secure file storage with access controls</li>
                                    <li>Regular security updates and monitoring</li>
                                    <li>Limited access to personal information</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">Your Rights and Choices</h4>
                                <p className="mb-4 text-opacity-60">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate information</li>
                                    <li>Request deletion of your information</li>
                                    <li>Withdraw consent for data processing</li>
                                    <li>Opt out of marketing communications</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">Data Retention</h4>
                                <p className="mb-4 text-opacity-60">
                                    We retain your information for as long as necessary to:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Provide our services</li>
                                    <li>Comply with legal obligations</li>
                                    <li>Resolve disputes</li>
                                    <li>Enforce our agreements</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">Children's Privacy</h4>
                                <p className="mb-4 text-opacity-60">
                                    Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">International Data Transfers</h4>
                                <p className="mb-4 text-opacity-60">
                                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">Changes to This Privacy Policy</h4>
                                <p className="mb-4 text-opacity-60">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">Contact Us</h4>
                                <p className="mb-4 text-opacity-60">
                                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                                </p>
                                <p className="mb-4 text-opacity-60">
                                    <strong>Email:</strong> admin@athousandvoices.com<br/>
                                    <strong>Website:</strong> <Link href="/" className="text-dark_black">athousandvoices.com</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
