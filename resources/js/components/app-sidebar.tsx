import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Apple, BookOpen, ChefHat, ClipboardList, ContactRound, FileSearch, LayoutGrid, MessagesSquare, Users2 } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRole = auth?.user?.role;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];
    const cocinaNavItems: NavItem[] = [
        {
            title: 'Dietas',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];
    const nutriNavItems: NavItem[] = [
        {
            title: 'Pacientes',
            href: '/pacientes',
            icon: ContactRound,
        },
        {
            title: 'Dietas',
            href: '/dietas',
            icon: ClipboardList,
        },
        {
            title: 'Reportes',
            href: '/reportes',
            icon: FileSearch,
        },
    ];
    const adminNavItems: NavItem[] = [
        {
            title: 'Nutriologos',
            href: '/nutriologos',
            icon: Users2,
        },
        {
            title: 'Insumos',
            href: '/insumos',
            icon: Apple,
        },
        {
            title: 'Tipos de Comida',
            href: '/tiposComida',
            icon: ChefHat,
        },
    ];

    let roleBaseNavItems = [...mainNavItems];
    if (userRole === 'cocina') {
        roleBaseNavItems = [...cocinaNavItems];
    }
    if (userRole === 'nutriologo') {
        roleBaseNavItems = [...mainNavItems, ...nutriNavItems];
    }
    if (userRole === 'admin') {
        roleBaseNavItems = [...mainNavItems, ...nutriNavItems, ...adminNavItems];
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Soporte',
            href: 'https://wa.me/3114000218',
            icon: MessagesSquare,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={roleBaseNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
