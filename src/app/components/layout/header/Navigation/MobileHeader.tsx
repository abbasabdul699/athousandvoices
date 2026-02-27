

import Link from 'next/link';
import { HeaderItem } from '../../../../types/menu';

const MobileHeader: React.FC<{ item: HeaderItem; onClick?: () => void }> = ({ item, onClick }) => {

    return (
        <li>
            <Link
                href={item.href}
                onClick={onClick}
                className="block w-full rounded-md px-4 py-2 text-base font-medium text-black hover:text-opacity-50 dark:text-white dark:hover:text-opacity-50"
            >
                {item.label}
            </Link>
        </li>
    );
};

export default MobileHeader;
