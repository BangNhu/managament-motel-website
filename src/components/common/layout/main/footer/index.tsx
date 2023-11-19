import React from 'react';
import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import {
    URL_PHONE,
    URL_FACEBOOK,
    URL_MESSAGER,
    URL_YOUTUBE,
    URL_ZALO,
    URL_Mail,
} from '@/utils/constant';

export interface IMainLayoutFooterComponentProps {}
const ContainerIcon = {
    backgroundColor: '#FFFFFF',
    width: { xs: 30, sm: 40, md: 50 },
    height: { xs: 30, sm: 40, md: 50 },
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    ':hover': {
        backgroundColor: '#c8c1c1',
    },
};
const IconStyle = { fontSize: { xs: 20, sm: 25, md: 30 }, color: '#1C1C1C' };

const LinkItem = [
    { title: 'Trang Chủ', path: '/' },
    { title: 'Bảng Giá', path: '/' },
    { title: 'Hướng dẫn', path: '/' },
    { title: 'Liên Hệ', path: '/' },
];
const TextContact = { color: '#1c1c1c', textDecoration: 'none' };
const TitleFooter = {
    color: '#1c1c1c',
    fontSize: { xs: '18px', sm: '18px', md: '20px' },
    fontWeight: 'bold',
    margin: { xs: '10px 0', sm: '15px 0', md: '20px 0' },
};
export function MainLayoutFooterComponent(props: IMainLayoutFooterComponentProps) {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
                gap: { xs: '10px', sm: '10px', md: '10px', lg: '20px' },
                bgcolor: '#f8ecec',
                padding: { xs: '10%', md: '2% 10%' },
                justifyContent: 'space-between',
            }}
        >
            <Stack
                sx={{
                    gap: { xs: '10px', sm: '0', md: '15px', lg: '30px', alignItems: 'center' },
                    width: { xs: '100%', sm: '35%' },
                }}
            >
                <Link href={'/'}>
                    <Stack
                        component="img"
                        src="/logo/nhutk-logo.png"
                        alt="Logo website NhuTK"
                        sx={{
                            width: { xs: '180px', sm: '200px', md: '220px', lg: '250px' },
                        }}
                    />
                </Link>
                <Stack
                    direction="row"
                    sx={{ gap: { xs: '10px', sm: '15px', md: '20px' }, justifyContent: 'center' }}
                >
                    <Stack sx={ContainerIcon} component="a" href={URL_FACEBOOK}>
                        <FacebookIcon sx={IconStyle} />
                    </Stack>
                    <Stack sx={ContainerIcon} component="a" href={URL_YOUTUBE}>
                        <YouTubeIcon sx={IconStyle} />
                    </Stack>
                    <Stack sx={ContainerIcon} component="a" href="#">
                        <InstagramIcon sx={IconStyle} />
                    </Stack>
                </Stack>
                <Typography sx={{ textAlign: 'justify' }}>
                    NhuTK - Phần mềm quản lý nhà trọ được thực hiện nhằm hoàn thành đồ án tốt nghiệp
                    và rèn luyện bản thân, nâng cao kỹ năng để đi làm sau này.
                </Typography>
            </Stack>
            <Stack>
                <Typography sx={TitleFooter}>Liên Hệ</Typography>
                <Stack sx={{ gap: { xs: '5px', sm: '15px', md: '20px' } }}>
                    <Stack direction="row" sx={{ gap: { xs: '5px', sm: '8px', md: '10px' } }}>
                        <LocationOnIcon sx={{ color: '#1C1C1C' }} />
                        <Typography sx={TextContact}>
                            Tổ 9, Thới Hòa, Bến Cát, Bình Dương
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ gap: { xs: '5px', sm: '8px', md: '10px' } }}>
                        <PhoneIcon sx={{ color: '#1C1C1C' }} />
                        <Typography component="a" href={URL_PHONE} sx={TextContact}>
                            0353025059
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ gap: { xs: '5px', sm: '8px', md: '10px' } }}>
                        <EmailIcon sx={{ color: '#1C1C1C' }} />
                        <Typography sx={TextContact} component="a" href={URL_Mail}>
                            khanhnhu270101@gmail.com
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack>
                <Typography sx={TitleFooter}>Liên Kết</Typography>
                <Stack sx={{ gap: { xs: '5px', sm: '8px', md: '10px' } }}>
                    {LinkItem.map((item, index) => (
                        <Typography
                            key={`item-key${index}`}
                            component="a"
                            href={item.path}
                            sx={{
                                color: '#1C1C1C',
                                textDecoration: 'none',
                                ':hover': { color: '#A61713', textDecoration: 'underline #A61713' },
                            }}
                        >
                            {item.title}
                        </Typography>
                    ))}
                </Stack>
            </Stack>
            <Stack></Stack>
        </Stack>
    );
}
