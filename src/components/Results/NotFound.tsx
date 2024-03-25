import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t } = useTranslation();
    return (
        <Result
            status="404"
            title="404"
            subTitle={t("NotFound.subTitle")}
            extra={<Button href='/' type="primary">{t("NotFound.extra")}</Button>}
        />
    );
};

