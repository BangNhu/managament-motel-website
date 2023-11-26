import { LayoutProps } from '@/models/common';
import { Stack } from '@mui/material';

export interface RegisterLoginLayoutProps {}

export function RegisterLoginLayout({ children }: LayoutProps) {
    return <Stack>{children}</Stack>;
}
