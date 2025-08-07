import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms & Conditions | A Thousand Voices",
};

export default function Page() {
    return (
        <section>
            <div className="relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
                <div className="container relative z-10">
                    <div className='flex flex-col gap-5'>
                        <h1 className='md:text-6xl text-4xl font-medium text-center'>
                            Terms & Conditions
                        </h1>
                        <div className="bg-white dark:bg-dark_black p-8 rounded-2xl">
                            <p className="text-opacity-60 mb-6">
                                <strong>Last updated:</strong> August 6, 2025
                            </p>

                            <p className="text-opacity-60 mb-6">
                                Welcome to A Thousand Voices. These Terms and Conditions ("Terms") govern your use of our website, story submission platform, and related services. By accessing or using our services, you agree to be bound by these Terms.
                            </p>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">1. Acceptance of Terms</h4>
                                <p className="mb-4 text-opacity-60">
                                    By accessing and using A Thousand Voices ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">2. Description of Service</h4>
                                <p className="mb-4 text-opacity-60">
                                    A Thousand Voices is a platform dedicated to amplifying Afghan storytellers and creating a space for cultural exchange through literature. Our services include:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Story submission and publication platform</li>
                                    <li>Cultural exchange and community building</li>
                                    <li>Educational resources and content</li>
                                    <li>Ambassador program participation</li>
                                    <li>Contact and communication services</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">3. User Accounts and Registration</h4>
                                <p className="mb-4 text-opacity-60">
                                    When you submit a story or contact us, you may be required to provide certain information. You agree to:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Provide accurate, current, and complete information</li>
                                    <li>Maintain and update your information as necessary</li>
                                    <li>Keep your submission information confidential</li>
                                    <li>Accept responsibility for all activities under your submission</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">4. Story Submission Guidelines</h4>
                                <p className="mb-4 text-opacity-60">
                                    By submitting a story to A Thousand Voices, you agree to the following:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li><strong>Original Work:</strong> You confirm that the story is your original work and you have the rights to submit it</li>
                                    <li><strong>Content Standards:</strong> Stories must be respectful, non-harmful, and appropriate for all audiences</li>
                                    <li><strong>No Plagiarism:</strong> You will not submit work that infringes on others' intellectual property rights</li>
                                    <li><strong>File Format:</strong> Stories must be submitted in PDF format as specified</li>
                                    <li><strong>Language:</strong> Stories may be submitted in English, Dari, Pashto, or other specified languages</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">5. Intellectual Property Rights</h4>
                                <p className="mb-4 text-opacity-60">
                                    <strong>Your Rights:</strong> You retain ownership of your submitted stories. By submitting, you grant A Thousand Voices a non-exclusive, worldwide, royalty-free license to:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Publish your story on our platform</li>
                                    <li>Use your story for promotional and educational purposes</li>
                                    <li>Share your story with our community and partners</li>
                                    <li>Archive your story for future reference</li>
                                </ul>
                                <p className="mb-4 text-opacity-60">
                                    <strong>Our Rights:</strong> A Thousand Voices owns all content on our website, including text, graphics, logos, and software. You may not reproduce, distribute, or create derivative works without our permission.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">6. Prohibited Uses</h4>
                                <p className="mb-4 text-opacity-60">
                                    You agree not to use our services to:
                                </p>
                                <ul className="list-disc list-inside mb-4 text-opacity-60 ml-4">
                                    <li>Submit false, misleading, or fraudulent information</li>
                                    <li>Violate any applicable laws or regulations</li>
                                    <li>Infringe on intellectual property rights</li>
                                    <li>Harass, abuse, or harm others</li>
                                    <li>Spread hate speech or discriminatory content</li>
                                    <li>Attempt to gain unauthorized access to our systems</li>
                                    <li>Interfere with the proper functioning of our platform</li>
                                </ul>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">7. Privacy and Data Protection</h4>
                                <p className="mb-4 text-opacity-60">
                                    Your privacy is important to us. Our collection and use of personal information is governed by our <Link href="/privacy-policy" className="text-dark_black">Privacy Policy</Link>, which is incorporated into these Terms by reference.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">8. Disclaimers and Limitations</h4>
                                <p className="mb-4 text-opacity-60">
                                    <strong>Service Availability:</strong> We strive to maintain high availability but do not guarantee uninterrupted access to our services.
                                </p>
                                <p className="mb-4 text-opacity-60">
                                    <strong>Content Accuracy:</strong> While we review submissions, we do not guarantee the accuracy, completeness, or quality of any content.
                                </p>
                                <p className="mb-4 text-opacity-60">
                                    <strong>Limitation of Liability:</strong> A Thousand Voices shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">9. Indemnification</h4>
                                <p className="mb-4 text-opacity-60">
                                    You agree to indemnify and hold harmless A Thousand Voices, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of our services or violation of these Terms.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">10. Termination</h4>
                                <p className="mb-4 text-opacity-60">
                                    We may terminate or suspend your access to our services at any time, with or without cause, with or without notice. You may also terminate your relationship with us by ceasing to use our services.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">11. Governing Law</h4>
                                <p className="mb-4 text-opacity-60">
                                    These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where A Thousand Voices operates, without regard to conflict of law principles.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">12. Changes to Terms</h4>
                                <p className="mb-4 text-opacity-60">
                                    We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the updated Terms on our website. Your continued use of our services after changes constitutes acceptance of the new Terms.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">13. Contact Information</h4>
                                <p className="mb-4 text-opacity-60">
                                    If you have any questions about these Terms and Conditions, please contact us at:
                                </p>
                                <p className="mb-4 text-opacity-60">
                                    <strong>Email:</strong> admin@athousandvoices.com<br/>
                                    <strong>Website:</strong> <Link href="/" className="text-dark_black">athousandvoices.com</Link>
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">14. Severability</h4>
                                <p className="mb-4 text-opacity-60">
                                    If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
                                </p>
                            </div>

                            <div className="my-6">
                                <h4 className="font-semibold text-xl mb-4">15. Entire Agreement</h4>
                                <p className="mb-4 text-opacity-60">
                                    These Terms, together with our Privacy Policy, constitute the entire agreement between you and A Thousand Voices regarding your use of our services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
