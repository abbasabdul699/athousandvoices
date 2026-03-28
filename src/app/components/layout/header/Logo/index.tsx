import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps { }
const Logo: React.FC<HeaderProps> = () => {
    return (
        <Link href="/" className='block leading-none'>
            <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={50}
                height={15}
                quality={100}
                priority={true}
                className='dark:hidden h-auto w-10 lg:w-[50px]'
            />
            <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={50}
                height={15}
                quality={100}
                className='dark:block hidden h-auto w-10 lg:w-[50px]'
            />
        </Link>
    );
};

export default Logo;
