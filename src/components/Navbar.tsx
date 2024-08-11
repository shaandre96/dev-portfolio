'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { navLinks } from '@/constants';
import { logo } from '../../public/images';
import Image from 'next/image';
import HamburgerIcon from './HamburgerIcon';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const [active, setActive] = useState<string>('');
    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    return (
        <nav
            className={`sm:px-16 pl-6 pr-2 w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
        >
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => {
                        setActive('');
                        window.scrollTo(0, 0);
                    }}
                >
                    <Image src={logo} alt="logo" width={80} />
                    <p className="text-white text-[1.5rem] leading-[1.125rem] font-bold cursor-pointer flex relative top-[3px]">
                        Andre&nbsp;
                        <span className="hidden sm:block">
                            |&nbsp;Fullstack Developer
                        </span>
                    </p>
                </Link>

                {/* Desktop Nav Bar */}
                <ul className="list-none hidden sm:flex flex-row gap-10">
                    {navLinks.map((link) => (
                        <li
                            key={link.id}
                            className={`${active === link.title ? 'text-white' : 'text-secondary'} hover:text-white text-[1.5rem] font-medium cursor-pointer`}
                            onClick={() => setActive(link.title)}
                        >
                            <Link href={`#${link.id}`}>{link.title}</Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Nav Drawer */}
                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <HamburgerIcon onClick={setShowDrawer} />
                    <AnimatePresence mode="wait">
                        {showDrawer && (
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{
                                    x: showDrawer ? 0 : '100%',
                                    transition: { duration: 0.3 },
                                }}
                                exit={{
                                    x: '100%',
                                    transition: { delay: 0.7, duration: 0.3 },
                                }}
                                className="w-3/5 h-[100svh] bg-primary absolute right-0 top-0 z-[25] flex flex-col pt-20 pl-8 gap-4"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{
                                            opacity: 0,
                                            transition: {
                                                delay: 0.2 * index,
                                            },
                                        }}
                                        transition={{
                                            delay: 0.3 + 0.2 * index,
                                        }}
                                        key={`nav-drawer-${link.id}`}
                                        className={`${
                                            active === link.title
                                                ? 'text-white'
                                                : 'text-secondary'
                                        } hover:text-white text-[1.5rem] font-medium cursor-pointer`}
                                        onClick={() => {
                                            setActive(link.title);
                                            setShowDrawer(false);
                                        }}
                                    >
                                        <Link href={`#${link.id}`}>
                                            {link.title}
                                        </Link>
                                    </motion.p>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
