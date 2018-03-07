import { S3_BASE_URL } from '@/constants/env.constant';
import ICON_LOGO_SVG from 'assets/logo/icon.svg';
import ICON_LOGO_WHITE_SVG from 'assets/logo/icon_w.svg';
import TYPE_LOGO_SVG from 'assets/logo/type.svg';
import HORIZON_LOGO_SVG from 'assets/logo/horizon_set.svg';
import VERTICAL_LOGO_SVG from 'assets/logo/vertical_set.svg';

export const ICON_LOGO: string = ICON_LOGO_SVG;
export const ICON_LOGO_WHITE: string = ICON_LOGO_WHITE_SVG;
export const TYPE_LOGO: string = TYPE_LOGO_SVG;
export const HORIZON_LOGO: string = HORIZON_LOGO_SVG;
export const VERTICAL_LOGO: string = VERTICAL_LOGO_SVG;

export const DEFAULT_USER_PROFILE: string = `${S3_BASE_URL}/user/default_profile_image.png`;
export const CUSTOM_HEADER_PREFIX: string = 'X-custom-';
