import { LayoutProps } from '@/models/common';
import { Stack } from '@mui/material';

export interface SimpleLayoutProps {}

export function SimpleLayout({ children }: LayoutProps) {
    return <Stack>{children}</Stack>;
}
