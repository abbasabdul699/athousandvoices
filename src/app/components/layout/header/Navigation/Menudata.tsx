import { HeaderItem } from "../../../../types/menu";

export const headerData: HeaderItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: 'https://athousandvoices.substack.com/', isButton: false },
    { label: 'Partnership', href: '/partnership' },
    { label: 'Resources', href: '/resources' },
    // { label: 'Submit Your Story', href: '/submit-story' }, // Hidden from navigation
    { label: 'Contact', href: '/contact' },
];